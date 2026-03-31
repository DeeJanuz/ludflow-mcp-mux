// @ts-nocheck
/* Dependencies renderer — get_dependencies */

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

  var IMPORT_TYPE_COLORS_LIGHT = {
    NAMED: { bg: '#dbeafe', text: '#1e40af' },
    DEFAULT: { bg: '#f3e8ff', text: '#6b21a8' },
    PACKAGE: { bg: '#dcfce7', text: '#166534' },
    NAMESPACE: { bg: '#fef9c3', text: '#854d0e' },
    SIDE_EFFECT: { bg: '#ffedd5', text: '#9a3412' },
    DYNAMIC: { bg: '#fee2e2', text: '#991b1b' },
    REEXPORT: { bg: '#e0e7ff', text: '#3730a3' },
  };
  var IMPORT_TYPE_COLORS_DARK = {
    NAMED: { bg: '#1e3a5f', text: '#93c5fd' },
    DEFAULT: { bg: '#3b0764', text: '#d8b4fe' },
    PACKAGE: { bg: '#14532d', text: '#86efac' },
    NAMESPACE: { bg: '#422006', text: '#fde68a' },
    SIDE_EFFECT: { bg: '#431407', text: '#fdba74' },
    DYNAMIC: { bg: '#450a0a', text: '#fca5a5' },
    REEXPORT: { bg: '#312e81', text: '#a5b4fc' },
  };
  var DEFAULT_IMPORT_COLOR_LIGHT = { bg: '#f3f4f6', text: '#374151' };
  var DEFAULT_IMPORT_COLOR_DARK = { bg: '#313244', text: '#bac2de' };

  var STYLES = {
    summaryBar: 'display:flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 12px;background:var(--lf-bg-subtle);border-radius:6px;',
    depRow: 'display:flex;align-items:center;gap:6px;padding:6px 12px;flex-wrap:wrap;',
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
  window.__renderers.dependencies = function renderDependencies(container, data, meta, toolArgs, reviewRequired, onDecision) {
    container.innerHTML = '';

    var utils = window.__companionUtils;
    var items = (data && data.data) || data || [];
    if (!Array.isArray(items)) { items = []; }

    // Summary bar
    var summary = document.createElement('div');
    summary.style.cssText = STYLES.summaryBar;
    summary.appendChild(utils.createBadge(items.length + ' dependenc' + (items.length !== 1 ? 'ies' : 'y'), isDark ? '#313244' : '#f3f4f6', isDark ? '#cdd6f4' : '#171717'));
    container.appendChild(summary);

    if (items.length === 0) {
      var empty = document.createElement('div');
      empty.style.cssText = 'color:var(--lf-text-secondary);text-align:center;padding:32px;';
      empty.textContent = 'No dependencies found';
      container.appendChild(empty);
      return;
    }

    // Detect compact mode: no importType field
    var isCompact = !items[0].importType && !items[0].import_type;

    // Group by sourceFile
    var groups = {};
    var groupOrder = [];
    for (var i = 0; i < items.length; i++) {
      var source = items[i].sourceFile || items[i].source_file || '(unknown)';
      if (!groups[source]) {
        groups[source] = [];
        groupOrder.push(source);
      }
      groups[source].push(items[i]);
    }

    for (var g = 0; g < groupOrder.length; g++) {
      container.appendChild(renderSourceGroup(groupOrder[g], groups[groupOrder[g]], isCompact, utils));
    }
  };

  function renderSourceGroup(sourceFile, deps, isCompact, utils) {
    var section = utils.buildCollapsibleSection(sourceFile, function (body) {
      body.style.padding = '4px 0';
      for (var i = 0; i < deps.length; i++) {
        body.appendChild(renderDepRow(deps[i], isCompact, utils));
      }
    }, { expanded: true });

    // Customize: monospace title + count badge
    var header = section.firstChild;
    var titleSpan = header.children[1];
    titleSpan.style.fontFamily = 'monospace';

    header.appendChild(utils.createBadge(deps.length + '', isDark ? '#313244' : '#f3f4f6', isDark ? '#bac2de' : '#525252'));

    return section;
  }

  function renderDepRow(dep, isCompact, utils) {
    var row = document.createElement('div');
    row.style.cssText = STYLES.depRow;

    // Arrow
    var arrow = document.createElement('span');
    arrow.style.cssText = 'color:var(--lf-text-tertiary);font-size:13px;flex-shrink:0;';
    arrow.textContent = '\u2192';
    row.appendChild(arrow);

    // Target file
    var target = document.createElement('span');
    target.style.cssText = STYLES.monoTarget;
    target.textContent = dep.targetFile || dep.target_file || '(unknown)';
    row.appendChild(target);

    if (!isCompact) {
      // Import type badge
      var importType = (dep.importType || dep.import_type || '').toUpperCase();
      if (importType) {
        var colorMap = isDark ? IMPORT_TYPE_COLORS_DARK : IMPORT_TYPE_COLORS_LIGHT;
        var defaultImportColor = isDark ? DEFAULT_IMPORT_COLOR_DARK : DEFAULT_IMPORT_COLOR_LIGHT;
        var colors = colorMap[importType] || defaultImportColor;
        row.appendChild(utils.createBadge(importType, colors.bg, colors.text));
      }

      // Imported names as small chips
      var names = dep.importedNames || dep.imported_names || [];
      if (names && names.length > 0) {
        var namesContainer = document.createElement('span');
        namesContainer.style.cssText = 'display:flex;gap:3px;flex-wrap:wrap;';
        for (var n = 0; n < names.length; n++) {
          var chip = document.createElement('span');
          chip.style.cssText = STYLES.nameChip;
          chip.textContent = names[n];
          namesContainer.appendChild(chip);
        }
        row.appendChild(namesContainer);
      }
    }

    return row;
  }
})();
