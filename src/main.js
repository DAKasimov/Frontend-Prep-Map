import './styles.css';
import { DATA } from './data.js';
import { Store } from './storage.js';

/* ================= Подготовка данных ================= */

const STEPS = [];      // только шаги (включая добавленные блоки)
const QUESTIONS = [];  // все вопросы с собеседования, с привязкой к шагу
const byId = {};       // id узла маршрута -> узел

function parseCheck(raw, id) {
  let text = Array.isArray(raw) ? raw[0] : raw;
  const links = Array.isArray(raw) ? raw[1] || [] : [];
  const answer = Array.isArray(raw) ? raw[2] || '' : '';
  let fresh = false;
  let optional = false;
  if (text.charAt(0) === '+') { fresh = true; text = text.slice(1); }
  if (/\s\*$/.test(text)) { optional = true; text = text.replace(/\s\*$/, ''); }
  return { id, text, fresh, optional, links, answer };
}

function parseQA(raw, id) {
  return Array.isArray(raw)
    ? { id, text: raw[0], answer: raw[1] || '', links: [] }
    : { id, text: raw, answer: '', links: [] };
}

DATA.route.forEach((node) => {
  byId[node.id] = node;
  if (node.type !== 'step') return;

  node.checkItems = (node.checklist || []).map((raw, i) => parseCheck(raw, `${node.id}:c${i}`));
  node.reviewItems = (node.questions || []).map((raw, i) => parseQA(raw, `${node.id}:q${i}`));
  node.practiceItems = (node.practice || []).map((text, i) => ({ id: `${node.id}:p${i}`, text, links: [], answer: '' }));
  node.recapItems = (node.review || []).map((raw, i) => parseQA(raw, `${node.id}:r${i}`));
  node.resourceItems = (node.resources || []).map((r) => ({ text: r[0], href: r[1] }));
  node.interviewItems = (node.interview || []).map((q) => {
    const item = { ...q, stepId: node.id, src: q.src || 'v1', t: toSeconds(q.t) };
    item.also = (q.also || []).map((a) => ({ src: a.src, t: toSeconds(a.t) }));
    QUESTIONS.push(item);
    return item;
  });
  STEPS.push(node);
});

/* ================= Утилиты ================= */

function toSeconds(t) {
  if (t === null || t === undefined || t === '') return null;
  if (typeof t === 'number') return t;
  return String(t).split(':').reduce((acc, part) => acc * 60 + Number(part), 0);
}

function h(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const val = attrs[key];
      if (val === null || val === undefined || val === false) return;
      if (key === 'class') node.className = val;
      else if (key === 'text') node.textContent = val;
      else if (key === 'dataset') Object.assign(node.dataset, val);
      else if (key === 'style') node.setAttribute('style', val);
      else if (key === 'value') node.value = val;
      else if (key in node && typeof val !== 'string') node[key] = val;
      else node.setAttribute(key, val === true ? '' : val);
    });
  }
  children.forEach((c) => append(node, c));
  return node;
}
function append(parent, child) {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) { child.forEach((c) => append(parent, c)); return; }
  parent.appendChild(typeof child === 'string' || typeof child === 'number' ? document.createTextNode(String(child)) : child);
}
const $ = (sel, root) => (root || document).querySelector(sel);
const $all = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function fmtTime(sec) {
  const hh = Math.floor(sec / 3600);
  const mm = Math.floor((sec % 3600) / 60);
  const ss = sec % 60;
  const pad = (n) => (n < 10 ? '0' : '') + n;
  return hh ? `${hh}:${pad(mm)}:${pad(ss)}` : `${mm}:${pad(ss)}`;
}
function videoLink(src, sec) {
  const v = DATA.videos[src];
  if (!v || !v.url) return null;
  return v.url + (sec ? `&t=${sec}s` : '');
}
function plural(n, one, few, many) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}
const uid = () => 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const stepLabel = (s) => s.title + (s.level ? ' ' + s.level : '');

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ================= Подсчёт прогресса ================= */

const S = () => Store.get();
const customItems = (stepId) => S().custom[stepId] || [];

function stepProgress(step) {
  const st = S();
  const checkables = step.checkItems.concat(step.reviewItems, step.practiceItems);
  const done = checkables.filter((i) => st.done[i.id]).length;
  const custom = customItems(step.id);
  const customDone = custom.filter((c) => c.done).length;
  const known = step.interviewItems.filter((q) => st.status[q.id] === 'know').length;
  const total = checkables.length + custom.length;
  const totalDone = done + customDone;
  const practiceDone = step.practiceItems.filter((i) => st.done[i.id]).length;
  const complete = (total + step.interviewItems.length) > 0 &&
    totalDone === total && known === step.interviewItems.length;
  return {
    done: totalDone, total,
    practiceDone, practice: step.practiceItems.length,
    known, interview: step.interviewItems.length,
    complete
  };
}

function overall() {
  const st = S();
  let done = 0; let total = 0; let pDone = 0; let pTotal = 0;
  STEPS.forEach((s) => {
    const p = stepProgress(s);
    done += p.done; total += p.total; pDone += p.practiceDone; pTotal += p.practice;
  });
  let know = 0; let repeat = 0;
  QUESTIONS.forEach((q) => {
    if (st.status[q.id] === 'know') know++;
    else if (st.status[q.id] === 'repeat') repeat++;
  });
  const projects = DATA.route.filter((n) => n.type === 'project');
  const projDone = projects.filter((p) => (st.projects[p.id] || {}).done).length;
  const stepsDone = STEPS.filter((s) => stepProgress(s).complete).length;
  return {
    done, total, pDone, pTotal,
    know, repeat, questions: QUESTIONS.length,
    projDone, projects: projects.length,
    stepsDone, steps: STEPS.length
  };
}

/* ================= Тема ================= */

const THEME_LABEL = { auto: 'авто', light: 'светлая', dark: 'тёмная' };
function applyTheme() {
  const theme = S().theme;
  if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', theme);
  const btn = $('#theme-toggle');
  btn.title = 'Тема: ' + THEME_LABEL[theme];
  btn.setAttribute('aria-label', `Тема: ${THEME_LABEL[theme]}. Переключить`);
}
$('#theme-toggle').addEventListener('click', () => {
  const order = ['auto', 'light', 'dark'];
  const st = S();
  st.theme = order[(order.indexOf(st.theme) + 1) % order.length];
  Store.save(true);
  applyTheme();
  toast('Тема: ' + THEME_LABEL[st.theme]);
});

/* ================= Шапка: статистика ================= */

function renderStats() {
  const o = overall();
  const box = $('#stats');
  box.innerHTML = '';
  [
    { label: 'Пункты и практика', value: `${o.done} / ${o.total}`, pct: pct(o.done, o.total), sub: `практика: ${o.pDone} из ${o.pTotal}` },
    { label: 'Вопросы: знаю', value: `${o.know} / ${o.questions}`, pct: pct(o.know, o.questions), sub: o.repeat ? `повторить: ${o.repeat}` : '', warn: true },
    { label: 'Шаги пройдены', value: `${o.stepsDone} / ${o.steps}`, pct: pct(o.stepsDone, o.steps) },
    { label: 'Пэт-проекты', value: `${o.projDone} / ${o.projects}`, pct: pct(o.projDone, o.projects) }
  ].forEach((t) => {
    box.appendChild(h('div', { class: 'stat' },
      h('span', { class: 'stat__label', text: t.label }),
      h('span', { class: 'stat__value', text: t.value }),
      h('span', { class: 'bar', 'aria-hidden': 'true' }, h('span', { class: 'bar__fill', style: `width:${t.pct}%` })),
      t.sub ? h('span', { class: 'stat__sub' + (t.warn ? ' stat__sub--warn' : ''), text: t.sub }) : null
    ));
  });

  const src = $('#sources');
  src.innerHTML = '';
  append(src, [
    'Основа маршрута — ',
    h('a', { href: DATA.source.url, target: '_blank', rel: 'noopener', text: `${DATA.source.title} (${DATA.source.author})` }),
    '. Вопросы с собеса — ',
    h('a', { href: DATA.videos.v1.url, target: '_blank', rel: 'noopener', text: `${DATA.videos.v1.title} (${DATA.videos.v1.author})` }),
    ' и ',
    h('a', { href: DATA.videos.v2.url, target: '_blank', rel: 'noopener', text: `${DATA.videos.v2.title} (${DATA.videos.v2.author})` }),
    '. Справочные ссылки ведут на русскоязычный MDN и react.dev.'
  ]);
}

/* ================= Карта ================= */

function renderRoute() {
  const list = $('#route');
  list.innerHTML = '';
  const st = S();

  DATA.route.forEach((node, index) => {
    if (node.type === 'step') {
      const p = stepProgress(node);
      const side = index % 2 ? 'right' : 'left';
      const li = h('li', {
        class: `route__item route__item--step route__item--${side}${p.complete ? ' is-complete' : ''}${node.added ? ' is-added' : ''}`,
        id: 's-' + node.id
      });
      li.appendChild(h('button', {
        class: 'step-card', type: 'button', dataset: { open: node.id },
        'aria-label': `Шаг ${node.num}. ${stepLabel(node)}. Открыть`
      },
        h('span', { class: 'step-card__num', text: node.num }),
        h('span', { class: 'step-card__main' },
          h('span', { class: 'step-card__title' },
            node.title,
            node.level ? h('i', { class: 'step-card__level', text: node.level }) : null
          ),
          h('span', { class: 'step-card__meta' },
            p.total ? h('span', { text: `пункты ${p.done}/${p.total}` }) : null,
            p.practice ? h('span', { class: 'tag tag--practice', text: `практика ${p.practiceDone}/${p.practice}` }) : null,
            p.interview ? h('span', { class: 'tag tag--q', text: `собес ${p.known}/${p.interview}` }) : null,
            node.fresh ? h('span', { class: 'tag tag--fresh', text: 'обновлён' }) : null,
            node.added ? h('span', { class: 'tag tag--added', text: 'новый блок' }) : null
          ),
          h('span', { class: 'bar bar--thin', 'aria-hidden': 'true' },
            h('span', { class: 'bar__fill', style: `width:${pct(p.done + p.known, p.total + p.interview)}%` }))
        ),
        h('span', { class: 'step-card__check', 'aria-hidden': 'true', text: p.complete ? '✓' : '' })
      ));
      list.appendChild(li);
    } else if (node.type === 'project') {
      const pr = st.projects[node.id] || {};
      list.appendChild(h('li', { class: 'route__item route__item--project' + (pr.done ? ' is-complete' : ''), id: 's-' + node.id },
        h('button', { class: 'project-card', type: 'button', dataset: { open: node.id } },
          h('span', { class: 'project-card__kicker', text: 'Пэт-проект' }),
          h('span', { class: 'project-card__title', text: node.title }),
          h('span', { class: 'project-card__state', text: pr.done ? '✓ готов' : '→' })
        )
      ));
    } else if (node.type === 'level') {
      list.appendChild(h('li', { class: 'route__item route__item--level', id: 's-' + node.id },
        h('div', { class: 'level' },
          h('span', { class: 'level__kicker', text: 'Уровень' }),
          h('span', { class: 'level__title', text: node.title }),
          node.sub ? h('span', { class: 'level__sub', text: node.sub }) : null
        )
      ));
    } else if (node.type === 'finish') {
      const o = overall();
      list.appendChild(h('li', { class: 'route__item route__item--finish' },
        h('div', { class: 'finish' },
          h('span', { class: 'finish__title', text: node.title }),
          h('span', { class: 'finish__sub', text: o.stepsDone === o.steps ? 'Все шаги пройдены. Отличная работа!' : `Осталось шагов: ${o.steps - o.stepsDone}` })
        )
      ));
    }
  });
}

function renderToc() {
  const toc = $('#toc');
  toc.innerHTML = '';
  STEPS.forEach((s) => {
    const p = stepProgress(s);
    toc.appendChild(h('li', { class: 'toc__item' + (p.complete ? ' is-complete' : '') + (s.added ? ' is-added' : '') },
      h('a', { href: '#s-' + s.id, dataset: { toc: s.id } },
        h('span', { class: 'toc__num', text: s.num }),
        h('span', { class: 'toc__title' }, s.title, s.level ? h('i', { class: 'toc__level', text: ' ' + s.level }) : null),
        h('span', { class: 'toc__check', 'aria-hidden': 'true', text: p.complete ? '✓' : '' })
      )
    ));
  });
}

let spy;
function setupScrollSpy() {
  if (!('IntersectionObserver' in window)) return;
  if (spy) spy.disconnect();
  spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id.replace(/^s-/, '');
      $all('#toc a').forEach((a) => a.classList.toggle('is-active', a.dataset.toc === id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $all('.route__item--step').forEach((li) => spy.observe(li));
}

$('#toc').addEventListener('click', (e) => {
  const a = e.target.closest('a[data-toc]');
  if (!a) return;
  e.preventDefault();
  showView('map');
  const target = document.getElementById('s-' + a.dataset.toc);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const btn = target.querySelector('button');
    if (btn) setTimeout(() => btn.focus({ preventScroll: true }), 350);
  }
});

$('#route').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-open]');
  if (btn) openNode(btn.dataset.open, btn);
});

/* ================= Карточка вопроса с собеса ================= */

const STATUS = [
  { value: 'new', label: 'Не разобран' },
  { value: 'repeat', label: 'Повторить' },
  { value: 'know', label: 'Знаю' }
];

function sourceTag(src) {
  const v = DATA.videos[src];
  return h('span', { class: `tag tag--src tag--src-${src}`, title: v ? v.title : '', text: v ? v.short : src });
}

function timecodeLinks(q) {
  const links = [];
  const add = (src, t, primary) => {
    const href = videoLink(src, t);
    if (!href || !t) return;
    const label = primary ? `▶ ${fmtTime(t)}` : `▶ ещё: ${fmtTime(t)} · ${DATA.videos[src].short}`;
    links.push(h('a', { class: 'timecode', href, target: '_blank', rel: 'noopener', title: `Открыть «${DATA.videos[src].title}» на ${fmtTime(t)}` }, label));
  };
  add(q.src, q.t, true);
  q.also.forEach((a) => add(a.src, a.t, false));
  return links;
}

function questionCard(q, opts = {}) {
  const st = S();
  const status = st.status[q.id] || 'new';
  const step = byId[q.stepId];
  const name = `${opts.prefix || 'q'}-${q.id}`;

  const statusGroup = h('div', { class: 'seg', role: 'radiogroup', 'aria-label': 'Статус вопроса' });
  STATUS.forEach((s) => {
    const inputId = `${name}-${s.value}`;
    statusGroup.appendChild(h('input', {
      type: 'radio', id: inputId, name, value: s.value,
      class: 'seg__input', checked: status === s.value, dataset: { qstatus: q.id }
    }));
    statusGroup.appendChild(h('label', { for: inputId, class: `seg__label seg__label--${s.value}`, text: s.label }));
  });

  const note = st.notes[q.id] || '';

  return h('li', { class: `qcard qcard--${status}`, dataset: { qid: q.id } },
    h('div', { class: 'qcard__head' },
      h('p', { class: 'qcard__q', text: q.q }),
      h('div', { class: 'qcard__meta' },
        opts.showTopic && step ? h('button', { type: 'button', class: 'tag tag--topic', dataset: { open: step.id }, text: stepLabel(step) }) : null,
        sourceTag(q.src),
        timecodeLinks(q),
        q.note ? h('span', { class: 'muted small', text: q.note }) : null
      )
    ),
    statusGroup,
    h('details', { class: 'more qcard__hint', open: !!opts.openHints },
      h('summary', { text: 'Подсказка' }),
      h('p', { text: q.hint })
    ),
    h('details', { class: 'more', open: !!note },
      h('summary', { text: note ? 'Моя заметка' : 'Добавить заметку' }),
      h('textarea', { class: 'note', rows: 3, placeholder: 'Ваш ответ своими словами, ссылки, примеры из опыта…', dataset: { note: q.id }, value: note })
    )
  );
}

/* ================= Панель шага ================= */

const sheet = $('#sheet');
const sheetBody = $('#sheet-body');
let lastTrigger = null;
let currentNodeId = null;

function openNode(id, trigger) {
  const node = byId[id];
  if (!node || (node.type !== 'step' && node.type !== 'project')) return;
  currentNodeId = id;
  lastTrigger = trigger || document.activeElement;
  renderSheet();
  openDialog(sheet);
  sheetBody.scrollTop = 0;
  if (history.replaceState) history.replaceState(null, '', '#' + id);
}

function renderSheet() {
  const node = byId[currentNodeId];
  if (!node) return;
  sheetBody.innerHTML = '';
  const panel = $('.sheet__panel', sheet);
  panel.style.setProperty('--accent-step', `var(--c-${node.added ? 'added' : node.type === 'project' ? 'project' : 'step'})`);

  if (node.type === 'project') {
    $('#sheet-kicker').textContent = 'Пэт-проект';
    $('#sheet-title').textContent = node.title;
    renderProjectBody(node);
    return;
  }

  $('#sheet-kicker').textContent = node.added ? 'Новый блок · из мок-интервью' : `Шаг ${node.num}${node.fresh ? ' · обновлён' : ''}`;
  $('#sheet-title').textContent = node.title + (node.level ? ' · ' + node.level : '');

  if (node.intro) sheetBody.appendChild(h('p', { class: 'callout', text: node.intro }));

  sheetBody.appendChild(h('div', { class: 'sheet__progress', id: 'sheet-progress' }));
  updateSheetProgress();

  if (node.recapItems.length) sheetBody.appendChild(recapSection(node));
  if (node.checkItems.length) sheetBody.appendChild(checkSection('Чек-лист', node.checkItems));
  if (node.reviewItems.length) sheetBody.appendChild(checkSection('Вопросы для закрепления', node.reviewItems));
  if (node.practiceItems.length) {
    sheetBody.appendChild(checkSection('Практика', node.practiceItems, {
      lead: 'Небольшие задачи, чтобы закрепить материал руками.',
      cls: 'sec--practice'
    }));
  }

  if (node.resourceItems.length) {
    const ol = h('ol', { class: 'resources' });
    node.resourceItems.forEach((r) => {
      ol.appendChild(h('li', null, h('a', { href: r.href, target: '_blank', rel: 'noopener', text: r.text })));
    });
    sheetBody.appendChild(h('section', { class: 'sec' }, h('h3', { class: 'sec__title', text: 'Ресурсы' }), ol));
  }

  if (node.interviewItems.length) {
    const ql = h('ul', { class: 'qlist qlist--compact' });
    node.interviewItems.forEach((q) => ql.appendChild(questionCard(q, { prefix: 'sheet' })));
    const srcs = Array.from(new Set(node.interviewItems.map((q) => q.src)));
    sheetBody.appendChild(h('section', { class: 'sec sec--interview' },
      h('h3', { class: 'sec__title' }, 'Вопросы с собеседования ', h('span', { class: 'tag tag--q', text: node.interviewItems.length })),
      h('p', { class: 'sec__lead muted' },
        srcs.includes('own') && srcs.length === 1
          ? 'Вопросы по теме блока, которые стоит проработать перед собеседованием на frontend/fullstack.'
          : 'Метка показывает источник. Таймкод откроет видео на нужном месте.'),
      ql
    ));
  }

  sheetBody.appendChild(customSection(node));
}

function linksRow(links) {
  if (!links || !links.length) return null;
  return h('span', { class: 'check__links' }, links.map((l) =>
    h('a', { href: l[1], target: '_blank', rel: 'noopener', class: /developer\.mozilla\.org/.test(l[1]) ? 'link-mdn' : null, text: l[0] })
  ));
}

function checkSection(title, items, opts = {}) {
  const st = S();
  const ul = h('ul', { class: 'checklist' });
  items.forEach((item) => {
    const inputId = 'chk-' + item.id.replace(/[^a-z0-9-]/gi, '_');
    ul.appendChild(h('li', { class: 'check' + (st.done[item.id] ? ' is-done' : '') },
      h('input', { type: 'checkbox', id: inputId, checked: !!st.done[item.id], dataset: { done: item.id } }),
      h('label', { for: inputId },
        item.fresh ? h('span', { class: 'dot', title: 'Новое', 'aria-label': 'Новое' }) : null,
        item.text,
        item.optional ? h('span', { class: 'tag tag--opt', text: 'по желанию' }) : null
      ),
      linksRow(item.links),
      item.answer ? h('details', { class: 'more check__answer' },
        h('summary', { text: 'Кратко' }),
        h('p', { text: item.answer })
      ) : null
    ));
  });
  return h('section', { class: 'sec' + (opts.cls ? ' ' + opts.cls : '') },
    h('h3', { class: 'sec__title' }, title, ' ', h('span', { class: 'tag', text: items.length })),
    opts.lead ? h('p', { class: 'sec__lead muted', text: opts.lead }) : null,
    ul
  );
}

function recapSection(node) {
  const list = h('ol', { class: 'recap__list' });
  node.recapItems.forEach((r) => {
    list.appendChild(h('li', null,
      h('details', { class: 'recap__item' },
        h('summary', { text: r.text }),
        h('p', { text: r.answer })
      )
    ));
  });
  return h('details', { class: 'recap' },
    h('summary', { class: 'recap__summary' },
      h('span', { class: 'recap__title', text: 'Повторение прошлых тем' }),
      h('span', { class: 'tag', text: `${node.recapItems.length} ${plural(node.recapItems.length, 'вопрос', 'вопроса', 'вопросов')}` })
    ),
    h('p', { class: 'sec__lead muted', text: 'Ответь мысленно, потом раскрой вопрос и сверься.' }),
    list
  );
}

function customSection(node) {
  const items = customItems(node.id);
  const ul = h('ul', { class: 'checklist checklist--custom' });
  items.forEach((c) => {
    const inputId = 'cus-' + c.id;
    ul.appendChild(h('li', { class: 'check' + (c.done ? ' is-done' : '') },
      h('input', { type: 'checkbox', id: inputId, checked: !!c.done, dataset: { custom: c.id } }),
      h('label', { for: inputId, text: c.text }),
      h('button', { type: 'button', class: 'icon-btn icon-btn--sm', dataset: { delcustom: c.id }, 'aria-label': `Удалить пункт «${c.text}»`, title: 'Удалить' }, '×')
    ));
  });
  const form = h('form', { class: 'add-form', dataset: { addcustom: node.id } },
    h('label', { class: 'visually-hidden', for: 'add-custom-input', text: 'Новый пункт' }),
    h('input', { type: 'text', id: 'add-custom-input', placeholder: 'Свой пункт или вопрос, который задали вам', maxlength: 300, autocomplete: 'off' }),
    h('button', { type: 'submit', class: 'btn btn--sm', text: 'Добавить' })
  );
  return h('section', { class: 'sec' },
    h('h3', { class: 'sec__title', text: 'Мои пункты' }),
    items.length ? ul : h('p', { class: 'muted small', text: 'Добавьте темы или вопросы, которые встретились вам на собеседованиях.' }),
    form
  );
}

function renderProjectBody(node) {
  const st = S();
  const pr = st.projects[node.id] || {};
  sheetBody.appendChild(h('p', { class: 'callout', text: 'Закрепите пройденные шаги на практике. Опубликуйте проект и сохраните ссылку, чтобы потом добавить в портфолио и резюме.' }));
  sheetBody.appendChild(h('section', { class: 'sec' },
    h('ul', { class: 'checklist' },
      h('li', { class: 'check' + (pr.done ? ' is-done' : '') },
        h('input', { type: 'checkbox', id: 'proj-done', checked: !!pr.done, dataset: { project: node.id } }),
        h('label', { for: 'proj-done', text: 'Проект готов и опубликован' })
      )
    ),
    h('label', { class: 'field' },
      h('span', { class: 'field__label', text: 'Ссылка на репозиторий или демо' }),
      h('input', { type: 'url', placeholder: 'https://github.com/…', value: pr.link || '', dataset: { projlink: node.id } })
    ),
    pr.link && /^https?:\/\//.test(pr.link) ? h('p', { class: 'small' }, h('a', { href: pr.link, target: '_blank', rel: 'noopener', text: 'Открыть проект ↗' })) : null,
    h('label', { class: 'field' },
      h('span', { class: 'field__label', text: 'Заметки' }),
      h('textarea', { class: 'note', rows: 4, placeholder: 'Что сделано, что улучшить, чему научились…', value: st.notes[node.id] || '', dataset: { note: node.id } })
    )
  ));
}

function updateSheetProgress() {
  const box = $('#sheet-progress');
  const node = byId[currentNodeId];
  if (!box || !node || node.type !== 'step') return;
  const p = stepProgress(node);
  box.innerHTML = '';
  if (p.total) {
    append(box, h('div', { class: 'mini' },
      h('span', { text: `Пункты и практика: ${p.done} из ${p.total}` }),
      h('span', { class: 'bar' }, h('span', { class: 'bar__fill', style: `width:${pct(p.done, p.total)}%` }))
    ));
  }
  if (p.interview) {
    append(box, h('div', { class: 'mini' },
      h('span', { text: `Вопросы с собеса: знаю ${p.known} из ${p.interview}` }),
      h('span', { class: 'bar bar--q' }, h('span', { class: 'bar__fill', style: `width:${pct(p.known, p.interview)}%` }))
    ));
  }
}

/* ================= Обработчики изменений ================= */

function onChange(e) {
  const t = e.target;
  const st = S();
  if (t.dataset.done) {
    if (t.checked) st.done[t.dataset.done] = true; else delete st.done[t.dataset.done];
    t.closest('.check').classList.toggle('is-done', t.checked);
    commit();
  } else if (t.dataset.qstatus) {
    setStatus(t.dataset.qstatus, t.value);
  } else if (t.dataset.custom) {
    const item = customItems(currentNodeId).find((c) => c.id === t.dataset.custom);
    if (item) item.done = t.checked;
    t.closest('.check').classList.toggle('is-done', t.checked);
    commit();
  } else if (t.dataset.project) {
    const pr = st.projects[t.dataset.project] || (st.projects[t.dataset.project] = {});
    pr.done = t.checked;
    t.closest('.check').classList.toggle('is-done', t.checked);
    commit();
    if (t.checked) toast('Проект отмечен как готовый');
  } else if (t.dataset.projlink) {
    const pr = st.projects[t.dataset.projlink] || (st.projects[t.dataset.projlink] = {});
    pr.link = t.value.trim();
    Store.save(true);
    renderSheet();
  }
}

function onInput(e) {
  const t = e.target;
  if (!t.dataset.note) return;
  const st = S();
  if (t.value.trim()) st.notes[t.dataset.note] = t.value; else delete st.notes[t.dataset.note];
  Store.save();
}

function setStatus(qid, value) {
  const st = S();
  if (value === 'new') delete st.status[qid]; else st.status[qid] = value;
  $all(`.qcard[data-qid="${qid}"]`).forEach((card) => {
    card.className = `qcard qcard--${value}`;
    $all('input[data-qstatus]', card).forEach((r) => { r.checked = r.value === value; });
  });
  commit();
}

function commit() {
  Store.save(true);
  refreshSummary();
}

function refreshSummary() {
  renderStats();
  renderRoute();
  renderToc();
  setupScrollSpy();
  updateSheetProgress();
  updateQuestionHeader();
}

[sheetBody, $('#q-list'), $('#trainer-body')].forEach((root) => {
  root.addEventListener('change', onChange);
  root.addEventListener('input', onInput);
});

sheetBody.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-addcustom]');
  if (!form) return;
  e.preventDefault();
  const input = $('input', form);
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  const st = S();
  const list = st.custom[form.dataset.addcustom] || (st.custom[form.dataset.addcustom] = []);
  list.push({ id: uid(), text, done: false });
  commit();
  renderSheet();
  const again = $('#add-custom-input');
  if (again) again.focus();
});

sheetBody.addEventListener('click', (e) => {
  const del = e.target.closest('[data-delcustom]');
  if (!del) return;
  const st = S();
  st.custom[currentNodeId] = customItems(currentNodeId).filter((c) => c.id !== del.dataset.delcustom);
  if (!st.custom[currentNodeId].length) delete st.custom[currentNodeId];
  commit();
  renderSheet();
  toast('Пункт удалён');
});

/* ================= Диалоги ================= */

let openDialogs = [];

function openDialog(dlg) {
  if (!dlg.hidden) { $('.sheet__panel', dlg).focus(); return; }
  dlg.hidden = false;
  openDialogs.push(dlg);
  document.body.classList.add('no-scroll');
  requestAnimationFrame(() => {
    dlg.classList.add('is-open');
    $('.sheet__panel', dlg).focus();
  });
}

function closeDialog(dlg) {
  if (dlg.hidden) return;
  dlg.classList.remove('is-open');
  openDialogs = openDialogs.filter((d) => d !== dlg);
  if (!openDialogs.length) document.body.classList.remove('no-scroll');
  setTimeout(() => { dlg.hidden = true; }, 180);
  if (dlg === sheet) {
    currentNodeId = null;
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    else {
      const restored = lastTrigger && lastTrigger.dataset && $(`[data-open="${lastTrigger.dataset.open}"]`);
      if (restored) restored.focus({ preventScroll: true });
    }
  }
}

$all('.sheet').forEach((dlg) => {
  dlg.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) closeDialog(dlg);
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = $all('a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])', dlg)
      .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === $('.sheet__panel', dlg))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openDialogs.length) closeDialog(openDialogs[openDialogs.length - 1]);
});

/* ================= Вкладки ================= */

function showView(view) {
  $all('.tabs__btn').forEach((b) => {
    const active = b.dataset.view === view;
    b.setAttribute('aria-selected', active ? 'true' : 'false');
    b.tabIndex = active ? 0 : -1;
  });
  $('#view-map').hidden = view !== 'map';
  $('#view-questions').hidden = view !== 'questions';
  if (view === 'questions') renderQuestions();
}

$all('.tabs__btn').forEach((b) => {
  b.addEventListener('click', () => { showView(b.dataset.view); window.scrollTo({ top: 0 }); });
  b.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const tabs = $all('.tabs__btn');
    const next = tabs[(tabs.indexOf(b) + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    next.focus();
    next.click();
  });
});
$all('[data-goto]').forEach((b) => {
  b.addEventListener('click', () => { showView(b.dataset.goto); window.scrollTo({ top: 0 }); });
});

/* ================= Вопросы с собеса: список ================= */

const filters = { search: '', topic: 'all', status: 'all', source: 'all', hints: false };

const STATUS_FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Не разобран' },
  { value: 'repeat', label: 'Повторить' },
  { value: 'know', label: 'Знаю' }
];

function topicOptions(select, withAll) {
  select.innerHTML = '';
  if (withAll) select.appendChild(h('option', { value: 'all', text: 'Все темы' }));
  STEPS.forEach((s) => {
    if (!s.interviewItems.length) return;
    select.appendChild(h('option', { value: s.id, text: `${stepLabel(s)} (${s.interviewItems.length})` }));
  });
}

function sourceOptions(select) {
  select.innerHTML = '';
  select.appendChild(h('option', { value: 'all', text: 'Все источники' }));
  Object.keys(DATA.videos).forEach((key) => {
    const count = QUESTIONS.filter((q) => q.src === key).length;
    if (!count) return;
    const v = DATA.videos[key];
    select.appendChild(h('option', { value: key, text: `${v.short} — ${v.title} (${count})` }));
  });
}

function setupQuestionFilters() {
  topicOptions($('#q-topic'), true);
  sourceOptions($('#q-source'));
  const chips = $('#q-status');
  STATUS_FILTERS.forEach((f) => {
    chips.appendChild(h('button', {
      type: 'button', class: 'chip', role: 'radio', 'aria-checked': f.value === filters.status ? 'true' : 'false',
      dataset: { status: f.value }, text: f.label
    }));
  });
  chips.addEventListener('click', (e) => {
    const c = e.target.closest('[data-status]');
    if (!c) return;
    filters.status = c.dataset.status;
    $all('.chip', chips).forEach((x) => x.setAttribute('aria-checked', x === c ? 'true' : 'false'));
    renderQuestions();
  });
  $('#q-topic').addEventListener('change', (e) => { filters.topic = e.target.value; renderQuestions(); });
  $('#q-source').addEventListener('change', (e) => { filters.source = e.target.value; renderQuestions(); });
  let searchTimer;
  $('#q-search').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { filters.search = e.target.value.trim().toLowerCase(); renderQuestions(); }, 150);
  });
  $('#toggle-hints').addEventListener('click', (e) => {
    filters.hints = !filters.hints;
    e.currentTarget.setAttribute('aria-pressed', filters.hints ? 'true' : 'false');
    e.currentTarget.textContent = filters.hints ? 'Скрыть подсказки' : 'Показать все подсказки';
    $all('#q-list .qcard__hint').forEach((d) => { d.open = filters.hints; });
  });
}

function matches(q) {
  const st = S();
  const status = st.status[q.id] || 'new';
  if (filters.topic !== 'all' && q.stepId !== filters.topic) return false;
  if (filters.source !== 'all' && q.src !== filters.source) return false;
  if (filters.status !== 'all' && status !== filters.status) return false;
  if (filters.search) {
    const hay = `${q.q} ${q.hint} ${st.notes[q.id] || ''} ${byId[q.stepId].title}`.toLowerCase();
    if (!hay.includes(filters.search)) return false;
  }
  return true;
}

function renderQuestions() {
  const list = $('#q-list');
  list.innerHTML = '';
  const shown = QUESTIONS.filter(matches);
  shown.forEach((q) => list.appendChild(questionCard(q, { prefix: 'lib', showTopic: true, openHints: filters.hints })));
  if (!shown.length) list.appendChild(h('li', { class: 'empty' }, 'Ничего не найдено. Попробуйте другой фильтр.'));
  $('#q-count').textContent = `Показано ${shown.length} из ${QUESTIONS.length}`;
  updateQuestionHeader();
}

function updateQuestionHeader() {
  const o = overall();
  const bySrc = (s) => QUESTIONS.filter((q) => q.src === s).length;
  $('#qhead-lead').textContent =
    `${QUESTIONS.length} ${plural(QUESTIONS.length, 'вопрос', 'вопроса', 'вопросов')}, разложенных по шагам карты: ` +
    `${bySrc('v1')} из мок-интервью Senior Frontend, ${bySrc('v2')} из разбора React и ${bySrc('own')} дополнительных по ИИ. ` +
    `Знаю: ${o.know}, повторить: ${o.repeat}.`;
}

$('#q-list').addEventListener('click', (e) => {
  const topic = e.target.closest('[data-open]');
  if (topic) openNode(topic.dataset.open, topic);
});

/* ================= Тренировка ================= */

const trainer = $('#trainer');
const trainerBody = $('#trainer-body');
let trainerTopic = 'all';
let trainerCurrent = null;

function trainerPool() {
  const st = S();
  const inTopic = QUESTIONS.filter((q) => trainerTopic === 'all' || q.stepId === trainerTopic);
  const notKnown = inTopic.filter((q) => st.status[q.id] !== 'know');
  return { all: inTopic, pool: notKnown };
}

function nextQuestion() {
  const { pool } = trainerPool();
  if (!pool.length) { trainerCurrent = null; renderTrainer(); return; }
  // вопросы «повторить» выпадают чаще
  const weighted = [];
  pool.forEach((q) => {
    weighted.push(q);
    if (S().status[q.id] === 'repeat') weighted.push(q);
  });
  let candidates = weighted.filter((q) => !trainerCurrent || q.id !== trainerCurrent.id);
  if (!candidates.length) candidates = weighted;
  trainerCurrent = candidates[Math.floor(Math.random() * candidates.length)];
  renderTrainer();
}

function renderTrainer() {
  trainerBody.innerHTML = '';
  const p = trainerPool();
  const st = S();
  const known = p.all.length - p.pool.length;

  const select = h('select', { id: 'trainer-topic' });
  topicOptions(select, true);
  select.value = trainerTopic;

  trainerBody.appendChild(h('div', { class: 'trainer__top' },
    h('label', { class: 'field field--inline' }, h('span', { class: 'field__label', text: 'Тема' }), select),
    h('span', { class: 'muted small', text: `Знаю ${known} из ${p.all.length}` })
  ));
  trainerBody.appendChild(h('span', { class: 'bar' }, h('span', { class: 'bar__fill', style: `width:${pct(known, p.all.length)}%` })));

  if (!trainerCurrent) {
    trainerBody.appendChild(h('div', { class: 'trainer__done' },
      h('p', { class: 'trainer__q', text: p.all.length ? 'Все вопросы этой темы отмечены как «Знаю».' : 'В этой теме нет вопросов.' }),
      h('p', { class: 'muted', text: 'Выберите другую тему или сбросьте статусы в списке вопросов.' })
    ));
    return;
  }

  const q = trainerCurrent;
  const step = byId[q.stepId];
  const status = st.status[q.id] || 'new';
  trainerBody.appendChild(h('div', { class: 'trainer__card' },
    h('p', { class: 'trainer__meta' }, h('span', { class: 'muted small', text: stepLabel(step) + (status === 'repeat' ? ' · на повторении' : '') }), sourceTag(q.src)),
    h('p', { class: 'trainer__q', text: q.q }),
    h('details', { class: 'more qcard__hint' },
      h('summary', { text: 'Показать подсказку' }),
      h('p', { text: q.hint }),
      st.notes[q.id] ? h('p', { class: 'trainer__note' }, h('b', { text: 'Моя заметка: ' }), st.notes[q.id]) : null
    ),
    q.t ? h('a', { class: 'timecode', href: videoLink(q.src, q.t), target: '_blank', rel: 'noopener' }, `▶ смотреть ответ в видео (${fmtTime(q.t)})`) : null
  ));
  trainerBody.appendChild(h('div', { class: 'trainer__actions' },
    h('button', { type: 'button', class: 'btn', dataset: { tr: 'repeat' }, text: 'Повторить' }),
    h('button', { type: 'button', class: 'btn btn--good', dataset: { tr: 'know' }, text: 'Знаю' }),
    h('button', { type: 'button', class: 'btn btn--ghost', dataset: { tr: 'skip' }, text: 'Пропустить →' })
  ));
}

trainerBody.addEventListener('click', (e) => {
  const b = e.target.closest('[data-tr]');
  if (!b || !trainerCurrent) return;
  const action = b.dataset.tr;
  if (action !== 'skip') setStatus(trainerCurrent.id, action);
  nextQuestion();
  const first = $('.trainer__actions .btn', trainerBody);
  if (first) first.focus();
});
trainerBody.addEventListener('change', (e) => {
  if (e.target.id !== 'trainer-topic') return;
  trainerTopic = e.target.value;
  trainerCurrent = null;
  nextQuestion();
  $('#trainer-topic').focus();
});

function openTrainer() {
  if (filters.topic !== 'all' && !$('#view-questions').hidden) trainerTopic = filters.topic;
  trainerCurrent = null;
  nextQuestion();
  openDialog(trainer);
}
$('#open-trainer').addEventListener('click', openTrainer);
$('#open-trainer-2').addEventListener('click', openTrainer);

/* ================= Меню: экспорт / импорт / сброс ================= */

const menuBtn = $('#menu-toggle');
const menuList = $('#menu-list');
function setMenu(open) {
  menuList.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) $('button', menuList).focus();
}
menuBtn.addEventListener('click', () => setMenu(menuList.hidden));
document.addEventListener('click', (e) => {
  if (!menuList.hidden && !e.target.closest('.menu')) setMenu(false);
});
menuList.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); }
});

menuList.addEventListener('click', (e) => {
  const b = e.target.closest('[data-action]');
  if (!b) return;
  setMenu(false);
  const action = b.dataset.action;
  if (action === 'export') {
    const blob = new Blob([Store.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = h('a', { href: url, download: `frontend-prep-map-progress-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Файл с прогрессом сохранён');
  } else if (action === 'import') {
    $('#import-file').click();
  } else if (action === 'reset') {
    if (window.confirm('Сбросить все отметки, статусы вопросов, заметки и свои пункты? Это нельзя отменить.')) {
      Store.reset();
      rerenderAll();
      toast('Прогресс сброшен');
    }
  }
});

$('#import-file').addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      Store.importJSON(String(reader.result));
      rerenderAll();
      toast('Прогресс загружен');
    } catch (err) {
      toast('Не удалось загрузить файл: ' + err.message);
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

/* ================= Запуск ================= */

function rerenderAll() {
  applyTheme();
  refreshSummary();
  if (!$('#view-questions').hidden) renderQuestions();
  if (currentNodeId && !sheet.hidden) renderSheet();
  if (!trainer.hidden) renderTrainer();
}

Store.onExternalChange = rerenderAll;

applyTheme();
setupQuestionFilters();
refreshSummary();

// Ссылка вида …/#react сразу открывает шаг
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!byId[id] || (byId[id].type !== 'step' && byId[id].type !== 'project')) return;
  if (currentNodeId === id && !sheet.hidden) return;
  showView('map');
  const trig = $(`[data-open="${id}"]`);
  if (trig) trig.scrollIntoView({ block: 'center' });
  openNode(id, trig);
}
window.addEventListener('hashchange', openFromHash);
openFromHash();

if (!Store.available) {
  toast('localStorage недоступен: прогресс не сохранится после закрытия вкладки');
}
