/*
 * Хранилище прогресса поверх localStorage.
 * Все данные лежат под одним ключом в виде JSON. Если localStorage недоступен
 * (приватный режим, запрет cookies), приложение продолжает работать в памяти.
 */
var KEY = 'frontend-prep-map:v1';

function emptyState() {
  return {
    version: 1,
    done: {},        // id пункта чек-листа -> true
    status: {},      // id вопроса с собеса -> 'new' | 'repeat' | 'know'
    notes: {},       // id вопроса или проекта -> текст заметки
    custom: {},      // id шага -> [{ id, text, done }]
    projects: {},    // id проекта -> { done: bool, link: string }
    theme: 'auto',   // 'auto' | 'light' | 'dark'
    updatedAt: null
  };
}

var available = (function () {
  try {
    var k = KEY + ':probe';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
})();

function normalize(raw) {
  var base = emptyState();
  if (!raw || typeof raw !== 'object') return base;
  Object.keys(base).forEach(function (key) {
    if (raw[key] === undefined) return;
    if (typeof base[key] === 'object' && base[key] !== null) {
      if (raw[key] && typeof raw[key] === 'object' && !Array.isArray(raw[key])) base[key] = raw[key];
    } else {
      base[key] = raw[key];
    }
  });
  if (['auto', 'light', 'dark'].indexOf(base.theme) === -1) base.theme = 'auto';
  return base;
}

function load() {
  if (!available) return emptyState();
  try {
    var raw = window.localStorage.getItem(KEY);
    return raw ? normalize(JSON.parse(raw)) : emptyState();
  } catch (e) {
    return emptyState();
  }
}

var state = load();
var saveTimer = null;

function saveNow() {
  state.updatedAt = new Date().toISOString();
  if (!available) return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}

export const Store = {
  onExternalChange: null,
  available: available,
  get: function () { return state; },
  save: function (immediate) {
    clearTimeout(saveTimer);
    if (immediate) return saveNow();
    saveTimer = setTimeout(saveNow, 250);
    return true;
  },
  reset: function () {
    var theme = state.theme;
    state = emptyState();
    state.theme = theme;
    saveNow();
  },
  exportJSON: function () {
    return JSON.stringify(state, null, 2);
  },
  importJSON: function (text) {
    var parsed = JSON.parse(text); // бросит ошибку на битом файле
    if (!parsed || typeof parsed !== 'object' || !('done' in parsed || 'status' in parsed)) {
      throw new Error('Это не файл прогресса Frontend Prep Map');
    }
    state = normalize(parsed);
    saveNow();
  }
};

// Синхронизация между вкладками
window.addEventListener('storage', function (e) {
  if (e.key !== KEY) return;
  state = load();
  if (typeof Store.onExternalChange === 'function') Store.onExternalChange();
});
