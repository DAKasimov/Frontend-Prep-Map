/*
 * Данные карты.
 *
 * checklist: 'Текст' | ['Текст', [['подпись', 'url'], ...], 'Краткий ответ']
 *   префикс '+'  — пункт помечен как новый
 *   суффикс ' *' — пункт по желанию
 * questions: вопросы для закрепления, ['Вопрос', 'Краткий ответ']
 * practice:  небольшие практические задачи (учитываются в прогрессе)
 * review:    повторение прошлых тем, ['Вопрос', 'Краткий ответ']
 * interview: вопросы с собеседования
 *   { id, q, hint, src: 'v1' | 'v2' | 'own', t?: секунды или 'чч:мм:сс', also?: [{ src, t }], note? }
 */

const MDN = 'https://developer.mozilla.org/ru/docs/';
const RD = 'https://ru.react.dev/';
const mdn = (path, label = 'MDN') => [label, MDN + path];
const rd = (path, label = 'react.dev') => [label, RD + path];

export const DATA = {
  source: {
    title: 'Front-end Roadmap 2.0',
    author: '@pomazkov.js',
    url: 'https://learn.pomazkov.com/'
  },

  videos: {
    v1: {
      id: 'SToIrImHm4Y',
      short: 'Senior мок',
      title: 'SENIOR FRONTEND: мок-интервью + live coding',
      author: 'Антон Назаров',
      url: 'https://www.youtube.com/watch?v=SToIrImHm4Y'
    },
    v2: {
      id: 'CLFjDNGxDEk',
      short: 'React 100',
      title: 'Весь React в одном собеседовании: 100 вопросов + 20 задач',
      author: 'Reactify',
      url: 'https://www.youtube.com/watch?v=CLFjDNGxDEk'
    },
    own: {
      short: 'от составителя',
      title: 'Дополнительные вопросы по ИИ для frontend/fullstack-разработчика'
    }
  },

  route: [
    /* ========================= 00 ========================= */
    {
      type: 'step', id: 'basics', num: '00', title: 'Вводная часть', fresh: true,
      checklist: [
        ['Что такое веб-разработка', [mdn('Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work', 'MDN: как работает интернет')],
          'Создание сайтов и веб-приложений: интерфейс в браузере (фронтенд), серверная логика и данные (бэкенд) и их связь по сети.'],
        ['Что такое фронтенд', [mdn('Learn_web_development/Getting_started/Web_standards/How_the_web_works', 'MDN: как работает веб')],
          'Часть приложения, которая работает в браузере пользователя: разметка (HTML), стили (CSS) и логика интерфейса (JavaScript).'],
        ['Что такое бэкенд', [mdn('Learn_web_development/Extensions/Server-side/First_steps/Introduction', 'MDN: введение в серверную разработку')],
          'Серверная часть: принимает запросы, проверяет права, работает с базой данных и отдаёт ответ фронтенду, обычно в JSON.'],
        'Обучение с ИИ: как правильно использовать нейронки для обучения'
      ],
      questions: [
        ['Что из себя представляют фронтенд и бэкенд?', 'Фронтенд — клиентская часть, с которой работает пользователь; бэкенд — серверная часть с бизнес-логикой и данными. Общаются через HTTP-запросы к API.'],
        ['Где выполняется фронтенд-код?', 'В браузере на устройстве пользователя (JS-движок, например V8 в Chrome).'],
        ['Где выполняется бэкенд-код?', 'На сервере — своём, облачном или в serverless-функции. Прямого доступа к нему у пользователя нет.']
      ],
      practice: [
        'Открой DevTools на любимом сайте и найди во вкладке Network запрос, который вернул данные в JSON',
        'Выпиши, какие части сайта маркетплейса относятся к фронтенду, а какие — к бэкенду',
        'Попроси ИИ объяснить разницу фронтенда и бэкенда на примере, перескажи своими словами и сверь с MDN'
      ]
    },

    /* ========================= 01 HTML ========================= */
    {
      type: 'step', id: 'html', num: '01', title: 'HTML',
      checklist: [
        ['Что такое HTML (зачем нужен?)', [['видео', 'https://youtu.be/jw-tBX07MKU'], mdn('Web/HTML')],
          'Язык разметки: описывает структуру и смысл содержимого страницы — заголовки, абзацы, ссылки, формы. Из него браузер строит DOM.'],
        ['Из чего состоит HTML-документ', [mdn('Learn_web_development/Core/Structuring_content/Basic_HTML_syntax')],
          '<!DOCTYPE html>, корневой <html>, <head> с метаданными (title, meta, стили) и <body> с видимым содержимым.'],
        ['Что такое HTML-тэг', [mdn('Web/HTML/Reference/Elements')],
          'Конструкция в угловых скобках, которая размечает элемент: открывающий тег, содержимое, закрывающий тег. У тегов есть атрибуты; бывают одиночные теги — <img>, <input>.'],
        ['Виды тэгов', [mdn('Web/HTML/Reference/Elements', 'MDN: справочник элементов')],
          'Блочные и строчные; парные и одиночные; семантические (header, nav, main, article) и нейтральные (div, span); теги метаданных, форм и медиа.'],
        ['Формы, картинки', [mdn('Web/HTML/Reference/Elements/form', 'MDN: form'), mdn('Web/HTML/Reference/Elements/img', 'MDN: img')]],
        ['Семантическая вёрстка', [mdn('Glossary/Semantics')],
          'Теги подбираются по смыслу содержимого, а не по внешнему виду. Это помогает скринридерам, поисковикам и тем, кто читает код.'],
        ['Доступность (accessibility)', [mdn('Web/Accessibility')]],
        ['+Мета-теги и базовое SEO: title, description, Open Graph', [mdn('Web/HTML/Reference/Elements/meta', 'MDN: meta'), mdn('Learn_web_development/Core/Structuring_content/Webpage_metadata', 'MDN: метаданные')]],
        ['+Встроенная валидация форм', [mdn('Learn_web_development/Extensions/Forms/Form_validation')]]
      ],
      resources: [
        ['MDN: справочник по HTML', MDN + 'Web/HTML'],
        ['MDN: учебник «Структурирование контента» с практикой', MDN + 'Learn_web_development/Core/Structuring_content']
      ],
      practice: [
        'Сверстай страницу-резюме только на семантических тегах (header, main, section, footer) — без div',
        'Сделай форму регистрации с email, паролем и согласием: required, type="email", minlength, pattern',
        'Добавь title, description и Open Graph-теги и проверь превью ссылки в мессенджере',
        'Пройди страницу только клавиатурой (Tab, Enter) и прогони аудит доступности в Lighthouse, исправь найденное'
      ],
      review: [
        ['Где выполняется HTML-код, который ты пишешь?', 'HTML не выполняется, а разбирается (парсится) браузером на устройстве пользователя — из него строится DOM.'],
        ['Как фронтенд получает данные с бэкенда?', 'Через HTTP-запросы к API (например, fetch). Ответ обычно приходит в формате JSON.'],
        ['Почему проверки прав нельзя делать только на фронтенде?', 'Фронтенд-код скачивается в браузер, его видно и можно изменить в DevTools. Проверки безопасности обязаны быть на сервере.']
      ],
      interview: [
        { id: 'iv-a11y', src: 'v1', q: 'Зачем нужна доступность (accessibility)?', t: 2044,
          hint: 'Чтобы сайтом могли пользоваться все, включая людей со скринридером или только клавиатурой. Семантические теги, alt у картинок, aria-атрибуты, видимый фокус, контраст. Плюс юридические требования и бонус к SEO.' },
        { id: 'iv-seo', src: 'v1', q: 'Как работает SEO?', t: 2135,
          hint: 'Поисковый робот скачивает и индексирует HTML. Важны семантика, title/description, Open Graph, sitemap.xml и robots.txt, скорость загрузки. SPA без пререндера индексируется хуже, поэтому используют SSR/SSG.' }
      ]
    },

    /* ========================= 02 CSS ========================= */
    {
      type: 'step', id: 'css', num: '02', title: 'CSS',
      checklist: [
        ['Что такое CSS (зачем нужен?)', [['видео', 'https://youtu.be/jw-tBX07MKU?t=204'], mdn('Web/CSS')],
          'Язык стилей: описывает, как элементы выглядят и располагаются, — цвета, шрифты, отступы, сетки, анимации.'],
        ['Из чего состоит CSS-документ', [],
          'Из правил «селектор + блок объявлений { свойство: значение; }», at-правил (@media, @import, @font-face) и комментариев.'],
        ['Способы подключения CSS к HTML', [mdn('Learn_web_development/Core/Styling_basics/Getting_started')],
          'Внешний файл через <link>, тег <style> в документе, атрибут style у элемента; внутри CSS — ещё @import.'],
        ['CSS-селекторы', [mdn('Web/CSS/Guides/Selectors')]],
        ['Box model', [mdn('Web/CSS/Guides/Box_model/Introduction')],
          'Каждый элемент — прямоугольник: content, padding, border, margin. box-sizing: border-box включает padding и border в заданную ширину.'],
        ['Приоритетность селекторов', [mdn('Web/CSS/Guides/Cascade/Specificity', 'MDN: специфичность')]],
        ['Псевдо-классы и псевдо-элементы', [mdn('Web/CSS/Reference/Selectors/Pseudo-classes', 'MDN: псевдоклассы'), mdn('Web/CSS/Reference/Selectors/Pseudo-elements', 'MDN: псевдоэлементы')],
          'Псевдокласс — состояние элемента (:hover, :focus, :nth-child). Псевдоэлемент — виртуальная часть элемента (::before, ::after, ::placeholder).'],
        'Встроенные стили браузера',
        ['Flexbox, grid', [mdn('Web/CSS/Guides/Flexible_box_layout/Basic_concepts', 'MDN: flexbox'), mdn('Web/CSS/Guides/Grid_layout/Basic_concepts', 'MDN: grid')]],
        ['Медиа-запросы, адаптивность', [mdn('Web/CSS/Guides/Media_queries/Using')]],
        'Подключение внешних библиотек',
        ['+Переменные в CSS', [mdn('Web/CSS/Guides/Cascading_variables/Using_custom_properties')]],
        '+Тулы для пиксель-перфект сверки',
        ['+position и z-index', [mdn('Web/CSS/Reference/Properties/position', 'MDN: position'), mdn('Web/CSS/Reference/Properties/z-index', 'MDN: z-index')]],
        ['+Transitions и animations', [mdn('Web/CSS/Guides/Transitions/Using', 'MDN: transitions'), mdn('Web/CSS/Guides/Animations/Using', 'MDN: animations')]],
        '+БЭМ',
        ['+Container queries, :has(), @layer', [mdn('Web/CSS/Reference/Selectors/:has', 'MDN: :has()'), mdn('Web/CSS/Reference/At-rules/@layer', 'MDN: @layer')]],
        'Препроцессоры (SCSS/SASS) *'
      ],
      resources: [
        ['PerfectPixel — накладывает полупрозрачный макет поверх страницы (расширение Chrome)', 'https://chromewebstore.google.com/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi'],
        ['Figma MCP — ИИ забирает размеры и токены прямо из макета', 'https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server']
      ],
      practice: [
        'Сверстай карточку товара на flexbox: картинка, название, цена и кнопка «В корзину», прижатая к низу карточки',
        'Сделай раскладку страницы на grid (шапка, сайдбар, контент, подвал), которая на мобильном перестраивается в одну колонку',
        'Вынеси цвета и отступы в CSS-переменные и сделай переключение светлой и тёмной темы',
        'Сделай модальное окно на position: fixed с затемнением фона и плавным появлением через transition',
        'Пройди игры Flexbox Froggy и Grid Garden до конца'
      ],
      review: [
        ['Чем семантические теги лучше div?', 'Они передают смысл: браузер, скринридеры и поисковики понимают структуру страницы, а код легче читать.'],
        ['Зачем атрибут alt у картинки?', 'Текстовая альтернатива для скринридеров и на случай, если картинка не загрузилась. Для декоративных картинок — пустой alt="".'],
        ['Как проверить обязательное поле формы без JS?', 'Атрибут required и подходящий type (email, url, number), плюс minlength, maxlength, pattern. Стилизовать можно через :invalid и :valid.'],
        ['Для чего нужен <label> и как связать его с полем?', 'Это подпись поля: клик по ней ставит фокус в поле, скринридер её зачитывает. Связь через for="id поля" или вложив input внутрь label.'],
        ['Что обычно лежит в <head>?', 'Метаданные: title, meta (charset, viewport, description, Open Graph), подключение стилей и скриптов, favicon.']
      ]
    },
    { type: 'project', id: 'pr-portfolio', title: 'Портфолио v1 + лендинг (подкасты)' },

    /* ========================= 03 Git ========================= */
    {
      type: 'step', id: 'git', num: '03', title: 'Git',
      checklist: [
        ['Что такое Git (зачем нужен?)', [mdn('Learn_web_development/Core/Version_control', 'MDN: Git и GitHub')],
          'Распределённая система контроля версий: хранит историю изменений, позволяет откатываться и вести работу параллельно в ветках.'],
        ['Что такое GitHub (и альтернативы — GitLab, BitBucket)', [],
          'Хостинг Git-репозиториев с инструментами для команды: pull requests, код-ревью, issues, CI (GitHub Actions), GitHub Pages.'],
        'Создание репозитория (локального и удалённого)',
        'Git commit / git add',
        'Git push / git pull',
        'Ветвление',
        'Git merge',
        '+Rebase против merge',
        'GitHub Pages',
        'Pull Request (PR)',
        '+Защищённый main и как работают с ветками в команде'
      ],
      resources: [
        ['Шпаргалка по Git (на сайте автора карты)', 'https://learn.pomazkov.com/#git'],
        ['Основы гита по шагам на своём компьютере (RU)', 'https://githowto.com/ru'],
        ['Больше заданий по основам гита (EN)', 'https://gitimmersion.com/index.html'],
        ['Тренажёр по веткам онлайн (EN)', 'https://learngitbranching.js.org/']
      ],
      practice: [
        'Создай репозиторий для портфолио, сделай 5+ осмысленных коммитов и запушь на GitHub',
        'Создай ветку feature/contacts, внеси изменения, открой Pull Request и смержи его',
        'Специально создай конфликт в двух ветках и разреши его вручную',
        'Опубликуй портфолио на GitHub Pages',
        'Сделай rebase ветки на свежий main и сравни историю с merge через git log --graph'
      ],
      review: [
        ['Как считается специфичность селекторов?', 'inline-стили > id > классы, атрибуты и псевдоклассы > теги и псевдоэлементы. При равенстве побеждает правило, объявленное позже; !important перебивает обычные правила.'],
        ['Чем flexbox отличается от grid?', 'Flexbox — одномерная раскладка (строка или колонка), grid — двумерная (строки и колонки одновременно).'],
        ['Что делает box-sizing: border-box?', 'Ширина и высота элемента начинают включать padding и border, поэтому размеры проще считать.'],
        ['Чем position: absolute отличается от fixed и sticky?', 'absolute — относительно ближайшего позиционированного предка; fixed — относительно окна; sticky — ведёт себя как relative, пока не дойдёт до порога прокрутки, потом «прилипает».']
      ]
    },

    /* ========================= 04 ИИ-1 ========================= */
    {
      type: 'step', id: 'ai-1', num: '04', title: 'ИИ-1', fresh: true,
      checklist: [
        'Codex / Claude Code / Cursor',
        'Готовые скиллы',
        'Создание своих скиллов',
        'Коннекторы / плагины (Figma)',
        'Выбор правильной модели (важно в условиях ограниченных ресурсов)'
      ],
      practice: [
        'Сверстай блок лендинга по скриншоту с помощью ИИ-агента, затем вычитай и поправь код сам',
        'Напиши файл с правилами проекта для агента (семантика, БЭМ, переменные) и проверь, что агент им следует',
        'Подключи Figma MCP или аналог и сгенерируй компонент из макета, сверь результат через PerfectPixel',
        'Реши одну задачу на двух разных моделях и сравни качество, скорость и стоимость'
      ],
      review: [
        ['Чем git merge отличается от git rebase?', 'merge создаёт merge-коммит и сохраняет историю как есть; rebase переносит коммиты поверх другой ветки и делает историю линейной. Общие опубликованные ветки не ребейзят.'],
        ['Зачем нужен Pull Request?', 'Это запрос на слияние ветки: через него проходят ревью, обсуждение и CI-проверки до попадания кода в main.'],
        ['Как отменить последний коммит?', 'git reset --soft HEAD~1, если коммит ещё не запушен; git revert <hash> — создаёт обратный коммит, безопасно для общей ветки.'],
        ['Зачем нужен .gitignore?', 'Чтобы не коммитить лишнее: node_modules, сборку, .env с секретами, файлы IDE.']
      ],
      interview: [
        { id: 'ai1-delegate', src: 'own', q: 'Какие задачи во фронтенде вы отдаёте ИИ-агенту, а какие делаете сами?',
          hint: 'Отдаю рутину: вёрстку по макету, бойлерплейт, тесты, миграции, рефакторинг по шаблону. Сам: архитектурные решения, безопасность, логику с деньгами и данными. Всё сгенерированное ревьюю как чужой PR.' },
        { id: 'ai1-verify', src: 'own', q: 'Как вы проверяете код, который написал ИИ?',
          hint: 'Читаю дифф целиком, запускаю линтер, проверку типов и тесты, смотрю граничные случаи и доступность, ищу лишние зависимости, секреты в коде и выдуманные API.' },
        { id: 'ai1-model', src: 'own', q: 'Как выбрать модель под задачу?',
          hint: 'Быстрая и дешёвая — для автодополнения и простых правок; сильная — для рефакторинга, отладки и архитектуры. Учитываю размер контекста, стоимость токенов и лимиты.' },
        { id: 'ai1-rules', src: 'own', q: 'Практика: как сделать, чтобы агент соблюдал правила вашего проекта?',
          hint: 'Файл инструкций в репозитории (например, AGENTS.md или CLAUDE.md): стек, структура папок, код-стайл, команды проверки. Для повторяющихся процессов — свои скиллы. Плюс линтер и тесты в CI как страховка.' }
      ]
    },
    { type: 'project', id: 'pr-ai-layout', title: 'Вёрстка с ИИ + практика гит' },

    /* ========================= 05 Браузер и сеть ========================= */
    {
      type: 'step', id: 'browser', num: '05', title: 'Браузер и сеть',
      checklist: [
        ['Что представляет из себя интернет', [mdn('Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work')],
          'Глобальная сеть компьютеров, которые обмениваются данными по общим протоколам (TCP/IP). Веб — один из сервисов поверх интернета.'],
        ['Что происходит между вводом URL-адреса в адресной строке и отображением сайта в браузере (Get-запрос, DNS)', [['видео', 'https://youtu.be/jw-tBX07MKU?t=92'], mdn('Learn_web_development/Getting_started/Web_standards/How_the_web_works', 'MDN: как работает веб'), mdn('Glossary/DNS', 'MDN: DNS')]],
        ['Document Object Model', [mdn('Web/API/Document_Object_Model')],
          'Объектное дерево документа, которое браузер строит из HTML. Через DOM API JavaScript читает и меняет страницу.'],
        ['Инструменты разработчика (Chrome devtools)', [mdn('Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools')]]
      ],
      practice: [
        'Во вкладке Network разбери запрос HTML-документа: метод, статус, заголовки, вкладка Timing',
        'Выполни nslookup для любого домена и найди его IP-адрес',
        'Измени текст и стиль элемента во вкладке Elements, затем найди этот элемент через document.querySelector в консоли',
        'Включи троттлинг сети «Slow 4G» и посмотри, как грузится твоё портфолио'
      ],
      review: [
        ['Что нельзя отдавать ИИ-агенту без проверки?', 'Код, связанный с безопасностью, авторизацией, деньгами и персональными данными, и любые изменения, которые уходят в прод без ревью.'],
        ['Как стили и скрипты в <head> влияют на загрузку?', 'CSS блокирует отрисовку, пока не загрузится; скрипты без async/defer блокируют разбор HTML.'],
        ['Что такое ветка в Git?', 'Подвижный указатель на коммит: позволяет вести работу параллельно, не трогая main.'],
        ['Что такое конфликт слияния и как его решить?', 'Возникает, когда обе ветки меняли одни и те же строки. Git помечает место маркерами, выбираешь итоговый вариант, делаешь add и commit.']
      ],
      interview: [
        { id: 'iv-url', src: 'v1', q: 'Что происходит от ввода URL до загрузки страницы?', t: 2493,
          hint: 'Разбор URL → DNS → TCP (+TLS для HTTPS) → HTTP-запрос → ответ сервера → парсинг HTML в DOM и CSS в CSSOM → render tree → layout → paint → composite. Скрипты без async/defer блокируют парсинг.' }
      ]
    },

    /* ========================= 06 JS ========================= */
    {
      type: 'step', id: 'js', num: '06', title: 'JS',
      checklist: [
        ['Что такое JS (зачем нужен?)', [['видео', 'https://youtu.be/jw-tBX07MKU?t=392'], mdn('Learn_web_development/Core/Scripting/What_is_JavaScript')],
          'Язык программирования для логики интерфейса в браузере (и сервера в Node.js): события, работа с DOM, запросы к API.'],
        ['Типы данных', [mdn('Web/JavaScript/Guide/Data_structures')],
          '7 примитивов — string, number, bigint, boolean, undefined, null, symbol — и объекты (включая массивы и функции).'],
        'Переменные',
        ['var, let, const', [['видео', 'https://youtu.be/07FllcTRj84'], mdn('Web/JavaScript/Reference/Statements/let', 'MDN: let'), mdn('Web/JavaScript/Reference/Statements/const', 'MDN: const')],
          'var — функциональная область видимости, всплывает со значением undefined. let/const — блочная область и TDZ. const нельзя переприсвоить, но объект внутри менять можно.'],
        ['+Hoisting (всплытие) и TDZ', [mdn('Glossary/Hoisting')]],
        ['Условия: if...else', [mdn('Web/JavaScript/Reference/Statements/if...else')]],
        ['Циклы (for, while)', [['видео', 'https://youtu.be/jwrPJ55OZ4k'], mdn('Web/JavaScript/Guide/Loops_and_iteration')]],
        ['Функции', [['видео', 'https://youtu.be/nGVYdna4kq4'], mdn('Web/JavaScript/Guide/Functions')]],
        ['Методы (массивов, строк, объектов)', [mdn('Web/JavaScript/Reference/Global_Objects/Array', 'MDN: Array'), mdn('Web/JavaScript/Reference/Global_Objects/String', 'MDN: String'), mdn('Web/JavaScript/Reference/Global_Objects/Object', 'MDN: Object')]],
        ['+Spread/rest, деструктуризация, optional chaining, ??', [mdn('Web/JavaScript/Reference/Operators/Spread_syntax', 'MDN: spread'), mdn('Web/JavaScript/Reference/Operators/Destructuring', 'MDN: деструктуризация'), mdn('Web/JavaScript/Reference/Operators/Optional_chaining', 'MDN: ?.'), mdn('Web/JavaScript/Reference/Operators/Nullish_coalescing', 'MDN: ??')]],
        ['Область видимости', [['видео', 'https://youtu.be/07FllcTRj84?t=55']]],
        ['Подключение JS-скрипта к HTML', [mdn('Web/HTML/Reference/Elements/script')]],
        ['async / defer', [mdn('Web/HTML/Reference/Elements/script')],
          'Оба не блокируют разбор HTML. async выполняется сразу после загрузки, в любом порядке; defer — после разбора документа, в порядке подключения.'],
        ['Работа с DOM и событиями', [mdn('Learn_web_development/Core/Scripting/Events', 'MDN: события'), mdn('Web/API/EventTarget/addEventListener', 'MDN: addEventListener')]],
        'Работа с командной строкой',
        'Node JS, npm'
      ],
      practice: [
        'Напиши функцию, которая считает количество гласных в строке',
        'Сделай todo-список на чистом JS: добавление, удаление, отметка задач и хранение в localStorage',
        'Из массива пользователей получи отсортированные имена совершеннолетних через filter, sort и map',
        'Напиши функцию groupBy, которая группирует массив объектов по полю (через reduce)',
        'Создай проект через npm init, поставь пакет (например, dayjs) и используй его в скрипте на Node.js'
      ],
      review: [
        ['Что происходит после ввода URL в браузере?', 'DNS → соединение (TCP/TLS) → HTTP-запрос → ответ → разбор HTML в DOM и CSS в CSSOM → отрисовка.'],
        ['Чем DOM отличается от HTML-кода?', 'HTML — текст, DOM — дерево объектов в памяти. DOM может отличаться от исходника: браузер чинит ошибки разметки, а скрипты меняют дерево.'],
        ['Какие вкладки DevTools ты используешь чаще всего?', 'Elements (DOM и стили), Console, Network (запросы), Sources (отладка), Application (хранилища), Performance и Lighthouse.'],
        ['Что такое DNS?', 'Система, которая переводит доменное имя в IP-адрес сервера.']
      ]
    },
    { type: 'project', id: 'pr-hangman', title: 'Виселица: игра' },

    /* ========================= 07 JS pro ========================= */
    {
      type: 'step', id: 'js-pro', num: '07', title: 'JS', level: 'pro level',
      checklist: [
        ['+Ссылочный тип данных, поверхностное и глубокое копирование', [mdn('Web/JavaScript/Guide/Data_structures')],
          'Объекты передаются по ссылке: копия переменной указывает на тот же объект. {...obj} копирует только первый уровень, structuredClone(obj) — все уровни.'],
        ['Замыкания', [['видео', 'https://youtu.be/mI6Jcfsgma4'], mdn('Web/JavaScript/Guide/Closures')],
          'Функция вместе с лексическим окружением, в котором создана: она «помнит» внешние переменные и после завершения внешней функции.'],
        ['Promise (+ async/await)', [mdn('Web/JavaScript/Reference/Global_Objects/Promise', 'MDN: Promise'), mdn('Web/JavaScript/Reference/Statements/async_function', 'MDN: async')]],
        ['+Promise.all / allSettled / race / any, AbortController', [mdn('Web/JavaScript/Reference/Global_Objects/Promise/all', 'MDN: all'), mdn('Web/JavaScript/Reference/Global_Objects/Promise/allSettled', 'MDN: allSettled'), mdn('Web/API/AbortController', 'MDN: AbortController')]],
        ['fetch', [mdn('Web/API/Fetch_API/Using_Fetch')]],
        ['JSON', [mdn('Web/JavaScript/Reference/Global_Objects/JSON')]],
        ['Выбрасывание исключений и отлов ошибок (try-catch, throw)', [mdn('Web/JavaScript/Reference/Statements/try...catch')]],
        ['Контекст, this (+ call/bind/apply и специфика контекста в стрелочных функциях)', [['видео', 'https://youtu.be/aFxQvCqrUC0'], ['задача с собеседования на this', 'https://boosty.to/pomazkovjs/posts/a0c9d956-08e5-4876-98de-8e9ef8c0be2a?share=post_link'], mdn('Web/JavaScript/Reference/Operators/this', 'MDN: this'), mdn('Web/JavaScript/Reference/Global_Objects/Function/bind', 'MDN: bind')]],
        ['+Прототипы и наследование, классы, new', [mdn('Web/JavaScript/Guide/Inheritance_and_the_prototype_chain', 'MDN: прототипы'), mdn('Web/JavaScript/Reference/Classes', 'MDN: классы')]],
        ['+Всплытие и погружение событий, делегирование, preventDefault и stopPropagation', [mdn('Web/API/Event/stopPropagation', 'MDN: stopPropagation'), mdn('Web/API/Event/preventDefault', 'MDN: preventDefault')]],
        ['Event Loop (микро- и макрозадачи)', [mdn('Web/JavaScript/Reference/Execution_model', 'MDN: модель выполнения')]],
        '+debounce / throttle',
        ['+Сборка мусора, утечки памяти, WeakMap', [mdn('Web/JavaScript/Guide/Memory_management', 'MDN: управление памятью'), mdn('Web/JavaScript/Reference/Global_Objects/WeakMap', 'MDN: WeakMap')]],
        ['Типы Map, Set, Symbol *', [mdn('Web/JavaScript/Reference/Global_Objects/Set', 'MDN: Set'), mdn('Web/JavaScript/Reference/Global_Objects/Symbol', 'MDN: Symbol')]]
      ],
      resources: [
        ['Задачи с реальных собесов с решением: LinkedList', 'https://boosty.to/pomazkovjs/posts/24a4b9b3-b6c7-4458-87bc-2a96bacfcb9f?share=post_link']
      ],
      practice: [
        'Напиши debounce и используй его для поиска с подсказками по мере ввода',
        'Загрузи пользователей из jsonplaceholder через fetch и async/await, покажи загрузку и обработай ошибку',
        'Реализуй deepClone для объектов и массивов и сравни со structuredClone',
        'Сделай createCounter() на замыкании с методами increment, decrement и value',
        'Сделай делегирование: один обработчик на списке удаляет элемент по клику на кнопку внутри'
      ],
      review: [
        ['Чем let отличается от var?', 'let — блочная область видимости и TDZ; var — функциональная, всплывает со значением undefined и может переобъявляться.'],
        ['Чем == отличается от ===?', '== приводит типы перед сравнением, === сравнивает без приведения. На практике используем ===.'],
        ['Что вернёт typeof null и почему?', '"object" — историческая ошибка языка; на самом деле null — примитив.'],
        ['Чем map отличается от forEach?', 'map возвращает новый массив из результатов колбэка, forEach ничего не возвращает и нужен для побочных эффектов.'],
        ['Что делают атрибуты async и defer у <script>?', 'Загружают скрипт, не блокируя разбор HTML. async выполняет сразу после загрузки, defer — после разбора документа и по порядку.']
      ],
      interview: [
        { id: 'iv-abort', src: 'v1', q: 'Как отменять запросы за неактуальными данными?', t: 780,
          hint: 'AbortController: передаём signal в fetch (или axios) и вызываем abort(), когда данные больше не нужны — например, в cleanup useEffect или при новом вводе в поиске. Так же защищаемся от гонки ответов (race condition).' },
        { id: 'iv-bubbling', src: 'v1', q: 'Как работают всплытие и погружение событий?', t: 2905,
          hint: 'Три фазы: погружение (capturing) от window к цели → цель → всплытие (bubbling) обратно вверх. addEventListener(type, fn, { capture: true }) ловит на погружении. stopPropagation останавливает распространение, на всплытии построено делегирование.' },
        { id: 'iv-eventloop', src: 'v1', q: 'Как устроен Event Loop?', t: 3026,
          hint: 'Call stack выполняет синхронный код. Затем выполняются ВСЕ микрозадачи (Promise.then, queueMicrotask, MutationObserver), потом браузер может отрисовать кадр, затем берётся одна макрозадача (setTimeout, события, I/O) — и цикл повторяется.' }
      ]
    },

    /* ========================= 08 React ========================= */
    {
      type: 'step', id: 'react', num: '08', title: 'React JS',
      checklist: [
        ['Что такое React?', [rd('learn', 'react.dev: быстрый старт')],
          'Библиотека для построения интерфейсов из компонентов; UI описывается декларативно как функция от состояния.'],
        ['Как он работает, в чём главное преимущество?', [rd('learn/render-and-commit', 'react.dev: рендер и коммит')],
          'При изменении состояния React снова вызывает компоненты, сравнивает результат с прошлым и применяет в DOM только изменения. Преимущества — декларативность и переиспользуемые компоненты.'],
        ['JSX, компоненты', [rd('learn/writing-markup-with-jsx')]],
        ['Пропсы и состояние (props/state)', [rd('learn/passing-props-to-a-component', 'react.dev: props'), rd('learn/state-a-components-memory', 'react.dev: state')]],
        ['Virtual DOM', [],
          'Лёгкое описание UI в виде JS-объектов. React сравнивает старую и новую версии и точечно обновляет настоящий DOM.'],
        ['+Ключи в списках, reconciliation', [rd('learn/rendering-lists')]],
        ['+Ререндер компонента, React.memo', [rd('reference/react/memo')]],
        ['React-хуки: useState, useEffect, useRef, useCallback, useMemo, useContext', [rd('reference/react/hooks')]],
        ['+useReducer, кастомные хуки, useLayoutEffect', [rd('learn/reusing-logic-with-custom-hooks', 'react.dev: кастомные хуки')]],
        ['+Контролируемые и неконтролируемые компоненты, формы', [rd('reference/react-dom/components/input')]],
        ['React devtools', [rd('learn/react-developer-tools')]],
        ['+React StrictMode', [rd('reference/react/StrictMode')]],
        ['+Подъём состояния, prop drilling и способы его избежать', [rd('learn/sharing-state-between-components')]],
        ['React Context', [rd('learn/passing-data-deeply-with-context')]],
        ['+Error Boundary, Suspense, lazy, порталы', [rd('reference/react/Suspense', 'Suspense'), rd('reference/react/lazy', 'lazy'), rd('reference/react-dom/createPortal', 'createPortal')]],
        'React Router',
        ['+React 19: Actions, useActionState, useOptimistic, use, React Compiler', [rd('reference/react/useActionState', 'useActionState'), rd('reference/react/useOptimistic', 'useOptimistic')]],
        '+Паттерны композиции: HOC, render props, compound components *'
      ],
      resources: [
        ['Видео: React введение — теория и практика', 'https://youtu.be/CGJp7PMBF1I'],
        ['Официальная документация React на русском', RD + 'learn']
      ],
      practice: [
        'Перепиши todo-список из блока JS на React: компоненты, useState, рендер списка с key',
        'Сделай форму с контролируемыми полями и валидацией, которая показывает ошибки под полями',
        'Напиши кастомный хук useFetch(url), который возвращает data, loading и error и отменяет запрос через AbortController',
        'Сделай переключатель темы через Context и useContext',
        'Найди лишние ререндеры через Profiler в React DevTools и убери их с помощью React.memo и useCallback'
      ],
      review: [
        ['Что такое замыкание и где оно встречается в React?', 'Функция помнит переменные внешней области. В React обработчики и эффекты «замыкают» state конкретного рендера — отсюда проблема устаревших значений в useEffect и setInterval.'],
        ['Что выполнится раньше: setTimeout(fn, 0) или Promise.resolve().then(fn)?', 'then — это микрозадача, она выполнится раньше setTimeout (макрозадачи).'],
        ['Как сделать поверхностную и глубокую копию объекта?', 'Поверхностная — {...obj} или Object.assign; глубокая — structuredClone(obj). JSON.parse(JSON.stringify()) теряет функции, Date и undefined.'],
        ['Почему нельзя мутировать объект напрямую, если он лежит в state?', 'React сравнивает ссылки. При мутации ссылка не меняется, и ререндера не будет — нужно создавать новый объект или массив.'],
        ['Как ведёт себя this в стрелочной функции?', 'Своего this нет — берётся из внешней области, где функция объявлена. call, apply и bind его не меняют.']
      ],
      interview: [
        { id: 'iv-react-how', src: 'v1', q: 'Как работает React?', t: 4716, also: [{ src: 'v2', t: '00:01:44' }],
          hint: 'UI описывается декларативно как функция от состояния. При изменении state/props компонент ререндерится, React сравнивает новое дерево элементов со старым (reconciliation, Fiber) и применяет в DOM только нужные изменения, группируя их (batching).' },
        { id: 'iv-lifecycle', src: 'v1', q: 'Методы жизненного цикла компонента', t: 4898, also: [{ src: 'v2', t: '00:21:02' }],
          hint: 'Монтирование → обновления → размонтирование. В классах: componentDidMount, componentDidUpdate, componentWillUnmount (+ shouldComponentUpdate). В функциях то же делается через useEffect с массивом зависимостей и функцией очистки.' },
        { id: 'iv-hooks', src: 'v1', q: 'Зачем нужны хуки?', t: 4971, also: [{ src: 'v2', t: '00:14:25' }],
          hint: 'Дают функциональным компонентам состояние, эффекты, рефы и контекст без классов, а логику можно переиспользовать через кастомные хуки. Правила: вызывать только на верхнем уровне и только из компонентов/хуков.' },
        { id: 'iv-context', src: 'v1', q: 'Зачем нужен Context?', t: 4983, also: [{ src: 'v2', t: '00:57:10' }],
          hint: 'Чтобы передать данные глубоко в дерево без prop drilling: тема, текущий пользователь, локаль. Минус: при смене value ререндерятся все потребители, поэтому контексты дробят и мемоизируют value; для частых обновлений лучше стейт-менеджер.' },

        { id: 'v2-lib', src: 'v2', t: '00:02:43', q: 'React — это библиотека или фреймворк?',
          hint: 'Библиотека для UI: отвечает только за отображение и состояние компонентов. Роутинг, запросы, формы и сборку выбираешь сам; фреймворком над React выступает, например, Next.js.' },
        { id: 'v2-spa', src: 'v2', t: '00:03:40', q: 'Что такое SPA?',
          hint: 'Одностраничное приложение: сервер отдаёт один HTML, дальше переходы и обновления делает JS без перезагрузки страницы. Плюс — быстрые переходы; минусы — тяжёлая первая загрузка и сложнее SEO.' },
        { id: 'v2-components', src: 'v2', t: '00:05:25', q: 'Что такое компонентный подход?',
          hint: 'Интерфейс собирается из независимых переиспользуемых компонентов с одной ответственностью. Компоненты получают данные через props и компонуются друг в друга.' },
        { id: 'v2-jsx', src: 'v2', t: '00:06:12', q: 'Что такое JSX и во что он превращается?',
          hint: 'Синтаксическое расширение JS, похожее на HTML. Компилятор превращает его в вызовы jsx() / React.createElement(), которые возвращают объекты-описания элементов.' },
        { id: 'v2-state-props', src: 'v2', t: '00:07:11', q: 'Чем state отличается от props?',
          hint: 'props приходят от родителя и доступны только для чтения; state — внутренняя память компонента, её изменение через setState вызывает ререндер.' },
        { id: 'v2-lists', src: 'v2', t: '00:08:05', q: 'Как рендерить списки и зачем нужен key?',
          hint: 'Через map, возвращая элемент с уникальным стабильным key. Key помогает React сопоставлять элементы между рендерами; индекс как key ломает состояние при сортировке, вставке и удалении.' },
        { id: 'v2-conditional', src: 'v2', t: '00:09:44', q: 'Какие есть способы условного рендеринга?',
          hint: 'if с ранним return, тернарный оператор, && (осторожно с 0 — он отрендерится), вынос в переменную или объект-словарь компонентов.' },
        { id: 'v2-rerender', src: 'v2', t: '00:12:38', q: 'Что вызывает ререндер компонента?',
          hint: 'Изменение его state, ререндер родителя (даже если props не изменились) и изменение значения контекста, на который он подписан.' },
        { id: 'v2-hooks-list', src: 'v2', t: '00:15:41', q: 'Какие хуки вы знаете?',
          hint: 'Базовые: useState, useEffect, useContext. Дополнительные: useReducer, useRef, useMemo, useCallback, useLayoutEffect, useImperativeHandle, useId, useTransition, useDeferredValue, useSyncExternalStore; в React 19 — use, useActionState, useOptimistic.' },
        { id: 'v2-memo-hooks', src: 'v2', t: '00:18:34', also: [{ src: 'v2', t: '01:03:30' }], q: 'Как работают useMemo и useCallback?',
          hint: 'useMemo кеширует результат вычисления, useCallback — саму функцию, пока не изменились зависимости. Имеют смысл для тяжёлых вычислений и стабильных ссылок в props memo-компонентов и зависимостях эффектов.' },
        { id: 'v2-lazy-init', src: 'v2', t: '00:26:47', q: 'Что такое ленивая инициализация состояния?',
          hint: 'В useState передаётся функция: useState(() => expensive()). Она вызовется только при первом рендере, а не на каждом.' },
        { id: 'v2-children', src: 'v2', t: '00:27:28', q: 'Что такое React.Children и когда он нужен?',
          hint: 'Утилиты для работы с props.children: map, forEach, count, only, toArray. Сейчас используется редко — вместо него чаще передают данные явно или через контекст.' },
        { id: 'v2-react-memo', src: 'v2', t: '00:46:23', q: 'Как работает React.memo и когда он не помогает?',
          hint: 'Пропускает ререндер, если props поверхностно равны прошлым. Не помогает, если в props каждый раз новые объекты или функции, или компонент подписан на изменившийся контекст.' },
        { id: 'v2-synthetic', src: 'v2', t: '01:18:40', also: [{ src: 'v2', t: '00:54:24' }], q: 'Что такое синтетические события?',
          hint: 'Кроссбраузерная обёртка React над нативными событиями с единым API. Обработчики делегируются на корневой контейнер приложения; нативное событие доступно через e.nativeEvent.' },
        { id: 'v2-fragment', src: 'v2', t: '00:55:54', q: 'Зачем нужен React.Fragment?',
          hint: 'Чтобы вернуть несколько элементов без лишней обёртки в DOM. Короткая запись <>…</>, а полная <Fragment key> нужна, когда требуется key в списке.' },
        { id: 'v2-drilling', src: 'v2', t: '00:56:15', q: 'Что такое prop drilling и как его избежать?',
          hint: 'Передача props через много промежуточных уровней, которым они не нужны. Решения: композиция через children, Context, стейт-менеджер.' },
        { id: 'v2-controlled', src: 'v2', t: '00:57:33', also: [{ src: 'v2', t: '01:19:40' }], q: 'Чем контролируемый компонент отличается от неконтролируемого?',
          hint: 'У контролируемого значение хранится в state и меняется через onChange. У неконтролируемого значение живёт в DOM и читается через ref; стартовое значение задают через defaultValue.' },
        { id: 'v2-portals', src: 'v2', t: '00:58:27', q: 'Что такое порталы и зачем они нужны?',
          hint: 'createPortal рендерит детей в другой DOM-узел (например, в body), сохраняя их место в дереве React: контекст и всплытие событий работают. Нужны для модалок, тултипов, дропдаунов.' },
        { id: 'v2-layout-effect', src: 'v2', t: '01:00:54', q: 'Чем useEffect отличается от useLayoutEffect?',
          hint: 'useEffect выполняется после отрисовки и не блокирует её. useLayoutEffect — синхронно после изменений DOM, но до отрисовки: для замеров размеров и позиции без мигания.' },
        { id: 'v2-useref', src: 'v2', t: '01:01:32', q: 'Для чего нужен useRef?',
          hint: 'Хранит изменяемое значение между рендерами без ререндера (таймеры, предыдущее значение) и даёт доступ к DOM-элементу через ref.' },
        { id: 'v2-custom-hooks', src: 'v2', t: '01:02:31', q: 'Что такое кастомные хуки?',
          hint: 'Функции с именем use…, которые переиспользуют логику с хуками между компонентами. Каждый вызов хука получает своё состояние.' },
        { id: 'v2-imperative', src: 'v2', t: '01:08:04', q: 'Для чего нужен useImperativeHandle?',
          hint: 'Позволяет компоненту отдать родителю через ref ограниченный набор методов (например, focus, open) вместо прямого доступа к DOM.' },
        { id: 'v2-lifting', src: 'v2', t: '01:09:24', q: 'Что такое подъём состояния и когда состояние стоит опускать?',
          hint: 'Если двум компонентам нужно одно состояние, его поднимают в ближайшего общего родителя и передают вниз через props. Опускают, наоборот, как можно ниже, чтобы изменения ререндерили меньшую часть дерева.' },
        { id: 'v2-forwardref', src: 'v2', t: '01:11:06', q: 'Что такое ref и forwardRef?',
          hint: 'ref даёт доступ к DOM-узлу или экземпляру. forwardRef пробрасывал ref в функциональный компонент; в React 19 ref можно принимать как обычный prop.' },
        { id: 'v2-pure', src: 'v2', t: '01:13:12', q: 'Что такое PureComponent?',
          hint: 'Классовый компонент со встроенным поверхностным сравнением props и state в shouldComponentUpdate. Функциональный аналог — React.memo.' },
        { id: 'v2-error-boundary', src: 'v2', t: '01:14:14', q: 'Что такое Error Boundary?',
          hint: 'Классовый компонент с getDerivedStateFromError / componentDidCatch, который ловит ошибки рендера потомков и показывает запасной UI. Не ловит ошибки в обработчиках событий и асинхронном коде.' },
        { id: 'v2-router', src: 'v2', t: '01:15:25', q: 'Как работает React Router?',
          hint: 'Сопоставляет URL с деревом маршрутов и рендерит нужные компоненты без перезагрузки страницы через History API. Есть вложенные маршруты, параметры, загрузчики данных.' },
        { id: 'v2-render-props', src: 'v2', t: '01:16:18', also: [{ src: 'v2', t: '02:22:31' }], q: 'Что такое render props?',
          hint: 'Компонент получает функцию и вызывает её для рендера, передавая свои данные. Паттерн переиспользования логики; сейчас его часто заменяют кастомные хуки.' },
        { id: 'v2-strict', src: 'v2', t: '01:37:53', q: 'Что делает StrictMode?',
          hint: 'Только в режиме разработки: дважды вызывает рендер и эффекты, чтобы найти побочные эффекты и отсутствие cleanup, предупреждает об устаревших API. На прод не влияет.' },
        { id: 'v2-lazy', src: 'v2', t: '01:38:51', also: [{ src: 'v2', t: '01:41:24' }], q: 'Как сделать code splitting в React?',
          hint: 'React.lazy(() => import(\'./Page\')) выносит компонент в отдельный чанк, Suspense показывает fallback во время загрузки. Обычно делят по маршрутам и тяжёлым виджетам.' },
        { id: 'v2-devtools', src: 'v2', t: '01:42:23', q: 'Что умеют React DevTools?',
          hint: 'Показывают дерево компонентов, их props, state и хуки, позволяют править значения; Profiler записывает рендеры и показывает, что и почему перерендерилось.' },
        { id: 'v2-optimization', src: 'v2', t: '01:43:23', also: [{ src: 'v2', t: '01:44:49' }], q: 'Какие способы оптимизации React-приложения вы знаете?',
          hint: 'Опускать state ниже, memo/useMemo/useCallback, стабильные key, виртуализация длинных списков, code splitting, debounce ввода, useTransition для тяжёлых обновлений, профилирование перед оптимизацией.' },
        { id: 'v2-batching', src: 'v2', t: '01:46:37', q: 'Что такое батчинг в React?',
          hint: 'Несколько обновлений состояния объединяются в один ререндер. С React 18 батчинг автоматический везде, включая промисы и setTimeout.' },
        { id: 'v2-reactivity', src: 'v2', t: '01:48:58', q: 'Как React узнаёт, что нужно обновить интерфейс?',
          hint: 'Не отслеживает изменения автоматически, как Vue или MobX: обновление запускает вызов setState / dispatch. Затем React ставит ререндер в очередь и сравнивает деревья.' },
        { id: 'v2-heuristics', src: 'v2', t: '01:52:15', q: 'На каких эвристиках построен алгоритм сравнения (reconciliation)?',
          hint: 'Элементы разного типа дают разные деревья — старое поддерево пересоздаётся. Элементы списка сопоставляются по key. Это даёт сравнение за O(n) вместо O(n³).' },
        { id: 'v2-force', src: 'v2', t: '01:53:55', q: 'Как принудительно перерендерить компонент?',
          hint: 'В классах — forceUpdate(); в функциях — useReducer(x => x + 1) и вызов dispatch. Сменить key заставит пересоздать компонент с нуля. Обычно это признак проблем в архитектуре.' },
        { id: 'v2-concurrent', src: 'v2', t: '02:09:44', also: [{ src: 'v2', t: '02:12:48' }], q: 'Что такое конкурентный режим?',
          hint: 'Возможность React 18 прерывать рендер и приоритизировать срочные обновления (ввод) над несрочными. Инструменты: useTransition, useDeferredValue, Suspense.' },
        { id: 'v2-react19', src: 'v2', t: '02:11:00', q: 'Что нового в React 19?',
          hint: 'Actions и useActionState, useOptimistic, хук use, ref как обычный prop, метатеги в компонентах, стабильные Server Components; React Compiler автоматически мемоизирует.' },
        { id: 'v2-fiber', src: 'v2', t: '02:11:44', q: 'Что такое Fiber?',
          hint: 'Внутренняя архитектура React: каждый компонент — узел-единица работы. Рендер можно разбить на части, приостановить и возобновить, что и дало конкурентный режим.' },
        { id: 'v2-phases', src: 'v2', t: '02:12:44', q: 'Чем фаза render отличается от фазы commit?',
          hint: 'Render — вызов компонентов и вычисление изменений; чистая фаза, может прерываться. Commit — применение изменений к DOM и запуск эффектов; выполняется синхронно.' },
        { id: 'v2-vdom-shadow', src: 'v2', t: '02:17:51', q: 'Чем Virtual DOM отличается от Shadow DOM?',
          hint: 'Virtual DOM — представление UI в памяти в React для эффективных обновлений. Shadow DOM — браузерный механизм инкапсуляции разметки и стилей в веб-компонентах.' },
        { id: 'v2-element-types', src: 'v2', t: '02:18:42', q: 'Какие типы элементов бывают в React?',
          hint: 'Строки для DOM-тегов (\'div\'), функции и классы для компонентов, а также служебные: Fragment, Suspense, StrictMode, Profiler, порталы и провайдеры контекста.' }
      ]
    },

    /* ========================= 09 Браузер и сеть pro ========================= */
    {
      type: 'step', id: 'browser-pro', num: '09', title: 'Браузер и сеть', level: 'pro level',
      checklist: [
        ['Методы запросов (get, put, post, patch, delete, options ...)', [mdn('Web/HTTP/Reference/Methods')]],
        ['Статусы ответа сервера', [mdn('Web/HTTP/Reference/Status')]],
        ['+REST', [],
          'Архитектурный стиль API: ресурсы доступны по URL, действия выражаются HTTP-методами, каждый запрос самодостаточен (stateless), данные обычно в JSON.'],
        ['+CORS', [mdn('Web/HTTP/Guides/CORS')]],
        ['+Хранилища: cookies, localStorage, sessionStorage, IndexedDB', [mdn('Web/HTTP/Guides/Cookies', 'MDN: cookies'), mdn('Web/API/Web_Storage_API', 'MDN: Web Storage'), mdn('Web/API/IndexedDB_API', 'MDN: IndexedDB')]],
        ['Критические этапы рендеринга (critical rendering path)', [mdn('Web/Performance/Guides/Critical_rendering_path')]],
        'Reflow, repaint, composite',
        ['+Оптимизация: lazy loading, code splitting, изображения, шрифты', [mdn('Web/Performance/Guides/Lazy_loading')]],
        ['HTTP vs HTTPS (SSL-протокол)', [mdn('Glossary/HTTPS')]],
        ['HTTP1, HTTP2, HTTP3 *', [mdn('Web/HTTP/Guides/Overview', 'MDN: обзор HTTP')]],
        ['Service Worker API *', [mdn('Web/API/Service_Worker_API')]]
      ],
      practice: [
        'Напиши обёртку над fetch для CRUD-запросов к тестовому REST API (GET, POST, PATCH, DELETE) с обработкой 4xx и 5xx',
        'Сохрани настройки в localStorage, а токен — в cookie; сравни их во вкладке Application',
        'Сделай бесконечную ленту на IntersectionObserver и картинки с loading="lazy"',
        'Прогони Lighthouse на своём проекте, исправь 3 проблемы производительности и сравни оценки',
        'Получи ошибку CORS от своего локального сервера и исправь её заголовками на сервере'
      ],
      review: [
        ['Зачем нужен key в списках?', 'Помогает React сопоставлять элементы между рендерами. Индекс как key ломает состояние при перестановке и удалении.'],
        ['Чем отличаются props и state?', 'props приходят от родителя и только читаются; state — внутренняя память компонента, её изменение вызывает ререндер.'],
        ['Чем Promise.allSettled отличается от Promise.all?', 'allSettled ждёт все промисы и возвращает статус каждого; all отклоняется при первой же ошибке.'],
        ['Как отменить fetch-запрос?', 'Создать AbortController, передать controller.signal в fetch и вызвать controller.abort().']
      ],
      interview: [
        { id: 'iv-infinite', src: 'v1', q: 'Для чего нужен бесконечный скролл и как его сделать?', t: 743,
          hint: 'Подгружает данные порциями по мере прокрутки, чтобы не грузить всё сразу. Обычно IntersectionObserver на «сторожевом» элементе внизу списка + виртуализация длинных списков. Минусы: недоступный футер, SEO, возврат к позиции после перехода.' },
        { id: 'iv-render', src: 'v1', q: 'Фазы рендеринга в браузере', t: 2357,
          hint: 'DOM + CSSOM → render tree → Style → Layout (reflow) → Paint → Composite. Изменение геометрии запускает layout, цвета — paint, а transform/opacity обрабатываются только на этапе композиции, поэтому анимировать лучше их.' },
        { id: 'iv-methods', src: 'v1', q: 'Чем отличаются HTTP-методы?', t: 2603,
          hint: 'GET — получить, POST — создать, PUT — заменить целиком, PATCH — изменить частично, DELETE — удалить, OPTIONS — узнать возможности (preflight в CORS). GET, PUT, DELETE идемпотентны, POST — нет. У GET нет тела запроса.' },
        { id: 'iv-headers', src: 'v1', q: 'Какие бывают заголовки (headers)?', t: 2700,
          hint: 'Метаданные запроса и ответа: Content-Type, Accept, Authorization, Cookie / Set-Cookie, Cache-Control, ETag, CORS-заголовки (Access-Control-Allow-Origin и др.), User-Agent.' },
        { id: 'iv-status', src: 'v1', q: 'Какие бывают статус-коды?', t: 2719,
          hint: '1xx — информационные, 2xx — успех (200, 201, 204), 3xx — редиректы и кеш (301, 302, 304), 4xx — ошибка клиента (400, 401, 403, 404, 429), 5xx — ошибка сервера (500, 502, 503).' },
        { id: 'iv-http-versions', src: 'v1', q: 'Чем отличаются версии HTTP?', t: 2771,
          hint: 'HTTP/1.1: текст, keep-alive, но один запрос за раз на соединение (head-of-line blocking). HTTP/2: бинарный, мультиплексирование в одном соединении, сжатие заголовков. HTTP/3: поверх QUIC (UDP), быстрее рукопожатие, нет блокировки при потере пакетов.' }
      ]
    },

    /* ========================= 10 ИИ-2 ========================= */
    {
      type: 'step', id: 'ai-2', num: '10', title: 'ИИ-2', fresh: true,
      checklist: [
        'Как работает LLM на пальцах: токены, контекстное окно, вероятностная природа ответа, откуда берутся галлюцинации',
        'Границы доверия: что можно делегировать, что проверять всегда (безопасность, деньги, данные пользователей)',
        'MCP как потребитель',
        'Worktree',
        'Stacked PRs'
      ],
      practice: [
        'Подключи к агенту MCP-сервер (браузер или документация) и реши с ним задачу по своему проекту',
        'Сделай две задачи параллельно в разных git worktree и смержи обе ветки',
        'Разбей большую фичу на серию маленьких зависимых PR (stacked PRs) с описанием каждого',
        'Попроси ИИ написать функцию с внешней библиотекой, найди в ответе ошибку или выдуманный API и проверь по документации'
      ],
      review: [
        ['Что такое CORS и кто его проверяет?', 'Механизм, по которому браузер разрешает запросы к другому origin на основании заголовков сервера (Access-Control-Allow-Origin). Проверяет браузер, сервер только отвечает заголовками.'],
        ['Чем localStorage отличается от cookie?', 'localStorage — около 5 МБ, живёт только в браузере и не уходит на сервер. Cookie — около 4 КБ, отправляется с каждым запросом, может быть HttpOnly и иметь срок жизни.'],
        ['Что такое reflow и repaint?', 'Reflow — пересчёт геометрии элементов, repaint — перерисовка без изменения геометрии. Reflow дороже.'],
        ['Откуда агент узнаёт правила вашего проекта?', 'Из файла инструкций в репозитории и подключённых скиллов; без них он опирается на общие практики и может им не соответствовать.']
      ],
      interview: [
        { id: 'ai2-hallucinations', src: 'own', q: 'Почему LLM «галлюцинирует» и как это учитывать в работе?',
          hint: 'Модель предсказывает вероятное продолжение текста, а не проверяет факты. Поэтому API, версии библиотек и конфиги сверяю с документацией, даю модели актуальный контекст (доки, MCP) и проверяю результат тестами.' },
        { id: 'ai2-context', src: 'own', q: 'Что такое контекстное окно и как оно влияет на работу агента?',
          hint: 'Объём токенов, который модель видит за раз. Если в контекст не влезает нужный код или он забит лишним, качество падает. Дроблю задачи, даю только нужные файлы, для новой задачи начинаю новую сессию.' },
        { id: 'ai2-mcp', src: 'own', q: 'Что такое MCP и зачем он фронтенд-разработчику?',
          hint: 'Model Context Protocol — стандарт подключения к ИИ внешних инструментов и данных: Figma, браузер, база данных, трекер задач. Агент может взять размеры из макета или сам проверить вёрстку в браузере.' },
        { id: 'ai2-secrets', src: 'own', q: 'Практика: как безопасно дать агенту доступ к проекту, где есть секреты?',
          hint: 'Секреты не в репозитории, а в .env вне контекста агента; отдельные dev-ключи с минимальными правами; ревью команд, которые агент запускает; деплой в прод — только человеком.' }
      ]
    },

    /* ========================= 11 Инструменты ========================= */
    {
      type: 'step', id: 'tools', num: '11', title: 'Полезные инструменты',
      checklist: [
        'axios',
        'Redux Toolkit',
        '+Zustand, MobX',
        '+Формы: React Hook Form и Zod',
        'CSS Modules',
        'Tailwind',
        'Shadcn / MUI / Ant Design',
        '+Storybook',
        'Линтеры (ESLint)',
        '+pnpm, Prettier, Husky / lint-staged',
        '+Tree shaking, source maps, Webpack',
        'Automated CI/CD, GitHub Actions',
        'Firebase, Vercel, Cloudflare Pages (деплой проектов)',
        '+React Query'
      ],
      practice: [
        'Настрой ESLint, Prettier и Husky с lint-staged, чтобы перед коммитом код проверялся и форматировался',
        'Перенеси загрузку данных из useEffect на React Query: кеш, повторный запрос, состояние загрузки',
        'Сделай форму регистрации на React Hook Form со схемой валидации Zod',
        'Опиши Button, Input и Modal в Storybook со всеми состояниями',
        'Настрой GitHub Actions: lint и build на каждый PR и автодеплой на Vercel или GitHub Pages'
      ],
      review: [
        ['Зачем нужен useEffect и что такое функция очистки?', 'Для побочных эффектов после рендера: запросы, подписки, таймеры. Cleanup запускается перед следующим эффектом и при размонтировании — там отписываются и отменяют запросы.'],
        ['Что такое prop drilling и как его избежать?', 'Передача props через много уровней. Решения: композиция через children, Context, стейт-менеджер.'],
        ['Какие статус-коды означают проблемы с доступом?', '401 — пользователь не аутентифицирован; 403 — аутентифицирован, но прав недостаточно.'],
        ['Когда хватит Context, а когда нужен стейт-менеджер?', 'Context — для редко меняющихся данных (тема, пользователь). Для частых обновлений и сложной логики — Redux Toolkit или Zustand с подпиской на часть состояния.']
      ],
      interview: [
        { id: 'iv-cicd', src: 'v1', q: 'Что такое CI/CD и как он устроен у вас?', t: 1057,
          hint: 'CI — на каждый PR автоматически ставятся зависимости, запускаются линтер, тесты и сборка. CD — автоматический деплой после мержа. Типовой пайплайн: install → lint → test → build → deploy.' },
        { id: 'iv-gitlab', src: 'v1', q: 'Как настроить GitLab CI/CD для dev и prod окружений?', t: 3143,
          hint: '.gitlab-ci.yml со stages; разные jobs и environments по веткам (rules): develop → dev, main/теги → prod. Переменные окружения и секреты в настройках CI, ручное подтверждение (when: manual) для прода.' },
        { id: 'iv-redux', src: 'v1', q: 'Как работают Redux и Flux-архитектура?', t: 5076,
          hint: 'Однонаправленный поток данных: action → dispatch → reducer → store → view. В Redux один store, редьюсеры — чистые функции, состояние иммутабельно, побочные эффекты — в middleware (thunk). Redux Toolkit убирает бойлерплейт.' },
        { id: 'iv-uikit', src: 'v1', q: 'Что такое UI-кит и дизайн-система?', t: 5658,
          hint: 'UI-кит — набор готовых компонентов. Дизайн-система шире: токены (цвета, отступы, типографика), компоненты, правила использования, документация и процесс их развития. Дают единообразие и скорость разработки.' },
        { id: 'iv-storybook', src: 'v1', q: 'Для чего нужен Storybook?', t: 5821,
          hint: 'Разработка и документирование компонентов в изоляции от приложения: все состояния компонента в одном месте, витрина UI-кита для дизайнеров и разработчиков, база для визуальных и интерактивных тестов.' }
      ]
    },
    { type: 'project', id: 'pr-netflix', title: 'React-Netflix' },

    /* ========================= 12 TypeScript ========================= */
    {
      type: 'step', id: 'typescript', num: '12', title: 'TypeScript',
      checklist: [
        ['+Зачем нужен TS вообще?', [],
          'Статическая типизация: ошибки находятся до запуска, работает автодополнение и безопасный рефакторинг, а типы служат документацией.'],
        '+Базовые типы: string, number, boolean, null, undefined, symbol, bigint, array, tuple',
        '+Типизация объектов и функций',
        'Type / Interface',
        'Generics',
        '+Utility-типы: Partial, Pick, Omit, Record, ReturnType',
        '+keyof, typeof, индексные типы',
        'Enums',
        'Union types',
        'Type assertions (as) и их ограничения',
        'Type guards',
        'Типизация React props',
        'Разница any, unknown и never + зачем нужны'
      ],
      practice: [
        'Переведи игру «Виселица» или todo-список с JS на TypeScript в режиме strict',
        'Типизируй ответ публичного API и напиши type guard, который проверяет данные в рантайме',
        'Напиши дженерик-функцию groupBy<T, K extends keyof T>(items: T[], key: K)',
        'Опиши пропсы компонента Button: variant через union (\'primary\' | \'secondary\'), children и onClick',
        'С помощью Pick, Omit и Partial получи из типа User типы для формы создания и формы редактирования'
      ],
      review: [
        ['Зачем React Query, если есть useEffect и fetch?', 'Он даёт кеш, дедупликацию запросов, повторные попытки, фоновое обновление и готовые состояния загрузки и ошибки.'],
        ['Что делает Husky вместе с lint-staged?', 'Запускает линт, форматирование и тесты в git-хуках — только для изменённых файлов перед коммитом.'],
        ['Когда useMemo и useCallback не нужны?', 'Для дешёвых вычислений и когда результат не уходит в memo-компоненты или зависимости эффектов — мемоизация тоже стоит ресурсов.'],
        ['Что такое прототипное наследование?', 'Объекты наследуют свойства через цепочку [[Prototype]]. Классы в JS — синтаксический сахар над прототипами.']
      ],
      interview: [
        { id: 'iv-ts-cons', src: 'v1', q: 'В чём минусы TypeScript?', t: 4386,
          hint: 'Дополнительный шаг сборки, порог входа, сложные типы замедляют разработку, типы стираются в рантайме (данные с бэка всё равно надо валидировать), соблазн «заткнуть» ошибку через any или as.' },
        { id: 'iv-never', src: 'v1', q: 'Чем отличаются never, any и unknown?', t: 4610,
          hint: 'any отключает проверку типов. unknown — «что угодно», но перед использованием значение нужно сузить (typeof, type guard). never — тип значения, которого не бывает: функция, которая всегда бросает ошибку, и исчерпывающая проверка в switch.' }
      ]
    },

    /* ========================= 13 Next ========================= */
    {
      type: 'step', id: 'next', num: '13', title: 'Next JS', fresh: true,
      checklist: [
        'App Router: страницы, layouts, динамические маршруты',
        'Server/Client Components и граница браузера/сервера',
        'Получение данных, loading/error/not-found',
        '+Рендеринг: статический, динамический, стриминг',
        'Изменение данных (Server Actions) и базовое понимание кеширования',
        'Переменные окружения, сборка и деплой'
      ],
      practice: [
        'Создай приложение на App Router: главная, список постов и динамическая страница /posts/[id]',
        'Сделай серверный компонент, который получает данные на сервере, и клиентскую кнопку «лайк» внутри него',
        'Добавь loading, error и not-found для страницы поста',
        'Сделай форму комментария на Server Action с обновлением данных на странице',
        'Задеплой проект на Vercel с переменными окружения'
      ],
      review: [
        ['Чем interface отличается от type?', 'Оба описывают форму объекта. interface можно расширять и объединять объявления; type умеет union, пересечения, условные и mapped-типы.'],
        ['Что такое generic?', 'Параметр типа: позволяет писать переиспользуемый код и сохранять связь типов между входом и выходом.'],
        ['Чем any отличается от unknown?', 'any отключает проверки; unknown требует сузить тип перед использованием.'],
        ['Какие минусы у SPA и как их решает Next.js?', 'Медленная первая загрузка и слабое SEO. Next.js отдаёт готовый HTML через SSR/SSG и дробит код по маршрутам.']
      ],
      interview: [
        { id: 'v2-rsc', src: 'v2', t: '02:13:49', q: 'Что такое серверные компоненты (Server Components)?',
          hint: 'Компоненты, которые рендерятся только на сервере и не попадают в клиентский бандл: могут напрямую читать БД и файлы, но не имеют state и обработчиков. Интерактивность — в клиентских компонентах с \'use client\'.' },
        { id: 'v2-ssr', src: 'v2', t: '02:15:09', q: 'Что такое SSR и гидрация?',
          hint: 'SSR — HTML рендерится на сервере и приходит готовым, поэтому контент виден быстрее и индексируется. Гидрация — React в браузере «оживляет» этот HTML: навешивает обработчики и связывает с состоянием. Разный HTML на сервере и клиенте даёт ошибку гидрации.' }
      ]
    },

    /* ========================= ★ Софт-скиллы ========================= */
    {
      type: 'step', id: 'soft', num: '★', title: 'Софт-скиллы и работа в команде', added: true,
      intro: 'Новый блок из мок-интервью. Поведенческие вопросы задают на каждом собеседовании, поэтому подготовьте ответы до первых откликов.',
      practice: [
        'Напиши и отрепетируй рассказ о себе на 2–3 минуты, запиши на видео и пересмотри',
        'Подготовь 3 истории по STAR: сложная задача, конфликт, ошибка и вывод из неё',
        'Составь 5 вопросов, которые задашь компании в конце собеседования',
        'Пройди мок-интервью с другом или ментором по вопросам этого блока'
      ],
      review: [
        ['Чем серверные компоненты отличаются от клиентских?', 'Серверные рендерятся на сервере, не попадают в бандл и могут читать БД; клиентские (\'use client\') работают в браузере, у них есть state и обработчики событий.'],
        ['Как работать с ветками в команде, чтобы не сломать main?', 'Защищённый main, работа в feature-ветках, PR с ревью и зелёным CI, мерж только после одобрения.'],
        ['Что делает utility-тип Partial?', 'Делает все поля типа необязательными.']
      ],
      interview: [
        { id: 'iv-pitch', src: 'v1', q: 'Расскажите о своём опыте работы', t: 71,
          hint: 'За 2–3 минуты: продукт и компания → твоя роль и стек → 2–3 достижения с цифрами → чем хочешь заниматься дальше. Отрепетируй вслух.' },
        { id: 'iv-estimate', src: 'v1', q: 'Как вы оцениваете задачи?', t: 240,
          hint: 'Уточняю требования, декомпозирую на подзадачи, оцениваю каждую, закладываю буфер на неизвестное и риски. Если появились новые вводные — сразу пересматриваю оценку и сообщаю команде.' },
        { id: 'iv-best-task', src: 'v1', q: 'Самые интересные задачи за последнее время', t: 512,
          hint: 'Выбери 1–2 задачи со сложностью и измеримым результатом. Рассказывай по STAR: ситуация → задача → твои действия → результат.' },
        { id: 'iv-tech-hard', src: 'v1', q: 'В чём была техническая сложность задачи?', t: 650,
          hint: 'Конкретика: какие были ограничения (производительность, легаси, объём данных), какие варианты рассматривал, почему выбрал этот, что сделал бы иначе сейчас.' },
        { id: 'iv-grade', src: 'v1', q: 'На какой грейд вы себя оцениваете?', t: 1132,
          hint: 'Назови грейд и обоснуй: насколько самостоятельно работаешь, за что отвечаешь, влияешь ли на архитектуру и процессы, помогаешь ли другим.' },
        { id: 'iv-leave', src: 'v1', q: 'Почему уходите из текущей компании?', t: 1221,
          hint: 'Без негатива о компании и людях. Акцент на росте: хочу задачи сложнее, другой масштаб, стек или уровень дохода.' },
        { id: 'iv-expect', src: 'v1', q: 'Что ждёте от нового места?', t: 1367,
          hint: 'Задачи, команда, процессы, стек, возможности роста. Свяжи ответ с тем, что предлагает эта компания, чтобы было видно, что ты изучил вакансию.' },
        { id: 'iv-dislike', src: 'v1', q: 'Какие задачи вам не нравятся?', t: 1439,
          hint: 'Честно, но конструктивно: например, задачи без чётких требований — и как ты с этим справляешься (задаю вопросы, фиксирую договорённости).' },
        { id: 'iv-conflict', src: 'v1', q: 'Как вы решаете конфликты в работе?', t: 1536,
          hint: 'Конкретный пример: выяснил позиции сторон, опирался на аргументы и данные, пришли к компромиссу или решению через лида, отношения сохранились.' },
        { id: 'iv-techdebt', src: 'v1', q: 'Что вы делали с техдолгом?', t: 1903,
          hint: 'Фиксировали в бэклоге, оценивали влияние на бизнес и скорость разработки, выделяли долю спринта (например, 20%), рефакторили рядом с фичами и измеряли результат.' }
      ]
    },
    { type: 'level', id: 'lvl-junior', title: 'Джуниор', sub: 'начинаем откликаться' },

    /* ========================= 14 Продакшн ========================= */
    {
      type: 'step', id: 'production', num: '14', title: 'Продакшн', fresh: true,
      checklist: [
        'Тестирование',
        'Виды тестов (пирамида тестирования)',
        'TDD',
        'Jest / Vitest / RTL / Playwright',
        'Lighthouse, PageSpeed (оценка производительности) *',
        ['Безопасность', [mdn('Web/Security')]],
        'Конфигурация и секреты',
        ['+Cookies: HttpOnly, SameSite, Secure', [mdn('Web/HTTP/Guides/Cookies')]],
        ['+XSS', [mdn('Glossary/Cross-site_scripting')],
          'Внедрение чужого скрипта на страницу через пользовательский ввод. Скрипт выполняется от имени пользователя и может украсть данные.'],
        ['+CSRF', [mdn('Glossary/CSRF')],
          'Чужой сайт отправляет запрос на ваш сервер от имени пользователя, пользуясь его cookie.'],
        ['+CSP (Content Security Policy)', [mdn('Web/HTTP/Guides/CSP')]],
        'Мониторинг',
        '+Логирование ошибок (Sentry)',
        '+Аналитика'
      ],
      practice: [
        'Напиши unit-тесты на Vitest для трёх утилит своего проекта (например, форматирование цены и groupBy)',
        'Протестируй форму через React Testing Library: ввод, ошибки валидации, отправка',
        'Напиши e2e-тест на Playwright для сценария «добавить задачу в список»',
        'Подключи Sentry и проверь, что туда приходит специально брошенная ошибка',
        'Добавь заголовок Content-Security-Policy и проверь, что inline-скрипт блокируется'
      ],
      review: [
        ['Как отвечать на вопрос «почему уходите»?', 'Без негатива о прошлом месте, с фокусом на рост: задачи, масштаб, технологии, доход.'],
        ['Что такое SSR и гидрация?', 'HTML рендерится на сервере и приходит готовым, затем React в браузере навешивает обработчики и «оживляет» его — это гидрация.'],
        ['Что такое CI/CD?', 'Автоматические проверки (линт, тесты, сборка) на каждый PR и автоматический деплой после мержа.'],
        ['Где хранить секреты фронтенд-приложения?', 'На фронте секретов быть не должно: всё, что попало в бандл, видно пользователю. Секретные ключи живут только на сервере.']
      ],
      interview: [
        { id: 'iv-tests', src: 'v1', q: 'Как вы пишете тесты?', t: 972,
          hint: 'Пирамида: много unit-тестов, меньше интеграционных, немного e2e. Инструменты: Jest/Vitest, React Testing Library, Playwright. Расскажи, что покрываете в первую очередь и запускаются ли тесты в CI.' },
        { id: 'iv-vuln', src: 'v1', q: 'Какие существуют уязвимости в вебе?', t: 3191,
          hint: 'XSS, CSRF, clickjacking, инъекции, утечка токенов (например, из localStorage), небезопасные зависимости. Защита: экранирование вывода, CSP, cookies HttpOnly/SameSite/Secure, CSRF-токены, X-Frame-Options, аудит пакетов.' }
      ]
    },

    /* ========================= 15 Теория ========================= */
    {
      type: 'step', id: 'theory', num: '15', title: 'Теория', fresh: true,
      checklist: [
        'Алгоритмы и структуры данных',
        ['+O-нотация (оценка сложности алгоритмов)', [],
          'Показывает, как растут время или память при росте входных данных: O(1), O(log n), O(n), O(n log n), O(n²).'],
        '+Хеш-таблицы',
        '+Стек и очередь',
        '+Рекурсия',
        '+Два указателя',
        '+Базовые алгоритмы: бинарный поиск, сортировки',
        'Проектирование',
        'Паттерны проектирования',
        'Принципы SOLID',
        'Принципы DRY & KISS',
        '+FSD (Feature-Sliced Design)',
        '+Монорепозитории, микрофронтенды (Module Federation)'
      ],
      practice: [
        'Реши 5 задач на хеш-таблицы: two sum, анаграммы, первый неповторяющийся символ',
        'Реши 3 задачи на два указателя: палиндром, слияние отсортированных массивов, удаление дубликатов',
        'Реализуй бинарный поиск и оцени его сложность',
        'Напиши проверку правильной скобочной последовательности через стек',
        'Разложи свой пет-проект по слоям FSD (app, pages, widgets, features, entities, shared)'
      ],
      review: [
        ['Что такое пирамида тестирования?', 'В основании много быстрых unit-тестов, в середине меньше интеграционных, на вершине немного медленных e2e.'],
        ['Как защититься от XSS?', 'Не вставлять ввод пользователя как HTML (innerHTML, dangerouslySetInnerHTML), экранировать вывод, настроить CSP, хранить токены в HttpOnly-cookie.'],
        ['Как защититься от CSRF?', 'Cookie с SameSite, CSRF-токены в формах и запросах, проверка заголовка Origin на сервере.'],
        ['Зачем флаг HttpOnly у cookie?', 'Такая cookie недоступна из JavaScript, поэтому её нельзя украсть через XSS.']
      ],
      interview: [
        { id: 'iv-solid', src: 'v1', q: 'Расскажите о принципах SOLID', t: 3860, also: [{ src: 'v2', t: '02:19:11' }],
          hint: 'S — единственная ответственность, O — открыт для расширения, закрыт для изменения, L — подстановка Лисков, I — разделение интерфейсов, D — инверсия зависимостей. Для каждого подготовь пример из фронтенда (компоненты, хуки, сервисы).' },
        { id: 'iv-arch', src: 'v1', q: 'Какие существуют архитектуры фронтенда?', t: 5229,
          hint: 'Слоистая и модульная, FSD, микрофронтенды, монорепозиторий; паттерны MVC/MVVM/Flux. Для каждой: когда подходит, плюсы и минусы. Хорошо, если можешь рассказать, какую выбрали у вас и почему.' }
      ]
    },

    /* ========================= ★ Live coding ========================= */
    {
      type: 'step', id: 'livecoding', num: '★', title: 'Live coding', added: true,
      intro: 'Новый блок из мок-интервью: практические задачи, которые решали на собеседовании. Решайте вслух и с таймером.',
      practice: [
        'Реши задачу на порядок вывода Event Loop из 10+ строк без запуска, затем проверь в консоли',
        'Реализуй Promise.all и Promise.allSettled с нуля и покрой их тестами',
        'Напиши flat для массива любой вложенности — рекурсивно и итеративно',
        'Проведи ревью своего старого React-компонента по чек-листу из подсказки к вопросу про code review',
        'Реши любую задачу из этого блока вслух за 30 минут, записав себя на видео'
      ],
      review: [
        ['Какая сложность у поиска в хеш-таблице?', 'В среднем O(1), в худшем случае O(n) из-за коллизий.'],
        ['Что такое принцип единственной ответственности?', 'У модуля или компонента должна быть одна причина для изменения. Большой компонент делят на логику (хук) и отображение.'],
        ['Как работает бинарный поиск?', 'На отсортированном массиве сравниваем искомое с серединой и отбрасываем половину. Сложность O(log n).'],
        ['Когда рекурсию лучше заменить циклом?', 'При большой глубине — есть риск переполнения стека. Итеративный вариант с собственным стеком безопаснее.']
      ],
      interview: [
        { id: 'iv-lc-eventloop', src: 'v1', q: 'Задача: в каком порядке выведутся console.log (Event Loop)?', t: 5959,
          hint: 'Иди по шагам: сначала весь синхронный код, затем все микрозадачи (then, await), затем макрозадачи (setTimeout) по очереди. После каждой макрозадачи снова выполняются все микрозадачи.' },
        { id: 'iv-lc-promise', src: 'v1', q: 'Задача: реализовать Promise.all и Promise.allSettled', t: 6246,
          hint: 'Возвращаем new Promise, держим массив результатов и счётчик. Результат кладём по индексу, а не через push. all — reject при первой ошибке; allSettled — всегда resolve с объектами {status, value | reason}. Не забудь пустой массив на входе.' },
        { id: 'iv-lc-recursion', src: 'v1', q: 'Задача на рекурсию', t: null,
          note: 'Упоминается в описании видео, отдельного таймкода нет.',
          hint: 'Базовый случай + рекурсивный шаг. Частые задачи: глубокое копирование объекта, flat массива, обход дерева, сумма вложенных значений. Проговори сложность и риск переполнения стека.' },
        { id: 'iv-lc-review', src: 'v1', q: 'Code review и рефакторинг React-компонента', t: null, also: [{ src: 'v2', t: '00:32:59' }, { src: 'v2', t: '01:33:10' }],
          note: 'В первом видео разбирается во второй части (платная часть у автора).',
          hint: 'Ищи: мутацию state, отсутствие или индекс в key, эффекты без зависимостей и cleanup, гонки запросов, лишние ререндеры, смешение логики и отображения, отсутствие обработки загрузки и ошибок, слабую типизацию.' },
        { id: 'v2-lc-console', src: 'v2', t: '00:44:55', q: 'Задача: что выведется в консоль при рендере компонентов?',
          hint: 'Помни порядок: рендер родителя → рендер детей → эффекты детей → эффекты родителя. useLayoutEffect выполняется раньше useEffect. В StrictMode в разработке рендер и эффекты вызываются дважды.' },
        { id: 'v2-lc-toggle', src: 'v2', t: '01:22:33', q: 'Задача: написать кастомный хук useToggle',
          hint: 'const [value, setValue] = useState(initial); toggle = useCallback(() => setValue(v => !v), []). Вернуть [value, toggle] и при желании setTrue/setFalse. Используй функциональное обновление.' },
        { id: 'v2-lc-debounce', src: 'v2', t: '01:54:20', q: 'Задача: написать хук useDebounce',
          hint: 'useEffect ставит setTimeout, который через delay записывает value в state, а cleanup очищает таймер при каждом новом значении. Хук возвращает отложенное значение.' },
        { id: 'v2-lc-tree', src: 'v2', t: '01:57:47', q: 'Задача: рекурсивно отрендерить дерево файлов и папок',
          hint: 'Компонент Node рендерит имя и, если это папка, список детей через map, вызывая сам себя. Состояние «раскрыто/свёрнуто» хранится в самом узле, key — по id или пути.' }
      ]
    },

    /* ========================= 16 Back-end ========================= */
    {
      type: 'step', id: 'backend', num: '16', title: 'Back-end база',
      checklist: [
        ['Авторизация и аутентификация, JWT', [mdn('Web/HTTP/Guides/Authentication', 'MDN: HTTP-аутентификация')],
          'Аутентификация — проверка, кто ты (логин). Авторизация — что тебе можно (права). JWT — подписанный токен с данными пользователя, который сервер может проверить без хранения сессии.'],
        ['SQL / NoSQL', [],
          'SQL — реляционные таблицы со схемой и связями (PostgreSQL, MySQL). NoSQL — документы, ключ-значение и другие модели без жёсткой схемы (MongoDB, Redis).'],
        '+Supabase',
        '+Auth providers',
        '+Security-минимум: OWASP Top 10 (заметная доля ИИ-кода содержит эти уязвимости)',
        '+Docker'
      ],
      practice: [
        'Сделай регистрацию и вход через Supabase Auth в своём Next.js-проекте',
        'Спроектируй таблицы для блога (users, posts, comments) и напиши SQL-запрос постов с количеством комментариев',
        'Добавь вход через GitHub как OAuth-провайдера',
        'Упакуй Next.js-приложение в Docker-образ и запусти контейнер локально',
        'Проверь свой проект по OWASP Top 10: инъекции, контроль доступа, хранение секретов'
      ],
      review: [
        ['Как устроена реализация Promise.all?', 'new Promise, счётчик выполненных, результаты по индексу, reject при первой ошибке и resolve, когда счётчик равен длине массива.'],
        ['Что такое FSD?', 'Методология: слои app, pages, widgets, features, entities, shared; импорты только сверху вниз; у каждого слайса публичный API.'],
        ['Что такое CSP?', 'HTTP-заголовок, который задаёт, откуда можно загружать скрипты, стили и другие ресурсы, — защита от XSS.'],
        ['Какая сложность у бинарного поиска и почему?', 'O(log n): на каждом шаге отбрасывается половина оставшихся элементов.']
      ]
    },
    { type: 'level', id: 'lvl-middle', title: 'Миддл', sub: '' },

    /* ========================= 17 ИИ-3 ========================= */
    {
      type: 'step', id: 'ai-3', num: '17', title: 'ИИ-3', fresh: true,
      checklist: [
        ['ИИ-агенты (цикл, инструменты)', [['видео', 'https://youtu.be/yTRYqUk9q3I']]],
        ['Prompt injection', [['видео', 'https://youtu.be/yTRYqUk9q3I?t=657']]],
        'Harness',
        'Loop engineering *',
        'Graph engineering *'
      ],
      practice: [
        'Напиши простого агента: цикл «модель → вызов инструмента → результат обратно модели» с одним инструментом',
        'Добавь в проект чат с LLM через свой бэкенд и потоковый вывод ответа на фронте',
        'Спрячь вредную инструкцию в данных для своего агента, воспроизведи prompt injection и добавь защиту',
        'Настрой цикл, в котором агент сам запускает тесты и исправляет код, пока они не пройдут'
      ],
      review: [
        ['Где безопаснее хранить JWT?', 'В HttpOnly-cookie с флагами Secure и SameSite: так токен не прочитать из JavaScript при XSS. В localStorage он доступен любому скрипту на странице.'],
        ['Зачем фронтенд-разработчику Docker?', 'Одинаковое окружение везде: приложение одинаково запускается локально, в CI и на сервере.'],
        ['Что такое MCP?', 'Протокол подключения внешних инструментов и данных к ИИ-моделям.'],
        ['Как проверить, что код от ИИ не содержит уязвимостей?', 'Ревью по OWASP Top 10, линтеры безопасности, аудит зависимостей и тесты на граничные случаи.']
      ],
      interview: [
        { id: 'ai3-agent', src: 'own', q: 'Как устроен ИИ-агент?',
          hint: 'Цикл: модель получает задачу и список инструментов, решает вызвать инструмент, получает результат и повторяет, пока задача не решена. Harness — всё окружение вокруг модели: инструменты, контекст, права и ограничения.' },
        { id: 'ai3-injection', src: 'own', q: 'Что такое prompt injection и как защитить приложение с LLM?',
          hint: 'Вредные инструкции в данных (письмо, веб-страница, файл), которые модель принимает за команды. Защита: минимум прав у модели, разделение данных и инструкций, подтверждение опасных действий человеком, проверка вывода.' },
        { id: 'ai3-chat', src: 'own', q: 'Практика: как встроить LLM-чат во фронтенд-приложение?',
          hint: 'Запросы через свой бэкенд (ключ API не должен попасть на клиент), потоковый ответ через stream/SSE, отмена через AbortController, лимиты и обработка ошибок, безопасный рендер markdown без XSS.' },
        { id: 'ai3-evals', src: 'own', q: 'Как оценить качество ИИ-функции в продукте?',
          hint: 'Набор тестовых сценариев (evals) с ожидаемым результатом, автоматический прогон при смене промпта или модели, метрики и ручная проверка выборки ответов.' }
      ]
    },
    { type: 'finish', id: 'finish', title: 'Финиш маршрута' }
  ]
};
