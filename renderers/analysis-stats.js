// @ts-nocheck
/* Analysis stats renderer — get_analysis_stats */

(function () {
  'use strict';

  window.__renderers = window.__renderers || {};

  function injectTheme() {
    if (document.getElementById('lf-theme')) return;
    var s = document.createElement('style');
    s.id = 'lf-theme';
    s.textContent = ':root{--lf-bg:#ffffff;--lf-bg-subtle:#f9fafb;--lf-bg-hover:#f9fafb;--lf-border:#e5e5e5;--lf-border-light:#f3f4f6;--lf-text:#171717;--lf-text-secondary:#737373;--lf-text-tertiary:#a3a3a3;--lf-text-mono:#525252;--lf-link:#60a5fa;--lf-code-bg:#1e1e2e;--lf-code-text:#cdd6f4;--lf-code-line:#6c7086;--lf-badge-bg:#f3f4f6;--lf-badge-text:#374151;--lf-error-bg:#fef2f2;--lf-error-border:#fecaca;--lf-error-text:#991b1b}@media(prefers-color-scheme:dark){:root{--lf-bg:#1e1e2e;--lf-bg-subtle:#262637;--lf-bg-hover:#2a2a3c;--lf-border:#3b3b50;--lf-border-light:#2e2e42;--lf-text:#cdd6f4;--lf-text-secondary:#a6adc8;--lf-text-tertiary:#7f849c;--lf-text-mono:#bac2de;--lf-link:#89b4fa;--lf-code-bg:#181825;--lf-code-text:#cdd6f4;--lf-code-line:#585b70;--lf-badge-bg:#313244;--lf-badge-text:#bac2de;--lf-error-bg:#3b1c1c;--lf-error-border:#5c2626;--lf-error-text:#f87171}}';
    document.head.appendChild(s);
  }
  injectTheme();
  var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  var LANGUAGE_COLORS_LIGHT = {
    TypeScript: { bg: '#dbeafe', text: '#1e40af' },
    JavaScript: { bg: '#fef9c3', text: '#854d0e' },
    Python: { bg: '#dcfce7', text: '#166534' },
    Go: { bg: '#e0e7ff', text: '#3730a3' },
    Rust: { bg: '#ffedd5', text: '#9a3412' },
    Java: { bg: '#fee2e2', text: '#991b1b' },
    'C#': { bg: '#f3e8ff', text: '#6b21a8' },
  };
  var LANGUAGE_COLORS_DARK = {
    TypeScript: { bg: '#1e3a5f', text: '#93c5fd' },
    JavaScript: { bg: '#422006', text: '#fde68a' },
    Python: { bg: '#14532d', text: '#86efac' },
    Go: { bg: '#312e81', text: '#a5b4fc' },
    Rust: { bg: '#431407', text: '#fdba74' },
    Java: { bg: '#450a0a', text: '#fca5a5' },
    'C#': { bg: '#3b0764', text: '#d8b4fe' },
  };
  var DEFAULT_LANG_COLOR_LIGHT = { bg: '#f3f4f6', text: '#374151' };
  var DEFAULT_LANG_COLOR_DARK = { bg: '#313244', text: '#bac2de' };

  var STYLES = {
    summaryBar: 'display:flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 12px;background:var(--lf-bg-subtle);border-radius:6px;',
    card: 'margin:8px 0;padding:12px 16px;background:var(--lf-bg);border:1px solid var(--lf-border);border-radius:8px;',
    metricCard: 'flex:1;min-width:100px;padding:12px 16px;background:var(--lf-bg);border:1px solid var(--lf-border);border-radius:8px;text-align:center;',
    sectionHeading: 'font-size:13px;font-weight:600;color:var(--lf-text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;',
    headerRow: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;',
    monoSmall: 'font-family:monospace;font-size:12px;color:var(--lf-text-secondary);',
  };

  /**
   * @param {HTMLElement} container
   * @param {unknown} data
   * @param {Record<string, unknown>} meta
   * @param {Record<string, unknown>} toolArgs
   * @param {boolean} reviewRequired
   * @param {(decision: string | Record<string, string>) => void} onDecision
   */
  window.__renderers.analysis_stats = function renderAnalysisStats(container, data, meta, toolArgs, reviewRequired, onDecision) {
    container.innerHTML = '';

    var utils = window.__companionUtils;
    var stats = (data && data.data) || data || {};

    var repos = stats.analyzed_repositories || [];
    var totals = stats.totals || {};

    // Summary bar
    var summary = document.createElement('div');
    summary.style.cssText = STYLES.summaryBar;
    summary.appendChild(utils.createBadge(repos.length + ' repositor' + (repos.length !== 1 ? 'ies' : 'y') + ' analyzed', isDark ? '#313244' : '#f3f4f6', isDark ? '#cdd6f4' : '#171717'));
    container.appendChild(summary);

    // Totals metric cards
    var metrics = [
      { label: 'Repositories', value: totals.repositories || 0 },
      { label: 'Code Units', value: totals.codeUnits || totals.code_units || 0 },
      { label: 'Data Sources', value: totals.dataSources || totals.data_sources || 0 },
      { label: 'Tables', value: totals.tables || 0 },
      { label: 'Business Concepts', value: totals.businessConcepts || totals.business_concepts || 0 },
    ];

    var metricsRow = document.createElement('div');
    metricsRow.style.cssText = 'display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;';

    for (var m = 0; m < metrics.length; m++) {
      var card = document.createElement('div');
      card.style.cssText = STYLES.metricCard;

      var countEl = document.createElement('div');
      countEl.style.cssText = 'font-size:24px;font-weight:700;color:var(--lf-text);';
      countEl.textContent = String(metrics[m].value);
      card.appendChild(countEl);

      var labelEl = document.createElement('div');
      labelEl.style.cssText = 'font-size:11px;color:var(--lf-text-secondary);font-weight:500;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;';
      labelEl.textContent = metrics[m].label;
      card.appendChild(labelEl);

      metricsRow.appendChild(card);
    }

    container.appendChild(metricsRow);

    // Analyzed repositories
    if (repos.length > 0) {
      var reposHeading = document.createElement('div');
      reposHeading.style.cssText = STYLES.sectionHeading;
      reposHeading.textContent = 'Analyzed Repositories';
      container.appendChild(reposHeading);

      for (var i = 0; i < repos.length; i++) {
        container.appendChild(renderRepoCard(repos[i], utils));
      }
    }

    // Unanalyzed repositories
    var unanalyzedCount = stats.unanalyzed_count || 0;
    var unanalyzedNames = stats.unanalyzed_names || [];
    if (unanalyzedCount > 0 || unanalyzedNames.length > 0) {
      var unSection = document.createElement('div');
      unSection.style.cssText = 'margin-top:16px;padding:12px 16px;background:var(--lf-bg-subtle);border:1px solid var(--lf-border);border-radius:8px;';

      var unHeading = document.createElement('div');
      unHeading.style.cssText = STYLES.sectionHeading;
      unHeading.textContent = (unanalyzedCount || unanalyzedNames.length) + ' unanalyzed repositor' + ((unanalyzedCount || unanalyzedNames.length) !== 1 ? 'ies' : 'y');
      unSection.appendChild(unHeading);

      for (var u = 0; u < unanalyzedNames.length; u++) {
        var nameEl = document.createElement('div');
        nameEl.style.cssText = STYLES.monoSmall + 'padding:2px 0;';
        nameEl.textContent = unanalyzedNames[u];
        unSection.appendChild(nameEl);
      }

      container.appendChild(unSection);
    }
  };

  function renderRepoCard(repo, utils) {
    var card = document.createElement('div');
    card.style.cssText = STYLES.card;

    // Header: name + badges
    var header = document.createElement('div');
    header.style.cssText = STYLES.headerRow;

    var name = document.createElement('span');
    name.style.cssText = 'font-weight:700;color:var(--lf-text);font-size:15px;';
    name.textContent = repo.name || '(unnamed)';
    header.appendChild(name);

    if (repo.language) {
      var langMap = isDark ? LANGUAGE_COLORS_DARK : LANGUAGE_COLORS_LIGHT;
      var defaultLang = isDark ? DEFAULT_LANG_COLOR_DARK : DEFAULT_LANG_COLOR_LIGHT;
      var langColors = langMap[repo.language] || defaultLang;
      header.appendChild(utils.createBadge(repo.language, langColors.bg, langColors.text));
    }

    var unitCount = repo.codeUnitCount || repo.code_unit_count || 0;
    header.appendChild(utils.createBadge(unitCount + ' code unit' + (unitCount !== 1 ? 's' : ''), isDark ? '#313244' : '#f3f4f6', isDark ? '#bac2de' : '#525252'));

    card.appendChild(header);

    // Full name
    if (repo.fullName || repo.full_name) {
      var fullName = document.createElement('div');
      fullName.style.cssText = STYLES.monoSmall + 'margin-bottom:4px;';
      fullName.textContent = repo.fullName || repo.full_name;
      card.appendChild(fullName);
    }

    // Last analyzed
    var lastAnalyzed = repo.lastAnalyzedAt || repo.last_analyzed_at;
    if (lastAnalyzed) {
      var dateEl = document.createElement('div');
      dateEl.style.cssText = 'font-size:11px;color:var(--lf-text-tertiary);';
      try {
        dateEl.textContent = 'Last analyzed: ' + new Date(lastAnalyzed).toLocaleDateString();
      } catch (e) {
        dateEl.textContent = 'Last analyzed: ' + String(lastAnalyzed);
      }
      card.appendChild(dateEl);
    }

    return card;
  }
})();
