// @ts-nocheck
/* Standalone Ludflow app pages for MCP Views */

(function () {
  'use strict';

  window.__renderers = window.__renderers || {};

  var PLUGIN_NAME = 'ludflow';
  var TOOL_PREFIX = 'ludflow__';
  var STYLE_ID = 'ludflow-standalone-pages-styles';

  function utils() {
    return window.__companionUtils || {};
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.lf-app { padding: 24px; color: var(--text-primary, #0f172a); }',
      '.lf-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }',
      '.lf-title { margin: 0; font-size: 28px; line-height: 1.1; font-weight: 700; letter-spacing: -0.03em; }',
      '.lf-subtitle { margin-top: 8px; color: var(--text-secondary, #475569); max-width: 760px; line-height: 1.5; }',
      '.lf-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }',
      '.lf-select, .lf-input, .lf-textarea { width: 100%; box-sizing: border-box; border-radius: 12px; border: 1px solid var(--border-color, rgba(148, 163, 184, 0.28)); background: var(--bg-surface, rgba(255,255,255,0.92)); color: var(--text-primary, #0f172a); padding: 10px 12px; font: inherit; }',
      '.lf-input, .lf-select { min-height: 42px; }',
      '.lf-textarea { min-height: 420px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; line-height: 1.55; }',
      '.lf-btn { appearance: none; border-radius: 999px; border: 1px solid var(--border-color, rgba(148, 163, 184, 0.28)); background: var(--bg-surface, rgba(255,255,255,0.92)); color: var(--text-primary, #0f172a); padding: 9px 14px; font: inherit; font-weight: 600; cursor: pointer; transition: transform 120ms ease, background 120ms ease; }',
      '.lf-btn:hover { transform: translateY(-1px); }',
      '.lf-btn-primary { background: linear-gradient(135deg, #0f766e 0%, #1d4ed8 100%); border-color: transparent; color: #fff; }',
      '.lf-btn-soft { background: var(--bg-surface-elevated, rgba(248,250,252,0.92)); }',
      '.lf-btn-danger { background: rgba(239, 68, 68, 0.1); color: #b91c1c; border-color: rgba(239, 68, 68, 0.24); }',
      '.lf-btn:disabled { opacity: 0.6; cursor: wait; transform: none; }',
      '.lf-notice { border-radius: 14px; padding: 12px 14px; margin-bottom: 14px; border: 1px solid transparent; line-height: 1.45; }',
      '.lf-notice-info { background: rgba(59,130,246,0.09); color: #1d4ed8; border-color: rgba(59,130,246,0.18); }',
      '.lf-notice-success { background: rgba(16,185,129,0.1); color: #047857; border-color: rgba(16,185,129,0.24); }',
      '.lf-notice-error { background: rgba(239,68,68,0.1); color: #b91c1c; border-color: rgba(239,68,68,0.24); }',
      '.lf-page-grid { display: grid; gap: 16px; align-items: start; }',
      '.lf-docs-grid { grid-template-columns: 280px minmax(380px, 1fr) minmax(340px, 0.9fr); }',
      '.lf-governance-grid { grid-template-columns: 240px 320px minmax(420px, 1fr); }',
      '.lf-knowledge-grid { grid-template-columns: 320px minmax(460px, 1fr); }',
      '.lf-panel { border-radius: 20px; border: 1px solid var(--border-color, rgba(148, 163, 184, 0.28)); background: linear-gradient(180deg, var(--bg-surface, rgba(255,255,255,0.94)) 0%, var(--bg-surface-elevated, rgba(248,250,252,0.96)) 100%); box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06); overflow: hidden; min-width: 0; }',
      '.lf-panel-header { padding: 16px 18px 12px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; border-bottom: 1px solid var(--border-color, rgba(148, 163, 184, 0.18)); }',
      '.lf-panel-title { font-size: 15px; font-weight: 700; margin: 0; }',
      '.lf-panel-subtitle { margin-top: 4px; color: var(--text-secondary, #475569); font-size: 13px; line-height: 1.45; }',
      '.lf-panel-body { padding: 16px 18px 18px; }',
      '.lf-stack { display: flex; flex-direction: column; gap: 12px; }',
      '.lf-pill-row { display: flex; gap: 8px; flex-wrap: wrap; }',
      '.lf-pill { border-radius: 999px; border: 1px solid var(--border-color, rgba(148,163,184,0.24)); background: transparent; color: var(--text-secondary, #475569); padding: 7px 12px; cursor: pointer; font: inherit; font-size: 13px; }',
      '.lf-pill-active { background: rgba(13,148,136,0.12); color: #0f766e; border-color: rgba(13,148,136,0.24); }',
      '.lf-list { display: flex; flex-direction: column; gap: 8px; }',
      '.lf-list-item { border-radius: 16px; border: 1px solid transparent; background: rgba(255,255,255,0.55); padding: 12px 14px; cursor: pointer; transition: border-color 120ms ease, background 120ms ease, transform 120ms ease; min-width: 0; }',
      '.lf-list-item:hover { border-color: rgba(15,118,110,0.2); transform: translateY(-1px); }',
      '.lf-list-item-active { background: rgba(13,148,136,0.1); border-color: rgba(13,148,136,0.22); }',
      '.lf-list-title { font-weight: 700; line-height: 1.35; word-break: break-word; }',
      '.lf-list-meta { margin-top: 6px; color: var(--text-secondary, #64748b); font-size: 12px; line-height: 1.45; }',
      '.lf-muted { color: var(--text-secondary, #64748b); }',
      '.lf-empty { padding: 26px 18px; border-radius: 16px; border: 1px dashed rgba(148,163,184,0.35); color: var(--text-secondary, #64748b); line-height: 1.55; background: rgba(248,250,252,0.55); }',
      '.lf-form-grid { display: grid; gap: 12px; }',
      '.lf-form-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }',
      '.lf-editor-meta { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }',
      '.lf-markdown { min-height: 320px; }',
      '.lf-markdown .md-content { color: var(--text-primary, #0f172a); }',
      '.lf-divider { height: 1px; background: var(--border-color, rgba(148,163,184,0.18)); margin: 16px 0; }',
      '.lf-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }',
      '.lf-stat { border-radius: 16px; padding: 14px; background: rgba(255,255,255,0.6); border: 1px solid rgba(148,163,184,0.18); }',
      '.lf-stat-value { font-size: 24px; font-weight: 700; letter-spacing: -0.03em; }',
      '.lf-stat-label { margin-top: 4px; color: var(--text-secondary, #64748b); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }',
      '.lf-table-wrap { overflow: auto; border-radius: 16px; border: 1px solid rgba(148,163,184,0.2); }',
      '.lf-table { width: 100%; border-collapse: collapse; font-size: 13px; }',
      '.lf-table th, .lf-table td { padding: 11px 12px; border-bottom: 1px solid rgba(148,163,184,0.14); text-align: left; vertical-align: top; }',
      '.lf-table th { background: rgba(248,250,252,0.85); color: var(--text-secondary, #475569); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }',
      '.lf-row-button { cursor: pointer; }',
      '.lf-row-button:hover { background: rgba(59,130,246,0.06); }',
      '.lf-row-active { background: rgba(13,148,136,0.08); }',
      '.lf-section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary, #64748b); margin-bottom: 8px; font-weight: 700; }',
      '.lf-chip-list { display: flex; gap: 8px; flex-wrap: wrap; }',
      '.lf-chip { border-radius: 999px; padding: 6px 10px; background: rgba(13,148,136,0.08); color: #0f766e; border: 1px solid rgba(13,148,136,0.16); font-size: 12px; }',
      '.lf-keyvals { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }',
      '.lf-keyval { padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.58); border: 1px solid rgba(148,163,184,0.18); }',
      '.lf-key { color: var(--text-secondary, #64748b); font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; }',
      '.lf-value { margin-top: 4px; line-height: 1.45; word-break: break-word; }',
      '.lf-inline-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }',
      '.lf-indent-1 { margin-left: 16px; }',
      '.lf-indent-2 { margin-left: 32px; }',
      '.lf-indent-3 { margin-left: 48px; }',
      '@media (max-width: 1280px) { .lf-docs-grid, .lf-governance-grid, .lf-knowledge-grid { grid-template-columns: 1fr; } }',
      '@media (max-width: 720px) { .lf-app { padding: 18px; } .lf-title { font-size: 24px; } .lf-panel-body, .lf-panel-header { padding-left: 14px; padding-right: 14px; } .lf-form-grid-2 { grid-template-columns: 1fr; } }'
    ].join('\n');

    document.head.appendChild(style);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function safeArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function asObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  }

  function escapeHtml(value) {
    var helper = utils().escapeHtml;
    if (helper) return helper(String(value == null ? '' : value));
    var node = document.createElement('div');
    node.textContent = String(value == null ? '' : value);
    return node.innerHTML;
  }

  function badge(text, bgColor, textColor) {
    if (utils().createBadge) return utils().createBadge(text, bgColor, textColor);
    var node = el('span', '', text);
    node.style.cssText = 'display:inline-flex;align-items:center;padding:4px 9px;border-radius:999px;font-size:12px;font-weight:700;';
    if (bgColor) node.style.background = bgColor;
    if (textColor) node.style.color = textColor;
    return node;
  }

  function statusBadge(status) {
    if (utils().createStatusBadge) return utils().createStatusBadge(status || 'DRAFT');
    return badge(status || 'DRAFT', 'rgba(59,130,246,0.1)', '#1d4ed8');
  }

  function createButton(label, kind, handler) {
    var button = el('button', 'lf-btn' + (kind ? ' lf-btn-' + kind : ''), label);
    button.type = 'button';
    if (handler) button.addEventListener('click', handler);
    return button;
  }

  function createInput(type, value, placeholder) {
    var input = el('input', 'lf-input');
    input.type = type || 'text';
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    return input;
  }

  function createSelect(options, selectedValue) {
    var select = el('select', 'lf-select');
    safeArray(options).forEach(function (option) {
      var item = document.createElement('option');
      item.value = option.value;
      item.textContent = option.label;
      if (option.value === selectedValue) item.selected = true;
      select.appendChild(item);
    });
    return select;
  }

  function createTextarea(value, placeholder) {
    var input = el('textarea', 'lf-textarea');
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    return input;
  }

  function createNotice(kind, text) {
    return el('div', 'lf-notice lf-notice-' + kind, text);
  }

  function createEmptyState(title, body) {
    var node = el('div', 'lf-empty');
    var heading = el('div', 'lf-list-title', title);
    var copy = el('div', 'lf-list-meta', body);
    node.appendChild(heading);
    node.appendChild(copy);
    return node;
  }

  function createPanel(title, subtitle) {
    var panel = el('section', 'lf-panel');
    var header = el('div', 'lf-panel-header');
    var intro = el('div');
    intro.appendChild(el('div', 'lf-panel-title', title));
    if (subtitle) intro.appendChild(el('div', 'lf-panel-subtitle', subtitle));
    var actions = el('div', 'lf-inline-actions');
    header.appendChild(intro);
    header.appendChild(actions);
    panel.appendChild(header);
    var body = el('div', 'lf-panel-body');
    panel.appendChild(body);
    return { panel: panel, body: body, actions: actions };
  }

  function renderMarkdownNode(markdown) {
    var rendered = utils().renderMarkdown ? utils().renderMarkdown(markdown || '') : null;
    if (rendered && rendered.nodeType === 1) return rendered;
    var fallback = el('div', 'md-content');
    fallback.innerHTML = rendered || escapeHtml(markdown || '');
    return fallback;
  }

  function formatDate(value) {
    if (!value) return 'Unknown';
    var date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function prefixTool(name) {
    return TOOL_PREFIX + name;
  }

  function localUrl(path) {
    var normalized = path && path.charAt(0) === '/' ? path : '/' + (path || '');
    return 'http://localhost:4200' + normalized;
  }

  function directMcpFetch(toolName, args) {
    return fetch(localUrl('/mcp'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args || {}
        }
      })
    }).then(function (res) {
      if (!res.ok) throw new Error('MCP request failed: ' + res.status);
      return res.json().then(function (payload) {
        if (payload && payload.error && payload.error.message) {
          throw new Error(payload.error.message);
        }
        return payload && payload.result ? payload.result : payload;
      });
    });
  }

  function parseToolResponse(result) {
    if (!result) throw new Error('No response returned from MCP proxy.');
    if (result.isError) {
      var errorText = result.content && result.content[0] && result.content[0].text;
      throw new Error(errorText || 'MCP tool returned an error.');
    }
    if (!result.content || !result.content[0] || typeof result.content[0].text !== 'string') {
      return result;
    }

    var parsed;
    try {
      parsed = JSON.parse(result.content[0].text);
    } catch (error) {
      throw new Error('Failed to parse MCP payload.');
    }
    if (parsed && parsed.error) throw new Error(parsed.error);
    return parsed || {};
  }

  function callTool(toolName, args) {
    var prefixedTool = prefixTool(toolName);
    return directMcpFetch(prefixedTool, args || {}).then(parseToolResponse);
  }

  function invokeTauri(command, args) {
    if (!window.__TAURI__ || !window.__TAURI__.core || typeof window.__TAURI__.core.invoke !== 'function') {
      return Promise.reject(new Error('This action requires the MCP Views desktop app.'));
    }
    return window.__TAURI__.core.invoke(command, args || {});
  }

  function cloneArgs(args) {
    var next = {};
    Object.keys(args || {}).forEach(function (key) {
      next[key] = args[key];
    });
    return next;
  }

  function withOrg(state, args) {
    var next = cloneArgs(args || {});
    if (state.currentOrgId) next.organization_id = state.currentOrgId;
    return next;
  }

  function pickOrgId(orgs, preferredOrgId) {
    if (!orgs.length) return null;
    for (var i = 0; i < orgs.length; i += 1) {
      if (orgs[i].id === preferredOrgId) return preferredOrgId;
    }
    for (var j = 0; j < orgs.length; j += 1) {
      if (orgs[j].is_current) return orgs[j].id;
    }
    for (var k = 0; k < orgs.length; k += 1) {
      if (orgs[k].has_mcpviews_token) return orgs[k].id;
    }
    return orgs[0].id;
  }

  function currentOrg(state) {
    for (var i = 0; i < state.orgs.length; i += 1) {
      if (state.orgs[i].id === state.currentOrgId) return state.orgs[i];
    }
    return null;
  }

  function orgHasToken(state) {
    var org = currentOrg(state);
    return !!org && org.has_mcpviews_token !== false;
  }

  function loadOrganizations(state, preferredOrgId) {
    return callTool('list_organizations', {}).then(function (payload) {
      var orgs = safeArray(payload.data || payload);
      state.orgs = orgs;
      state.currentOrgId = pickOrgId(orgs, preferredOrgId || state.currentOrgId);
      return orgs;
    });
  }

  function columnTypeName(column) {
    return column.originalDataType || column.original_data_type || column.type || 'Unknown';
  }

  function tableDataSource(table) {
    return table.dataSource || table.data_source || {};
  }

  function folderName(folderId, folders) {
    if (!folderId) return 'Unfiled';
    for (var i = 0; i < folders.length; i += 1) {
      if (folders[i].id === folderId) return folders[i].name || 'Folder';
    }
    return 'Folder';
  }

  function entryTags(entry) {
    return safeArray(entry.tags).join(', ');
  }

  function tagListFromInput(value) {
    return String(value || '')
      .split(',')
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
  }

  function flattenEntries(entries) {
    var rows = [];
    function walk(entry, depth) {
      rows.push({ entry: entry, depth: depth });
      safeArray(entry.children).forEach(function (child) {
        walk(child, depth + 1);
      });
    }
    safeArray(entries).forEach(function (entry) { walk(entry, 0); });
    return rows;
  }

  function findEntry(entries, entryId) {
    var flat = flattenEntries(entries);
    for (var i = 0; i < flat.length; i += 1) {
      if (flat[i].entry.id === entryId) return flat[i].entry;
    }
    return null;
  }

  function cloneEntryForm(entry) {
    entry = entry || {};
    return {
      name: entry.name || '',
      category: entry.category || '',
      description: entry.description || '',
      tags: entryTags(entry),
      parent_entry_id: entry.parentEntryId || entry.parent_entry_id || ''
    };
  }

  function mappingPath(mapping) {
    if (!mapping) return 'Unknown mapping';
    if (mapping.dataSourceName || mapping.tableName || mapping.columnName) {
      return [mapping.dataSourceName, mapping.tableName, mapping.columnName].filter(Boolean).join('.');
    }
    var column = mapping.column || {};
    var table = column.table || {};
    var dataSource = table.dataSource || table.data_source || {};
    return [dataSource.name, table.name, column.name].filter(Boolean).join('.');
  }

  function renderShell(container, state, config, renderBody) {
    ensureStyles();
    clear(container);

    var root = el('div', 'lf-app');
    container.appendChild(root);

    var header = el('div', 'lf-header');
    var intro = el('div');
    intro.appendChild(el('h1', 'lf-title', config.title));
    intro.appendChild(el('div', 'lf-subtitle', config.subtitle));
    header.appendChild(intro);

    var controls = el('div', 'lf-controls');
    if (state.orgs.length) {
      var select = createSelect(
        state.orgs.map(function (org) {
          var label = org.name || org.slug || org.id;
          if (org.has_mcpviews_token === false) label += ' (auth required)';
          return { value: org.id, label: label };
        }),
        state.currentOrgId
      );
      select.style.minWidth = '260px';
      select.addEventListener('change', function () {
        var previousOrgId = state.currentOrgId;
        state.currentOrgId = select.value;
        state.notice = null;
        state.error = '';
        config.onOrgChange(select.value, previousOrgId);
      });
      controls.appendChild(select);
    }

    var refreshButton = createButton(state.loading ? 'Refreshing…' : 'Refresh', 'soft', function () {
      config.onRefresh();
    });
    refreshButton.disabled = !!state.loading;
    controls.appendChild(refreshButton);

    var org = currentOrg(state);
    if (org && org.has_mcpviews_token === false) {
      var connectButton = createButton('Connect Org', 'primary', function () {
        state.loading = true;
        state.error = '';
        state.notice = null;
        renderShell(container, state, config, renderBody);
        invokeTauri('start_plugin_auth', { pluginName: PLUGIN_NAME, orgId: org.id })
          .then(function () {
            state.notice = { kind: 'success', text: 'Organization connected. Reloading Ludflow data…' };
            return loadOrganizations(state, org.id);
          })
          .then(function () {
            return config.onRefresh();
          })
          .catch(function (error) {
            state.loading = false;
            state.error = error.message || 'Authentication was cancelled.';
            renderShell(container, state, config, renderBody);
          });
      });
      connectButton.disabled = !!state.loading;
      controls.appendChild(connectButton);
    }

    header.appendChild(controls);
    root.appendChild(header);

    if (state.notice && state.notice.text) {
      root.appendChild(createNotice(state.notice.kind || 'info', state.notice.text));
    }
    if (state.error) {
      root.appendChild(createNotice('error', state.error));
    }

    if (state.initializing) {
      root.appendChild(createEmptyState('Loading Ludflow workspace', 'MCP Views is fetching organization context and page data.'));
      return;
    }

    if (!state.orgs.length) {
      root.appendChild(createEmptyState('No Ludflow organizations found', 'This account does not appear to have access to any Ludflow organizations yet.'));
      return;
    }

    if (!orgHasToken(state)) {
      root.appendChild(createEmptyState('Authentication required', 'Select Connect Org to authorize this Ludflow organization for use inside MCP Views.'));
      return;
    }

    renderBody(root);
  }

  function createDocumentsRenderer(container, data) {
    var state = {
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      saving: false,
      notice: null,
      error: '',
      folders: [],
      documents: [],
      selectedFolderId: 'all',
      selectedDocumentId: data.document_id || null,
      currentDocument: null,
      draftTitle: '',
      draftContent: '',
      dirty: false
    };

    function visibleDocuments() {
      if (state.selectedFolderId === 'all') return state.documents;
      if (state.selectedFolderId === 'unfiled') {
        return state.documents.filter(function (documentItem) { return !documentItem.folderId && !documentItem.folder_id; });
      }
      return state.documents.filter(function (documentItem) {
        return (documentItem.folderId || documentItem.folder_id) === state.selectedFolderId;
      });
    }

    function selectedDocumentRecord() {
      for (var i = 0; i < state.documents.length; i += 1) {
        if (state.documents[i].id === state.selectedDocumentId) return state.documents[i];
      }
      return null;
    }

    function setDraftFromDocument(documentItem) {
      state.currentDocument = documentItem;
      state.selectedDocumentId = documentItem && documentItem.id ? documentItem.id : null;
      state.draftTitle = (documentItem && documentItem.title) || '';
      state.draftContent = (documentItem && documentItem.content) || '';
      state.dirty = false;
    }

    function loadDocument(documentId, silent) {
      if (!documentId) {
        setDraftFromDocument(null);
        state.loading = false;
        state.initializing = false;
        render();
        return Promise.resolve();
      }

      state.loading = true;
      if (!silent) render();

      return callTool('get_document', withOrg(state, {
        document_id: documentId,
        include_links: true,
        include_children: true
      }))
        .then(function (payload) {
          setDraftFromDocument(payload.data || payload);
          state.loading = false;
          state.initializing = false;
          render();
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load document.';
          render();
        });
    }

    function refreshIndex() {
      if (!orgHasToken(state) && !state.initializing) {
        state.loading = false;
        render();
        return Promise.resolve();
      }

      state.loading = true;
      state.error = '';
      render();

      return Promise.all([
        callTool('manage_folders', withOrg(state, { action: 'list' })),
        callTool('list_documents', withOrg(state, { format: 'full', limit: 200 }))
      ])
        .then(function (results) {
          state.folders = safeArray(results[0].data || results[0]);
          state.documents = safeArray(results[1].data || results[1]);
          if (state.selectedFolderId !== 'all' && state.selectedFolderId !== 'unfiled') {
            var hasFolder = false;
            for (var i = 0; i < state.folders.length; i += 1) {
              if (state.folders[i].id === state.selectedFolderId) hasFolder = true;
            }
            if (!hasFolder) state.selectedFolderId = 'all';
          }

          var nextDocumentId = null;
          var current = selectedDocumentRecord();
          if (current) nextDocumentId = current.id;
          if (!nextDocumentId && data.document_id) {
            nextDocumentId = data.document_id;
            data.document_id = null;
          }
          if (!nextDocumentId && visibleDocuments().length) nextDocumentId = visibleDocuments()[0].id;
          if (!nextDocumentId && state.documents.length) nextDocumentId = state.documents[0].id;

          if (nextDocumentId) {
            return loadDocument(nextDocumentId, true);
          }

          setDraftFromDocument(null);
          state.loading = false;
          state.initializing = false;
          render();
          return null;
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load document index.';
          render();
        });
    }

    function saveDocument() {
      var trimmedTitle = String(state.draftTitle || '').trim() || 'Untitled';
      state.saving = true;
      state.loading = true;
      state.error = '';
      state.notice = null;
      render();

      var args = {
        title: trimmedTitle,
        content: state.draftContent || '',
        create_version: true,
        version_label: 'MCPViews edit'
      };
      if (state.selectedDocumentId) {
        args.document_id = state.selectedDocumentId;
      } else if (state.selectedFolderId !== 'all' && state.selectedFolderId !== 'unfiled') {
        args.folder_id = state.selectedFolderId;
      }

      return callTool('write_document', withOrg(state, args))
        .then(function (payload) {
          var info = payload.data || payload;
          var nextId = info.id || info.document_id || state.selectedDocumentId;
          state.notice = {
            kind: 'success',
            text: info.action === 'created' ? 'Document created inside Ludflow.' : 'Document saved to Ludflow.'
          };
          state.saving = false;
          state.selectedDocumentId = nextId || state.selectedDocumentId;
          return refreshIndex();
        })
        .catch(function (error) {
          state.loading = false;
          state.saving = false;
          state.error = error.message || 'Failed to save document.';
          render();
        });
    }

    function renderBody(root) {
      var layout = el('div', 'lf-page-grid lf-docs-grid');
      root.appendChild(layout);

      var folderPanel = createPanel('Document Browser', 'Filter the Ludflow home-page document list by folder and open a working copy.');
      layout.appendChild(folderPanel.panel);

      var allCount = state.documents.length;
      var unfiledCount = state.documents.filter(function (documentItem) {
        return !(documentItem.folderId || documentItem.folder_id);
      }).length;

      var folderPills = el('div', 'lf-pill-row');
      folderPanel.body.appendChild(folderPills);

      [
        { id: 'all', label: 'All Documents', count: allCount },
        { id: 'unfiled', label: 'Unfiled', count: unfiledCount }
      ]
        .concat(state.folders.map(function (folder) {
          var count = state.documents.filter(function (documentItem) {
            return (documentItem.folderId || documentItem.folder_id) === folder.id;
          }).length;
          return { id: folder.id, label: folder.name || 'Folder', count: count };
        }))
        .forEach(function (item) {
          var pill = el('button', 'lf-pill' + (state.selectedFolderId === item.id ? ' lf-pill-active' : ''), item.label + ' (' + item.count + ')');
          pill.type = 'button';
          pill.addEventListener('click', function () {
            state.selectedFolderId = item.id;
            state.notice = null;
            var docs = visibleDocuments();
            if (docs.length && docs.every(function (documentItem) { return documentItem.id !== state.selectedDocumentId; })) {
              loadDocument(docs[0].id);
              return;
            }
            render();
          });
          folderPills.appendChild(pill);
        });

      folderPanel.body.appendChild(el('div', 'lf-divider'));

      var browserActions = el('div', 'lf-inline-actions');
      var newDocumentButton = createButton('New Document', 'soft', function () {
        if (state.dirty && !window.confirm('Discard unsaved changes and start a new document?')) return;
        setDraftFromDocument(null);
        state.notice = { kind: 'info', text: 'Creating a new document. Save when you are ready.' };
        render();
      });
      browserActions.appendChild(newDocumentButton);
      folderPanel.body.appendChild(browserActions);
      folderPanel.body.appendChild(el('div', 'lf-divider'));

      var docs = visibleDocuments();
      if (!docs.length) {
        folderPanel.body.appendChild(createEmptyState('No documents in this view', 'Choose another folder or create a new document from MCP Views.'));
      } else {
        var list = el('div', 'lf-list');
        docs.forEach(function (documentItem) {
          var item = el('button', 'lf-list-item' + (documentItem.id === state.selectedDocumentId ? ' lf-list-item-active' : ''));
          item.type = 'button';
          item.addEventListener('click', function () {
            if (state.dirty && documentItem.id !== state.selectedDocumentId && !window.confirm('Discard unsaved changes and switch documents?')) return;
            loadDocument(documentItem.id);
          });

          item.appendChild(el('div', 'lf-list-title', documentItem.title || 'Untitled'));
          item.appendChild(el(
            'div',
            'lf-list-meta',
            folderName(documentItem.folderId || documentItem.folder_id, state.folders) +
              ' • ' + (documentItem.status || 'DRAFT') +
              ' • Updated ' + formatDate(documentItem.updatedAt || documentItem.updated_at)
          ));
          list.appendChild(item);
        });
        folderPanel.body.appendChild(list);
      }

      var editorPanel = createPanel('Editor', 'This mirrors Ludflow’s document workspace with a writable draft and save back to MCP.');
      layout.appendChild(editorPanel.panel);
      editorPanel.actions.appendChild(state.dirty ? badge('Unsaved', 'rgba(245, 158, 11, 0.12)', '#b45309') : badge('Synced', 'rgba(16, 185, 129, 0.12)', '#047857'));
      var saveButton = createButton(state.saving ? 'Saving…' : 'Save', 'primary', saveDocument);
      saveButton.disabled = state.saving || !String(state.draftTitle || state.draftContent || '').length;
      editorPanel.actions.appendChild(saveButton);

      var titleInput = createInput('text', state.draftTitle, 'Document title');
      titleInput.style.fontSize = '20px';
      titleInput.style.fontWeight = '700';
      titleInput.addEventListener('input', function () {
        state.draftTitle = titleInput.value;
        state.dirty = true;
        metaRowStatus();
        previewRefresh();
      });
      editorPanel.body.appendChild(titleInput);

      var editorMeta = el('div', 'lf-editor-meta');
      editorMeta.style.marginTop = '12px';
      editorPanel.body.appendChild(editorMeta);

      function metaRowStatus() {
        clear(editorMeta);
        if (state.selectedDocumentId && state.currentDocument) {
          editorMeta.appendChild(statusBadge(state.currentDocument.status || 'DRAFT'));
          editorMeta.appendChild(badge(folderName(state.currentDocument.folderId || state.currentDocument.folder_id, state.folders), 'rgba(59,130,246,0.1)', '#1d4ed8'));
          editorMeta.appendChild(badge('Updated ' + formatDate(state.currentDocument.updatedAt || state.currentDocument.updated_at), 'rgba(15,23,42,0.06)', 'var(--text-secondary, #64748b)'));
        } else {
          editorMeta.appendChild(badge('New draft', 'rgba(13,148,136,0.12)', '#0f766e'));
          editorMeta.appendChild(badge(folderName(state.selectedFolderId === 'all' ? null : state.selectedFolderId, state.folders), 'rgba(59,130,246,0.1)', '#1d4ed8'));
        }
        if (state.dirty) editorMeta.appendChild(badge('Unsaved changes', 'rgba(245,158,11,0.12)', '#b45309'));
      }
      metaRowStatus();

      var bodyInput = createTextarea(state.draftContent, 'Write markdown here. Mermaid blocks and Ludflow field references are supported.');
      bodyInput.style.marginTop = '14px';
      bodyInput.addEventListener('input', function () {
        state.draftContent = bodyInput.value;
        state.dirty = true;
        metaRowStatus();
        previewRefresh();
      });
      editorPanel.body.appendChild(bodyInput);

      if (state.currentDocument && (safeArray(state.currentDocument.children).length || safeArray(state.currentDocument.outbound_links).length)) {
        editorPanel.body.appendChild(el('div', 'lf-divider'));
        var supportTitle = el('div', 'lf-section-title', 'Context');
        editorPanel.body.appendChild(supportTitle);
        var supportText = [];
        if (safeArray(state.currentDocument.children).length) supportText.push(safeArray(state.currentDocument.children).length + ' child docs');
        if (safeArray(state.currentDocument.outbound_links).length) supportText.push(safeArray(state.currentDocument.outbound_links).length + ' outbound links');
        if (safeArray(state.currentDocument.inbound_links).length) supportText.push(safeArray(state.currentDocument.inbound_links).length + ' inbound links');
        editorPanel.body.appendChild(el('div', 'lf-muted', supportText.join(' • ')));
      }

      var previewPanel = createPanel('Preview', 'Rendered markdown preview for the current Ludflow document draft.');
      layout.appendChild(previewPanel.panel);

      var previewMount = el('div', 'lf-markdown');
      previewPanel.body.appendChild(previewMount);

      function previewRefresh() {
        clear(previewMount);
        if (!String(state.draftTitle || state.draftContent || '').trim()) {
          previewMount.appendChild(createEmptyState('Preview is waiting for content', 'Start writing in the editor and the rendered document will appear here.'));
          return;
        }
        var title = el('div', 'lf-panel-title', state.draftTitle || 'Untitled');
        title.style.marginBottom = '12px';
        previewMount.appendChild(title);
        previewMount.appendChild(renderMarkdownNode(state.draftContent || ''));
      }
      previewRefresh();
    }

    function render() {
      renderShell(container, state, {
        title: 'Documents',
        subtitle: 'Bring Ludflow’s document viewer into MCP Views: browse folders, edit markdown, and keep a live preview open beside the source.',
        onRefresh: refreshIndex,
        onOrgChange: function (_nextOrgId, previousOrgId) {
          if (state.dirty && !window.confirm('Switch organizations and discard the current unsaved draft?')) {
            state.currentOrgId = previousOrgId;
            render();
            return;
          }
          state.selectedDocumentId = null;
          setDraftFromDocument(null);
          refreshIndex();
        }
      }, renderBody);
    }

    loadOrganizations(state, state.currentOrgId)
      .then(function () {
        state.initializing = false;
        return refreshIndex();
      })
      .catch(function (error) {
        state.initializing = false;
        state.error = error.message || 'Failed to load organizations.';
        render();
      });
  }

  function createDataGovernanceRenderer(container, data) {
    var state = {
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      notice: null,
      error: '',
      tables: [],
      selectedDataSourceId: data.data_source_id || null,
      selectedTableId: data.table_id || null,
      selectedColumnId: data.column_id || null,
      columnContext: null,
      contextLoading: false,
      tableSearch: ''
    };

    function dataSources() {
      var seen = {};
      var rows = [];
      state.tables.forEach(function (table) {
        var source = tableDataSource(table);
        var id = source.id || table.dataSourceId || table.data_source_id || ('source:' + (source.name || 'unknown'));
        if (seen[id]) return;
        seen[id] = true;
        rows.push({
          id: id,
          name: source.name || 'Unknown Source',
          sourceType: source.sourceType || source.source_type || 'Data Source',
          tableCount: state.tables.filter(function (candidate) {
            var candidateSource = tableDataSource(candidate);
            var candidateId = candidateSource.id || candidate.dataSourceId || candidate.data_source_id || ('source:' + (candidateSource.name || 'unknown'));
            return candidateId === id;
          }).length
        });
      });
      return rows;
    }

    function visibleTables() {
      return state.tables.filter(function (table) {
        var source = tableDataSource(table);
        var sourceId = source.id || table.dataSourceId || table.data_source_id || ('source:' + (source.name || 'unknown'));
        var matchesSource = !state.selectedDataSourceId || sourceId === state.selectedDataSourceId;
        var matchesSearch = !state.tableSearch || String(table.name || '').toLowerCase().indexOf(state.tableSearch.toLowerCase()) >= 0;
        return matchesSource && matchesSearch;
      });
    }

    function selectedTable() {
      var tables = visibleTables();
      for (var i = 0; i < tables.length; i += 1) {
        if (tables[i].id === state.selectedTableId) return tables[i];
      }
      for (var j = 0; j < state.tables.length; j += 1) {
        if (state.tables[j].id === state.selectedTableId) return state.tables[j];
      }
      return null;
    }

    function ensureSelections() {
      var sources = dataSources();
      if (sources.length && !sources.some(function (source) { return source.id === state.selectedDataSourceId; })) {
        var requestedTable = null;
        for (var i = 0; i < state.tables.length; i += 1) {
          if (state.tables[i].id === data.table_id) requestedTable = state.tables[i];
        }
        if (requestedTable) {
          var requestedSource = tableDataSource(requestedTable);
          state.selectedDataSourceId = requestedSource.id || requestedTable.dataSourceId || requestedTable.data_source_id || ('source:' + (requestedSource.name || 'unknown'));
        } else {
          state.selectedDataSourceId = sources[0].id;
        }
      }

      var tables = visibleTables();
      if (tables.length && !tables.some(function (table) { return table.id === state.selectedTableId; })) {
        state.selectedTableId = data.table_id || tables[0].id;
      }

      var table = selectedTable();
      var columns = safeArray(table && table.columns);
      if (columns.length && !columns.some(function (column) { return column.id === state.selectedColumnId; })) {
        state.selectedColumnId = data.column_id || columns[0].id;
      }
    }

    function loadColumnContext(columnId, silent) {
      if (!columnId) {
        state.columnContext = null;
        state.contextLoading = false;
        render();
        return Promise.resolve();
      }
      state.selectedColumnId = columnId;
      state.contextLoading = true;
      if (!silent) render();
      return callTool('get_column_context', withOrg(state, { column_id: columnId }))
        .then(function (payload) {
          state.columnContext = payload.data || payload;
          state.contextLoading = false;
          render();
        })
        .catch(function (error) {
          state.contextLoading = false;
          state.error = error.message || 'Failed to load column context.';
          render();
        });
    }

    function refreshData() {
      if (!orgHasToken(state) && !state.initializing) {
        state.loading = false;
        render();
        return Promise.resolve();
      }

      state.loading = true;
      state.error = '';
      render();

      return callTool('get_data_schema', withOrg(state, {
        format: 'full',
        include_metadata: false,
        limit: 500
      }))
        .then(function (payload) {
          var dataPayload = payload.data || payload;
          state.tables = safeArray(dataPayload.tables || dataPayload);
          ensureSelections();
          state.loading = false;
          state.initializing = false;
          render();

          if (state.selectedColumnId) {
            return loadColumnContext(state.selectedColumnId, true);
          }
          return null;
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load data governance schema.';
          render();
        });
    }

    function renderBody(root) {
      var stats = el('div', 'lf-stats');
      stats.appendChild(statCard(String(dataSources().length), 'Data Sources'));
      stats.appendChild(statCard(String(state.tables.length), 'Tables'));
      var totalColumns = state.tables.reduce(function (count, table) { return count + safeArray(table.columns).length; }, 0);
      stats.appendChild(statCard(String(totalColumns), 'Columns'));
      root.appendChild(stats);

      var layout = el('div', 'lf-page-grid lf-governance-grid');
      layout.style.marginTop = '16px';
      root.appendChild(layout);

      var sourcePanel = createPanel('Data Sources', 'Adapted from Ludflow’s left rail so you can jump across governance domains quickly.');
      layout.appendChild(sourcePanel.panel);
      if (!dataSources().length) {
        sourcePanel.body.appendChild(createEmptyState('No governed tables found', 'Run a schema sync in Ludflow before using this page.'));
      } else {
        var sourceList = el('div', 'lf-list');
        dataSources().forEach(function (source) {
          var sourceItem = el('button', 'lf-list-item' + (source.id === state.selectedDataSourceId ? ' lf-list-item-active' : ''));
          sourceItem.type = 'button';
          sourceItem.addEventListener('click', function () {
            state.selectedDataSourceId = source.id;
            ensureSelections();
            render();
            if (state.selectedColumnId) loadColumnContext(state.selectedColumnId, true);
          });
          sourceItem.appendChild(el('div', 'lf-list-title', source.name));
          sourceItem.appendChild(el('div', 'lf-list-meta', source.sourceType + ' • ' + source.tableCount + ' table' + (source.tableCount === 1 ? '' : 's')));
          sourceList.appendChild(sourceItem);
        });
        sourcePanel.body.appendChild(sourceList);
      }

      var tablePanel = createPanel('Tables', 'This mirrors Ludflow’s table browser with search and datasource scoping.');
      layout.appendChild(tablePanel.panel);
      var searchInput = createInput('text', state.tableSearch, 'Filter tables');
      searchInput.addEventListener('input', function () {
        state.tableSearch = searchInput.value;
        ensureSelections();
        render();
        if (state.selectedColumnId) loadColumnContext(state.selectedColumnId, true);
      });
      tablePanel.body.appendChild(searchInput);
      tablePanel.body.appendChild(el('div', 'lf-divider'));
      var filteredTables = visibleTables();
      if (!filteredTables.length) {
        tablePanel.body.appendChild(createEmptyState('No tables match this filter', 'Try another datasource or clear the search field.'));
      } else {
        var tableList = el('div', 'lf-list');
        filteredTables.forEach(function (table) {
          var meta = tableDataSource(table);
          var tableItem = el('button', 'lf-list-item' + (table.id === state.selectedTableId ? ' lf-list-item-active' : ''));
          tableItem.type = 'button';
          tableItem.addEventListener('click', function () {
            state.selectedTableId = table.id;
            state.selectedColumnId = safeArray(table.columns)[0] ? safeArray(table.columns)[0].id : null;
            render();
            if (state.selectedColumnId) loadColumnContext(state.selectedColumnId, true);
          });
          tableItem.appendChild(el('div', 'lf-list-title', table.name || 'Untitled table'));
          tableItem.appendChild(el('div', 'lf-list-meta', (meta.name || 'Unknown source') + ' • ' + safeArray(table.columns).length + ' columns'));
          tableList.appendChild(tableItem);
        });
        tablePanel.body.appendChild(tableList);
      }

      var detailPanel = createPanel('Table Detail', 'Schema table and linked column context adapted from Ludflow’s governance workspace.');
      layout.appendChild(detailPanel.panel);
      var table = selectedTable();
      if (!table) {
        detailPanel.body.appendChild(createEmptyState('Choose a table', 'Select a datasource and table to inspect schema details.'));
        return;
      }

      var source = tableDataSource(table);
      var metaGrid = el('div', 'lf-keyvals');
      metaGrid.appendChild(keyValueCard('Data Source', source.name || 'Unknown'));
      metaGrid.appendChild(keyValueCard('Type', source.sourceType || source.source_type || 'Data Source'));
      metaGrid.appendChild(keyValueCard('Columns', String(safeArray(table.columns).length)));
      metaGrid.appendChild(keyValueCard('Table ID', table.id));
      detailPanel.body.appendChild(metaGrid);
      detailPanel.body.appendChild(el('div', 'lf-divider'));

      var tableWrap = el('div', 'lf-table-wrap');
      var schemaTable = el('table', 'lf-table');
      tableWrap.appendChild(schemaTable);
      var head = document.createElement('thead');
      head.innerHTML = '<tr><th>Column</th><th>Type</th><th>Nullable</th><th>PK</th><th>Description</th></tr>';
      schemaTable.appendChild(head);
      var body = document.createElement('tbody');
      safeArray(table.columns).forEach(function (column) {
        var row = document.createElement('tr');
        row.className = 'lf-row-button' + (column.id === state.selectedColumnId ? ' lf-row-active' : '');
        row.addEventListener('click', function () {
          loadColumnContext(column.id);
        });

        var description = column.description || '—';
        row.innerHTML =
          '<td><strong>' + escapeHtml(column.name || 'Unnamed') + '</strong></td>' +
          '<td>' + escapeHtml(columnTypeName(column)) + '</td>' +
          '<td>' + (column.nullable ? 'Yes' : 'No') + '</td>' +
          '<td>' + ((column.isPrimaryKey || column.is_primary_key) ? 'Yes' : 'No') + '</td>' +
          '<td>' + escapeHtml(description) + '</td>';
        body.appendChild(row);
      });
      schemaTable.appendChild(body);
      detailPanel.body.appendChild(tableWrap);

      detailPanel.body.appendChild(el('div', 'lf-divider'));
      detailPanel.body.appendChild(el('div', 'lf-section-title', state.contextLoading ? 'Column Context • Loading…' : 'Column Context'));

      var contextMount = el('div');
      detailPanel.body.appendChild(contextMount);
      if (state.contextLoading) {
        contextMount.appendChild(createEmptyState('Loading context', 'Fetching business concepts, linked documents, and cross-column links from Ludflow.'));
      } else if (state.columnContext && window.__renderers.column_context) {
        window.__renderers.column_context(contextMount, state.columnContext, {}, {}, false, function () {});
      } else if (state.columnContext) {
        contextMount.appendChild(renderMarkdownNode('`' + (state.columnContext.column && state.columnContext.column.name || 'column') + '` loaded.'));
      } else {
        contextMount.appendChild(createEmptyState('Choose a column', 'Click any schema row above to inspect its full context.'));
      }
    }

    function render() {
      renderShell(container, state, {
        title: 'Data Governance',
        subtitle: 'Open Ludflow’s governed schema view inside MCP Views, including datasource navigation, table schemas, and the familiar column context drill-down.',
        onRefresh: refreshData,
        onOrgChange: function () {
          state.columnContext = null;
          state.selectedTableId = data.table_id || null;
          state.selectedColumnId = data.column_id || null;
          refreshData();
        }
      }, renderBody);
    }

    loadOrganizations(state, state.currentOrgId)
      .then(function () {
        state.initializing = false;
        return refreshData();
      })
      .catch(function (error) {
        state.initializing = false;
        state.error = error.message || 'Failed to load organizations.';
        render();
      });
  }

  function statCard(value, label) {
    var node = el('div', 'lf-stat');
    node.appendChild(el('div', 'lf-stat-value', value));
    node.appendChild(el('div', 'lf-stat-label', label));
    return node;
  }

  function keyValueCard(key, value) {
    var node = el('div', 'lf-keyval');
    node.appendChild(el('div', 'lf-key', key));
    node.appendChild(el('div', 'lf-value', value));
    return node;
  }

  function createKnowledgeDexRenderer(container, data) {
    var state = {
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      detailLoading: false,
      notice: null,
      error: '',
      activeTab: data.entry_id ? 'personal' : (data.mode === 'personal' ? 'personal' : 'org'),
      orgConcepts: [],
      personalEntries: [],
      personalMetadataColumns: [],
      selectedOrgConceptId: null,
      selectedPersonalEntryId: data.entry_id || null,
      personalMappings: [],
      personalValues: {},
      editingEntry: cloneEntryForm(null),
      newMetadataColumn: {
        name: '',
        dataType: 'TEXT'
      }
    };

    function selectedOrgConcept() {
      for (var i = 0; i < state.orgConcepts.length; i += 1) {
        if (state.orgConcepts[i].id === state.selectedOrgConceptId) return state.orgConcepts[i];
      }
      return state.orgConcepts[0] || null;
    }

    function flatPersonalEntries() {
      return flattenEntries(state.personalEntries);
    }

    function selectedPersonalEntry() {
      return findEntry(state.personalEntries, state.selectedPersonalEntryId);
    }

    function loadPersonalDetails(entryId, silent) {
      if (!entryId) {
        state.selectedPersonalEntryId = null;
        state.personalMappings = [];
        state.personalValues = {};
        state.detailLoading = false;
        state.editingEntry = cloneEntryForm(null);
        render();
        return Promise.resolve();
      }

      var entry = findEntry(state.personalEntries, entryId);
      state.selectedPersonalEntryId = entryId;
      state.editingEntry = cloneEntryForm(entry);
      state.detailLoading = true;
      if (!silent) render();

      return Promise.all([
        callTool('manage_knowledge_entries', withOrg(state, { action: 'get_mappings', entry_id: entryId })),
        callTool('manage_knowledge_metadata', withOrg(state, { action: 'get_values', entry_id: entryId }))
      ])
        .then(function (results) {
          state.personalMappings = safeArray((results[0].data || results[0]).columns);
          state.personalValues = asObject((results[1].data || results[1]).values);
          state.detailLoading = false;
          render();
        })
        .catch(function (error) {
          state.detailLoading = false;
          state.error = error.message || 'Failed to load Knowledge Dex details.';
          render();
        });
    }

    function ensureSelections() {
      if (state.orgConcepts.length && !selectedOrgConcept()) {
        state.selectedOrgConceptId = state.orgConcepts[0].id;
      }
      if (flatPersonalEntries().length && !selectedPersonalEntry()) {
        state.selectedPersonalEntryId = data.entry_id || flatPersonalEntries()[0].entry.id;
      }
    }

    function refreshData() {
      if (!orgHasToken(state) && !state.initializing) {
        state.loading = false;
        render();
        return Promise.resolve();
      }

      state.loading = true;
      state.error = '';
      render();

      return Promise.all([
        callTool('get_business_concepts', withOrg(state, { format: 'full', include_mappings: true, limit: 200 })),
        callTool('manage_knowledge_entries', withOrg(state, { action: 'list', include_metadata: true })),
        callTool('manage_knowledge_metadata', withOrg(state, { action: 'list_columns' }))
      ])
        .then(function (results) {
          state.orgConcepts = safeArray((results[0].data || results[0]).concepts);
          state.personalEntries = safeArray((results[1].data || results[1]).entries);
          state.personalMetadataColumns = safeArray((results[2].data || results[2]).columns);
          ensureSelections();
          state.loading = false;
          state.initializing = false;
          render();

          if (state.activeTab === 'personal' && state.selectedPersonalEntryId) {
            return loadPersonalDetails(state.selectedPersonalEntryId, true);
          }
          return null;
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load Knowledge Dex.';
          render();
        });
    }

    function saveEntry() {
      var name = String(state.editingEntry.name || '').trim();
      if (!name) {
        state.error = 'Entry name is required.';
        render();
        return;
      }

      state.loading = true;
      state.error = '';
      state.notice = null;
      render();

      var args = {
        action: state.selectedPersonalEntryId ? 'update' : 'create',
        name: name,
        category: String(state.editingEntry.category || '').trim() || undefined,
        description: String(state.editingEntry.description || '').trim() || undefined,
        tags: tagListFromInput(state.editingEntry.tags)
      };

      if (state.selectedPersonalEntryId) args.entry_id = state.selectedPersonalEntryId;
      if (!state.selectedPersonalEntryId && state.editingEntry.parent_entry_id) {
        args.parent_entry_id = state.editingEntry.parent_entry_id;
      }

      callTool('manage_knowledge_entries', withOrg(state, args))
        .then(function (payload) {
          var info = payload.data || payload;
          state.notice = {
            kind: 'success',
            text: state.selectedPersonalEntryId ? 'Personal entry updated.' : 'Personal entry created.'
          };
          state.selectedPersonalEntryId = info.id || info.entry_id || state.selectedPersonalEntryId;
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to save personal entry.';
          render();
        });
    }

    function deleteEntry() {
      if (!state.selectedPersonalEntryId) return;
      if (!window.confirm('Delete this personal Knowledge Dex entry?')) return;
      state.loading = true;
      state.error = '';
      render();
      callTool('manage_knowledge_entries', withOrg(state, {
        action: 'delete',
        entry_id: state.selectedPersonalEntryId
      }))
        .then(function () {
          state.notice = { kind: 'success', text: 'Personal entry deleted.' };
          state.selectedPersonalEntryId = null;
          state.editingEntry = cloneEntryForm(null);
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to delete personal entry.';
          render();
        });
    }

    function pullFromOrg() {
      state.loading = true;
      state.error = '';
      render();
      callTool('manage_knowledge_entries', withOrg(state, { action: 'pull_from_org' }))
        .then(function (payload) {
          var info = payload.data || payload;
          state.notice = {
            kind: 'success',
            text: 'Pulled from org: ' + (info.created || 0) + ' created, ' + (info.updated || 0) + ' updated, ' + (info.unchanged || 0) + ' unchanged.'
          };
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to pull from organization concepts.';
          render();
        });
    }

    function createMetadataColumn() {
      var name = String(state.newMetadataColumn.name || '').trim();
      if (!name) {
        state.error = 'Metadata field name is required.';
        render();
        return;
      }

      state.loading = true;
      state.error = '';
      render();
      callTool('manage_knowledge_metadata', withOrg(state, {
        action: 'create_column',
        column_name: name,
        data_type: state.newMetadataColumn.dataType || 'TEXT'
      }))
        .then(function () {
          state.notice = { kind: 'success', text: 'New personal metadata field created.' };
          state.newMetadataColumn.name = '';
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to create metadata field.';
          render();
        });
    }

    function saveMetadataValues() {
      if (!state.selectedPersonalEntryId) return;
      var requests = [];
      state.personalMetadataColumns.forEach(function (column) {
        if (Object.prototype.hasOwnProperty.call(state.personalValues, column.id)) {
          requests.push(callTool('manage_knowledge_metadata', withOrg(state, {
            action: 'set_value',
            entry_id: state.selectedPersonalEntryId,
            column_id: column.id,
            value: state.personalValues[column.id]
          })));
        }
      });

      if (!requests.length) {
        state.notice = { kind: 'info', text: 'No metadata changes to save yet.' };
        render();
        return;
      }

      state.detailLoading = true;
      render();
      Promise.all(requests)
        .then(function () {
          state.notice = { kind: 'success', text: 'Metadata values saved.' };
          return loadPersonalDetails(state.selectedPersonalEntryId, true);
        })
        .catch(function (error) {
          state.detailLoading = false;
          state.error = error.message || 'Failed to save metadata.';
          render();
        });
    }

    function renderOrgDetail(mount) {
      var concept = selectedOrgConcept();
      if (!concept) {
        mount.appendChild(createEmptyState('No organization concepts yet', 'Create concepts in Ludflow or use Pull From Org later to seed personal knowledge.'));
        return;
      }

      mount.appendChild(el('div', 'lf-panel-title', concept.name || 'Untitled concept'));
      if (concept.description) {
        var copy = el('div', 'lf-subtitle', concept.description);
        copy.style.marginTop = '10px';
        mount.appendChild(copy);
      }

      var meta = el('div', 'lf-editor-meta');
      meta.style.marginTop = '12px';
      if (concept.category) meta.appendChild(badge(concept.category, 'rgba(59,130,246,0.1)', '#1d4ed8'));
      safeArray(concept.tags).forEach(function (tag) {
        meta.appendChild(badge(tag, 'rgba(13,148,136,0.1)', '#0f766e'));
      });
      mount.appendChild(meta);

      mount.appendChild(el('div', 'lf-divider'));
      mount.appendChild(el('div', 'lf-section-title', 'Attributes'));
      if (!safeArray(concept.attributes).length) {
        mount.appendChild(el('div', 'lf-muted', 'No child attributes defined for this concept yet.'));
      } else {
        var chips = el('div', 'lf-chip-list');
        safeArray(concept.attributes).forEach(function (attribute) {
          chips.appendChild(el('span', 'lf-chip', attribute.name || 'Attribute'));
        });
        mount.appendChild(chips);
      }

      mount.appendChild(el('div', 'lf-divider'));
      mount.appendChild(el('div', 'lf-section-title', 'Mapped Data Governance Columns'));
      if (!safeArray(concept.mappings).length) {
        mount.appendChild(el('div', 'lf-muted', 'No data governance mappings are attached to this organizational concept yet.'));
      } else {
        var mappingList = el('div', 'lf-list');
        safeArray(concept.mappings).forEach(function (mapping) {
          var item = el('div', 'lf-list-item');
          item.appendChild(el('div', 'lf-list-title', mappingPath(mapping)));
          mappingList.appendChild(item);
        });
        mount.appendChild(mappingList);
      }
    }

    function renderPersonalDetail(mount) {
      var entry = selectedPersonalEntry();

      var form = el('div', 'lf-form-grid');
      mount.appendChild(form);

      var titleInput = createInput('text', state.editingEntry.name, 'Entry name');
      titleInput.addEventListener('input', function () {
        state.editingEntry.name = titleInput.value;
      });
      form.appendChild(titleInput);

      var topRow = el('div', 'lf-form-grid lf-form-grid-2');
      form.appendChild(topRow);

      var categoryInput = createInput('text', state.editingEntry.category, 'Category');
      categoryInput.addEventListener('input', function () {
        state.editingEntry.category = categoryInput.value;
      });
      topRow.appendChild(categoryInput);

      var tagsInput = createInput('text', state.editingEntry.tags, 'Tags (comma separated)');
      tagsInput.addEventListener('input', function () {
        state.editingEntry.tags = tagsInput.value;
      });
      topRow.appendChild(tagsInput);

      var descriptionInput = createTextarea(state.editingEntry.description, 'Describe what this entry captures and how the team should use it.');
      descriptionInput.style.minHeight = '180px';
      descriptionInput.addEventListener('input', function () {
        state.editingEntry.description = descriptionInput.value;
      });
      form.appendChild(descriptionInput);

      var actions = el('div', 'lf-inline-actions');
      actions.style.marginTop = '4px';
      actions.appendChild(createButton(entry ? 'Update Entry' : 'Create Entry', 'primary', saveEntry));
      if (entry) actions.appendChild(createButton('Delete Entry', 'danger', deleteEntry));
      if (!entry) actions.appendChild(createButton('Reset', 'soft', function () {
        state.editingEntry = cloneEntryForm(null);
        render();
      }));
      form.appendChild(actions);

      mount.appendChild(el('div', 'lf-divider'));
      mount.appendChild(el('div', 'lf-section-title', 'Mappings'));
      if (state.detailLoading) {
        mount.appendChild(el('div', 'lf-muted', 'Loading mappings and metadata…'));
      } else if (!state.personalMappings.length) {
        mount.appendChild(el('div', 'lf-muted', 'No data governance mappings on this personal entry yet.'));
      } else {
        var mappings = el('div', 'lf-list');
        state.personalMappings.forEach(function (mapping) {
          var item = el('div', 'lf-list-item');
          item.appendChild(el('div', 'lf-list-title', mappingPath(mapping)));
          mappings.appendChild(item);
        });
        mount.appendChild(mappings);
      }

      mount.appendChild(el('div', 'lf-divider'));
      mount.appendChild(el('div', 'lf-section-title', 'Personal Metadata'));
      if (!state.personalMetadataColumns.length) {
        mount.appendChild(el('div', 'lf-muted', 'Create a personal metadata field to start annotating entries.'));
      } else {
        var metadataGrid = el('div', 'lf-form-grid');
        state.personalMetadataColumns.forEach(function (column) {
          var field = el('div', 'lf-keyval');
          field.appendChild(el('div', 'lf-key', column.name + ' • ' + column.dataType));
          var inputType = column.dataType === 'DATE' ? 'date' : 'text';
          var input = createInput(inputType, state.personalValues[column.id], column.dataType === 'MULTISELECT' ? 'Comma-separated values' : 'Value');
          input.addEventListener('input', function () {
            state.personalValues[column.id] = input.value;
          });
          field.appendChild(input);
          metadataGrid.appendChild(field);
        });
        mount.appendChild(metadataGrid);
        if (entry) {
          var saveMetadataButton = createButton(state.detailLoading ? 'Saving…' : 'Save Metadata', 'soft', saveMetadataValues);
          saveMetadataButton.disabled = state.detailLoading;
          saveMetadataButton.style.marginTop = '12px';
          mount.appendChild(saveMetadataButton);
        }
      }

      mount.appendChild(el('div', 'lf-divider'));
      mount.appendChild(el('div', 'lf-section-title', 'Create Metadata Field'));
      var metadataCreator = el('div', 'lf-form-grid lf-form-grid-2');
      var metadataNameInput = createInput('text', state.newMetadataColumn.name, 'Field name');
      metadataNameInput.addEventListener('input', function () {
        state.newMetadataColumn.name = metadataNameInput.value;
      });
      metadataCreator.appendChild(metadataNameInput);
      var metadataType = createSelect([
        { value: 'TEXT', label: 'Text' },
        { value: 'DATE', label: 'Date' },
        { value: 'MULTISELECT', label: 'Multi Select' }
      ], state.newMetadataColumn.dataType);
      metadataType.addEventListener('change', function () {
        state.newMetadataColumn.dataType = metadataType.value;
      });
      metadataCreator.appendChild(metadataType);
      mount.appendChild(metadataCreator);
      var createFieldButton = createButton('Create Metadata Field', 'soft', createMetadataColumn);
      createFieldButton.style.marginTop = '12px';
      mount.appendChild(createFieldButton);
    }

    function renderBody(root) {
      var stats = el('div', 'lf-stats');
      stats.appendChild(statCard(String(state.orgConcepts.length), 'Org Concepts'));
      stats.appendChild(statCard(String(flatPersonalEntries().length), 'Personal Entries'));
      stats.appendChild(statCard(String(state.personalMetadataColumns.length), 'Metadata Fields'));
      root.appendChild(stats);

      var layout = el('div', 'lf-page-grid lf-knowledge-grid');
      layout.style.marginTop = '16px';
      root.appendChild(layout);

      var browserPanel = createPanel('Knowledge Dex', 'A standalone Knowledge Dex inside MCP Views, with both org concepts and personal entries.');
      layout.appendChild(browserPanel.panel);

      var tabRow = el('div', 'lf-pill-row');
      browserPanel.body.appendChild(tabRow);
      [
        { id: 'org', label: 'Organization' },
        { id: 'personal', label: 'My Knowledge' }
      ].forEach(function (tab) {
        var pill = el('button', 'lf-pill' + (state.activeTab === tab.id ? ' lf-pill-active' : ''), tab.label);
        pill.type = 'button';
        pill.addEventListener('click', function () {
          state.activeTab = tab.id;
          if (tab.id === 'personal' && state.selectedPersonalEntryId) {
            loadPersonalDetails(state.selectedPersonalEntryId, true);
          } else {
            render();
          }
        });
        tabRow.appendChild(pill);
      });

      browserPanel.body.appendChild(el('div', 'lf-divider'));

      if (state.activeTab === 'personal') {
        var personalActions = el('div', 'lf-inline-actions');
        personalActions.appendChild(createButton('New Entry', 'soft', function () {
          state.selectedPersonalEntryId = null;
          state.editingEntry = cloneEntryForm(null);
          state.personalMappings = [];
          state.personalValues = {};
          render();
        }));
        personalActions.appendChild(createButton('Pull From Org', 'soft', pullFromOrg));
        browserPanel.body.appendChild(personalActions);
        browserPanel.body.appendChild(el('div', 'lf-divider'));
      }

      var browserList = el('div', 'lf-list');
      browserPanel.body.appendChild(browserList);

      if (state.activeTab === 'org') {
        if (!state.orgConcepts.length) {
          browserList.appendChild(createEmptyState('No organization concepts yet', 'Add Knowledge Dex concepts in Ludflow and they will appear here.'));
        } else {
          state.orgConcepts.forEach(function (concept) {
            var item = el('button', 'lf-list-item' + (concept.id === state.selectedOrgConceptId ? ' lf-list-item-active' : ''));
            item.type = 'button';
            item.addEventListener('click', function () {
              state.selectedOrgConceptId = concept.id;
              render();
            });
            item.appendChild(el('div', 'lf-list-title', concept.name || 'Untitled concept'));
            item.appendChild(el('div', 'lf-list-meta', (concept.category || 'Uncategorized') + ' • ' + safeArray(concept.attributes).length + ' attribute' + (safeArray(concept.attributes).length === 1 ? '' : 's')));
            browserList.appendChild(item);
          });
        }
      } else if (!flatPersonalEntries().length) {
        browserList.appendChild(createEmptyState('No personal entries yet', 'Create a personal Knowledge Dex entry or pull organizational concepts into your personal workspace.'));
      } else {
        flatPersonalEntries().forEach(function (row) {
          var item = el('button', 'lf-list-item' + (row.entry.id === state.selectedPersonalEntryId ? ' lf-list-item-active' : ''));
          item.type = 'button';
          if (row.depth > 0) item.classList.add('lf-indent-' + Math.min(row.depth, 3));
          item.addEventListener('click', function () {
            loadPersonalDetails(row.entry.id);
          });
          item.appendChild(el('div', 'lf-list-title', row.entry.name || 'Untitled entry'));
          item.appendChild(el('div', 'lf-list-meta', (row.entry.category || 'Personal concept') + ' • ' + (row.entry.mappingCount || 0) + ' mapping' + ((row.entry.mappingCount || 0) === 1 ? '' : 's')));
          browserList.appendChild(item);
        });
      }

      var detailPanel = createPanel(
        state.activeTab === 'org' ? 'Organizational Concept' : 'Personal Entry',
        state.activeTab === 'org'
          ? 'Read-only organizational concepts with their mapped governance columns.'
          : 'Editable personal entries, metadata values, and org-to-personal sync helpers.'
      );
      layout.appendChild(detailPanel.panel);

      if (state.activeTab === 'org') {
        renderOrgDetail(detailPanel.body);
      } else {
        renderPersonalDetail(detailPanel.body);
      }
    }

    function render() {
      renderShell(container, state, {
        title: 'Knowledge Dex',
        subtitle: 'Adapt Ludflow’s Knowledge Dex into a launcher-ready MCP Views page so teams can browse shared concepts and manage personal knowledge in one place.',
        onRefresh: refreshData,
        onOrgChange: function () {
          state.selectedOrgConceptId = null;
          state.selectedPersonalEntryId = data.entry_id || null;
          state.personalMappings = [];
          state.personalValues = {};
          refreshData();
        }
      }, renderBody);
    }

    loadOrganizations(state, state.currentOrgId)
      .then(function () {
        state.initializing = false;
        return refreshData();
      })
      .catch(function (error) {
        state.initializing = false;
        state.error = error.message || 'Failed to load organizations.';
        render();
      });
  }

  window.__renderers.ludflow_documents_home = function renderLudflowDocuments(container, data) {
    createDocumentsRenderer(container, asObject(data));
  };

  window.__renderers.ludflow_data_governance = function renderLudflowDataGovernance(container, data) {
    createDataGovernanceRenderer(container, asObject(data));
  };

  window.__renderers.ludflow_knowledge_dex = function renderLudflowKnowledgeDex(container, data) {
    createKnowledgeDexRenderer(container, asObject(data));
  };
})();
