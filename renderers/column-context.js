// @ts-nocheck
/* Column context renderer — get_column_context */

(function () {
  'use strict';

  window.__renderers = window.__renderers || {};

  var isDark = (window.__companionUtils && window.__companionUtils.isDark) || false;

  var DATA_TYPE_COLORS_LIGHT = {
    TEXT: { bg: '#dbeafe', text: '#1e40af' },
    DATE: { bg: '#fef9c3', text: '#854d0e' },
    MULTISELECT: { bg: '#f3e8ff', text: '#6b21a8' },
  };
  var DATA_TYPE_COLORS_DARK = {
    TEXT: { bg: '#1e3a5f', text: '#93c5fd' },
    DATE: { bg: '#422006', text: '#fde68a' },
    MULTISELECT: { bg: '#3b0764', text: '#d8b4fe' },
  };
  var DEFAULT_DATA_TYPE_COLOR_LIGHT = { bg: '#f3f4f6', text: '#374151' };
  var DEFAULT_DATA_TYPE_COLOR_DARK = { bg: '#313244', text: '#bac2de' };

  var DATA_TYPE_COLORS = isDark ? DATA_TYPE_COLORS_DARK : DATA_TYPE_COLORS_LIGHT;
  var DEFAULT_DATA_TYPE_COLOR = isDark ? DEFAULT_DATA_TYPE_COLOR_DARK : DEFAULT_DATA_TYPE_COLOR_LIGHT;

  var STYLES = {
    infoCard: 'padding:12px 16px;background:var(--lf-bg);border:1px solid var(--lf-border);border-radius:8px;margin-bottom:12px;',
    badgesRow: 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px;',
    sectionHeading: 'font-size:12px;font-weight:600;color:var(--lf-text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;',
    section: 'margin-bottom:12px;',
    metaRow: 'display:flex;align-items:center;gap:6px;padding:4px 8px;',
    monoPath: 'font-family:monospace;font-size:12px;color:var(--lf-text);',
  };

  /**
   * @param {HTMLElement} container
   * @param {unknown} data
   * @param {Record<string, unknown>} meta
   * @param {Record<string, unknown>} toolArgs
   * @param {boolean} reviewRequired
   * @param {(decision: string | Record<string, string>) => void} onDecision
   */
  window.__renderers.column_context = function renderColumnContext(container, data, meta, toolArgs, reviewRequired, onDecision) {
    container.innerHTML = '';

    // Proxy fetch mode: minimal params → lazy load
    if (data && data.id && !data.data && !Array.isArray(data)) {
      var _utils = window.__companionUtils;
      if (_utils && _utils.companionFetch) {
        var statusEl = document.createElement('div');
        statusEl.style.cssText = 'padding: 16px; color: var(--text-secondary); text-align: center;';
        statusEl.textContent = 'Loading...';
        container.appendChild(statusEl);
        _utils.companionFetch('get_column_context', { id: data.id })
          .then(function (result) {
            container.removeChild(statusEl);
            if (result && result.data) {
              renderColumnContext(container, result.data, meta, toolArgs, reviewRequired, onDecision);
            }
          })
          .catch(function (err) {
            statusEl.textContent = 'Failed to load: ' + err.message;
            statusEl.style.color = 'var(--color-error)';
          });
        return;
      }
    }

    var utils = window.__companionUtils;
    var ctx = (data && data.data) || data || {};

    var column = ctx.column || {};
    var table = ctx.table || {};
    var dataSource = (table.dataSource || table.data_source) || {};

    // Breadcrumb header: dataSource > table > column
    var breadcrumb = document.createElement('div');
    breadcrumb.style.cssText = 'display:flex;align-items:center;gap:4px;margin-bottom:12px;flex-wrap:wrap;';

    var parts = [dataSource.name, table.name, column.name].filter(Boolean);
    for (var p = 0; p < parts.length; p++) {
      if (p > 0) {
        var sep = document.createElement('span');
        sep.style.cssText = 'color:var(--lf-text-tertiary);font-size:14px;';
        sep.textContent = '\u203A';
        breadcrumb.appendChild(sep);
      }
      var partEl = document.createElement('span');
      partEl.style.cssText = 'font-family:monospace;font-size:15px;color:var(--lf-text);' + (p === parts.length - 1 ? 'font-weight:700;' : 'font-weight:500;');
      partEl.textContent = parts[p];
      breadcrumb.appendChild(partEl);
    }

    container.appendChild(breadcrumb);

    // Column info card
    var infoCard = document.createElement('div');
    infoCard.style.cssText = STYLES.infoCard;

    var badgesRow = document.createElement('div');
    badgesRow.style.cssText = STYLES.badgesRow;

    // Type badge
    var originalType = column.originalDataType || column.original_data_type || '';
    if (originalType) {
      badgesRow.appendChild(utils.createBadge(originalType, isDark ? '#312e81' : '#e0e7ff', isDark ? '#a5b4fc' : '#3730a3'));
    }

    // Nullable badge
    if (column.nullable) {
      badgesRow.appendChild(utils.createBadge('NULLABLE', isDark ? '#313244' : '#f3f4f6', isDark ? '#a6adc8' : '#737373'));
    } else {
      badgesRow.appendChild(utils.createBadge('NOT NULL', isDark ? '#422006' : '#fef9c3', isDark ? '#fde68a' : '#854d0e'));
    }

    // PK badge
    if (column.isPrimaryKey || column.is_primary_key) {
      badgesRow.appendChild(utils.createBadge('PRIMARY KEY', isDark ? '#422006' : '#fef9c3', isDark ? '#fbbf24' : '#b45309'));
    }

    infoCard.appendChild(badgesRow);

    // Description
    if (column.description) {
      var descEl = document.createElement('div');
      descEl.style.cssText = 'font-size:13px;color:var(--lf-text-mono);line-height:1.5;';
      descEl.textContent = column.description;
      infoCard.appendChild(descEl);
    }

    container.appendChild(infoCard);

    // Business Concepts
    var concepts = ctx.businessConcepts || ctx.business_concepts || [];
    if (concepts.length > 0) {
      var conceptsSection = document.createElement('div');
      conceptsSection.style.cssText = STYLES.section;

      var conceptsHeading = document.createElement('div');
      conceptsHeading.style.cssText = STYLES.sectionHeading;
      conceptsHeading.textContent = 'Business Concepts (' + concepts.length + ')';
      conceptsSection.appendChild(conceptsHeading);

      var conceptsRow = document.createElement('div');
      conceptsRow.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;';

      for (var c = 0; c < concepts.length; c++) {
        var concept = concepts[c];
        var chip = document.createElement('span');
        chip.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;background:' + (isDark ? '#042f2e' : '#f0fdfa') + ';color:' + (isDark ? '#5eead4' : '#0d9488') + ';border:1px solid ' + (isDark ? '#115e59' : '#ccfbf1') + ';cursor:default;';
        chip.textContent = concept.name || '';
        if (concept.description) {
          chip.title = concept.description;
        }

        if (concept.category) {
          var catBadge = document.createElement('span');
          catBadge.style.cssText = 'font-size:10px;color:var(--lf-text-tertiary);margin-left:2px;';
          catBadge.textContent = '(' + concept.category + ')';
          chip.appendChild(catBadge);
        }

        conceptsRow.appendChild(chip);
      }

      conceptsSection.appendChild(conceptsRow);
      container.appendChild(conceptsSection);
    }

    // Document Links
    var docLinks = ctx.documentLinks || ctx.document_links || [];
    if (docLinks.length > 0) {
      var docsSection = document.createElement('div');
      docsSection.style.cssText = STYLES.section;

      var docsHeading = document.createElement('div');
      docsHeading.style.cssText = STYLES.sectionHeading;
      docsHeading.textContent = 'Document Links (' + docLinks.length + ')';
      docsSection.appendChild(docsHeading);

      for (var d = 0; d < docLinks.length; d++) {
        var link = docLinks[d];
        var doc = link.document || {};
        var linkRow = document.createElement('div');
        linkRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;margin:2px 0;border-radius:6px;cursor:pointer;transition:background 0.15s;';
        linkRow.addEventListener('mouseenter', function () { this.style.background = 'var(--lf-bg-hover)'; });
        linkRow.addEventListener('mouseleave', function () { this.style.background = 'transparent'; });

        var docColor = utils.CITATION_COLORS.doc;
        linkRow.appendChild(utils.createBadge(docColor.label, docColor.hex + '15', docColor.hex));

        var titleEl = document.createElement('span');
        titleEl.style.cssText = 'font-size:13px;font-weight:500;color:var(--lf-text);';
        titleEl.textContent = doc.title || doc.id || '';
        linkRow.appendChild(titleEl);

        docsSection.appendChild(linkRow);
      }

      container.appendChild(docsSection);
    }

    // Cross-Column Links
    var crossLinks = ctx.crossColumnLinks || ctx.cross_column_links || [];
    if (crossLinks.length > 0) {
      var crossSection = document.createElement('div');
      crossSection.style.cssText = STYLES.section;

      var crossHeading = document.createElement('div');
      crossHeading.style.cssText = STYLES.sectionHeading;
      crossHeading.textContent = 'Cross-Column Links (' + crossLinks.length + ')';
      crossSection.appendChild(crossHeading);

      for (var x = 0; x < crossLinks.length; x++) {
        var crossLink = crossLinks[x];
        var linked = crossLink.linkedColumn || crossLink.linked_column || {};
        var linkedTable = linked.table || {};

        var crossRow = document.createElement('div');
        crossRow.style.cssText = 'display:flex;align-items:center;gap:6px;padding:6px 10px;margin:2px 0;border-radius:6px;';

        // Direction arrow
        var direction = crossLink.direction || '';
        var dirArrow = document.createElement('span');
        dirArrow.style.cssText = 'font-size:14px;color:var(--lf-text-tertiary);flex-shrink:0;';
        if (direction === 'outgoing' || direction === 'OUTGOING') {
          dirArrow.textContent = '\u2192';
        } else if (direction === 'incoming' || direction === 'INCOMING') {
          dirArrow.textContent = '\u2190';
        } else {
          dirArrow.textContent = '\u2194';
        }
        crossRow.appendChild(dirArrow);

        var pathEl = document.createElement('span');
        pathEl.style.cssText = STYLES.monoPath;
        var pathParts = [linkedTable.name, linked.name].filter(Boolean);
        pathEl.textContent = pathParts.join('.');
        crossRow.appendChild(pathEl);

        crossSection.appendChild(crossRow);
      }

      container.appendChild(crossSection);
    }

    // Metadata Columns
    var metaCols = ctx.metadataColumns || ctx.metadata_columns || [];
    if (metaCols.length > 0) {
      var metaSection = document.createElement('div');
      metaSection.style.cssText = STYLES.section;

      var metaHeading = document.createElement('div');
      metaHeading.style.cssText = STYLES.sectionHeading;
      metaHeading.textContent = 'Metadata Columns (' + metaCols.length + ')';
      metaSection.appendChild(metaHeading);

      for (var mc = 0; mc < metaCols.length; mc++) {
        var metaCol = metaCols[mc];
        var metaRow = document.createElement('div');
        metaRow.style.cssText = STYLES.metaRow;

        var metaName = document.createElement('span');
        metaName.style.cssText = 'font-size:13px;font-weight:500;color:var(--lf-text);';
        metaName.textContent = metaCol.name || '';
        metaRow.appendChild(metaName);

        // Type badge
        var dtType = (metaCol.dataType || metaCol.data_type || '').toUpperCase();
        var dtColors = DATA_TYPE_COLORS[dtType] || DEFAULT_DATA_TYPE_COLOR;
        metaRow.appendChild(utils.createBadge(dtType || 'UNKNOWN', dtColors.bg, dtColors.text));

        // Required indicator
        if (metaCol.isRequired || metaCol.is_required) {
          metaRow.appendChild(utils.createBadge('REQUIRED', isDark ? '#3b1c1c' : '#fee2e2', isDark ? '#f87171' : '#991b1b'));
        }

        // System column indicator
        if (metaCol.isSystemColumn || metaCol.is_system_column) {
          metaRow.appendChild(utils.createBadge('SYSTEM', isDark ? '#313244' : '#f3f4f6', isDark ? '#7f849c' : '#a3a3a3'));
        }

        metaSection.appendChild(metaRow);
      }

      container.appendChild(metaSection);
    }
  };
})();
