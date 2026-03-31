// @ts-nocheck
/* Code units renderer — get_code_units */

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

  var UNIT_TYPE_COLORS_LIGHT = {
    function: { bg: '#dbeafe', text: '#1e40af' },
    class: { bg: '#f3e8ff', text: '#6b21a8' },
    interface: { bg: '#dcfce7', text: '#166534' },
    type: { bg: '#fef9c3', text: '#854d0e' },
    variable: { bg: '#f3f4f6', text: '#374151' },
    method: { bg: '#e0e7ff', text: '#3730a3' },
    enum: { bg: '#ffedd5', text: '#9a3412' },
  };
  var UNIT_TYPE_COLORS_DARK = {
    function: { bg: '#1e3a5f', text: '#93c5fd' },
    class: { bg: '#3b0764', text: '#d8b4fe' },
    interface: { bg: '#14532d', text: '#86efac' },
    type: { bg: '#422006', text: '#fde68a' },
    variable: { bg: '#313244', text: '#bac2de' },
    method: { bg: '#312e81', text: '#a5b4fc' },
    enum: { bg: '#431407', text: '#fdba74' },
  };
  var DEFAULT_COLOR_LIGHT = { bg: '#f3f4f6', text: '#374151' };
  var DEFAULT_COLOR_DARK = { bg: '#313244', text: '#bac2de' };

  /**
   * @param {HTMLElement} container
   * @param {unknown} data
   * @param {Record<string, unknown>} meta
   * @param {Record<string, unknown>} toolArgs
   * @param {boolean} reviewRequired
   * @param {(decision: string | Record<string, string>) => void} onDecision
   */
  window.__renderers.code_units = function renderCodeUnits(container, data, meta, toolArgs, reviewRequired, onDecision) {
    container.innerHTML = '';

    var utils = window.__companionUtils;
    var items = (data && data.data) || data || [];
    if (!Array.isArray(items)) { items = []; }

    // Summary
    var summary = document.createElement('div');
    summary.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:16px;padding:8px 12px;background:var(--lf-bg-subtle);border-radius:6px;';
    summary.appendChild(utils.createBadge(items.length + ' code unit' + (items.length !== 1 ? 's' : ''), isDark ? '#313244' : '#f3f4f6', isDark ? '#cdd6f4' : '#171717'));
    container.appendChild(summary);

    if (items.length === 0) {
      var empty = document.createElement('div');
      empty.style.cssText = 'color:var(--lf-text-secondary);text-align:center;padding:32px;';
      empty.textContent = 'No code units found';
      container.appendChild(empty);
      return;
    }

    for (var i = 0; i < items.length; i++) {
      container.appendChild(renderCard(items[i], i));
    }
  };

  function renderCard(item, index) {
    var utils = window.__companionUtils;
    var card = document.createElement('div');
    card.style.cssText = 'margin:8px 0;padding:12px 16px;background:var(--lf-bg);border:1px solid var(--lf-border);border-radius:8px;';

    // Header: citation badge + name + type/exported/complexity badges
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;';

    // Citation badge
    var citeBadge = utils.renderCitationBadge('code', index);
    citeBadge.addEventListener('click', function (e) {
      e.stopPropagation();
      if (utils.openCitationPanel) {
        utils.openCitationPanel('code', item);
      }
    });
    header.appendChild(citeBadge);

    var name = document.createElement('span');
    name.style.cssText = 'font-weight:700;color:var(--lf-text);font-size:15px;';
    name.textContent = item.name || '(unnamed)';
    header.appendChild(name);

    var unitType = item.unit_type || 'other';
    var colorMap = isDark ? UNIT_TYPE_COLORS_DARK : UNIT_TYPE_COLORS_LIGHT;
    var defaultColor = isDark ? DEFAULT_COLOR_DARK : DEFAULT_COLOR_LIGHT;
    var colors = colorMap[unitType] || defaultColor;
    header.appendChild(utils.createBadge(unitType.toUpperCase(), colors.bg, colors.text));

    if (item.exported) {
      header.appendChild(utils.createBadge('EXPORTED', isDark ? '#14532d' : '#dcfce7', isDark ? '#86efac' : '#166534'));
    }

    if (item.complexity != null) {
      var cxLabel, cxColor;
      if (item.complexity <= 5) {
        cxLabel = 'LOW'; cxColor = '#22c55e';
      } else if (item.complexity <= 15) {
        cxLabel = 'MEDIUM'; cxColor = '#eab308';
      } else {
        cxLabel = 'HIGH'; cxColor = '#ef4444';
      }
      header.appendChild(utils.createBadge('COMPLEXITY: ' + item.complexity + ' (' + cxLabel + ')', cxColor + (isDark ? '40' : '20'), cxColor));
    }

    card.appendChild(header);

    // File path + line range
    if (item.file_path) {
      var fileLine = document.createElement('div');
      fileLine.style.cssText = 'font-family:monospace;font-size:12px;color:var(--lf-link);margin-bottom:8px;';
      var text = item.file_path;
      if (item.line_start != null) {
        text += ':' + item.line_start;
        if (item.line_end != null) {
          text += '-' + item.line_end;
        }
      }
      fileLine.textContent = text;
      fileLine.title = text;
      card.appendChild(fileLine);
    }

    // Source code with line numbers
    if (item.source) {
      var sourceBlock = document.createElement('div');
      sourceBlock.style.cssText = 'margin:8px 0;overflow-x:auto;';

      var pre = document.createElement('pre');
      pre.className = 'md-codeblock';
      pre.style.cssText += 'font-size:12px;line-height:1.6;';

      var lines = item.source.split('\n');
      var startLine = item.line_start || 1;

      var html = lines.map(function (line, li) {
        var lineNum = '<span style="color:var(--lf-code-line);min-width:40px;display:inline-block;text-align:right;margin-right:12px;user-select:none;flex-shrink:0;">' + (startLine + li) + '</span>';
        return lineNum + utils.escapeHtml(line);
      }).join('\n');

      pre.innerHTML = html;
      sourceBlock.appendChild(pre);
      card.appendChild(sourceBlock);
    }

    // Patterns
    var patterns = item.patterns || [];
    if (patterns.length > 0) {
      var patternsDiv = document.createElement('div');
      patternsDiv.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;';

      for (var p = 0; p < patterns.length; p++) {
        var patText = typeof patterns[p] === 'string' ? patterns[p] : (patterns[p].name || String(patterns[p]));
        patternsDiv.appendChild(utils.createBadge(patText, isDark ? '#313244' : '#f3f4f6', isDark ? '#bac2de' : '#525252'));
      }

      card.appendChild(patternsDiv);
    }

    // References (collapsible)
    var references = item.references || [];
    if (references.length > 0) {
      var refsContainer = document.createElement('div');
      refsContainer.style.cssText = 'margin-top:8px;';

      var refsToggle = document.createElement('div');
      refsToggle.style.cssText = 'cursor:pointer;color:var(--lf-text-secondary);font-size:12px;user-select:none;';
      refsToggle.textContent = '\u25B6 References (' + references.length + ')';

      var refsList = document.createElement('div');
      refsList.style.cssText = 'display:none;margin-top:4px;padding-left:12px;';

      for (var r = 0; r < references.length; r++) {
        var refItem = document.createElement('div');
        refItem.style.cssText = 'font-family:monospace;font-size:11px;color:var(--lf-text-secondary);padding:1px 0;';
        var ref = references[r];
        refItem.textContent = typeof ref === 'string' ? ref : (ref.file_path || ref.name || JSON.stringify(ref));
        refsList.appendChild(refItem);
      }

      refsToggle.onclick = function () {
        var hidden = refsList.style.display === 'none';
        refsList.style.display = hidden ? 'block' : 'none';
        refsToggle.textContent = (hidden ? '\u25BC' : '\u25B6') + ' References (' + references.length + ')';
      };

      refsContainer.appendChild(refsToggle);
      refsContainer.appendChild(refsList);
      card.appendChild(refsContainer);
    }

    return card;
  }
})();
