import './style.css';
import {
  ansOptions,
  TERM_COUNT,
  reading,
  matchTerms,
  catLabel,
  labelFor,
} from './data.js';

const state = {
  live: 'tbd',
  kid: 'tbd',
  sleep: 'tbd',
  play: 'tbd',
  /** 推荐池内下标 */
  idx: 0,
};

const root = document.getElementById('app');

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function allTbd() {
  return [state.live, state.kid, state.sleep, state.play].every((v) => v === 'tbd');
}

/** 抽卡 / 推荐池：仅来自 matchTerms；全 tbd 或无匹配则为空 */
function matchPool() {
  if (allTbd()) return [];
  return matchTerms(state.live, state.kid, state.sleep, state.play);
}

function selectHtml(id, label, value) {
  const opts = ansOptions
    .map(
      (o) =>
        `<option value="${o.value}" ${o.value === value ? 'selected' : ''}>${escapeHtml(o.label)}</option>`,
    )
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
        <div class="match-title">可能适合你的关系词</div>
        <p class="match-empty">把上面四个选项点一点；选完会在这里推相关条目，帮你找更舒适的形态。</p>
      </div>`;
  }

  const cards = matches
    .map(
      (m) => `
      <a class="match-card" href="./table.html?q=${encodeURIComponent(m.term.en)}">
        <div class="match-card-top">
          <span class="match-zh">${escapeHtml(m.term.zh)}</span>
          <span class="pill ${m.term.cat === 'warn' ? 'warn' : 'ok'}">${escapeHtml(catLabel(m.term.cat))}</span>
        </div>
        <div class="match-en">${escapeHtml(m.term.en)} · ${escapeHtml(m.term.vibe)}</div>
        <p class="match-tip">${escapeHtml(m.term.tip)}</p>
        <p class="match-why">${escapeHtml(m.why)}</p>
      </a>`,
    )
    .join('');

  return `
    <div class="match-box" id="match-results">
      <div class="match-title">可能适合你的关系词 <span class="match-count">${matches.length}</span></div>
      <p class="match-hint">根据你的组合推的；点卡片可到全表看定义。下面「抽一张」也只从这池里抽。</p>
      <div class="match-grid">${cards}</div>
    </div>`;
}

function drawSectionHtml(matches) {
  if (matches.length === 0) {
    return `
      <div class="draw-block" id="draw">
        <h3 class="draw-title">抽一张</h3>
        <p class="lead">只从上面「可能适合你的关系词」里随机抽——先完成自查才会出现可抽的池子。</p>
        <div class="callout info empty">
          <div class="lead">还不能抽</div>
          <p>先把四个功能选一选（别全留「还在想」）。有推荐词之后，再回来抽。</p>
        </div>
      </div>`;
  }

  const pool = matches.map((m) => m.term);
  const safeIdx = ((state.idx % pool.length) + pool.length) % pool.length;
  const card = pool[safeIdx];
  const why = matches[safeIdx]?.why ?? '';

  return `
    <div class="draw-block" id="draw">
      <h3 class="draw-title">抽一张</h3>
      <p class="lead">池子：可能适合你的关系词 · ${pool.length} 个。上一张 / 下一张也在同一池里翻。</p>
      <div class="card-panel" id="term-card">
        <div class="en">${escapeHtml(card.en)}</div>
        <div class="zh">${escapeHtml(card.zh)} · ${escapeHtml(card.vibe)}</div>
        <p class="tip">${escapeHtml(card.tip)}</p>
        ${why ? `<p class="match-why" style="margin:0.45rem 0 0">${escapeHtml(why)}</p>` : ''}
        <div class="meta-row">
          <span class="pill ${card.cat === 'warn' ? 'warn' : 'ok'}">${escapeHtml(catLabel(card.cat))}</span>
          <span class="pill">${escapeHtml(card.vibe)}</span>
        </div>
      </div>
      <div class="nav-btns">
        <button type="button" id="prev-card">上一张</button>
        <button type="button" id="rand-card" class="primary">抽一张</button>
        <button type="button" id="next-card">下一张</button>
      </div>
      <p class="hint">第 ${safeIdx + 1} / ${pool.length} · 推荐池</p>
      <p class="dict-note"><a href="./table.html?q=${encodeURIComponent(card.en)}">在全表看「${escapeHtml(card.zh)}」定义 →</a></p>
    </div>`;
}

function tableBannerHtml() {
  return `
    <a class="table-banner" href="./table.html">
      <div class="table-banner-kicker">查定义 · 共 ${TERM_COUNT} 条</div>
      <div class="table-banner-title">打开关系全表</div>
      <p class="table-banner-desc">承诺 / 互动 / 警示分类 · 正式→不正式排序 · 可搜索</p>
      <span class="table-banner-cta">去全表 →</span>
    </a>`;
}

function render() {
  const verdict = reading(state.live, state.kid, state.sleep, state.play);
  const matches = matchPool();

  root.innerHTML = `
    <header class="hero">
      <h1>现代两性关系自查</h1>
      <p>帮你找到更舒适的关系形态；需要查定义时，一键跳到全表。</p>
      <div class="badge-row">
        <span class="badge">自查推词</span>
        <span class="badge">推荐池抽卡</span>
        <span class="badge">全表另页</span>
      </div>
    </header>

    ${tableBannerHtml()}

    <section class="section" id="check">
      <h2>你的关系组合</h2>
      <p class="lead">四个功能不必捆在同一个人身上。选一选「现在」或「想要」——选完会推相关关系词。</p>
      <div class="grid-2">
        ${selectHtml('live', '一起生活', state.live)}
        ${selectHtml('kid', '生 / 养小孩', state.kid)}
        ${selectHtml('sleep', '睡觉 / 性', state.sleep)}
        ${selectHtml('play', '玩 / 陪伴', state.play)}
      </div>
      <p class="verdict-line ${escapeHtml(verdict.tone)}">${escapeHtml(verdict.lead)} · ${escapeHtml(verdict.body)}</p>
      ${matchesHtml(matches)}
      ${drawSectionHtml(matches)}
      <div class="props">
        <div class="prop"><span class="k">同居</span><span class="v">${escapeHtml(labelFor(state.live))}</span></div>
        <div class="prop"><span class="k">亲权</span><span class="v">${escapeHtml(labelFor(state.kid))}</span></div>
        <div class="prop"><span class="k">身体</span><span class="v">${escapeHtml(labelFor(state.sleep))}</span></div>
        <div class="prop"><span class="k">陪伴</span><span class="v">${escapeHtml(labelFor(state.play))}</span></div>
      </div>
      <div class="btn-row">
        <button type="button" id="reset-btn" class="ghost">全部重置成「还在想」</button>
      </div>
    </section>

    ${tableBannerHtml()}

    <footer class="site-footer">
      <p>整理自现代关系术语表与 -ship 扩展表 · 共 ${TERM_COUNT} 条 · <a href="./table.html">关系全表</a></p>
    </footer>

    <button type="button" class="back-top" id="back-top" title="回到上面">回到上面</button>
  `;

  bind(matches);
}

function bind(matches) {
  root.querySelectorAll('select[data-field]').forEach((el) => {
    el.addEventListener('change', (e) => {
      const key = e.target.dataset.field;
      state[key] = e.target.value;
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
