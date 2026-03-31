// @ts-nocheck
/* Module overview renderer — get_module_overview */

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

  var EXPORT_TYPE_COLORS_LIGHT = {
    function: { bg: '#dbeafe', text: '#1e40af' },
    class: { bg: '#f3e8ff', text: '#6b21a8' },
    interface: { bg: '#dcfce7', text: '#166534' },
    type: { bg: '#fef9c3', text: '#854d0e' },
    variable: { bg: '#f3f4f6', text: '#374151' },
    method: { bg: '#e0e7ff', text: '#3730a3' },
    enum: { bg: '#ffedd5', text: '#9a3412' },
  };
  var EXPORT_TYPE_COLORS_DARK = {
    function: { bg: '#1e3a5f', text: '#93c5fd' },
    class: { bg: '#3b0764', text: '#d8b4fe' },
    interface: { bg: '#14532d', text: '#86efac' },
    type: { bg: '#422006', text: '#fde68a' },
    variable: { bg: '#313244', text: '#bac2de' },
    method: { bg: '#312e81', text: '#a5b4fc' },
    enum: { bg: '#431407', text: '#fdba74' },
  };
  var DEFAULT_EXPORT_COLOR_LIGHT = { bg: '#f3f4f6', text: '#374151' };
  var DEFAULT_EXPORT_COLOR_DARK = { bg: '#313244', text: '#bac2de' };

  var EXPORT_TYPE_COLORS = isDark ? EXPORT_TYPE_COLORS_DARK : EXPORT_TYPE_COLORS_LIGHT;
  var DEFAULT_EXPORT_COLOR = isDark ? DEFAULT_EXPORT_COLOR_DARK : DEFAULT_EXPORT_COLOR_LIGHT;

  var STYLES = {
    summaryBar: 'display:flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 12px;background:var(--lf-bg-subtle);border-radius:6px;flex-wrap:wrap;',
    depRow: 'display:flex;align-items:center;gap:6px;padding:4px 8px;flex-wrap:wrap;',
    monoSmall: 'font-family:monospace;font-size:12px;color:var(--lf-text);',
    monoTarget: 'font-family:monospace;font-size:12px;color:var(--lf-link);',
    nameChip: 'display:inline-block;padding:1px 6px;border-radius:3px;font-size:10px;font-family:monospace;color:var(--lf-text-secondary);background:var(--lf-badge-bg);',
  };

  /**
   * @param {HTMLElement} container
   * @param {unknown} data
   * @param {Record<string, unknown>} meta
   * @param {Record<string, unknown>} toolArgs
   * @param {boolean} reviewRequired
   * @param {(decision: string | Record<string, string>) => void} onDecision
   */
  window.__renderers.module_overview = function renderModuleOverview(container, data, meta, toolArgs, reviewRequired, onDecision) {
    container.innerHTML = '';

    var utils = window.__companionUtils;
    var overview = (data && data.data) || data || {};

    // Header: directory + repo badge
    var headerEl = document.createElement('div');
    headerEl.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;';

    var dirEl = document.createElement('span');
    dirEl.style.cssText = 'font-family:monospace;font-size:15px;font-weight:700;color:var(--lf-text);';
    dirEl.textContent = overview.directory || '(unknown directory)';
    headerEl.appendChild(dirEl);

    var repo = overview.repository;
    if (repo) {
      headerEl.appendChild(utils.createBadge(repo.name || repo.fullName || repo.full_name || '', isDark ? '#1e3a5f' : '#dbeafe', isDark ? '#93c5fd' : '#1e40af'));
    }

    container.appendChild(headerEl);

    // Summary bar: 4 metric badges
    var summaryData = overview.summary || {};
    var summaryBar = document.createElement('div');
    summaryBar.style.cssText = STYLES.summaryBar;

    var metricItems = [
      { label: 'files', value: summaryData.total_files || 0 },
      { label: 'exports', value: summaryData.total_exports || 0 },
      { label: 'internal deps', value: summaryData.total_internal_deps || 0 },
      { label: 'external deps', value: summaryData.total_external_deps || 0 },
    ];

    for (var m = 0; m < metricItems.length; m++) {
      summaryBar.appendChild(utils.createBadge(metricItems[m].value + ' ' + metricItems[m].label, isDark ? '#313244' : '#f3f4f6', isDark ? '#cdd6f4' : '#171717'));
    }

    container.appendChild(summaryBar);

    // File Tree (collapsible)
    var fileTree = overview.file_tree || [];
    if (fileTree.length > 0) {
      container.appendChild(utils.buildCollapsibleSection('File Tree (' + fileTree.length + ')', function (body) {
        for (var i = 0; i < fileTree.length; i++) {
          var row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:3px 8px;';

          var pathSpan = document.createElement('span');
          pathSpan.style.cssText = 'font-family:monospace;font-size:12px;color:var(--lf-text);';
          pathSpan.textContent = fileTree[i].path || '';
          row.appendChild(pathSpan);

          if (fileTree[i].size != null) {
            var sizeStr = fileTree[i].size >= 1024 ? (fileTree[i].size / 1024).toFixed(1) + ' KB' : fileTree[i].size + ' B';
            row.appendChild(utils.createBadge(sizeStr, isDark ? '#313244' : '#f3f4f6', isDark ? '#7f849c' : '#a3a3a3'));
          }

          body.appendChild(row);
        }
      }));
    }

    // Exports (collapsible)
    var exports = overview.exports || [];
    if (exports.length > 0) {
      container.appendChild(utils.buildCollapsibleSection('Exports (' + exports.length + ')', function (body) {
        for (var i = 0; i < exports.length; i++) {
          body.appendChild(renderExportCard(exports[i], utils));
        }
      }));
    }

    // Internal Dependencies (collapsible)
    var internalDeps = overview.internal_dependencies || [];
    if (internalDeps.length > 0) {
      container.appendChild(utils.buildCollapsibleSection('Internal Dependencies (' + internalDeps.length + ')', function (body) {
        for (var i = 0; i < internalDeps.length; i++) {
          body.appendChild(renderDepRow(internalDeps[i], utils, true));
        }
      }));
    }

    // External Dependencies (collapsible)
    var externalDeps = overview.external_dependencies || [];
    if (externalDeps.length > 0) {
      container.appendChild(utils.buildCollapsibleSection('External Dependencies (' + externalDeps.length + ')', function (body) {
        for (var i = 0; i < externalDeps.length; i++) {
          body.appendChild(renderDepRow(externalDeps[i], utils, false));
        }
      }));
    }
  };

  function renderExportCard(exp, utils) {
    var card = document.createElement('div');
    card.style.cssText = 'padding:8px 12px;margin:4px 0;background:var(--lf-bg);border:1px solid var(--lf-border-light);border-radius:6px;';

    // Top row: name + type badge
    var topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

    var nameEl = document.createElement('span');
    nameEl.style.cssText = 'font-weight:600;color:var(--lf-text);font-size:13px;';
    nameEl.textContent = exp.name || '(unnamed)';
    topRow.appendChild(nameEl);

    var expType = (exp.type || '').toLowerCase();
    var colors = EXPORT_TYPE_COLORS[expType] || DEFAULT_EXPORT_COLOR;
    topRow.appendChild(utils.createBadge((exp.type || 'unknown').toUpperCase(), colors.bg, colors.text));

    card.appendChild(topRow);

    // File path
    if (exp.file) {
      var fileEl = document.createElement('div');
      fileEl.style.cssText = 'font-family:monospace;font-size:11px;color:var(--lf-text-secondary);margin-top:2px;';
      fileEl.textContent = exp.file;
      card.appendChild(fileEl);
    }

    // Signature
    if (exp.signature) {
      var sigEl = document.createElement('div');
      sigEl.style.cssText = 'font-family:monospace;font-size:11px;color:var(--lf-text-tertiary);margin-top:4px;white-space:pre-wrap;word-break:break-all;';
      sigEl.textContent = exp.signature;
      card.appendChild(sigEl);
    }

    return card;
  }

  function renderDepRow(dep, utils, showImports) {
    var row = document.createElement('div');
    row.style.cssText = STYLES.depRow;

    var source = document.createElement('span');
    source.style.cssText = STYLES.monoSmall;
    source.textContent = dep.source || '';
    row.appendChild(source);

    var arrow = document.createElement('span');
    arrow.style.cssText = 'color:var(--lf-text-tertiary);font-size:12px;';
    arrow.textContent = '\u2192';
    row.appendChild(arrow);

    var target = document.createElement('span');
    target.style.cssText = STYLES.monoTarget;
    target.textContent = dep.target || '';
    row.appendChild(target);

    // Import names (for internal deps)
    if (showImports) {
      var imports = dep.imports || [];
      if (imports.length > 0) {
        var importsContainer = document.createElement('span');
        importsContainer.style.cssText = 'display:flex;gap:3px;flex-wrap:wrap;';
        for (var n = 0; n < imports.length; n++) {
          var chip = document.createElement('span');
          chip.style.cssText = STYLES.nameChip;
          chip.textContent = imports[n];
          importsContainer.appendChild(chip);
        }
        row.appendChild(importsContainer);
      }
    }

    return row;
  }
})();
