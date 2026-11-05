import './style.css';
import { ansValues, TERM_COUNT, reading, matchTerms } from './data.js';
import {
  ANS_KEYS,
  CAT_SHORT,
  applyDocument,
  bindLangPicker,
  escapeHtml,
  glossHtml,
  initLang,
  langPickerHtml,
  t,
  termCopy,
  withLang,
} from './i18n.js';

initLang();

const state = {
  live: 'tbd',
  kid: 'tbd',
  sleep: 'tbd',
  play: 'tbd',
  /** 推荐池内下标 */
  idx: 0,
};

const root = document.getElementById('app');

function allTbd() {
  return [state.live, state.kid, state.sleep, state.play].every((value) => value === 'tbd');
}

/** 抽卡 / 推荐池：仅来自 matchTerms；全 tbd 或无匹配则为空 */
function matchPool() {
  if (allTbd()) return [];
  return matchTerms(state.live, state.kid, state.sleep, state.play);
}

function selectHtml(id, label, value) {
  const opts = ansValues
    .map((option) => {
      const text = t(ANS_KEYS[option]);
      return `<option value="${option}" ${option === value ? 'selected' : ''}>${escapeHtml(text)}</option>`;
    })
    .join('');
  return `
    <div class="field">
      <label for="${id}">${escapeHtml(label)}</label>
      <select id="${id}" data-field="${id}">${opts}</select>
    </div>`;
}

function matchesHtml(matches) {
  if (matches.length === 0) {
    return `
      <div class="match-box soft" id="match-results">
        <div class="match-title">${escapeHtml(t('matchTitle'))}</div>
        <p class="match-empty">${escapeHtml(t('matchEmpty'))}</p>
      </div>`;
  }

  const cards = matches
    .map((match) => {
      const copy = termCopy(match.term);
      return `
      <a class="match-card" href="${withLang(`./table.html?q=${encodeURIComponent(match.term.en)}`)}">
        <div class="match-card-top">
          <span class="match-zh term-name">${escapeHtml(copy.name)}</span>
          <span class="pill ${match.term.cat === 'warn' ? 'warn' : 'ok'}">${escapeHtml(t(CAT_SHORT[match.term.cat]))}</span>
        </div>
        <div class="match-en">${glossHtml(copy.en)} · ${escapeHtml(copy.vibe)}</div>
        <p class="match-tip">${escapeHtml(copy.tip)}</p>
        <p class="match-why">${escapeHtml(t(match.why))}</p>
      </a>`;
    })
    .join('');

  return `
    <div class="match-box" id="match-results">
      <div class="match-title">${escapeHtml(t('matchTitle'))} <span class="match-count">${matches.length}</span></div>
      <p class="match-hint">${escapeHtml(t('matchHint'))}</p>
      <div class="match-grid">${cards}</div>
    </div>`;
}

function drawSectionHtml(matches) {
  if (matches.length === 0) {
    return `
      <div class="draw-block" id="draw">
        <h3 class="draw-title">${escapeHtml(t('drawTitle'))}</h3>
        <p class="lead">${escapeHtml(t('drawEmptyLead'))}</p>
        <div class="callout info empty">
          <div class="lead">${escapeHtml(t('drawLockedTitle'))}</div>
          <p>${escapeHtml(t('drawLockedBody'))}</p>
        </div>
      </div>`;
  }

  const pool = matches.map((match) => match.term);
  const safeIdx = ((state.idx % pool.length) + pool.length) % pool.length;
  const card = pool[safeIdx];
  const copy = termCopy(card);
  const why = matches[safeIdx]?.why ?? '';

  return `
    <div class="draw-block" id="draw">
      <h3 class="draw-title">${escapeHtml(t('drawTitle'))}</h3>
      <p class="lead">${escapeHtml(t('drawLead', { n: pool.length }))}</p>
      <div class="card-panel" id="term-card">
        <div class="zh term-name">${escapeHtml(copy.name)}</div>
        <div class="en">${glossHtml(copy.en)} · ${escapeHtml(copy.vibe)}</div>
        <p class="tip">${escapeHtml(copy.tip)}</p>
        ${why ? `<p class="match-why" style="margin:0.45rem 0 0">${escapeHtml(t(why))}</p>` : ''}
        <div class="meta-row">
          <span class="pill ${card.cat === 'warn' ? 'warn' : 'ok'}">${escapeHtml(t(CAT_SHORT[card.cat]))}</span>
          <span class="pill">${escapeHtml(copy.vibe)}</span>
        </div>
      </div>
      <div class="nav-btns">
        <button type="button" id="prev-card">${escapeHtml(t('prev'))}</button>
        <button type="button" id="rand-card" class="primary">${escapeHtml(t('drawBtn'))}</button>
        <button type="button" id="next-card">${escapeHtml(t('next'))}</button>
      </div>
      <p class="hint">${escapeHtml(t('drawPos', { i: safeIdx + 1, n: pool.length }))}</p>
      <p class="dict-note"><a href="${withLang(`./table.html?q=${encodeURIComponent(card.en)}`)}">${escapeHtml(t('seeDef', { name: copy.name }))}</a></p>
    </div>`;
}

function tableBannerHtml() {
  return `
    <a class="table-banner" href="${withLang('./table.html')}">
      <div class="table-banner-kicker">${escapeHtml(t('bannerKicker', { n: TERM_COUNT }))}</div>
      <div class="table-banner-title">${escapeHtml(t('bannerTitle'))}</div>
      <p class="table-banner-desc">${escapeHtml(t('bannerDesc'))}</p>
      <span class="table-banner-cta">${escapeHtml(t('bannerCta'))}</span>
    </a>`;
}

function render() {
  applyDocument('check');
  const verdict = reading(state.live, state.kid, state.sleep, state.play);
  const matches = matchPool();

  root.innerHTML = `
    <header class="hero">
      <div class="hero-bar">
        <div class="hero-copy">
          <h1>${escapeHtml(t('checkTitle'))}</h1>
          <p>${escapeHtml(t('checkSubtitle'))}</p>
        </div>
        ${langPickerHtml()}
      </div>
      <div class="badge-row">
        <span class="badge">${escapeHtml(t('badgeCheck'))}</span>
        <span class="badge">${escapeHtml(t('badgeDraw'))}</span>
        <span class="badge">${escapeHtml(t('badgeTablePage'))}</span>
      </div>
    </header>

    ${tableBannerHtml()}

    <section class="section" id="check">
      <h2>${escapeHtml(t('comboTitle'))}</h2>
      <p class="lead">${escapeHtml(t('comboLead'))}</p>
      <div class="grid-2">
        ${selectHtml('live', t('fieldLive'), state.live)}
        ${selectHtml('kid', t('fieldKid'), state.kid)}
        ${selectHtml('sleep', t('fieldSleep'), state.sleep)}
        ${selectHtml('play', t('fieldPlay'), state.play)}
      </div>
      <p class="verdict-line ${escapeHtml(verdict.tone)}">${escapeHtml(t(`${verdict.id}Lead`))} · ${escapeHtml(t(`${verdict.id}Body`))}</p>
      ${matchesHtml(matches)}
      ${drawSectionHtml(matches)}
      <div class="props">
        <div class="prop"><span class="k">${escapeHtml(t('propLive'))}</span><span class="v">${escapeHtml(t(ANS_KEYS[state.live]))}</span></div>
        <div class="prop"><span class="k">${escapeHtml(t('propKid'))}</span><span class="v">${escapeHtml(t(ANS_KEYS[state.kid]))}</span></div>
        <div class="prop"><span class="k">${escapeHtml(t('propSleep'))}</span><span class="v">${escapeHtml(t(ANS_KEYS[state.sleep]))}</span></div>
        <div class="prop"><span class="k">${escapeHtml(t('propPlay'))}</span><span class="v">${escapeHtml(t(ANS_KEYS[state.play]))}</span></div>
      </div>
      <div class="btn-row">
        <button type="button" id="reset-btn" class="ghost">${escapeHtml(t('reset'))}</button>
      </div>
    </section>

    ${tableBannerHtml()}

    <footer class="site-footer">
      <p>${escapeHtml(t('footer', { n: TERM_COUNT }))} · <a href="${withLang('./table.html')}">${escapeHtml(t('footerTableLink'))}</a></p>
    </footer>

    <button type="button" class="back-top" id="back-top" title="${escapeHtml(t('backTop'))}">${escapeHtml(t('backTop'))}</button>
  `;

  bind(matches);
}

function bind(matches) {
  bindLangPicker(render);

  root.querySelectorAll('select[data-field]').forEach((el) => {
    el.addEventListener('change', (event) => {
      const key = event.target.dataset.field;
      state[key] = event.target.value;
      state.idx = 0;
      render();
      const box = document.getElementById('match-results');
      if (box && !allTbd()) {
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  const reset = root.querySelector('#reset-btn');
  if (reset) {
    reset.addEventListener('click', () => {
      state.live = 'tbd';
      state.kid = 'tbd';
      state.sleep = 'tbd';
      state.play = 'tbd';
      state.idx = 0;
      render();
    });
  }

  const poolLen = matches.length;
  const prev = root.querySelector('#prev-card');
  const next = root.querySelector('#next-card');
  const rand = root.querySelector('#rand-card');
  if (prev) {
    prev.addEventListener('click', () => {
      state.idx -= 1;
      render();
      document.getElementById('draw')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (next) {
    next.addEventListener('click', () => {
      state.idx += 1;
      render();
      document.getElementById('draw')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (rand) {
    rand.addEventListener('click', () => {
      if (poolLen === 0) return;
      if (poolLen === 1) {
        state.idx = 0;
      } else {
        let nextIdx = Math.floor(Math.random() * poolLen);
        const cur = ((state.idx % poolLen) + poolLen) % poolLen;
        if (nextIdx === cur) nextIdx = (nextIdx + 1) % poolLen;
        state.idx = nextIdx;
      }
      render();
      document.getElementById('draw')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  const back = root.querySelector('#back-top');
  if (back) {
    back.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

render();
