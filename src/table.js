import './style.css';
import { terms, TERM_COUNT, sortByFormality } from './data.js';
import {
  CAT_BLURB,
  CAT_SHORT,
  CAT_TITLE,
  applyDocument,
  bindLangPicker,
  escapeHtml,
  formalityKey,
  getLocale,
  glossHtml,
  initLang,
  langPickerHtml,
  t,
  termCopy,
  termSearchText,
  withLang,
} from './i18n.js';

initLang();

const params = new URLSearchParams(window.location.search);

const state = {
  cat: 'all',
  q: params.get('q') || '',
  highlightEn: params.get('q') || '',
};

const root = document.getElementById('app');

function countBy(cat) {
  return terms.filter((term) => term.cat === cat).length;
}

function filteredTerms() {
  const needle = state.q.trim().toLowerCase();
  const list = terms.filter((term) => {
    if (state.cat !== 'all' && term.cat !== state.cat) return false;
    if (!needle) return true;
    return termSearchText(term).includes(needle);
  });
  return sortByFormality(list, (term) => termCopy(term).name, getLocale());
}

function catSegHtml() {
  return `
    <div class="seg cat-seg" role="tablist" aria-label="${escapeHtml(t('catAria'))}">
      <button type="button" data-cat="all" class="${state.cat === 'all' ? 'active' : ''}">${escapeHtml(t('catAll'))} <span class="count">${terms.length}</span></button>
      <button type="button" data-cat="commit" class="${state.cat === 'commit' ? 'active' : ''}" title="${escapeHtml(t(CAT_BLURB.commit))}">${escapeHtml(t(CAT_SHORT.commit))} <span class="count">${countBy('commit')}</span></button>
      <button type="button" data-cat="mode" class="${state.cat === 'mode' ? 'active' : ''}" title="${escapeHtml(t(CAT_BLURB.mode))}">${escapeHtml(t(CAT_SHORT.mode))} <span class="count">${countBy('mode')}</span></button>
      <button type="button" data-cat="warn" class="${state.cat === 'warn' ? 'active' : ''}" title="${escapeHtml(t(CAT_BLURB.warn))}">${escapeHtml(t(CAT_SHORT.warn))} <span class="count">${countBy('warn')}</span></button>
    </div>
    <div class="cat-blurbs">
      <div class="cat-blurb"><strong>${escapeHtml(t(CAT_TITLE.commit))}</strong>：${escapeHtml(t(CAT_BLURB.commit))}</div>
      <div class="cat-blurb"><strong>${escapeHtml(t(CAT_TITLE.mode))}</strong>：${escapeHtml(t(CAT_BLURB.mode))}</div>
      <div class="cat-blurb"><strong>${escapeHtml(t(CAT_TITLE.warn))}</strong>：${escapeHtml(t(CAT_BLURB.warn))}</div>
      <div class="cat-blurb"><strong>${escapeHtml(t('sortLabel'))}</strong>：${escapeHtml(t('sortNote'))}</div>
    </div>`;
}

function tableViewHtml(filtered) {
  const order = /** @type {import('./data.js').Cat[]} */ (['commit', 'mode', 'warn']);
  const groups = order
    .map((cat) => ({
      cat,
      rows: filtered.filter((term) => term.cat === cat),
    }))
    .filter((group) => group.rows.length > 0);

  if (groups.length === 0) {
    return `
      <div class="callout warning empty">
        <div class="lead">${escapeHtml(t('emptyTitle'))}</div>
        <p>${escapeHtml(t('emptyBody'))}</p>
      </div>`;
  }

  const blocks = groups
    .map((group) => {
      const rows = group.rows
        .map((term) => {
          const copy = termCopy(term);
          const hi =
            state.highlightEn && state.highlightEn.toLowerCase() === term.en.toLowerCase()
              ? ' class="row-hi"'
              : '';
          const safeId = `row-${term.en.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
          return `
            <tr${hi} id="${safeId}">
              <td class="col-zh term-name">${escapeHtml(copy.name)}</td>
              <td class="col-en">${glossHtml(copy.en)}</td>
              <td class="col-tip">${escapeHtml(copy.tip)}</td>
              <td class="col-vibe"><span class="pill">${escapeHtml(copy.vibe)}</span></td>
              <td class="col-cat"><span class="pill">${escapeHtml(t(formalityKey(term.formality)))}</span></td>
            </tr>`;
        })
        .join('');
      return `
        <div class="table-group">
          <h3 class="table-group-title">${escapeHtml(t(CAT_TITLE[group.cat]))} <span class="count">${group.rows.length}</span></h3>
          <p class="table-group-blurb">${escapeHtml(t(CAT_BLURB[group.cat]))} · ${escapeHtml(t('groupOrder'))}</p>
          <div class="table-scroll">
            <table class="term-table">
              <thead>
                <tr>
                  <th>${escapeHtml(t('colName'))}</th>
                  <th>${escapeHtml(t('colEn'))}</th>
                  <th>${escapeHtml(t('colTip'))}</th>
                  <th>${escapeHtml(t('colVibe'))}</th>
                  <th>${escapeHtml(t('colForm'))}</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    })
    .join('');

  return `
    <p class="table-caption">${escapeHtml(t('caption', { n: TERM_COUNT, m: filtered.length }))}</p>
    ${blocks}`;
}

function render() {
  applyDocument('table');
  const filtered = filteredTerms();

  root.innerHTML = `
    <header class="hero">
      <div class="hero-bar">
        <div class="hero-copy">
          <h1>${escapeHtml(t('tableTitle'))}</h1>
          <p>${escapeHtml(t('tableSubtitle'))}</p>
        </div>
        ${langPickerHtml()}
      </div>
      <div class="badge-row">
        <span class="badge">${escapeHtml(t('badgeCount', { n: TERM_COUNT }))}</span>
        <span class="badge">${escapeHtml(t('badgeFormal'))}</span>
        <span class="badge">${escapeHtml(t('badgeSearch'))}</span>
      </div>
    </header>

    <a class="back-banner" href="${withLang('./index.html')}">
      <span class="back-banner-title">${escapeHtml(t('backTitle'))}</span>
      <span class="back-banner-desc">${escapeHtml(t('backDesc'))}</span>
    </a>

    <section class="section" id="table">
      <h2>${escapeHtml(t('dictTitle'))}</h2>
      <p class="lead">${escapeHtml(t('dictLead'))}</p>
      ${catSegHtml()}
      <div class="toolbar">
        <div class="field search-field">
          <label for="search">${escapeHtml(t('search'))}</label>
          <input id="search" type="search" placeholder="${escapeHtml(t('searchPh'))}" value="${escapeHtml(state.q)}" />
        </div>
      </div>
      ${tableViewHtml(filtered)}
    </section>

    <a class="back-banner" href="${withLang('./index.html')}">
      <span class="back-banner-title">${escapeHtml(t('backTitle'))}</span>
      <span class="back-banner-desc">${escapeHtml(t('backDesc2'))}</span>
    </a>

    <footer class="site-footer">
      <p>${escapeHtml(t('footer', { n: TERM_COUNT }))} · <a href="${withLang('./index.html')}">${escapeHtml(t('footerCheckLink'))}</a></p>
    </footer>

    <button type="button" class="back-top" id="back-top" title="${escapeHtml(t('backTop'))}">${escapeHtml(t('backTop'))}</button>
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
  bindLangPicker(render);

  root.querySelectorAll('.seg button[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.cat = btn.dataset.cat;
      render();
    });
  });

  const search = root.querySelector('#search');
  if (search) {
    search.addEventListener('input', (event) => {
      state.q = event.target.value;
      const pos = event.target.selectionStart;
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
