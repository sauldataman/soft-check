import { terms } from './data.js';
import { ui } from './locales/ui.js';
import { termPacks } from './locales/term-packs.js';

export const LANGS = [
  { id: 'zh-CN', label: '简体中文', htmlLang: 'zh-Hans', locale: 'zh-Hans' },
  { id: 'zh-TW', label: '繁體中文', htmlLang: 'zh-Hant', locale: 'zh-Hant' },
  { id: 'en', label: 'English', htmlLang: 'en', locale: 'en' },
  { id: 'es', label: 'Español', htmlLang: 'es', locale: 'es' },
  { id: 'ja', label: '日本語', htmlLang: 'ja', locale: 'ja' },
  { id: 'ko', label: '한국어', htmlLang: 'ko', locale: 'ko' },
  { id: 'vi', label: 'Tiếng Việt', htmlLang: 'vi', locale: 'vi' },
  { id: 'ru', label: 'Русский', htmlLang: 'ru', locale: 'ru' },
  { id: 'fr', label: 'Français', htmlLang: 'fr', locale: 'fr' },
  { id: 'it', label: 'Italiano', htmlLang: 'it', locale: 'it' },
];

const STORAGE_KEY = 'soft-check-lang';

export const ANS_KEYS = {
  same: 'ansSame',
  split: 'ansSplit',
  none: 'ansNone',
  tbd: 'ansTbd',
};

export const CAT_SHORT = { commit: 'catCommit', mode: 'catMode', warn: 'catWarn' };
export const CAT_TITLE = { commit: 'catTitleCommit', mode: 'catTitleMode', warn: 'catTitleWarn' };
export const CAT_BLURB = { commit: 'catBlurbCommit', mode: 'catBlurbMode', warn: 'catBlurbWarn' };

/** @type {string} */
let current = 'zh-CN';

export function normalizeLang(raw) {
  if (raw == null) return null;
  const hit = LANGS.find((l) => l.id.toLowerCase() === String(raw).trim().toLowerCase());
  return hit ? hit.id : null;
}

function readStored() {
  try {
    return normalizeLang(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStored(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode or blocked storage */
  }
}

/** `?lang=` wins and is written through to localStorage so the other page follows. */
export function initLang() {
  const fromQuery = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
  if (fromQuery) {
    current = fromQuery;
    writeStored(fromQuery);
    return current;
  }
  current = readStored() || 'zh-CN';
  return current;
}

export function getLang() {
  return current;
}

export function getLocale() {
  return LANGS.find((l) => l.id === current)?.locale || 'zh-Hans';
}

export function setLang(next) {
  const lang = normalizeLang(next);
  if (!lang) return current;
  current = lang;
  writeStored(lang);
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  return current;
}

export function t(key, vars) {
  const pack = ui[current] || ui['zh-CN'];
  let text = pack[key] ?? ui['zh-CN'][key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

/** Local name, definition, and vibe for the active language. English gloss is always `term.en`. */
export function termCopy(term) {
  if (current === 'zh-CN') {
    return { name: term.zh, tip: term.tip, vibe: term.vibe, en: term.en };
  }
  const row = termPacks[current]?.[term.en];
  if (!row) return { name: term.zh, tip: term.tip, vibe: term.vibe, en: term.en };
  return { name: row[0], tip: row[1], vibe: row[2], en: term.en };
}

/** Search blob across every language plus the English gloss, so a query survives a language switch. */
export function termSearchText(term) {
  const parts = [term.en, term.zh, term.tip, term.vibe];
  for (const pack of Object.values(termPacks)) {
    const row = pack[term.en];
    if (row) parts.push(row[0], row[1], row[2]);
  }
  return parts.join('\n').toLowerCase();
}

export function formalityKey(n) {
  if (n >= 3) return 'form3';
  if (n === 2) return 'form2';
  return 'form1';
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** English gloss, marked so browser page-translate leaves the original term alone. */
export function glossHtml(en) {
  return `<span class="term-gloss" lang="en" translate="no"><span class="gloss-tag">EN</span> ${escapeHtml(en)}</span>`;
}

export function withLang(href) {
  const [path, qs = ''] = String(href).split('?');
  const params = new URLSearchParams(qs);
  params.set('lang', current);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function langPickerHtml() {
  const options = LANGS.map(
    (lang) =>
      `<option value="${lang.id}"${lang.id === current ? ' selected' : ''}>${escapeHtml(lang.label)}</option>`,
  ).join('');
  return `
    <div class="lang-picker">
      <label for="lang-select">${escapeHtml(t('langLabel'))}</label>
      <select id="lang-select">${options}</select>
    </div>`;
}

export function bindLangPicker(rerender) {
  const select = document.getElementById('lang-select');
  if (!select) return;
  select.addEventListener('change', () => {
    setLang(select.value);
    rerender();
  });
}

export function applyDocument(page) {
  const meta = LANGS.find((lang) => lang.id === current);
  document.documentElement.lang = meta?.htmlLang || 'zh-Hans';
  document.title = page === 'table' ? t('docTitleTable') : t('docTitleCheck');
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', page === 'table' ? t('metaTable') : t('metaCheck'));
  }
}

function placeholders(text) {
  return [...String(text).matchAll(/\{[a-zA-Z]+\}/g)].map((match) => match[0]).sort().join(',');
}

function assertCoverage() {
  const uiLangs = LANGS.map((lang) => lang.id);
  const baseKeys = Object.keys(ui['zh-CN']);
  if (baseKeys.length === 0) throw new Error('ui zh-CN is empty');
  for (const lang of uiLangs) {
    if (!ui[lang]) throw new Error(`ui missing ${lang}`);
    for (const key of baseKeys) {
      const value = ui[lang][key];
      if (typeof value !== 'string' || !value.trim()) throw new Error(`ui missing ${lang}.${key}`);
      if (placeholders(value) !== placeholders(ui['zh-CN'][key])) {
        throw new Error(`ui placeholders differ ${lang}.${key}`);
      }
    }
    const extra = Object.keys(ui[lang]).filter((key) => !baseKeys.includes(key));
    if (extra.length) throw new Error(`ui extra keys in ${lang}: ${extra.join(', ')}`);
  }

  const packLangs = uiLangs.filter((lang) => lang !== 'zh-CN');
  const ens = terms.map((term) => term.en);
  if (new Set(ens).size !== ens.length) throw new Error('duplicate English term keys');
  for (const lang of packLangs) {
    if (!termPacks[lang]) throw new Error(`term pack missing ${lang}`);
    const keys = Object.keys(termPacks[lang]);
    for (const en of ens) {
      const row = termPacks[lang][en];
      if (!row || row.length !== 3 || row.some((part) => !String(part).trim())) {
        throw new Error(`term copy missing ${lang} / ${en}`);
      }
      if (lang !== 'en' && row[1] === termPacks.en[en][1]) {
        throw new Error(`untranslated tip ${lang} / ${en}`);
      }
    }
    const extra = keys.filter((key) => !ens.includes(key));
    if (extra.length) throw new Error(`extra terms in ${lang}: ${extra.join(', ')}`);
  }
}

assertCoverage();
