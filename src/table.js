import './style.css';
import {
  terms,
  TERM_COUNT,
  catLabel,
  catBlurb,
  catTitle,
  formalityLabel,
  sortByFormality,
} from './data.js';

const params = new URLSearchParams(window.location.search);

const state = {
  cat: 'all',
  q: params.get('q') || '',
  highlightEn: params.get('q') || '',
};

const root = document.getElementById('app');

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function countBy(cat) {
  return terms.filter((t) => t.cat === cat).length;
}

function filteredTerms() {
  const needle = state.q.trim().toLowerCase();
  const list = terms.filter((t) => {
    if (state.cat !== 'all' && t.cat !== state.cat) return false;
    if (!needle) return true;
    return (
      t.en.toLowerCase().includes(needle) ||
      t.zh.includes(needle) ||
      t.tip.includes(needle) ||
      t.vibe.includes(needle)
    );
  });
  return sortByFormality(list);
}

function catSegHtml() {
  return `
    <div class="seg cat-seg" role="tablist" aria-label="分类">
      <button type="button" data-cat="all" class="${state.cat === 'all' ? 'active' : ''}">全部 <span class="count">${terms.length}</span></button>
      <button type="button" data-cat="commit" class="${state.cat === 'commit' ? 'active' : ''}" title="${escapeHtml(catBlurb('commit'))}">承诺 <span class="count">${countBy('commit')}</span></button>
      <button type="button" data-cat="mode" class="${state.cat === 'mode' ? 'active' : ''}" title="${escapeHtml(catBlurb('mode'))}">互动 <span class="count">${countBy('mode')}</span></button>
      <button type="button" data-cat="warn" class="${state.cat === 'warn' ? 'active' : ''}" title="${escapeHtml(catBlurb('warn'))}">警示 <span class="count">${countBy('warn')}</span></button>
    </div>
    <div class="cat-blurbs">
      <div class="cat-blurb"><strong>承诺（结构）</strong>：${escapeHtml(catBlurb('commit'))}</div>
      <div class="cat-blurb"><strong>互动（形态）</strong>：${escapeHtml(catBlurb('mode'))}</div>
      <div class="cat-blurb"><strong>警示（风险）</strong>：${escapeHtml(catBlurb('warn'))}</div>
      <div class="cat-blurb"><strong>排序</strong>：同类内按正式 → 不正式（正式气质靠前）；分类顺序为承诺 → 互动 → 警示。</div>
    </div>`;
}

function tableViewHtml(filtered) {
  const order = /** @type {import('./data.js').Cat[]} */ (['commit', 'mode', 'warn']);
  const groups = order
    .map((cat) => ({
      cat,
      rows: filtered.filter((t) => t.cat === cat),
    }))
    .filter((g) => g.rows.length > 0);

  if (groups.length === 0) {
    return `
      <div class="callout warning empty">
        <div class="lead">没搜到</div>
        <p>换个关键词试试，或把分类切回「全部」。</p>
      </div>`;
  }

  const blocks = groups
    .map((g) => {
      const rows = g.rows
        .map((t) => {
          const hi = state.highlightEn && state.highlightEn.toLowerCase() === t.en.toLowerCase()
            ? ' class="row-hi"'
            : '';
          const safeId = `row-${t.en.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
          return `
            <tr${hi} id="${safeId}">
              <td class="col-zh">${escapeHtml(t.zh)}</td>
              <td class="col-en">${escapeHtml(t.en)}</td>
              <td class="col-tip">${escapeHtml(t.tip)}</td>
              <td class="col-vibe"><span class="pill">${escapeHtml(t.vibe)}</span></td>
              <td class="col-cat"><span class="pill">${escapeHtml(formalityLabel(t.formality))}</span></td>
            </tr>`;
        })
        .join('');
      return `
        <div class="table-group">
          <h3 class="table-group-title">${escapeHtml(catTitle(g.cat))} <span class="count">${g.rows.length}</span></h3>
          <p class="table-group-blurb">${escapeHtml(catBlurb(g.cat))} · 组内正式→不正式</p>
          <div class="table-scroll">
            <table class="term-table">
              <thead>
                <tr>
                  <th>中文</th>
                  <th>英文</th>
                  <th>定义</th>
                  <th>气质</th>
                  <th>正式度</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    })
    .join('');

  return `
    <p class="table-caption">共 ${TERM_COUNT} 条 · 当前显示 ${filtered.length} 条 · 正式→不正式</p>
    ${blocks}`;
}

function render() {
  const filtered = filteredTerms();

  root.innerHTML = `
    <header class="hero">
      <h1>关系全表</h1>
      <p>查定义用。按承诺 / 互动 / 警示分类，组内从正式到不正式排列。</p>
      <div class="badge-row">
        <span class="badge">共 ${TERM_COUNT} 条</span>
        <span class="badge">正式 → 不正式</span>
        <span class="badge">可搜索</span>
      </div>
    </header>

    <a class="back-banner" href="./index.html">
      <span class="back-banner-title">← 返回自查</span>
      <span class="back-banner-desc">选功能、看推荐、从推荐池抽卡</span>
    </a>

    <section class="section" id="table">
      <h2>完整词汇表</h2>
      <p class="lead">分类筛选 + 搜索；同分类内正式气质靠前。</p>
      ${catSegHtml()}
      <div class="toolbar">
        <div class="field search-field">
          <label for="search">搜索</label>
          <input id="search" type="search" placeholder="比如：幽灵、FWB、开放…" value="${escapeHtml(state.q)}" />
        </div>
      </div>
      ${tableViewHtml(filtered)}
    </section>

    <a class="back-banner" href="./index.html">
      <span class="back-banner-title">← 返回自查</span>
      <span class="back-banner-desc">找更舒适的关系组合</span>
    </a>

    <footer class="site-footer">
      <p>整理自现代关系术语表与 -ship 扩展表 · 共 ${TERM_COUNT} 条 · <a href="./index.html">回到自查</a></p>
    </footer>

    <button type="button" class="back-top" id="back-top" title="回到上面">回到上面</button>
  `;

  bind();

  if (state.highlightEn) {
    const safeId = `row-${state.highlightEn.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    const el = document.getElementById(safeId);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      window.setTimeout(() => {
        state.highlightEn = '';
        document.querySelectorAll('tr.row-hi').forEach((tr) => tr.classList.remove('row-hi'));
      }, 2400);
    }
  }
}

function bind() {
  root.querySelectorAll('.seg button[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.cat = btn.dataset.cat;
      render();
    });
  });

  const search = root.querySelector('#search');
  if (search) {
    search.addEventListener('input', (e) => {
      state.q = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const again = document.getElementById('search');
      if (again) {
        again.focus();
        again.setSelectionRange(pos, pos);
      }
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
