// @ts-nocheck
/* Standalone Ludflow app pages for MCP Views */

(function () {
  'use strict';

  window.__renderers = window.__renderers || {};

  var PLUGIN_NAME = 'ludflow';
  var TOOL_PREFIX = 'ludflow__';
  var STYLE_ID = 'ludflow-standalone-pages-styles';
  var THEME_STORAGE_KEY = 'ludflow-standalone-theme';
  var DRAFT_TAB_ID = '__draft__';

  function utils() {
    return window.__companionUtils || {};
  }

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.lf-shell { --lf-font: Figtree, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; --lf-radius: 8px; min-height: 100%; display: flex; flex-direction: column; overflow: hidden; font-family: var(--lf-font); background: var(--lf-bg); color: var(--lf-text); }',
      '.lf-theme-light { color-scheme: light; --lf-bg: #ffffff; --lf-surface: #ffffff; --lf-surface-muted: #fafafa; --lf-surface-soft: #f5f5f5; --lf-border: #e5e5e5; --lf-border-strong: #d4d4d4; --lf-text: #171717; --lf-text-muted: #737373; --lf-brand-50: #fafafa; --lf-brand-100: #f5f5f5; --lf-brand-200: #e5e5e5; --lf-brand-300: #d4d4d4; --lf-brand-600: #262626; --lf-warning-bg: #e0f2fe; --lf-warning-text: #075985; --lf-success-bg: #dcfce7; --lf-success-text: #166534; --lf-error-bg: #fee2e2; --lf-error-text: #b91c1c; --lf-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }',
      '.lf-theme-dark { color-scheme: dark; --lf-bg: #0a0a0a; --lf-surface: #171717; --lf-surface-muted: #171717; --lf-surface-soft: #262626; --lf-border: #404040; --lf-border-strong: #525252; --lf-text: #f5f5f5; --lf-text-muted: #a3a3a3; --lf-brand-50: #171717; --lf-brand-100: #262626; --lf-brand-200: #404040; --lf-brand-300: #525252; --lf-brand-600: #e5e5e5; --lf-warning-bg: rgba(14, 165, 233, 0.16); --lf-warning-text: #bae6fd; --lf-success-bg: rgba(34, 197, 94, 0.16); --lf-success-text: #bbf7d0; --lf-error-bg: rgba(239, 68, 68, 0.18); --lf-error-text: #fecaca; --lf-shadow: 0 1px 2px rgba(0, 0, 0, 0.28); }',
      '.lf-shell * { box-sizing: border-box; }',
      '.lf-frame { flex: 1; min-height: 0; display: flex; flex-direction: column; background: var(--lf-bg); color: var(--lf-text); }',
      '.lf-topnav { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 24px; min-height: 56px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface); flex-wrap: wrap; }',
      '.lf-topnav-left, .lf-topnav-right { display: flex; align-items: center; gap: 12px; min-width: 0; }',
      '.lf-topnav-center { display: flex; align-items: center; justify-content: center; flex: 1; min-width: 280px; }',
      '.lf-org-chip { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }',
      '.lf-org-avatar { width: 28px; height: 28px; border-radius: 8px; background: var(--lf-brand-100); border: 1px solid var(--lf-border); color: var(--lf-brand-600); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; }',
      '.lf-select { appearance: none; -webkit-appearance: none; -moz-appearance: none; min-height: 36px; border: 1px solid var(--lf-border); border-radius: var(--lf-radius); background-color: var(--lf-surface); color: var(--lf-text); padding: 8px 36px 8px 10px; font: inherit; line-height: 1.2; box-shadow: var(--lf-shadow); background-image: linear-gradient(45deg, transparent 50%, var(--lf-text-muted) 50%), linear-gradient(135deg, var(--lf-text-muted) 50%, transparent 50%); background-position: calc(100% - 18px) calc(50% - 1px), calc(100% - 13px) calc(50% - 1px); background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; }',
      '.lf-select::-ms-expand { display: none; }',
      '.lf-select option { background: var(--lf-surface); color: var(--lf-text); }',
      '.lf-select:focus, .lf-input:focus, .lf-textarea:focus, .lf-cell-input:focus { outline: none; border-color: var(--lf-brand-300); box-shadow: 0 0 0 2px rgba(115, 115, 115, 0.12); }',
      '.lf-navtabs { display: inline-flex; align-items: center; gap: 2px; padding: 2px; border: 1px solid var(--lf-border); border-radius: var(--lf-radius); background: var(--lf-surface-soft); }',
      '.lf-navtab { border: none; background: transparent; color: var(--lf-text-muted); cursor: pointer; border-radius: 6px; padding: 6px 12px; font: inherit; font-size: 12px; font-weight: 500; }',
      '.lf-navtab:hover { color: var(--lf-text); background: var(--lf-brand-100); }',
      '.lf-navtab-active { background: var(--lf-brand-100); color: var(--lf-text); }',
      '.lf-navtab-disabled { cursor: default; opacity: 0.65; }',
      '.lf-btn { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 36px; padding: 8px 12px; border-radius: var(--lf-radius); border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text); box-shadow: var(--lf-shadow); font: inherit; font-size: 12px; font-weight: 500; cursor: pointer; }',
      '.lf-btn:hover { background: var(--lf-brand-100); }',
      '.lf-btn-primary { background: var(--lf-brand-600); color: var(--lf-surface); border-color: var(--lf-brand-600); }',
      '.lf-btn-primary:hover { background: var(--lf-text); border-color: var(--lf-text); }',
      '.lf-btn-danger { color: #dc2626; border-color: rgba(220, 38, 38, 0.22); background: rgba(254, 242, 242, 0.7); }',
      '.lf-theme-dark .lf-btn-danger { color: #fecaca; background: rgba(127, 29, 29, 0.24); border-color: rgba(248, 113, 113, 0.22); }',
      '.lf-btn:disabled { cursor: wait; opacity: 0.6; }',
      '.lf-notice { margin: 16px 24px 0; padding: 12px 14px; border-radius: var(--lf-radius); border: 1px solid transparent; font-size: 14px; line-height: 1.45; }',
      '.lf-notice-info { background: var(--lf-warning-bg); color: var(--lf-warning-text); }',
      '.lf-notice-success { background: var(--lf-success-bg); color: var(--lf-success-text); }',
      '.lf-notice-error { background: var(--lf-error-bg); color: var(--lf-error-text); }',
      '.lf-breadcrumbs { display: flex; align-items: center; gap: 8px; padding: 8px 24px; min-height: 37px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-muted); color: var(--lf-text-muted); font-size: 12px; }',
      '.lf-breadcrumb-current { color: var(--lf-text); font-weight: 500; }',
      '.lf-body { flex: 1; min-height: 0; display: flex; flex-direction: column; }',
      '.lf-empty-screen { margin: 24px; border: 1px dashed var(--lf-border); border-radius: 12px; padding: 28px; background: var(--lf-surface-muted); color: var(--lf-text-muted); }',
      '.lf-empty-title { color: var(--lf-text); font-size: 16px; font-weight: 600; margin-bottom: 6px; }',
      '.lf-home-layout { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(320px, 30%) minmax(0, 1fr); overflow: hidden; }',
      '.lf-sidebar { width: auto; min-width: 320px; border-right: 1px solid var(--lf-border); background: var(--lf-surface); display: flex; flex-direction: column; min-height: 0; }',
      '.lf-sidebar-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-bottom: 1px solid var(--lf-border); }',
      '.lf-sidebar-title { font-size: 16px; font-weight: 600; color: var(--lf-text); }',
      '.lf-sidebar-body { flex: 1; min-height: 0; overflow: auto; padding: 16px; }',
      '.lf-input, .lf-textarea { width: 100%; border: 1px solid var(--lf-border); border-radius: var(--lf-radius); background: var(--lf-surface); color: var(--lf-text); padding: 9px 10px; font: inherit; box-shadow: var(--lf-shadow); }',
      '.lf-input { min-height: 36px; }',
      '.lf-textarea { min-height: 480px; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13px; line-height: 1.55; }',
      '.lf-section-label { margin: 16px 0 8px; color: var(--lf-text-muted); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; }',
      '.lf-tree { display: flex; flex-direction: column; gap: 2px; }',
      '.lf-tree-row { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 34px; padding: 7px 10px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: var(--lf-text); cursor: pointer; text-align: left; font: inherit; }',
      '.lf-tree-row:hover { background: var(--lf-brand-100); }',
      '.lf-tree-row-active { background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-tree-row-muted { color: var(--lf-text-muted); }',
      '.lf-tree-caret { width: 0; height: 0; border-top: 4px solid transparent; border-bottom: 4px solid transparent; border-left: 5px solid var(--lf-text-muted); transition: transform 120ms ease; }',
      '.lf-tree-caret-open { transform: rotate(90deg); }',
      '.lf-tree-children { display: flex; flex-direction: column; gap: 2px; margin-left: 18px; padding-left: 8px; border-left: 1px solid var(--lf-border); }',
      '.lf-tree-folder-icon, .lf-tree-doc-icon { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }',
      '.lf-tree-folder-icon { background: var(--lf-brand-300); }',
      '.lf-tree-doc-icon { background: var(--lf-border-strong); }',
      '.lf-tree-label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }',
      '.lf-tree-meta { color: var(--lf-text-muted); font-size: 11px; }',
      '.lf-docs-main { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; background: var(--lf-surface); }',
      '.lf-browser-main { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; }',
      '.lf-browser-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-muted); flex-wrap: wrap; }',
      '.lf-browser-toolbar-left, .lf-browser-toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }',
      '.lf-browser-summary { padding: 16px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface); }',
      '.lf-browser-summary-title { font-size: 18px; font-weight: 600; color: var(--lf-text); }',
      '.lf-browser-summary-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 13px; line-height: 1.45; }',
      '.lf-browser-results { flex: 1; min-height: 0; overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }',
      '.lf-result-card { border: 1px solid var(--lf-border); border-radius: 10px; background: var(--lf-surface); padding: 14px; box-shadow: var(--lf-shadow); }',
      '.lf-result-card-active { border-color: var(--lf-brand-300); background: var(--lf-brand-50); }',
      '.lf-result-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }',
      '.lf-result-title { font-size: 15px; font-weight: 600; color: var(--lf-text); line-height: 1.35; }',
      '.lf-result-meta { margin-top: 8px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; color: var(--lf-text-muted); font-size: 12px; }',
      '.lf-result-actions { margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
      '.lf-filter-note { color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '.lf-doc-row { color: var(--lf-text-muted); }',
      '.lf-doc-row-active { background: var(--lf-brand-50); border-color: var(--lf-brand-200); color: var(--lf-text); }',
      '.lf-doc-tabs { display: flex; align-items: center; gap: 4px; min-height: 44px; padding: 8px 16px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface); overflow: auto; }',
      '.lf-doc-tab { display: inline-flex; align-items: center; gap: 8px; max-width: 240px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); color: var(--lf-text-muted); padding: 7px 10px; cursor: pointer; font-size: 12px; }',
      '.lf-doc-tab-active { background: var(--lf-brand-50); color: var(--lf-text); border-color: var(--lf-brand-200); }',
      '.lf-doc-tab-close { width: 16px; height: 16px; border-radius: 50%; border: none; background: transparent; color: inherit; padding: 0; cursor: pointer; font-size: 12px; line-height: 16px; }',
      '.lf-doc-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-muted); flex-wrap: wrap; }',
      '.lf-doc-header-left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }',
      '.lf-doc-title-button { border: none; background: transparent; padding: 0; margin: 0; cursor: text; color: var(--lf-text); font: inherit; font-size: 18px; font-weight: 600; text-align: left; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }',
      '.lf-doc-title-input { width: min(480px, 100%); border: none; border-bottom: 2px solid var(--lf-brand-300); border-radius: 0; padding: 0 0 4px; background: transparent; color: var(--lf-text); font: inherit; font-size: 18px; font-weight: 600; box-shadow: none; }',
      '.lf-chip-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
      '.lf-chip { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 500; line-height: 1; background: var(--lf-brand-100); color: var(--lf-text); border: 1px solid var(--lf-border); }',
      '.lf-view-toggle { display: inline-flex; align-items: center; gap: 2px; padding: 2px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); }',
      '.lf-view-toggle button { border: none; background: transparent; color: var(--lf-text-muted); cursor: pointer; border-radius: 6px; padding: 6px 10px; font: inherit; font-size: 12px; }',
      '.lf-view-toggle .lf-view-toggle-active { background: var(--lf-brand-100); color: var(--lf-text); }',
      '.lf-doc-content { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); overflow: hidden; }',
      '.lf-doc-content-edit { grid-template-columns: minmax(0, 1fr); }',
      '.lf-doc-content-preview { grid-template-columns: minmax(0, 1fr); }',
      '.lf-doc-pane { min-height: 0; overflow: auto; padding: 16px; }',
      '.lf-doc-pane + .lf-doc-pane { border-left: 1px solid var(--lf-border); }',
      '.lf-doc-preview { max-width: 900px; margin: 0 auto; }',
      '.lf-doc-preview .md-content { color: var(--lf-text); }',
      '.lf-doc-blank { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 32px; color: var(--lf-text-muted); }',
      '.lf-governance-layout { flex: 1; min-height: 0; display: flex; overflow: hidden; }',
      '.lf-rail { width: 288px; min-width: 288px; border-right: 1px solid var(--lf-border); background: var(--lf-surface-muted); display: flex; flex-direction: column; min-height: 0; }',
      '.lf-rail-compact { width: 264px; min-width: 264px; }',
      '.lf-rail-body { flex: 1; min-height: 0; overflow: auto; padding: 16px; }',
      '.lf-list { display: flex; flex-direction: column; gap: 4px; }',
      '.lf-list-button { width: 100%; display: flex; flex-direction: column; gap: 4px; text-align: left; padding: 12px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); color: var(--lf-text); cursor: pointer; box-shadow: var(--lf-shadow); }',
      '.lf-list-button:hover { background: var(--lf-brand-100); }',
      '.lf-list-button-active { background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-list-title { font-size: 14px; font-weight: 500; color: var(--lf-text); word-break: break-word; }',
      '.lf-list-subtitle { font-size: 12px; line-height: 1.4; color: var(--lf-text-muted); }',
      '.lf-governance-main { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; background: var(--lf-surface); }',
      '.lf-subsystem-row { padding: 8px 24px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface); }',
      '.lf-subsystem-buttons { display: inline-flex; align-items: center; gap: 8px; }',
      '.lf-subsystem-button { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); color: var(--lf-text); padding: 8px 12px; font: inherit; font-size: 13px; cursor: pointer; }',
      '.lf-subsystem-button-active { background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-subsystem-caret { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--lf-text-muted); transition: transform 120ms ease; }',
      '.lf-subsystem-caret-open { transform: rotate(180deg); }',
      '.lf-kd-panel { border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-muted); padding: 16px 24px; }',
      '.lf-kd-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }',
      '.lf-kd-tabs { display: inline-flex; align-items: center; gap: 2px; padding: 2px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); }',
      '.lf-kd-tab { border: none; background: transparent; color: var(--lf-text-muted); cursor: pointer; border-radius: 6px; padding: 7px 12px; font: inherit; font-size: 13px; }',
      '.lf-kd-tab-active { background: var(--lf-brand-100); color: var(--lf-text); }',
      '.lf-banner { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; padding: 12px 14px; border-radius: 8px; border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text-muted); font-size: 13px; }',
      '.lf-table-scroll { overflow: auto; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); }',
      '.lf-table { width: 100%; border-collapse: collapse; font-size: 13px; }',
      '.lf-table thead tr { background: var(--lf-surface-soft); }',
      '.lf-table th, .lf-table td { padding: 10px 12px; border-bottom: 1px solid var(--lf-border); vertical-align: top; text-align: left; }',
      '.lf-table th { position: sticky; top: 0; z-index: 1; color: var(--lf-text-muted); font-size: 12px; font-weight: 500; background: var(--lf-surface-soft); white-space: nowrap; }',
      '.lf-table-row-entity { background: var(--lf-brand-50); }',
      '.lf-table-row-attribute { background: var(--lf-surface-muted); }',
      '.lf-table-row-selected { outline: 2px solid var(--lf-brand-300); outline-offset: -2px; }',
      '.lf-table-name { display: flex; align-items: center; gap: 8px; }',
      '.lf-table-shape { width: 10px; height: 10px; flex-shrink: 0; }',
      '.lf-table-shape-entity { border-radius: 2px; background: var(--lf-brand-600); }',
      '.lf-table-shape-attribute { border-radius: 999px; background: var(--lf-text-muted); }',
      '.lf-cell-input { width: 100%; min-height: 32px; padding: 6px 8px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--lf-text); font: inherit; }',
      '.lf-cell-input:hover { border-color: var(--lf-border); background: var(--lf-surface); }',
      '.lf-cell-input-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; }',
      '.lf-cell-text { color: var(--lf-text); line-height: 1.45; }',
      '.lf-cell-muted { color: var(--lf-text-muted); }',
      '.lf-mapping-cell { display: flex; flex-direction: column; gap: 8px; min-width: 220px; }',
      '.lf-tag-list { display: flex; flex-wrap: wrap; gap: 6px; }',
      '.lf-tag { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 999px; background: var(--lf-brand-100); color: var(--lf-text); border: 1px solid var(--lf-border); font-size: 11px; }',
      '.lf-mini-button { display: inline-flex; align-items: center; justify-content: center; min-height: 28px; padding: 5px 9px; border-radius: 6px; border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text-muted); font: inherit; font-size: 12px; cursor: pointer; }',
      '.lf-mini-button:hover { background: var(--lf-brand-100); color: var(--lf-text); }',
      '.lf-row-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; min-width: 124px; }',
      '.lf-add-row td { background: var(--lf-brand-50); }',
      '.lf-empty-table { padding: 24px; color: var(--lf-text-muted); }',
      '.lf-metadata-panel { flex: 1; min-height: 0; overflow: auto; }',
      '.lf-metadata-inner { display: flex; flex-direction: column; gap: 16px; padding: 24px; }',
      '.lf-metadata-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }',
      '.lf-metadata-title { font-size: 20px; line-height: 1.2; font-weight: 600; color: var(--lf-text); }',
      '.lf-metadata-subtitle { margin-top: 4px; color: var(--lf-text-muted); font-size: 12px; }',
      '.lf-info-card { padding: 12px 14px; border-radius: 8px; border: 1px solid var(--lf-border); background: var(--lf-surface-muted); color: var(--lf-text-muted); font-size: 13px; line-height: 1.45; }',
      '.lf-schema-table tr { cursor: pointer; }',
      '.lf-schema-table tr:hover { background: var(--lf-brand-100); }',
      '.lf-context-card { border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); overflow: hidden; }',
      '.lf-context-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-soft); }',
      '.lf-context-body { padding: 14px; }',
      '.lf-modal-backdrop { position: fixed; inset: 0; background: rgba(10, 10, 10, 0.54); display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 9999; }',
      '.lf-modal { width: min(760px, 100%); max-height: min(720px, calc(100vh - 48px)); overflow: hidden; display: flex; flex-direction: column; border-radius: 12px; border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text); box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24); }',
      '.lf-modal-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--lf-border); }',
      '.lf-modal-title { font-size: 16px; font-weight: 600; }',
      '.lf-modal-body { padding: 16px 18px; overflow: auto; display: flex; flex-direction: column; gap: 12px; }',
      '.lf-modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 16px 18px; border-top: 1px solid var(--lf-border); background: var(--lf-surface-muted); }',
      '.lf-checkbox-list { display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow: auto; }',
      '.lf-checkbox-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface-muted); }',
      '.lf-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }',
      '.lf-help { color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '@media (max-width: 1200px) { .lf-governance-layout { flex-direction: column; } .lf-rail, .lf-rail-compact { width: 100%; min-width: 0; max-height: 320px; border-right: none; border-bottom: 1px solid var(--lf-border); } .lf-doc-content { grid-template-columns: minmax(0, 1fr); } .lf-doc-pane + .lf-doc-pane { border-left: none; border-top: 1px solid var(--lf-border); } }',
      '@media (max-width: 900px) { .lf-home-layout { grid-template-columns: 1fr; } .lf-sidebar { width: 100%; min-width: 0; max-height: 320px; border-right: none; border-bottom: 1px solid var(--lf-border); } }',
      '@media (max-width: 720px) { .lf-topnav, .lf-breadcrumbs, .lf-subsystem-row, .lf-kd-panel, .lf-metadata-inner { padding-left: 16px; padding-right: 16px; } .lf-notice { margin-left: 16px; margin-right: 16px; } .lf-sidebar-body, .lf-rail-body, .lf-doc-pane { padding: 12px; } .lf-doc-header, .lf-doc-tabs, .lf-sidebar-header { padding-left: 12px; padding-right: 12px; } .lf-grid-2 { grid-template-columns: 1fr; } .lf-topnav-center { width: 100%; justify-content: flex-start; } }'
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

  function cloneObject(value) {
    var next = {};
    Object.keys(value || {}).forEach(function (key) {
      next[key] = value[key];
    });
    return next;
  }

  function escapeHtml(value) {
    var helper = utils().escapeHtml;
    if (helper) return helper(String(value == null ? '' : value));
    var node = document.createElement('div');
    node.textContent = String(value == null ? '' : value);
    return node.innerHTML;
  }

  function createNotice(kind, text) {
    return el('div', 'lf-notice lf-notice-' + kind, text);
  }

  function createButton(label, kind, handler) {
    var button = el('button', 'lf-btn' + (kind ? ' lf-btn-' + kind : ''), label);
    button.type = 'button';
    if (handler) button.addEventListener('click', handler);
    return button;
  }

  function createMiniButton(label, handler) {
    var button = el('button', 'lf-mini-button', label);
    button.type = 'button';
    if (handler) button.addEventListener('click', handler);
    return button;
  }

  function createInput(type, value, placeholder, className) {
    var input = el('input', className || 'lf-input');
    input.type = type || 'text';
    input.value = value || '';
    if (placeholder) input.placeholder = placeholder;
    return input;
  }

  function createTextarea(value, placeholder) {
    var input = el('textarea', 'lf-textarea');
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

  function renderMarkdownNode(markdown) {
    var rendered = utils().renderMarkdown ? utils().renderMarkdown(markdown || '') : null;
    if (rendered && rendered.nodeType === 1) return rendered;
    var fallback = el('div', 'md-content');
    fallback.innerHTML = rendered || escapeHtml(markdown || '');
    return fallback;
  }

  function formatDate(value) {
    if (!value || typeof value === 'object') return 'Recently';
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

  function parseTimestamp(value) {
    if (!value || typeof value === 'object') return null;
    var date = new Date(value);
    if (isNaN(date.getTime())) return null;
    return date.getTime();
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
        if (payload && payload.error && payload.error.message) throw new Error(payload.error.message);
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
    if (!result.content || !result.content[0] || typeof result.content[0].text !== 'string') return result;
    try {
      return JSON.parse(result.content[0].text) || {};
    } catch (_error) {
      throw new Error('Failed to parse MCP payload.');
    }
  }

  function callTool(toolName, args) {
    return directMcpFetch(prefixTool(toolName), args || {}).then(parseToolResponse);
  }

  function invokeTauri(command, args) {
    if (!window.__TAURI__ || !window.__TAURI__.core || typeof window.__TAURI__.core.invoke !== 'function') {
      return Promise.reject(new Error('This action requires the MCP Views desktop app.'));
    }
    return window.__TAURI__.core.invoke(command, args || {});
  }

  function withOrg(state, args) {
    var next = cloneObject(args || {});
    if (state.currentOrgId) next.organization_id = state.currentOrgId;
    return next;
  }

  function safeText(value, fallback) {
    return String(value == null || value === '' ? (fallback || '') : value);
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

  function detectHostTheme() {
    try {
      if (utils().isDark) return 'dark';
      if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (_error) {}
    return 'light';
  }

  function readTheme() {
    try {
      var storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    } catch (_error) {
      return detectHostTheme();
    }
    return detectHostTheme();
  }

  function persistTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_error) {}
  }

  function folderName(folderId, folders) {
    if (!folderId) return 'Unfiled';
    for (var i = 0; i < folders.length; i += 1) {
      if (folders[i].id === folderId) return folders[i].name || 'Folder';
    }
    return 'Folder';
  }

  function columnTypeName(column) {
    return column.originalDataType || column.original_data_type || column.type || 'Unknown';
  }

  function tableDataSource(table) {
    return table.dataSource || table.data_source || {};
  }

  function makeChip(text) {
    return el('span', 'lf-chip', text);
  }

  function makeTag(text) {
    return el('span', 'lf-tag', text);
  }

  function treeifyFolders(folders) {
    var byParent = {};
    safeArray(folders).forEach(function (folder) {
      var parentId = folder.parentFolderId || folder.parent_folder_id || 'root';
      byParent[parentId] = byParent[parentId] || [];
      byParent[parentId].push(folder);
    });
    Object.keys(byParent).forEach(function (key) {
      byParent[key].sort(function (a, b) {
        return safeText(a.name).localeCompare(safeText(b.name));
      });
    });
    return byParent;
  }

  function collectFolderIds(folderMap, folderId, acc) {
    acc.push(folderId);
    safeArray(folderMap[folderId]).forEach(function (folder) {
      collectFolderIds(folderMap, folder.id, acc);
    });
    return acc;
  }

  function rootOrganizationConcepts(concepts) {
    var childIds = {};
    safeArray(concepts).forEach(function (concept) {
      safeArray(concept.attributes).forEach(function (attribute) {
        if (attribute && attribute.id) childIds[attribute.id] = true;
      });
    });
    return safeArray(concepts).filter(function (concept) {
      return !childIds[concept.id];
    });
  }

  function flattenKnowledgeEntries(entries) {
    var rows = [];
    safeArray(entries).forEach(function (entry) {
      rows.push({ entry: entry, depth: 0, isEntity: true, parentId: null });
      safeArray(entry.children).forEach(function (child) {
        rows.push({ entry: child, depth: 1, isEntity: false, parentId: entry.id });
      });
    });
    return rows;
  }

  function findKnowledgeEntry(entries, entryId) {
    var flat = flattenKnowledgeEntries(entries);
    for (var i = 0; i < flat.length; i += 1) {
      if (flat[i].entry.id === entryId) return flat[i].entry;
    }
    return null;
  }

  function normalizeTags(value) {
    return String(value || '')
      .split(',')
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
  }

  function flattenSchemaColumns(tables) {
    var rows = [];
    safeArray(tables).forEach(function (table) {
      var source = tableDataSource(table);
      safeArray(table.columns).forEach(function (column) {
        rows.push({
          id: column.id,
          name: column.name,
          tableId: table.id,
          tableName: table.name,
          dataSourceId: source.id || table.dataSourceId || table.data_source_id,
          dataSourceName: source.name || 'Data Source',
          label: [source.name || 'Data Source', table.name || 'Table', column.name || 'column'].join('.')
        });
      });
    });
    return rows;
  }

  function renderEmptyScreen(body, title, copy) {
    var card = el('div', 'lf-empty-screen');
    card.appendChild(el('div', 'lf-empty-title', title));
    card.appendChild(el('div', '', copy));
    body.appendChild(card);
  }

  function renderWorkspaceShell(container, state, config, renderBody, renderOverlay) {
    ensureStyles();
    clear(container);

    var root = el('div', 'lf-shell lf-theme-' + (state.theme || 'light'));
    container.appendChild(root);

    var frame = el('div', 'lf-frame');
    root.appendChild(frame);

    var nav = el('div', 'lf-topnav');
    frame.appendChild(nav);

    var navLeft = el('div', 'lf-topnav-left');
    var orgChip = el('div', 'lf-org-chip');
    orgChip.appendChild(el('div', 'lf-org-avatar', 'O'));
    if (state.orgs.length) {
      var orgSelect = createSelect(
        state.orgs.map(function (org) {
          var label = org.name || org.slug || org.id;
          if (org.has_mcpviews_token === false) label += ' (auth required)';
          return { value: org.id, label: label };
        }),
        state.currentOrgId
      );
      orgSelect.addEventListener('change', function () {
        var previousOrgId = state.currentOrgId;
        state.currentOrgId = orgSelect.value;
        state.notice = null;
        state.error = '';
        config.onOrgChange(orgSelect.value, previousOrgId);
      });
      orgChip.appendChild(orgSelect);
    } else {
      orgChip.appendChild(el('div', 'lf-list-subtitle', 'No Ludflow orgs'));
    }
    navLeft.appendChild(orgChip);
    nav.appendChild(navLeft);

    var navCenter = el('div', 'lf-topnav-center');
    var tabs = el('div', 'lf-navtabs');
    [
      { id: 'docs', label: 'Documentation', renderer: 'ludflow_documents_home' },
      { id: 'governance', label: 'Data Governance', renderer: 'ludflow_data_governance' },
      { id: 'api', label: 'API Explorer', renderer: null }
    ].forEach(function (item) {
      var className = 'lf-navtab' + (item.id === config.activeNav ? ' lf-navtab-active' : '') + (!item.renderer ? ' lf-navtab-disabled' : '');
      var tab = el('button', className, item.label);
      tab.type = 'button';
      tab.disabled = !item.renderer || item.id === config.activeNav;
      tab.addEventListener('click', function () {
        if (!item.renderer || item.id === config.activeNav) return;
        if (config.beforeNavigate && config.beforeNavigate(item.renderer) === false) return;
        window.__renderers[item.renderer](container, {
          organization_id: state.currentOrgId
        });
      });
      tabs.appendChild(tab);
    });
    navCenter.appendChild(tabs);
    nav.appendChild(navCenter);

    var navRight = el('div', 'lf-topnav-right');
    var themeButton = createButton(state.theme === 'dark' ? 'Light Theme' : 'Dark Theme', '', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      persistTheme(state.theme);
      config.onThemeChange();
    });
    navRight.appendChild(themeButton);

    var refreshButton = createButton(state.loading ? 'Refreshing...' : 'Refresh', '', config.onRefresh);
    refreshButton.disabled = !!state.loading;
    navRight.appendChild(refreshButton);

    var org = currentOrg(state);
    if (org && org.has_mcpviews_token === false) {
      var connectButton = createButton('Connect Org', 'primary', function () {
        state.loading = true;
        state.error = '';
        state.notice = null;
        renderWorkspaceShell(container, state, config, renderBody, renderOverlay);
        invokeTauri('start_plugin_auth', { pluginName: PLUGIN_NAME, orgId: org.id })
          .then(function () {
            state.notice = { kind: 'success', text: 'Organization connected. Reloading Ludflow data...' };
            return loadOrganizations(state, org.id);
          })
          .then(function () {
            return config.onRefresh();
          })
          .catch(function (error) {
            state.loading = false;
            state.error = error.message || 'Authentication was cancelled.';
            renderWorkspaceShell(container, state, config, renderBody, renderOverlay);
          });
      });
      navRight.appendChild(connectButton);
    }
    nav.appendChild(navRight);

    if (config.breadcrumbs) {
      var breadcrumbBar = el('div', 'lf-breadcrumbs');
      safeArray(config.breadcrumbs()).forEach(function (crumb, index) {
        if (index) breadcrumbBar.appendChild(el('span', '', '/'));
        breadcrumbBar.appendChild(el('span', crumb.current ? 'lf-breadcrumb-current' : '', crumb.label));
      });
      frame.appendChild(breadcrumbBar);
    }

    if (state.notice && state.notice.text) {
      frame.appendChild(createNotice(state.notice.kind || 'info', state.notice.text));
    }
    if (state.error) {
      frame.appendChild(createNotice('error', state.error));
    }

    var body = el('div', 'lf-body');
    frame.appendChild(body);

    if (state.initializing) {
      renderEmptyScreen(body, 'Loading Ludflow workspace', 'MCP Views is fetching organization context and page data.');
    } else if (!state.orgs.length) {
      renderEmptyScreen(body, 'No Ludflow organizations found', 'This account does not appear to have access to any Ludflow organizations yet.');
    } else if (!orgHasToken(state)) {
      renderEmptyScreen(body, 'Authentication required', 'Select Connect Org to authorize this Ludflow organization for use inside MCP Views.');
    } else {
      renderBody(body);
    }

    if (renderOverlay) renderOverlay(root);
  }

  function createDocumentsRenderer(container, data) {
    var state = {
      theme: data.theme || readTheme(),
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      notice: null,
      error: '',
      folders: [],
      documents: [],
      expandedFolders: {},
      selectedFolderId: null,
      selectedDocumentId: data.document_id || null,
      searchQuery: '',
      statusFilter: 'all',
      sortBy: 'title_asc'
    };

    function folderTree() {
      return treeifyFolders(state.folders);
    }

    function documentFolderId(documentItem) {
      return documentItem.folderId || documentItem.folder_id || null;
    }

    function documentsByFolder() {
      var map = {};
      state.documents.forEach(function (documentItem) {
        var key = documentFolderId(documentItem) || 'root';
        map[key] = map[key] || [];
        map[key].push(documentItem);
      });
      return map;
    }

    function rememberExpandedFolders() {
      safeArray(state.folders).forEach(function (folder) {
        if (state.expandedFolders[folder.id] === undefined) state.expandedFolders[folder.id] = true;
      });
    }

    function statusMatches(documentItem) {
      if (state.statusFilter === 'all') return true;
      return safeText(documentItem.status).toLowerCase() === state.statusFilter;
    }

    function queryMatches(documentItem) {
      if (!state.searchQuery) return true;
      var needle = state.searchQuery.toLowerCase();
      return safeText(documentItem.title).toLowerCase().indexOf(needle) >= 0 ||
        safeText(folderName(documentFolderId(documentItem), state.folders)).toLowerCase().indexOf(needle) >= 0;
    }

    function selectedFolderScopeIds() {
      if (!state.selectedFolderId) return null;
      return collectFolderIds(folderTree(), state.selectedFolderId, []);
    }

    function scopeMatches(documentItem) {
      var scopeIds = selectedFolderScopeIds();
      if (!scopeIds) return true;
      return scopeIds.indexOf(documentFolderId(documentItem)) >= 0;
    }

    function documentMatchesFilters(documentItem) {
      return statusMatches(documentItem) && queryMatches(documentItem) && scopeMatches(documentItem);
    }

    function sortDocuments(list) {
      var rows = safeArray(list).slice();
      rows.sort(function (left, right) {
        if (state.sortBy === 'title_desc') {
          return safeText(right.title).localeCompare(safeText(left.title));
        }
        if (state.sortBy === 'created_desc') {
          return (parseTimestamp(right.createdAt || right.created_at) || 0) - (parseTimestamp(left.createdAt || left.created_at) || 0);
        }
        if (state.sortBy === 'created_asc') {
          return (parseTimestamp(left.createdAt || left.created_at) || 0) - (parseTimestamp(right.createdAt || right.created_at) || 0);
        }
        if (state.sortBy === 'updated_desc') {
          return (parseTimestamp(right.updatedAt || right.updated_at) || 0) - (parseTimestamp(left.updatedAt || left.updated_at) || 0);
        }
        if (state.sortBy === 'updated_asc') {
          return (parseTimestamp(left.updatedAt || left.updated_at) || 0) - (parseTimestamp(right.updatedAt || right.updated_at) || 0);
        }
        return safeText(left.title).localeCompare(safeText(right.title));
      });
      return rows;
    }

    function visibleDocuments() {
      return sortDocuments(state.documents.filter(documentMatchesFilters));
    }

    function folderHasVisibleContent(folderId) {
      var docs = safeArray(documentsByFolder()[folderId]);
      for (var i = 0; i < docs.length; i += 1) {
        if (statusMatches(docs[i]) && queryMatches(docs[i])) return true;
      }
      var children = safeArray(folderTree()[folderId]);
      for (var j = 0; j < children.length; j += 1) {
        if (folderVisible(children[j])) return true;
      }
      return false;
    }

    function folderVisible(folder) {
      var folderQueryMatch = !state.searchQuery || safeText(folder.name).toLowerCase().indexOf(state.searchQuery.toLowerCase()) >= 0;
      return folderQueryMatch || folderHasVisibleContent(folder.id);
    }

    function buildDocumentRichContent(documentItem) {
      var lines = [];
      lines.push('- **Status:** ' + safeText(documentItem.status, 'DRAFT'));
      lines.push('- **Folder:** ' + folderName(documentFolderId(documentItem), state.folders));
      if (documentItem.user && (documentItem.user.name || documentItem.user.email)) {
        lines.push('- **Author:** ' + safeText(documentItem.user.name || documentItem.user.email));
      }
      if (documentItem.createdAt || documentItem.created_at) {
        lines.push('- **Created:** ' + formatDate(documentItem.createdAt || documentItem.created_at));
      }
      if (documentItem.updatedAt || documentItem.updated_at) {
        lines.push('- **Updated:** ' + formatDate(documentItem.updatedAt || documentItem.updated_at));
      }
      var meta = lines.join('\n');
      var body = (meta ? meta + '\n\n---\n\n' : '') + (safeText(documentItem.content).trim() || '_This document is empty._');
      return {
        title: documentItem.title || 'Untitled Document',
        body: body
      };
    }

    function openDocumentSession(documentItem) {
      var utilsObject = utils();
      var sessionPayload = {
        toolName: 'get_document',
        contentType: 'rich_content',
        data: buildDocumentRichContent(documentItem),
        meta: {
          standalone_origin: 'ludflow_documents_home',
          organization_id: state.currentOrgId
        },
        toolArgs: {
          document_id: documentItem.id,
          title: documentItem.title || 'Untitled Document'
        },
        sessionKey: 'ludflow-document:' + documentItem.id
      };
      if (utilsObject && typeof utilsObject.openSession === 'function') {
        utilsObject.openSession(sessionPayload);
        return;
      }
      state.error = 'Opening document tabs requires the updated MCP Views app shell.';
      render();
    }

    function openDocument(documentId) {
      if (!documentId) return Promise.resolve();
      state.loading = true;
      state.error = '';
      render();
      return callTool('get_document', withOrg(state, {
        document_id: documentId,
        include_links: true,
        include_children: true
      }))
        .then(function (payload) {
          var documentItem = payload.data || payload;
          state.selectedDocumentId = documentItem.id || documentId;
          state.loading = false;
          state.initializing = false;
          state.notice = {
            kind: 'success',
            text: 'Opened "' + safeText(documentItem.title, 'Untitled Document') + '" in a new tab.'
          };
          openDocumentSession(documentItem);
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
          rememberExpandedFolders();
          if (state.selectedFolderId && !folderTree()[state.selectedFolderId] && !state.folders.some(function (folder) { return folder.id === state.selectedFolderId; })) {
            state.selectedFolderId = null;
          }
          state.loading = false;
          state.initializing = false;
          render();
          if (data.document_id) {
            var nextDocumentId = data.document_id;
            data.document_id = null;
            return openDocument(nextDocumentId);
          }
          return null;
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load document index.';
          render();
        });
    }

    function renderDocumentNode(parent, documentItem, level) {
      if (!statusMatches(documentItem) || !queryMatches(documentItem)) return;
      var row = el('button', 'lf-tree-row lf-doc-row' + (state.selectedDocumentId === documentItem.id ? ' lf-doc-row-active' : ''));
      row.type = 'button';
      row.style.paddingLeft = String(28 + (level * 16)) + 'px';
      row.addEventListener('click', function () {
        openDocument(documentItem.id);
      });
      row.appendChild(el('span', 'lf-tree-doc-icon'));
      row.appendChild(el('span', 'lf-tree-label', documentItem.title || 'Untitled'));
      row.appendChild(el('span', 'lf-tree-meta', safeText(documentItem.status, 'DRAFT')));
      parent.appendChild(row);
    }

    function renderFolderTree(parent, parentId, level) {
      safeArray(folderTree()[parentId]).forEach(function (folder) {
        if (!folderVisible(folder)) return;

        var row = el('button', 'lf-tree-row' + (state.selectedFolderId === folder.id ? ' lf-tree-row-active' : ''));
        row.type = 'button';
        row.style.paddingLeft = String(10 + (level * 16)) + 'px';
        row.addEventListener('click', function () {
          state.selectedFolderId = folder.id;
          render();
        });

        var caret = el('span', 'lf-tree-caret' + (state.expandedFolders[folder.id] ? ' lf-tree-caret-open' : ''));
        var caretButton = el('button', 'lf-mini-button');
        caretButton.type = 'button';
        caretButton.style.padding = '0';
        caretButton.style.minHeight = '16px';
        caretButton.style.width = '16px';
        caretButton.style.border = 'none';
        caretButton.style.background = 'transparent';
        caretButton.style.boxShadow = 'none';
        caretButton.addEventListener('click', function (event) {
          event.stopPropagation();
          state.expandedFolders[folder.id] = !state.expandedFolders[folder.id];
          render();
        });
        caretButton.appendChild(caret);
        row.appendChild(caretButton);
        row.appendChild(el('span', 'lf-tree-folder-icon'));
        row.appendChild(el('span', 'lf-tree-label', folder.name || 'Folder'));
        parent.appendChild(row);

        if (state.expandedFolders[folder.id]) {
          safeArray(documentsByFolder()[folder.id]).forEach(function (documentItem) {
            renderDocumentNode(parent, documentItem, level + 1);
          });
          renderFolderTree(parent, folder.id, level + 1);
        }
      });
    }

    function renderBody(body) {
      var layout = el('div', 'lf-home-layout');
      body.appendChild(layout);

      var sidebar = el('aside', 'lf-sidebar');
      layout.appendChild(sidebar);

      var sidebarHeader = el('div', 'lf-sidebar-header');
      sidebarHeader.appendChild(el('div', 'lf-sidebar-title', 'File Tree'));
      sidebarHeader.appendChild(createButton('Refresh', '', refreshIndex));
      sidebar.appendChild(sidebarHeader);

      var sidebarBody = el('div', 'lf-sidebar-body');
      sidebar.appendChild(sidebarBody);

      var folderSearch = createInput('text', state.searchQuery, 'Search folders and documents');
      folderSearch.addEventListener('input', function () {
        state.searchQuery = folderSearch.value;
        render();
      });
      sidebarBody.appendChild(folderSearch);

      sidebarBody.appendChild(el('div', 'lf-section-label', 'Browse'));
      var tree = el('div', 'lf-tree');
      sidebarBody.appendChild(tree);

      var rootButton = el('button', 'lf-tree-row' + (!state.selectedFolderId ? ' lf-tree-row-active' : ''), '');
      rootButton.type = 'button';
      rootButton.appendChild(el('span', 'lf-tree-doc-icon'));
      rootButton.appendChild(el('span', 'lf-tree-label', 'All Files'));
      rootButton.appendChild(el('span', 'lf-tree-meta', String(visibleDocuments().length)));
      rootButton.addEventListener('click', function () {
        state.selectedFolderId = null;
        render();
      });
      tree.appendChild(rootButton);
      safeArray(documentsByFolder().root).forEach(function (documentItem) {
        renderDocumentNode(tree, documentItem, 0);
      });
      renderFolderTree(tree, 'root', 0);

      var main = el('section', 'lf-browser-main');
      layout.appendChild(main);

      var toolbar = el('div', 'lf-browser-toolbar');
      main.appendChild(toolbar);

      var toolbarLeft = el('div', 'lf-browser-toolbar-left');
      var statusSelect = createSelect([
        { value: 'all', label: 'All statuses' },
        { value: 'draft', label: 'Unpublished (Draft)' },
        { value: 'published', label: 'Published' }
      ], state.statusFilter);
      statusSelect.addEventListener('change', function () {
        state.statusFilter = statusSelect.value;
        render();
      });
      toolbarLeft.appendChild(statusSelect);

      var sortSelect = createSelect([
        { value: 'title_asc', label: 'Title A-Z' },
        { value: 'title_desc', label: 'Title Z-A' },
        { value: 'updated_desc', label: 'Updated newest first' },
        { value: 'updated_asc', label: 'Updated oldest first' },
        { value: 'created_desc', label: 'Created newest first' },
        { value: 'created_asc', label: 'Created oldest first' }
      ], state.sortBy);
      sortSelect.addEventListener('change', function () {
        state.sortBy = sortSelect.value;
        render();
      });
      toolbarLeft.appendChild(sortSelect);
      toolbar.appendChild(toolbarLeft);

      var toolbarRight = el('div', 'lf-browser-toolbar-right');
      if (state.selectedDocumentId) {
        toolbarRight.appendChild(createButton('Open Selected', 'primary', function () {
          openDocument(state.selectedDocumentId);
        }));
      }
      toolbar.appendChild(toolbarRight);

      var summary = el('div', 'lf-browser-summary');
      main.appendChild(summary);
      summary.appendChild(el('div', 'lf-browser-summary-title', state.selectedFolderId ? folderName(state.selectedFolderId, state.folders) : 'All Documents'));
      summary.appendChild(el(
        'div',
        'lf-browser-summary-copy',
        visibleDocuments().length + ' matching document' + (visibleDocuments().length === 1 ? '' : 's') +
          '. Click any document to open it in a new MCP Views tab with the rich text renderer.'
      ));
      summary.appendChild(el(
        'div',
        'lf-filter-note',
        'Status filtering is available now. Created and updated sorting is included, but some Ludflow MCP document timestamps are still sparse, so date-based ordering may be approximate until those fields are fully serialized.'
      ));

      var results = el('div', 'lf-browser-results');
      main.appendChild(results);

      if (!visibleDocuments().length) {
        results.appendChild(el('div', 'lf-empty-screen', 'No documents match the current filters.'));
      } else {
        visibleDocuments().forEach(function (documentItem) {
          var card = el('div', 'lf-result-card' + (state.selectedDocumentId === documentItem.id ? ' lf-result-card-active' : ''));
          results.appendChild(card);

          var header = el('div', 'lf-result-header');
          card.appendChild(header);

          var titleWrap = el('div');
          titleWrap.appendChild(el('div', 'lf-result-title', documentItem.title || 'Untitled'));
          var meta = el('div', 'lf-result-meta');
          meta.appendChild(makeChip(safeText(documentItem.status, 'DRAFT')));
          meta.appendChild(makeChip(folderName(documentFolderId(documentItem), state.folders)));
          meta.appendChild(el('span', '', 'Updated ' + formatDate(documentItem.updatedAt || documentItem.updated_at)));
          header.appendChild(titleWrap);
          titleWrap.appendChild(meta);

          var actions = el('div', 'lf-result-actions');
          var focusButton = createButton('Focus in Tree', '', function () {
            state.selectedDocumentId = documentItem.id;
            state.selectedFolderId = documentFolderId(documentItem);
            if (state.selectedFolderId) state.expandedFolders[state.selectedFolderId] = true;
            render();
          });
          actions.appendChild(focusButton);
          var openButton = createButton('Open', 'primary', function () {
            openDocument(documentItem.id);
          });
          actions.appendChild(openButton);
          header.appendChild(actions);

          if (documentItem.user && (documentItem.user.name || documentItem.user.email)) {
            card.appendChild(el('div', 'lf-list-subtitle', 'Author: ' + safeText(documentItem.user.name || documentItem.user.email)));
          }
        });
      }
    }

    function render() {
      renderWorkspaceShell(container, state, {
        activeNav: 'docs',
        onRefresh: refreshIndex,
        onThemeChange: render,
        onOrgChange: function () {
          state.selectedDocumentId = null;
          state.selectedFolderId = null;
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
      theme: data.theme || readTheme(),
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      contextLoading: false,
      notice: null,
      error: '',
      tables: [],
      selectedDataSourceId: data.data_source_id || null,
      selectedTableId: data.table_id || null,
      selectedColumnId: data.column_id || null,
      columnContext: null,
      tableSearch: '',
      knowledgeOpen: !!data.knowledge_open,
      knowledgeTab: data.knowledge_tab === 'personal' ? 'personal' : 'org',
      orgConcepts: [],
      personalEntries: [],
      personalMetadataColumns: [],
      expandedKnowledge: {},
      personalMappingsByEntryId: {},
      mappingModal: null,
      metadataModal: {
        open: false,
        name: '',
        type: 'TEXT'
      },
      composer: null
    };

    function dataSources() {
      var seen = {};
      var rows = [];
      state.tables.forEach(function (table) {
        var source = tableDataSource(table);
        var id = source.id || table.dataSourceId || table.data_source_id || ('source:' + safeText(source.name, 'unknown'));
        if (seen[id]) return;
        seen[id] = true;
        rows.push({
          id: id,
          name: source.name || 'Unknown Source',
          sourceType: source.sourceType || source.source_type || 'Data Source',
          tableCount: state.tables.filter(function (candidate) {
            var candidateSource = tableDataSource(candidate);
            var candidateId = candidateSource.id || candidate.dataSourceId || candidate.data_source_id || ('source:' + safeText(candidateSource.name, 'unknown'));
            return candidateId === id;
          }).length
        });
      });
      rows.sort(function (a, b) { return safeText(a.name).localeCompare(safeText(b.name)); });
      return rows;
    }

    function visibleTables() {
      return state.tables.filter(function (table) {
        var source = tableDataSource(table);
        var sourceId = source.id || table.dataSourceId || table.data_source_id || ('source:' + safeText(source.name, 'unknown'));
        var matchesSource = !state.selectedDataSourceId || sourceId === state.selectedDataSourceId;
        var matchesSearch = !state.tableSearch || safeText(table.name).toLowerCase().indexOf(state.tableSearch.toLowerCase()) >= 0;
        return matchesSource && matchesSearch;
      });
    }

    function selectedTable() {
      for (var i = 0; i < state.tables.length; i += 1) {
        if (state.tables[i].id === state.selectedTableId) return state.tables[i];
      }
      return null;
    }

    function selectedTableColumns() {
      return safeArray(selectedTable() && selectedTable().columns);
    }

    function ensureSelections() {
      var sources = dataSources();
      if (sources.length && !sources.some(function (source) { return source.id === state.selectedDataSourceId; })) {
        state.selectedDataSourceId = sources[0].id;
      }
      var tables = visibleTables();
      if (tables.length && !tables.some(function (table) { return table.id === state.selectedTableId; })) {
        state.selectedTableId = tables[0].id;
      }
      var columns = selectedTableColumns();
      if (columns.length && !columns.some(function (column) { return column.id === state.selectedColumnId; })) {
        state.selectedColumnId = columns[0].id;
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

    function prefetchPersonalMappings() {
      var flat = flattenKnowledgeEntries(state.personalEntries);
      flat.forEach(function (row) {
        callTool('manage_knowledge_entries', withOrg(state, {
          action: 'get_mappings',
          entry_id: row.entry.id
        }))
          .then(function (payload) {
            var info = payload.data || payload;
            state.personalMappingsByEntryId[row.entry.id] = safeArray(info.columns);
            render();
          })
          .catch(function () {});
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

      return Promise.all([
        callTool('get_data_schema', withOrg(state, {
          format: 'full',
          include_metadata: false,
          limit: 500
        })),
        callTool('get_business_concepts', withOrg(state, {
          format: 'full',
          include_mappings: true,
          limit: 200
        })),
        callTool('manage_knowledge_entries', withOrg(state, {
          action: 'list',
          include_metadata: true
        })),
        callTool('manage_knowledge_metadata', withOrg(state, {
          action: 'list_columns'
        }))
      ])
        .then(function (results) {
          var schemaPayload = results[0].data || results[0];
          state.tables = safeArray(schemaPayload.tables || schemaPayload);

          var conceptPayload = results[1].data || results[1];
          state.orgConcepts = rootOrganizationConcepts(safeArray(conceptPayload.concepts || conceptPayload));

          var entryPayload = results[2].data || results[2];
          state.personalEntries = safeArray(entryPayload.entries || entryPayload);

          var metadataPayload = results[3].data || results[3];
          state.personalMetadataColumns = safeArray(metadataPayload.columns || []);

          ensureSelections();
          state.loading = false;
          state.initializing = false;
          render();
          prefetchPersonalMappings();

          if (state.selectedColumnId) return loadColumnContext(state.selectedColumnId, true);
          return null;
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load Ludflow governance data.';
          render();
        });
    }

    function openMappingModal(entryId) {
      state.mappingModal = {
        entryId: entryId,
        search: '',
        selectedIds: safeArray(state.personalMappingsByEntryId[entryId]).map(function (column) {
          return column.columnId || column.id;
        })
      };
      render();
    }

    function saveMappings() {
      if (!state.mappingModal) return;
      var entryId = state.mappingModal.entryId;
      state.loading = true;
      render();
      callTool('manage_knowledge_entries', withOrg(state, {
        action: 'map',
        entry_id: entryId,
        column_ids: state.mappingModal.selectedIds
      }))
        .then(function () {
          state.notice = { kind: 'success', text: 'Knowledge Dex mappings updated.' };
          state.personalMappingsByEntryId[entryId] = flattenSchemaColumns(state.tables).filter(function (column) {
            return state.mappingModal.selectedIds.indexOf(column.id) >= 0;
          }).map(function (column) {
            return {
              columnId: column.id,
              columnName: column.name,
              tableId: column.tableId,
              tableName: column.tableName,
              dataSourceId: column.dataSourceId,
              dataSourceName: column.dataSourceName
            };
          });
          state.mappingModal = null;
          state.loading = false;
          render();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to update mappings.';
          render();
        });
    }

    function saveMetadataColumn() {
      var name = safeText(state.metadataModal.name).trim();
      if (!name) {
        state.error = 'Metadata field name is required.';
        render();
        return;
      }
      state.loading = true;
      render();
      callTool('manage_knowledge_metadata', withOrg(state, {
        action: 'create_column',
        column_name: name,
        data_type: state.metadataModal.type
      }))
        .then(function () {
          state.metadataModal = { open: false, name: '', type: 'TEXT' };
          state.notice = { kind: 'success', text: 'Knowledge Dex metadata field created.' };
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to create metadata field.';
          render();
        });
    }

    function createKnowledgeEntry() {
      if (!state.composer) return;
      var name = safeText(state.composer.name).trim();
      if (!name) {
        state.error = 'Entry name is required.';
        render();
        return;
      }

      state.loading = true;
      render();
      callTool('manage_knowledge_entries', withOrg(state, {
        action: 'create',
        name: name,
        description: safeText(state.composer.description).trim() || undefined,
        category: safeText(state.composer.category).trim() || undefined,
        tags: normalizeTags(state.composer.tags),
        parent_entry_id: state.composer.parentEntryId || undefined
      }))
        .then(function () {
          state.notice = { kind: 'success', text: state.composer.parentEntryId ? 'Attribute created.' : 'Entry created.' };
          state.composer = null;
          return refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to create Knowledge Dex entry.';
          render();
        });
    }

    function updateKnowledgeEntry(entryId, patch) {
      var args = cloneObject(patch);
      args.action = 'update';
      args.entry_id = entryId;
      state.loading = true;
      render();
      callTool('manage_knowledge_entries', withOrg(state, args))
        .then(function () {
          state.loading = false;
          state.notice = { kind: 'success', text: 'Knowledge Dex entry updated.' };
          refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to update Knowledge Dex entry.';
          render();
        });
    }

    function deleteKnowledgeEntry(entryId) {
      if (!window.confirm('Delete this Knowledge Dex entry?')) return;
      state.loading = true;
      render();
      callTool('manage_knowledge_entries', withOrg(state, {
        action: 'delete',
        entry_id: entryId
      }))
        .then(function () {
          state.notice = { kind: 'success', text: 'Knowledge Dex entry deleted.' };
          refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to delete Knowledge Dex entry.';
          render();
        });
    }

    function pullFromOrganization() {
      state.loading = true;
      render();
      callTool('manage_knowledge_entries', withOrg(state, { action: 'pull_from_org' }))
        .then(function (payload) {
          var info = payload.data || payload;
          state.notice = {
            kind: 'success',
            text: 'Pulled from organization: ' + (info.created || 0) + ' created, ' + (info.updated || 0) + ' updated.'
          };
          refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to pull from organizational concepts.';
          render();
        });
    }

    function saveMetadataValue(entryId, columnId, value) {
      state.loading = true;
      render();
      callTool('manage_knowledge_metadata', withOrg(state, {
        action: 'set_value',
        entry_id: entryId,
        column_id: columnId,
        value: value
      }))
        .then(function () {
          state.loading = false;
          state.notice = { kind: 'success', text: 'Metadata value updated.' };
          refreshData();
        })
        .catch(function (error) {
          state.loading = false;
          state.error = error.message || 'Failed to update metadata value.';
          render();
        });
    }

    function mappingLabel(mapping) {
      if (!mapping) return 'Unknown mapping';
      return [
        mapping.dataSourceName || safeText(mapping.data_source_name),
        mapping.tableName || safeText(mapping.table_name),
        mapping.columnName || safeText(mapping.column_name)
      ].filter(Boolean).join('.');
    }

    function renderKnowledgeTable(parent) {
      var metadataColumns = state.knowledgeTab === 'personal' ? state.personalMetadataColumns : [];
      var tableWrap = el('div', 'lf-table-scroll');
      parent.appendChild(tableWrap);
      var table = el('table', 'lf-table');
      tableWrap.appendChild(table);

      var head = document.createElement('thead');
      var headerRow = document.createElement('tr');
      ['Name', 'Description', 'Category', 'Tags', 'Data Sources']
        .concat(metadataColumns.map(function (column) { return column.name; }))
        .concat(['Actions'])
        .forEach(function (label) {
          var th = document.createElement('th');
          th.textContent = label;
          headerRow.appendChild(th);
        });
      head.appendChild(headerRow);
      table.appendChild(head);

      var body = document.createElement('tbody');
      table.appendChild(body);

      var rows = state.knowledgeTab === 'org' ? state.orgConcepts : state.personalEntries;

      if (!rows.length) {
        var emptyRow = document.createElement('tr');
        var emptyCell = document.createElement('td');
        emptyCell.colSpan = 6 + metadataColumns.length;
        emptyCell.className = 'lf-empty-table';
        emptyCell.textContent = state.knowledgeTab === 'org'
          ? 'No organization concepts are available yet.'
          : 'No personal Knowledge Dex entries yet.';
        emptyRow.appendChild(emptyCell);
        body.appendChild(emptyRow);
      } else {
        rows.forEach(function (entry) {
          renderKnowledgeRow(body, entry, true, null);
          if (state.expandedKnowledge[entry.id]) {
            safeArray(entry.attributes || entry.children).forEach(function (child) {
              renderKnowledgeRow(body, child, false, entry.id);
            });
            if (state.knowledgeTab === 'personal') renderComposerRow(body, entry.id);
          }
        });
      }

      if (state.knowledgeTab === 'personal') {
        renderComposerRow(body, null);
      }
    }

    function renderKnowledgeRow(body, entry, isEntity, parentId) {
      var row = document.createElement('tr');
      row.className = isEntity ? 'lf-table-row-entity' : 'lf-table-row-attribute';
      body.appendChild(row);

      var nameCell = document.createElement('td');
      var nameWrap = el('div', 'lf-table-name');
      if (isEntity) {
        var toggle = el('button', 'lf-mini-button');
        toggle.type = 'button';
        toggle.style.padding = '0';
        toggle.style.width = '18px';
        toggle.style.minHeight = '18px';
        toggle.style.border = 'none';
        toggle.style.background = 'transparent';
        toggle.style.boxShadow = 'none';
        var caret = el('span', 'lf-tree-caret' + (state.expandedKnowledge[entry.id] ? ' lf-tree-caret-open' : ''));
        toggle.appendChild(caret);
        toggle.addEventListener('click', function () {
          state.expandedKnowledge[entry.id] = !state.expandedKnowledge[entry.id];
          render();
        });
        nameWrap.appendChild(toggle);
      } else {
        nameWrap.appendChild(el('span', '', ''));
      }
      nameWrap.appendChild(el('span', 'lf-table-shape ' + (isEntity ? 'lf-table-shape-entity' : 'lf-table-shape-attribute')));
      if (state.knowledgeTab === 'personal') {
        var nameInput = createInput('text', entry.name, isEntity ? 'Entity name' : 'Attribute name', 'lf-cell-input');
        nameInput.addEventListener('blur', function () {
          if (nameInput.value !== safeText(entry.name)) {
            updateKnowledgeEntry(entry.id, { name: nameInput.value });
          }
        });
        nameWrap.appendChild(nameInput);
      } else {
        nameWrap.appendChild(el('span', 'lf-cell-text', entry.name || 'Untitled'));
      }
      nameCell.appendChild(nameWrap);
      row.appendChild(nameCell);

      ['description', 'category', 'tags'].forEach(function (field) {
        var cell = document.createElement('td');
        if (state.knowledgeTab === 'personal') {
          var value = field === 'tags' ? safeArray(entry.tags).join(', ') : safeText(entry[field], '');
          var input = createInput('text', value, field === 'tags' ? 'Tags' : field.charAt(0).toUpperCase() + field.slice(1), 'lf-cell-input');
          input.addEventListener('blur', function () {
            var nextValue = input.value;
            if (field === 'tags') {
              if (nextValue !== value) updateKnowledgeEntry(entry.id, { tags: normalizeTags(nextValue) });
            } else if (nextValue !== value) {
              updateKnowledgeEntry(entry.id, (function () {
                var patch = {};
                patch[field] = nextValue || null;
                return patch;
              })());
            }
          });
          cell.appendChild(input);
        } else if (field === 'tags') {
          if (!safeArray(entry.tags).length) {
            cell.appendChild(el('span', 'lf-cell-muted', 'No tags'));
          } else {
            var tags = el('div', 'lf-tag-list');
            safeArray(entry.tags).forEach(function (tag) {
              tags.appendChild(makeTag(tag));
            });
            cell.appendChild(tags);
          }
        } else {
          cell.appendChild(el('div', entry[field] ? 'lf-cell-text' : 'lf-cell-muted', entry[field] || '—'));
        }
        row.appendChild(cell);
      });

      var mappingCell = document.createElement('td');
      var mappingWrap = el('div', 'lf-mapping-cell');
      var mappings = safeArray(state.personalMappingsByEntryId[entry.id] || entry.mappings);
      if (!mappings.length) {
        mappingWrap.appendChild(el('div', 'lf-cell-muted', state.knowledgeTab === 'personal' ? 'No mapped columns yet.' : 'No mapped columns.'));
      } else {
        var tagList = el('div', 'lf-tag-list');
        mappings.forEach(function (mapping) {
          tagList.appendChild(makeTag(mappingLabel(mapping)));
        });
        mappingWrap.appendChild(tagList);
      }
      if (state.knowledgeTab === 'personal') {
        mappingWrap.appendChild(createMiniButton('Edit mappings', function () {
          openMappingModal(entry.id);
        }));
      }
      mappingCell.appendChild(mappingWrap);
      row.appendChild(mappingCell);

      (state.knowledgeTab === 'personal' ? state.personalMetadataColumns : []).forEach(function (column) {
        var cell = document.createElement('td');
        var currentValue = asObject(entry.metadataValues || {})[column.id];
        if (state.knowledgeTab === 'personal') {
          var inputType = column.dataType === 'DATE' ? 'date' : 'text';
          var metadataInput = createInput(inputType, currentValue == null ? '' : String(currentValue), column.name, 'lf-cell-input');
          metadataInput.addEventListener('blur', function () {
            if (metadataInput.value !== String(currentValue == null ? '' : currentValue)) {
              saveMetadataValue(entry.id, column.id, metadataInput.value);
            }
          });
          cell.appendChild(metadataInput);
        } else {
          cell.appendChild(el('div', currentValue ? 'lf-cell-text' : 'lf-cell-muted', currentValue == null || currentValue === '' ? '—' : String(currentValue)));
        }
        row.appendChild(cell);
      });

      var actionsCell = document.createElement('td');
      var actions = el('div', 'lf-row-actions');
      if (state.knowledgeTab === 'personal') {
        if (isEntity) {
          actions.appendChild(createMiniButton('Add attribute', function () {
            state.expandedKnowledge[entry.id] = true;
            state.composer = {
              parentEntryId: entry.id,
              name: '',
              description: '',
              category: '',
              tags: ''
            };
            render();
          }));
        }
        actions.appendChild(createMiniButton('Delete', function () {
          deleteKnowledgeEntry(entry.id);
        }));
      } else {
        actions.appendChild(el('div', 'lf-cell-muted', 'Read only'));
      }
      actionsCell.appendChild(actions);
      row.appendChild(actionsCell);
    }

    function renderComposerRow(body, parentEntryId) {
      var metadataColumns = state.knowledgeTab === 'personal' ? state.personalMetadataColumns : [];
      var matches = !!state.composer && state.composer.parentEntryId === parentEntryId;
      if (!matches) {
        var buttonRow = document.createElement('tr');
        buttonRow.className = 'lf-add-row';
        var buttonCell = document.createElement('td');
        buttonCell.colSpan = 6 + metadataColumns.length;
        var addButton = el('button', 'lf-mini-button', parentEntryId ? '+ Add attribute' : '+ Add entity');
        addButton.type = 'button';
        addButton.style.margin = '4px 0';
        addButton.addEventListener('click', function () {
          state.composer = {
            parentEntryId: parentEntryId,
            name: '',
            description: '',
            category: '',
            tags: ''
          };
          render();
        });
        buttonCell.appendChild(addButton);
        buttonRow.appendChild(buttonCell);
        body.appendChild(buttonRow);
        return;
      }

      var row = document.createElement('tr');
      row.className = 'lf-add-row';
      body.appendChild(row);

      ['name', 'description', 'category', 'tags'].forEach(function (field, index) {
        var cell = document.createElement('td');
        var input = createInput('text', state.composer[field], field.charAt(0).toUpperCase() + field.slice(1), 'lf-cell-input');
        input.addEventListener('input', function () {
          state.composer[field] = input.value;
        });
        cell.appendChild(input);
        row.appendChild(cell);
        if (index === 0) input.placeholder = parentEntryId ? 'Attribute name' : 'Entity name';
      });

      var mappingCell = document.createElement('td');
      mappingCell.appendChild(el('div', 'lf-cell-muted', 'Add mappings after the row is created.'));
      row.appendChild(mappingCell);

      metadataColumns.forEach(function () {
        var metaCell = document.createElement('td');
        metaCell.appendChild(el('div', 'lf-cell-muted', '—'));
        row.appendChild(metaCell);
      });

      var actionsCell = document.createElement('td');
      var actions = el('div', 'lf-row-actions');
      actions.appendChild(createMiniButton('Create', createKnowledgeEntry));
      actions.appendChild(createMiniButton('Cancel', function () {
        state.composer = null;
        render();
      }));
      actionsCell.appendChild(actions);
      row.appendChild(actionsCell);
    }

    function renderKnowledgeDexPanel(parent) {
      var panel = el('div', 'lf-kd-panel');
      parent.appendChild(panel);

      var header = el('div', 'lf-kd-header');
      panel.appendChild(header);

      var tabs = el('div', 'lf-kd-tabs');
      [
        { id: 'org', label: 'Organization' },
        { id: 'personal', label: 'My Knowledge' }
      ].forEach(function (tab) {
        var button = el('button', 'lf-kd-tab' + (state.knowledgeTab === tab.id ? ' lf-kd-tab-active' : ''), tab.label);
        button.type = 'button';
        button.addEventListener('click', function () {
          state.knowledgeTab = tab.id;
          state.composer = null;
          render();
        });
        tabs.appendChild(button);
      });
      header.appendChild(tabs);

      var actions = el('div', 'lf-topnav-right');
      if (state.knowledgeTab === 'personal') {
        actions.appendChild(createButton('Add Column', '', function () {
          state.metadataModal.open = true;
          render();
        }));
        actions.appendChild(createButton('Pull from Organization', '', pullFromOrganization));
      }
      header.appendChild(actions);

      var banner = el(
        'div',
        'lf-banner',
        state.knowledgeTab === 'org'
          ? 'Organization concepts are read only here, matching the embedded Knowledge Dex experience in Ludflow.'
          : 'My Knowledge mirrors Ludflow’s editable table workflow. Update cells inline, map governed columns, and pull from the shared organization set.'
      );
      panel.appendChild(banner);
      renderKnowledgeTable(panel);
    }

    function renderGovernanceMain(main) {
      if (!state.selectedDataSourceId) {
        var blank = el('div', 'lf-doc-blank', 'Select a data source to get started.');
        main.appendChild(blank);
        return;
      }
      if (!state.selectedTableId) {
        var blankTable = el('div', 'lf-doc-blank', 'Select a table to inspect its schema and context.');
        main.appendChild(blankTable);
        return;
      }

      var panel = el('div', 'lf-metadata-panel');
      main.appendChild(panel);

      var inner = el('div', 'lf-metadata-inner');
      panel.appendChild(inner);

      var table = selectedTable();
      var source = tableDataSource(table);

      var header = el('div', 'lf-metadata-header');
      inner.appendChild(header);

      var intro = el('div');
      intro.appendChild(el('div', 'lf-metadata-title', table.name || 'Table'));
      intro.appendChild(el('div', 'lf-metadata-subtitle', selectedTableColumns().length + ' columns • ' + safeText(source.name, 'Data Source')));
      header.appendChild(intro);

      var chips = el('div', 'lf-chip-row');
      chips.appendChild(makeChip(source.sourceType || source.source_type || 'DDL'));
      chips.appendChild(makeChip('Table ID: ' + table.id));
      header.appendChild(chips);

      inner.appendChild(el('div', 'lf-info-card', 'This standalone renderer keeps Ludflow’s datasource rail, tables rail, and schema-first detail flow, while using MCP tools for fetching and updates.'));

      var schemaWrap = el('div', 'lf-table-scroll');
      inner.appendChild(schemaWrap);
      var schemaTable = el('table', 'lf-table lf-schema-table');
      schemaWrap.appendChild(schemaTable);
      var head = document.createElement('thead');
      head.innerHTML = '<tr><th>Column</th><th>Type</th><th>Nullable</th><th>Primary Key</th><th>Description</th></tr>';
      schemaTable.appendChild(head);
      var body = document.createElement('tbody');
      safeArray(table.columns).forEach(function (column) {
        var row = document.createElement('tr');
        if (column.id === state.selectedColumnId) row.className = 'lf-table-row-selected';
        row.addEventListener('click', function () {
          loadColumnContext(column.id);
        });
        row.innerHTML =
          '<td><strong>' + escapeHtml(column.name || 'Unnamed') + '</strong></td>' +
          '<td>' + escapeHtml(columnTypeName(column)) + '</td>' +
          '<td>' + (column.nullable ? 'Yes' : 'No') + '</td>' +
          '<td>' + ((column.isPrimaryKey || column.is_primary_key) ? 'Yes' : 'No') + '</td>' +
          '<td>' + escapeHtml(column.description || '—') + '</td>';
        body.appendChild(row);
      });
      schemaTable.appendChild(body);

      var contextCard = el('div', 'lf-context-card');
      inner.appendChild(contextCard);
      var contextHeader = el('div', 'lf-context-header');
      contextHeader.appendChild(el('div', 'lf-sidebar-title', state.contextLoading ? 'Column Context • Loading...' : 'Column Context'));
      if (state.selectedColumnId) contextHeader.appendChild(makeChip('Selected column'));
      contextCard.appendChild(contextHeader);
      var contextBody = el('div', 'lf-context-body');
      contextCard.appendChild(contextBody);

      if (state.contextLoading) {
        contextBody.appendChild(el('div', 'lf-cell-muted', 'Fetching business concepts, linked documents, and cross-column references...'));
      } else if (state.columnContext && window.__renderers.column_context) {
        window.__renderers.column_context(contextBody, state.columnContext, {}, {}, false, function () {});
      } else if (state.columnContext) {
        contextBody.appendChild(renderMarkdownNode('`' + safeText(state.columnContext.column && state.columnContext.column.name, 'column') + '` loaded.'));
      } else {
        contextBody.appendChild(el('div', 'lf-cell-muted', 'Click a schema row to inspect its full governed context.'));
      }
    }

    function renderBody(body) {
      var subsystemRow = el('div', 'lf-subsystem-row');
      body.appendChild(subsystemRow);

      var subsystemButtons = el('div', 'lf-subsystem-buttons');
      subsystemRow.appendChild(subsystemButtons);

      var knowledgeButton = el('button', 'lf-subsystem-button' + (state.knowledgeOpen ? ' lf-subsystem-button-active' : ''), '');
      knowledgeButton.type = 'button';
      knowledgeButton.appendChild(el('span', '', 'Knowledge Dex'));
      knowledgeButton.appendChild(el('span', 'lf-subsystem-caret' + (state.knowledgeOpen ? ' lf-subsystem-caret-open' : '')));
      knowledgeButton.addEventListener('click', function () {
        state.knowledgeOpen = !state.knowledgeOpen;
        render();
      });
      subsystemButtons.appendChild(knowledgeButton);

      if (state.knowledgeOpen) renderKnowledgeDexPanel(body);

      var layout = el('div', 'lf-governance-layout');
      body.appendChild(layout);

      var sourceRail = el('aside', 'lf-rail');
      layout.appendChild(sourceRail);
      var sourceHeader = el('div', 'lf-sidebar-header');
      sourceHeader.appendChild(el('div', 'lf-sidebar-title', 'Data Sources'));
      sourceRail.appendChild(sourceHeader);
      var sourceBody = el('div', 'lf-rail-body');
      sourceRail.appendChild(sourceBody);

      if (!dataSources().length) {
        sourceBody.appendChild(el('div', 'lf-list-subtitle', 'No governed tables found.'));
      } else {
        var sourceList = el('div', 'lf-list');
        dataSources().forEach(function (source) {
          var button = el('button', 'lf-list-button' + (source.id === state.selectedDataSourceId ? ' lf-list-button-active' : ''));
          button.type = 'button';
          button.addEventListener('click', function () {
            state.selectedDataSourceId = source.id;
            ensureSelections();
            render();
            if (state.selectedColumnId) loadColumnContext(state.selectedColumnId, true);
          });
          button.appendChild(el('div', 'lf-list-title', source.name));
          button.appendChild(el('div', 'lf-list-subtitle', source.sourceType + ' • ' + source.tableCount + ' tables'));
          sourceList.appendChild(button);
        });
        sourceBody.appendChild(sourceList);
      }

      var tableRail = el('aside', 'lf-rail lf-rail-compact');
      layout.appendChild(tableRail);
      var tableHeader = el('div', 'lf-sidebar-header');
      tableHeader.appendChild(el('div', 'lf-sidebar-title', 'Tables'));
      tableRail.appendChild(tableHeader);
      var tableBody = el('div', 'lf-rail-body');
      tableRail.appendChild(tableBody);

      var search = createInput('text', state.tableSearch, 'Filter tables');
      search.addEventListener('input', function () {
        state.tableSearch = search.value;
        ensureSelections();
        render();
      });
      tableBody.appendChild(search);

      var tableList = el('div', 'lf-list');
      tableList.style.marginTop = '12px';
      tableBody.appendChild(tableList);
      if (!visibleTables().length) {
        tableList.appendChild(el('div', 'lf-list-subtitle', 'No tables match this filter.'));
      } else {
        visibleTables().forEach(function (table) {
          var button = el('button', 'lf-list-button' + (table.id === state.selectedTableId ? ' lf-list-button-active' : ''));
          button.type = 'button';
          button.addEventListener('click', function () {
            state.selectedTableId = table.id;
            state.selectedColumnId = safeArray(table.columns)[0] ? safeArray(table.columns)[0].id : null;
            render();
            if (state.selectedColumnId) loadColumnContext(state.selectedColumnId, true);
          });
          button.appendChild(el('div', 'lf-list-title', table.name || 'Untitled table'));
          button.appendChild(el('div', 'lf-list-subtitle', safeArray(table.columns).length + ' columns'));
          tableList.appendChild(button);
        });
      }

      var main = el('section', 'lf-governance-main');
      layout.appendChild(main);
      renderGovernanceMain(main);
    }

    function renderOverlay(root) {
      if (state.mappingModal) {
        var modalBackdrop = el('div', 'lf-modal-backdrop');
        modalBackdrop.addEventListener('click', function (event) {
          if (event.target === modalBackdrop) {
            state.mappingModal = null;
            render();
          }
        });
        var modal = el('div', 'lf-modal');
        modalBackdrop.appendChild(modal);

        var modalHeader = el('div', 'lf-modal-header');
        modalHeader.appendChild(el('div', 'lf-modal-title', 'Edit mapped columns'));
        modalHeader.appendChild(createMiniButton('Close', function () {
          state.mappingModal = null;
          render();
        }));
        modal.appendChild(modalHeader);

        var modalBody = el('div', 'lf-modal-body');
        modal.appendChild(modalBody);
        modalBody.appendChild(el('div', 'lf-help', 'Select governed columns to attach to this Knowledge Dex entry.'));
        var search = createInput('text', state.mappingModal.search, 'Search columns');
        search.addEventListener('input', function () {
          state.mappingModal.search = search.value;
          render();
        });
        modalBody.appendChild(search);

        var list = el('div', 'lf-checkbox-list');
        modalBody.appendChild(list);
        flattenSchemaColumns(state.tables)
          .filter(function (column) {
            return !state.mappingModal.search || column.label.toLowerCase().indexOf(state.mappingModal.search.toLowerCase()) >= 0;
          })
          .forEach(function (column) {
            var row = el('label', 'lf-checkbox-row');
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = state.mappingModal.selectedIds.indexOf(column.id) >= 0;
            input.addEventListener('change', function () {
              if (input.checked) {
                if (state.mappingModal.selectedIds.indexOf(column.id) < 0) state.mappingModal.selectedIds.push(column.id);
              } else {
                state.mappingModal.selectedIds = state.mappingModal.selectedIds.filter(function (id) { return id !== column.id; });
              }
            });
            row.appendChild(input);
            var copy = el('div');
            copy.appendChild(el('div', 'lf-list-title', column.name));
            copy.appendChild(el('div', 'lf-list-subtitle', column.label));
            row.appendChild(copy);
            list.appendChild(row);
          });

        var footer = el('div', 'lf-modal-footer');
        footer.appendChild(createButton('Cancel', '', function () {
          state.mappingModal = null;
          render();
        }));
        footer.appendChild(createButton('Save mappings', 'primary', saveMappings));
        modal.appendChild(footer);
        root.appendChild(modalBackdrop);
      }

      if (state.metadataModal.open) {
        var metadataBackdrop = el('div', 'lf-modal-backdrop');
        metadataBackdrop.addEventListener('click', function (event) {
          if (event.target === metadataBackdrop) {
            state.metadataModal.open = false;
            render();
          }
        });
        var metadataModal = el('div', 'lf-modal');
        metadataBackdrop.appendChild(metadataModal);

        var header = el('div', 'lf-modal-header');
        header.appendChild(el('div', 'lf-modal-title', 'Add Knowledge Dex metadata column'));
        metadataModal.appendChild(header);

        var body = el('div', 'lf-modal-body');
        metadataModal.appendChild(body);
        var grid = el('div', 'lf-grid-2');
        body.appendChild(grid);

        var nameInput = createInput('text', state.metadataModal.name, 'Column name');
        nameInput.addEventListener('input', function () {
          state.metadataModal.name = nameInput.value;
        });
        grid.appendChild(nameInput);

        var typeSelect = createSelect([
          { value: 'TEXT', label: 'Text' },
          { value: 'DATE', label: 'Date' },
          { value: 'MULTISELECT', label: 'Multi Select' }
        ], state.metadataModal.type);
        typeSelect.addEventListener('change', function () {
          state.metadataModal.type = typeSelect.value;
        });
        grid.appendChild(typeSelect);
        body.appendChild(el('div', 'lf-help', 'This mirrors the Ludflow Add Column flow for personal Knowledge Dex metadata.'));

        var footer = el('div', 'lf-modal-footer');
        footer.appendChild(createButton('Cancel', '', function () {
          state.metadataModal.open = false;
          render();
        }));
        footer.appendChild(createButton('Create column', 'primary', saveMetadataColumn));
        metadataModal.appendChild(footer);
        root.appendChild(metadataBackdrop);
      }
    }

    function render() {
      renderWorkspaceShell(container, state, {
        activeNav: 'governance',
        onRefresh: refreshData,
        onThemeChange: render,
        breadcrumbs: function () {
          var crumbs = [
            { label: 'Home' },
            { label: 'Data Governance', current: !state.selectedDataSourceId }
          ];
          var source = null;
          for (var i = 0; i < dataSources().length; i += 1) {
            if (dataSources()[i].id === state.selectedDataSourceId) source = dataSources()[i];
          }
          if (source) crumbs.push({ label: source.name, current: !state.selectedTableId });
          if (selectedTable()) crumbs.push({ label: selectedTable().name || 'Table', current: true });
          return crumbs;
        },
        onOrgChange: function () {
          state.columnContext = null;
          state.personalMappingsByEntryId = {};
          state.selectedTableId = data.table_id || null;
          state.selectedColumnId = data.column_id || null;
          refreshData();
        }
      }, renderBody, renderOverlay);
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

  window.__renderers.ludflow_knowledge_dex = function renderLegacyKnowledgeDex(container, data) {
    var next = cloneObject(asObject(data));
    next.knowledge_open = true;
    next.knowledge_tab = next.mode === 'personal' ? 'personal' : 'org';
    createDataGovernanceRenderer(container, next);
  };
})();
