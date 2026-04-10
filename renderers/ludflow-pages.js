// @ts-nocheck
/* Standalone Ludflow app pages for MCP Views */

(function () {
  'use strict';

  window.__renderers = window.__renderers || {};

  var PLUGIN_NAME = 'ludflow';
  var TOOL_PREFIX = 'ludflow__';
  var STYLE_ID = 'ludflow-standalone-pages-styles';
  var LUDFLOW_APP_ORIGIN = 'https://app.ludflow.com';
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
      '.lf-icon-btn { min-width: 36px; width: 36px; padding: 0; }',
      '.lf-icon-btn svg { width: 16px; height: 16px; pointer-events: none; }',
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
      '.lf-governance-main { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; background: var(--lf-bg); }',
      '.lf-panel-stack { flex: 1; min-height: 0; overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }',
      '.lf-panel-toggle { appearance: none; display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text-muted); box-shadow: var(--lf-shadow); cursor: pointer; font: inherit; font-size: 14px; }',
      '.lf-panel-toggle:hover { background: var(--lf-brand-100); color: var(--lf-text); }',
      '.lf-source-rail { width: 288px; min-width: 288px; }',
      '.lf-table-rail { width: 264px; min-width: 264px; }',
      '.lf-rail-collapsed { width: 48px; min-width: 48px; }',
      '.lf-collapsed-rail { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px 8px; }',
      '.lf-vertical-label { writing-mode: vertical-rl; transform: rotate(180deg); color: var(--lf-text-muted); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }',
      '.lf-stacked-rail { display: flex; flex-direction: column; gap: 18px; }',
      '.lf-rail-section { display: flex; flex-direction: column; gap: 10px; }',
      '.lf-rail-section + .lf-rail-section { padding-top: 18px; border-top: 1px solid var(--lf-border); }',
      '.lf-rail-section-title { font-size: 12px; font-weight: 600; color: var(--lf-text); text-transform: uppercase; letter-spacing: 0.05em; }',
      '.lf-rail-section-copy { color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '.lf-subsystem-row { padding: 8px 24px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface); }',
      '.lf-subsystem-buttons { display: inline-flex; align-items: center; gap: 8px; }',
      '.lf-subsystem-button { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface); color: var(--lf-text); padding: 8px 12px; font: inherit; font-size: 13px; cursor: pointer; }',
      '.lf-subsystem-button-active { background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-subsystem-caret { width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--lf-text-muted); transition: transform 120ms ease; }',
      '.lf-subsystem-caret-open { transform: rotate(180deg); }',
      '.lf-hero-card { border: 1px solid var(--lf-border); border-radius: 12px; background: var(--lf-surface); box-shadow: var(--lf-shadow); padding: 20px; display: flex; flex-direction: column; gap: 16px; }',
      '.lf-hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }',
      '.lf-hero-title { font-size: 24px; line-height: 1.15; font-weight: 600; color: var(--lf-text); }',
      '.lf-hero-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 13px; line-height: 1.5; }',
      '.lf-stat-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
      '.lf-stat-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--lf-border); background: var(--lf-surface-muted); color: var(--lf-text-muted); font-size: 12px; }',
      '.lf-stat-pill-strong { color: var(--lf-text); background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-meta-banner { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border: 1px solid var(--lf-border); border-radius: 10px; background: var(--lf-surface); box-shadow: var(--lf-shadow); }',
      '.lf-meta-banner-dot { width: 10px; height: 10px; margin-top: 4px; border-radius: 999px; background: var(--lf-brand-300); flex-shrink: 0; }',
      '.lf-meta-banner-title { color: var(--lf-text); font-size: 14px; font-weight: 600; }',
      '.lf-meta-banner-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 12px; line-height: 1.5; }',
      '.lf-metadata-card { border: 1px solid var(--lf-border); border-radius: 12px; background: var(--lf-surface); box-shadow: var(--lf-shadow); overflow: hidden; }',
      '.lf-metadata-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 12px 16px; border-bottom: 1px solid var(--lf-border); background: var(--lf-surface-muted); }',
      '.lf-metadata-toolbar-copy { color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '.lf-metadata-toolbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }',
      '.lf-toolbar-group { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }',
      '.lf-toolbar-badge { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--lf-border); background: var(--lf-surface); color: var(--lf-text); font-size: 12px; }',
      '.lf-status-banner { border: 1px solid var(--lf-border); border-radius: 10px; background: var(--lf-surface); box-shadow: var(--lf-shadow); padding: 14px 16px; }',
      '.lf-status-banner-brand { background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-status-banner-warning { background: var(--lf-warning-bg); border-color: transparent; }',
      '.lf-status-banner-error { background: var(--lf-error-bg); border-color: transparent; }',
      '.lf-status-banner-title { color: var(--lf-text); font-size: 14px; font-weight: 600; }',
      '.lf-status-banner-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 12px; line-height: 1.5; }',
      '.lf-status-banner-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 12px; }',
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
      '.lf-table tbody tr:last-child td { border-bottom: none; }',
      '.lf-table-row-entity { background: var(--lf-brand-50); }',
      '.lf-table-row-attribute { background: var(--lf-surface-muted); }',
      '.lf-table-row-selected { outline: 2px solid var(--lf-brand-300); outline-offset: -2px; }',
      '.lf-meta-row { cursor: pointer; }',
      '.lf-meta-row:hover { background: var(--lf-brand-100); }',
      '.lf-table-name { display: flex; align-items: center; gap: 8px; }',
      '.lf-table-shape { width: 10px; height: 10px; flex-shrink: 0; }',
      '.lf-table-shape-entity { border-radius: 2px; background: var(--lf-brand-600); }',
      '.lf-table-shape-attribute { border-radius: 999px; background: var(--lf-text-muted); }',
      '.lf-field-name { font-size: 13px; font-weight: 600; color: var(--lf-text); line-height: 1.45; }',
      '.lf-field-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '.lf-cell-stack { display: flex; flex-direction: column; gap: 6px; }',
      '.lf-cell-badges { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }',
      '.lf-cell-badge { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 999px; border: 1px solid var(--lf-border); font-size: 11px; line-height: 1; }',
      '.lf-cell-badge-success { color: var(--lf-success-text); background: var(--lf-success-bg); border-color: transparent; }',
      '.lf-cell-badge-muted { color: var(--lf-text-muted); background: var(--lf-surface-muted); }',
      '.lf-cell-badge-brand { color: var(--lf-text); background: var(--lf-brand-50); border-color: var(--lf-brand-200); }',
      '.lf-cell-code { display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 8px; background: var(--lf-surface-muted); border: 1px solid var(--lf-border); color: var(--lf-text); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; }',
      '.lf-cell-link { border: none; background: transparent; padding: 0; color: var(--lf-brand-600); font: inherit; font-size: 12px; cursor: pointer; text-align: left; }',
      '.lf-cell-link:hover { text-decoration: underline; }',
      '.lf-cell-action { margin-top: 4px; }',
      '.lf-cell-change-note { color: var(--lf-text-muted); font-size: 11px; line-height: 1.35; }',
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
      '.lf-modal-copy { color: var(--lf-text-muted); font-size: 13px; line-height: 1.5; }',
      '.lf-modal-body { padding: 16px 18px; overflow: auto; display: flex; flex-direction: column; gap: 12px; }',
      '.lf-modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 16px 18px; border-top: 1px solid var(--lf-border); background: var(--lf-surface-muted); }',
      '.lf-checkbox-list { display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow: auto; }',
      '.lf-checkbox-row { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface-muted); }',
      '.lf-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }',
      '.lf-grid-1 { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }',
      '.lf-label-stack { display: flex; flex-direction: column; gap: 6px; }',
      '.lf-label { color: var(--lf-text); font-size: 12px; font-weight: 600; }',
      '.lf-value-editor { min-height: 144px; resize: vertical; }',
      '.lf-diff-list { display: flex; flex-direction: column; gap: 8px; }',
      '.lf-diff-item { padding: 10px 12px; border: 1px solid var(--lf-border); border-radius: 8px; background: var(--lf-surface-muted); }',
      '.lf-diff-item-title { color: var(--lf-text); font-size: 13px; font-weight: 600; }',
      '.lf-diff-item-copy { margin-top: 4px; color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '.lf-help { color: var(--lf-text-muted); font-size: 12px; line-height: 1.45; }',
      '@media (max-width: 900px) { .lf-governance-layout { flex-direction: column; } .lf-rail, .lf-rail-compact { width: 100%; min-width: 0; max-height: 320px; border-right: none; border-bottom: 1px solid var(--lf-border); } .lf-doc-content { grid-template-columns: minmax(0, 1fr); } .lf-doc-pane + .lf-doc-pane { border-left: none; border-top: 1px solid var(--lf-border); } }',
      '@media (max-width: 900px) { .lf-home-layout { grid-template-columns: 1fr; } .lf-sidebar { width: 100%; min-width: 0; max-height: 320px; border-right: none; border-bottom: 1px solid var(--lf-border); } }',
      '@media (max-width: 720px) { .lf-topnav, .lf-breadcrumbs, .lf-subsystem-row, .lf-kd-panel, .lf-metadata-inner { padding-left: 16px; padding-right: 16px; } .lf-notice { margin-left: 16px; margin-right: 16px; } .lf-sidebar-body, .lf-rail-body, .lf-doc-pane, .lf-panel-stack { padding: 12px; } .lf-doc-header, .lf-doc-tabs, .lf-sidebar-header, .lf-metadata-toolbar { padding-left: 12px; padding-right: 12px; } .lf-grid-2 { grid-template-columns: 1fr; } .lf-topnav-center { width: 100%; justify-content: flex-start; } .lf-hero-card { padding: 16px; } }'
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

  function createIconButton(label, svgMarkup, handler) {
    var button = el('button', 'lf-btn lf-icon-btn');
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.innerHTML = svgMarkup;
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

  function postLocalJson(path, body, errorPrefix) {
    return fetch(localUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body || {})
    }).then(function (res) {
      if (!res.ok) throw new Error((errorPrefix || 'Request failed') + ': ' + res.status);
      return res.json().catch(function () {
        return {};
      });
    });
  }

  function directMcpFetch(toolName, args) {
    return postLocalJson('/mcp', {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args || {}
      }
    }, 'MCP request failed').then(function (payload) {
      if (payload && payload.error && payload.error.message) throw new Error(payload.error.message);
      return payload && payload.result ? payload.result : payload;
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

  function fetchPagedCollection(toolName, args, options) {
    var settings = options || {};
    var pageSize = settings.limit || 200;
    var offset = settings.offset || 0;
    var maxPages = settings.maxPages || 100;
    var extractItems = settings.extract || function (payload) {
      return payload && payload.data ? payload.data : payload;
    };
    var allItems = [];

    function loadPage(pageIndex) {
      var pageArgs = cloneObject(args || {});
      pageArgs.limit = pageSize;
      pageArgs.offset = offset;

      return callTool(toolName, pageArgs).then(function (payload) {
        var pageItems = safeArray(extractItems(payload));
        allItems = allItems.concat(pageItems);
        if (pageItems.length < pageSize || pageIndex + 1 >= maxPages) {
          return allItems;
        }
        offset += pageSize;
        return loadPage(pageIndex + 1);
      });
    }

    return loadPage(0);
  }

  function pushContentSession(toolName, data, meta, toolArgs, sessionId) {
    return postLocalJson('/api/push', {
      toolName: toolName,
      toolArgs: toolArgs || {},
      result: {
        data: data || {},
        meta: meta || {}
      },
      reviewRequired: false,
      sessionId: sessionId
    }, 'Push request failed');
  }

  function invokeTauri(command, args) {
    if (!window.__TAURI__ || !window.__TAURI__.core || typeof window.__TAURI__.core.invoke !== 'function') {
      return Promise.reject(new Error('This action requires the MCP Views desktop app.'));
    }
    return window.__TAURI__.core.invoke(command, args || {});
  }

  function ludflowOrganizationSettingsUrl(orgId) {
    return LUDFLOW_APP_ORIGIN + '/settings/organization' + (orgId ? '?org=' + encodeURIComponent(orgId) : '');
  }

  function openExternalUrl(url) {
    if (!url) return Promise.resolve();

    var tauriShell = window.__TAURI__ && window.__TAURI__.shell;
    if (tauriShell && typeof tauriShell.open === 'function') {
      return Promise.resolve(tauriShell.open(url));
    }

    if (window.__TAURI_INTERNALS__ && typeof window.__TAURI_INTERNALS__.invoke === 'function') {
      return Promise.resolve(
        window.__TAURI_INTERNALS__.invoke('plugin:shell|open', { path: url })
      );
    }

    try {
      var popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (popup) {
        try {
          popup.opener = null;
        } catch (_error) {}
        return Promise.resolve();
      }
    } catch (_error) {}

    window.location.href = url;
    return Promise.resolve();
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
      var attrTheme = document.documentElement.getAttribute('data-theme');
      if (attrTheme === 'dark' || attrTheme === 'light') return attrTheme;
      var storedTheme = window.localStorage.getItem('mcpviews-theme');
      if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (_error) {}
    return 'light';
  }

  function syncThemeState(state) {
    var nextTheme = detectHostTheme();
    var changed = state.theme !== nextTheme;
    state.theme = nextTheme;
    return changed;
  }

  function observeHostTheme(container, state, rerender) {
    if (container.__lfThemeSync && typeof container.__lfThemeSync.disconnect === 'function') {
      container.__lfThemeSync.disconnect();
    }

    var root = document.documentElement;
    var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    var observer = typeof MutationObserver !== 'undefined' && root
      ? new MutationObserver(function () {
        if (syncThemeState(state)) rerender();
      })
      : null;
    if (observer) {
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    var handleMediaChange = function () {
      if (syncThemeState(state)) rerender();
    };
    if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    container.__lfThemeSync = {
      disconnect: function () {
        if (observer) observer.disconnect();
        if (mediaQuery && typeof mediaQuery.removeEventListener === 'function') {
          mediaQuery.removeEventListener('change', handleMediaChange);
        }
      }
    };
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
    syncThemeState(state);

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
    var org = currentOrg(state);
    if (org && org.id) {
      var settingsButton = createIconButton(
        'Open organization settings',
        [
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
          '<circle cx="12" cy="12" r="3"></circle>',
          '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.1a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.1a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
          '</svg>'
        ].join(''),
        function () {
          state.notice = null;
          state.error = '';
          openExternalUrl(ludflowOrganizationSettingsUrl(org.id))
            .catch(function (error) {
              state.error = error.message || 'Failed to open organization settings.';
              renderWorkspaceShell(container, state, config, renderBody, renderOverlay);
            });
        }
      );
      navRight.appendChild(settingsButton);
    }

    var refreshButton = createButton(state.loading ? 'Refreshing...' : 'Refresh', '', config.onRefresh);
    refreshButton.disabled = !!state.loading;
    navRight.appendChild(refreshButton);

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
      theme: detectHostTheme(),
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      actionDocumentId: null,
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

    function selectedDocumentItem() {
      for (var i = 0; i < state.documents.length; i += 1) {
        if (state.documents[i].id === state.selectedDocumentId) return state.documents[i];
      }
      return null;
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
      var sessionId = 'ludflow-document-' + safeText(documentItem.id, 'untitled');
      var sessionPayload = {
        toolName: 'rich_content',
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
        sessionKey: 'ludflow-document:' + safeText(documentItem.id, 'untitled')
      };
      if (utilsObject && typeof utilsObject.openSession === 'function') {
        utilsObject.openSession(sessionPayload);
        return Promise.resolve();
      }
      return pushContentSession(
        'rich_content',
        sessionPayload.data,
        sessionPayload.meta,
        sessionPayload.toolArgs,
        sessionId
      );
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
          return openDocumentSession(documentItem).then(function () {
            state.loading = false;
            state.initializing = false;
            state.notice = {
              kind: 'success',
              text: 'Opened "' + safeText(documentItem.title, 'Untitled Document') + '" in a new tab.'
            };
            render();
          });
        })
        .catch(function (error) {
          state.loading = false;
          state.initializing = false;
          state.error = error.message || 'Failed to load document.';
          render();
        });
    }

    function publishLatestDocument(documentItem) {
      if (!documentItem || !documentItem.id) return;
      state.actionDocumentId = documentItem.id;
      state.notice = null;
      state.error = '';
      render();

      callTool('publish_document', withOrg(state, {
        action: 'list_versions',
        document_id: documentItem.id
      }))
        .then(function (payload) {
          var versions = safeArray(payload.data || payload).slice().sort(function (left, right) {
            return Number(left.versionNumber || 0) - Number(right.versionNumber || 0);
          });
          if (!versions.length) throw new Error('No publishable versions are available for this document.');
          var latestVersion = versions[versions.length - 1];
          return callTool('publish_document', withOrg(state, {
            action: 'publish',
            document_id: documentItem.id,
            version_id: latestVersion.id
          })).then(function () {
            return latestVersion;
          });
        })
        .then(function (latestVersion) {
          state.actionDocumentId = null;
          state.notice = {
            kind: 'success',
            text: 'Published "' + safeText(documentItem.title, 'Untitled Document') + '" using version ' + safeText(latestVersion.versionNumber, 'latest') + '.'
          };
          return refreshIndex();
        })
        .catch(function (error) {
          state.actionDocumentId = null;
          state.error = error.message || 'Failed to publish document.';
          render();
        });
    }

    function unpublishDocument(documentItem) {
      if (!documentItem || !documentItem.id) return;
      state.actionDocumentId = documentItem.id;
      state.notice = null;
      state.error = '';
      render();

      callTool('publish_document', withOrg(state, {
        action: 'unpublish',
        document_id: documentItem.id
      }))
        .then(function () {
          state.actionDocumentId = null;
          state.notice = {
            kind: 'success',
            text: 'Unpublished "' + safeText(documentItem.title, 'Untitled Document') + '".'
          };
          return refreshIndex();
        })
        .catch(function (error) {
          state.actionDocumentId = null;
          state.error = error.message || 'Failed to unpublish document.';
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
        fetchPagedCollection('list_documents', withOrg(state, { format: 'full' }), {
          limit: 200,
          extract: function (payload) {
            return payload.data || payload;
          }
        })
      ])
        .then(function (results) {
          state.folders = safeArray(results[0].data || results[0]);
          state.documents = safeArray(results[1]);
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
      var activeDocument = selectedDocumentItem();
      if (activeDocument) {
        toolbarRight.appendChild(createButton('Open Selected', 'primary', function () {
          openDocument(state.selectedDocumentId);
        }));
        var publishSelectedButton = createButton(
          state.actionDocumentId === activeDocument.id ? 'Publishing...' : 'Publish Latest',
          '',
          function () {
            publishLatestDocument(activeDocument);
          }
        );
        publishSelectedButton.disabled = state.actionDocumentId === activeDocument.id;
        toolbarRight.appendChild(publishSelectedButton);
        if (safeText(activeDocument.status).toLowerCase() === 'published') {
          var unpublishSelectedButton = createButton(
            state.actionDocumentId === activeDocument.id ? 'Working...' : 'Unpublish',
            '',
            function () {
              unpublishDocument(activeDocument);
            }
          );
          unpublishSelectedButton.disabled = state.actionDocumentId === activeDocument.id;
          toolbarRight.appendChild(unpublishSelectedButton);
        }
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
        'Status filtering is available now, and document cards can publish the latest saved version or unpublish directly through MCP. Created and updated sorting is included, but some Ludflow MCP document timestamps are still sparse, so date-based ordering may be approximate until those fields are fully serialized.'
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
          var publishButton = createButton(
            state.actionDocumentId === documentItem.id ? 'Publishing...' : 'Publish Latest',
            '',
            function () {
              publishLatestDocument(documentItem);
            }
          );
          publishButton.disabled = state.actionDocumentId === documentItem.id;
          actions.appendChild(publishButton);
          if (safeText(documentItem.status).toLowerCase() === 'published') {
            var unpublishButton = createButton(
              state.actionDocumentId === documentItem.id ? 'Working...' : 'Unpublish',
              '',
              function () {
                unpublishDocument(documentItem);
              }
            );
            unpublishButton.disabled = state.actionDocumentId === documentItem.id;
            actions.appendChild(unpublishButton);
          }
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
        onOrgChange: function () {
          state.selectedDocumentId = null;
          state.selectedFolderId = null;
          refreshIndex();
        }
      }, renderBody);
    }

    observeHostTheme(container, state, render);

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
      theme: detectHostTheme(),
      orgs: [],
      currentOrgId: data.organization_id || null,
      initializing: true,
      loading: false,
      contextLoading: false,
      draftsLoading: false,
      draftDiffLoading: false,
      draftActionLoading: false,
      notice: null,
      error: '',
      tables: [],
      selectedDataSourceId: data.data_source_id || null,
      selectedTableId: data.table_id || null,
      selectedColumnId: data.column_id || null,
      selectedDraftId: data.draft_id || null,
      drafts: [],
      draftDiff: null,
      columnContext: null,
      tableSearch: '',
      columnSearch: '',
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
      draftCreateModal: {
        open: false,
        title: '',
        description: ''
      },
      draftProposeModalOpen: false,
      cellEditor: null,
      composer: null,
      dataSourcesCollapsed: false,
      tablesCollapsed: false
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

    function selectedMetadataColumns() {
      var table = selectedTable();
      return safeArray(table && (table.metadataColumns || table.metadata_columns));
    }

    function selectedDraft() {
      for (var i = 0; i < state.drafts.length; i += 1) {
        if (state.drafts[i].id === state.selectedDraftId) return state.drafts[i];
      }
      return null;
    }

    function isDraftReadOnly() {
      var draft = selectedDraft();
      return !!draft && draft.status !== 'DRAFT';
    }

    function activeMetadataColumns() {
      var columns = selectedMetadataColumns().slice();
      var seen = {};
      columns.forEach(function (column) {
        if (column && column.id) seen[column.id] = true;
      });
      safeArray(state.draftDiff && state.draftDiff.newColumns).forEach(function (column) {
        if (!column || !column.id || seen[column.id]) return;
        seen[column.id] = true;
        columns.push({
          id: column.id,
          name: column.name,
          dataType: column.dataType,
          isRequired: !!column.isRequired,
          isSystemColumn: false
        });
      });
      return columns;
    }

    function filteredColumns() {
      var query = safeText(state.columnSearch).trim().toLowerCase();
      return selectedTableColumns().filter(function (column) {
        if (!query) return true;
        return safeText(column.name).toLowerCase().indexOf(query) >= 0 ||
          safeText(column.description).toLowerCase().indexOf(query) >= 0 ||
          safeText(columnTypeName(column)).toLowerCase().indexOf(query) >= 0;
      });
    }

    function productionMetadataValueEntry(column, metadataColumnId) {
      var values = safeArray(column && column.metadataValues);
      for (var i = 0; i < values.length; i += 1) {
        if (values[i].metadataColumnDefinitionId === metadataColumnId) return values[i];
      }
      return null;
    }

    function draftChangeMap() {
      var map = {};
      safeArray(state.draftDiff && state.draftDiff.changes).forEach(function (change) {
        if (!change || !change.columnId || !change.metadataColumnId) return;
        map[change.columnId] = map[change.columnId] || {};
        map[change.columnId][change.metadataColumnId] = change;
      });
      return map;
    }

    function metadataCellState(column, metadataColumn) {
      var change = draftChangeMap()[column.id] && draftChangeMap()[column.id][metadataColumn.id];
      if (change) {
        return {
          value: change.draftValue,
          displayValue: change.draftDisplayValue,
          type: change.metadataColumnDataType || metadataColumn.dataType,
          source: 'draft',
          changeType: change.changeType
        };
      }

      var productionEntry = productionMetadataValueEntry(column, metadataColumn.id);
      if (productionEntry) {
        return {
          value: productionEntry.value,
          displayValue: productionEntry.displayValue,
          type: productionEntry.type || metadataColumn.dataType,
          source: 'production',
          changeType: 'unchanged'
        };
      }

      return {
        value: null,
        displayValue: null,
        type: metadataColumn.dataType,
        source: 'empty',
        changeType: 'unchanged'
      };
    }

    function metadataValueCount(table) {
      var count = 0;
      safeArray(table && table.columns).forEach(function (column) {
        count += safeArray(column.metadataValues).length;
      });
      return count;
    }

    function formatDisplayDate(value) {
      if (!value) return '';
      var parsed = new Date(value);
      if (isNaN(parsed.getTime())) return String(value);
      return parsed.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }

    function metadataItemLabel(item) {
      if (item == null) return '';
      if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') return String(item);
      if (Array.isArray(item)) return item.map(metadataItemLabel).filter(Boolean).join(', ');
      if (typeof item === 'object') {
        return safeText(
          item.name ||
          item.title ||
          item.label ||
          item.columnName ||
          item.tableName ||
          item.functionName ||
          item.filePath ||
          item.id,
          ''
        );
      }
      return String(item);
    }

    function valueToEditorText(value, type) {
      if (value == null) return '';
      if (type === 'DATE') return String(value).slice(0, 10);
      if (type === 'MULTISELECT' && Array.isArray(value)) return value.join(', ');
      if (type === 'USER_REFERENCE' && typeof value === 'string') return value;
      if (typeof value === 'string') return value;
      if (Array.isArray(value)) return JSON.stringify(value, null, 2);
      if (typeof value === 'object') return JSON.stringify(value, null, 2);
      return String(value);
    }

    function parseEditorValue(rawValue, type) {
      var text = String(rawValue == null ? '' : rawValue);
      var trimmed = text.trim();

      if (type === 'DATE') return trimmed || null;
      if (type === 'MULTISELECT') {
        if (!trimmed) return [];
        return text.split(/[\n,]/).map(function (item) { return item.trim(); }).filter(Boolean);
      }
      if (type === 'USER_REFERENCE') return trimmed || null;
      if (type === 'COLUMN_REFERENCE' || type === 'CODE_REFERENCE' || type === 'KNOWLEDGE_DEX_REFERENCE' || type === 'DATA_LAKE_REFERENCE' || type === 'DOCUMENT_REFERENCE') {
        if (!trimmed) return [];
        try {
          return JSON.parse(text);
        } catch (_error) {
          return text.split(/[\n,]/).map(function (item) { return item.trim(); }).filter(Boolean);
        }
      }
      return trimmed ? text : null;
    }

    function editorHelpText(type) {
      if (type === 'DATE') return 'Use YYYY-MM-DD format.';
      if (type === 'MULTISELECT') return 'Enter comma-separated or line-separated values.';
      if (type === 'USER_REFERENCE') return 'Enter the Ludflow user ID for the owner you want to assign.';
      if (type === 'COLUMN_REFERENCE' || type === 'CODE_REFERENCE' || type === 'KNOWLEDGE_DEX_REFERENCE' || type === 'DATA_LAKE_REFERENCE' || type === 'DOCUMENT_REFERENCE') {
        return 'Enter JSON for structured values, or comma-separated IDs for simple reference lists.';
      }
      return 'Leave blank to clear this draft value.';
    }

    function renderMetadataValue(value, type, displayValue) {
      if (displayValue) {
        return el('div', 'lf-cell-text', String(displayValue));
      }

      if (value == null || value === '' || (Array.isArray(value) && !value.length)) {
        return el('div', 'lf-cell-muted', '—');
      }

      if (type === 'DATE') {
        return el('div', 'lf-cell-text', formatDisplayDate(value));
      }

      if (typeof value === 'boolean') {
        var booleanWrap = el('div', 'lf-cell-badges');
        booleanWrap.appendChild(el('span', 'lf-cell-badge ' + (value ? 'lf-cell-badge-success' : 'lf-cell-badge-muted'), value ? 'Yes' : 'No'));
        return booleanWrap;
      }

      if (Array.isArray(value)) {
        var listWrap = el('div', 'lf-cell-stack');
        var labels = value.map(metadataItemLabel).filter(Boolean);
        if (!labels.length) {
          listWrap.appendChild(el('div', 'lf-cell-muted', String(value.length) + ' linked item' + (value.length === 1 ? '' : 's')));
          return listWrap;
        }
        if (type === 'MULTISELECT' || value.every(function (item) { return typeof item === 'string' || typeof item === 'number'; })) {
          var tagList = el('div', 'lf-tag-list');
          labels.slice(0, 6).forEach(function (label) {
            tagList.appendChild(makeTag(label));
          });
          if (labels.length > 6) tagList.appendChild(makeTag('+' + (labels.length - 6) + ' more'));
          listWrap.appendChild(tagList);
          return listWrap;
        }
        labels.slice(0, 3).forEach(function (label) {
          listWrap.appendChild(el('div', 'lf-cell-text', label));
        });
        if (labels.length > 3) {
          listWrap.appendChild(el('div', 'lf-cell-muted', '+' + (labels.length - 3) + ' more'));
        }
        return listWrap;
      }

      if (typeof value === 'object') {
        var objectLabel = metadataItemLabel(value);
        if (objectLabel) return el('div', 'lf-cell-text', objectLabel);
        return el('div', 'lf-cell-code', JSON.stringify(value));
      }

      if (type === 'COLUMN_REFERENCE' || type === 'KNOWLEDGE_DEX_REFERENCE' || type === 'DATA_LAKE_REFERENCE') {
        return el('div', 'lf-cell-code', String(value));
      }

      return el('div', 'lf-cell-text', String(value));
    }

    function ensureSelections() {
      var matchedTable = null;
      if (state.selectedTableId) {
        for (var tableIndex = 0; tableIndex < state.tables.length; tableIndex += 1) {
          if (state.tables[tableIndex].id === state.selectedTableId) {
            matchedTable = state.tables[tableIndex];
            break;
          }
        }
      }
      if (!matchedTable && state.selectedColumnId) {
        for (var ownerIndex = 0; ownerIndex < state.tables.length; ownerIndex += 1) {
          if (safeArray(state.tables[ownerIndex].columns).some(function (column) { return column.id === state.selectedColumnId; })) {
            matchedTable = state.tables[ownerIndex];
            state.selectedTableId = matchedTable.id;
            break;
          }
        }
      }
      if (matchedTable) {
        var matchedSource = tableDataSource(matchedTable);
        state.selectedDataSourceId = matchedSource.id || matchedTable.dataSourceId || matchedTable.data_source_id || state.selectedDataSourceId;
      }

      var sources = dataSources();
      if (state.selectedDataSourceId && !sources.some(function (source) { return source.id === state.selectedDataSourceId; })) {
        state.selectedDataSourceId = null;
      }
      if (!state.selectedDataSourceId && sources.length) {
        state.selectedDataSourceId = sources[0].id;
      }
      var tables = visibleTables();
      if (state.selectedTableId && !tables.some(function (table) { return table.id === state.selectedTableId; })) {
        state.selectedTableId = null;
      }
      if (!state.selectedTableId && tables.length) {
        state.selectedTableId = tables[0].id;
      }
      var columns = selectedTableColumns();
      if (state.selectedColumnId && !columns.some(function (column) { return column.id === state.selectedColumnId; })) {
        state.selectedColumnId = null;
        state.columnContext = null;
      }
    }

    function resetDraftState() {
      state.selectedDraftId = null;
      state.drafts = [];
      state.draftDiff = null;
      state.draftsLoading = false;
      state.draftDiffLoading = false;
      state.draftActionLoading = false;
      state.draftCreateModal = {
        open: false,
        title: '',
        description: ''
      };
      state.draftProposeModalOpen = false;
      state.cellEditor = null;
    }

    function refreshDraftDiff(silent) {
      if (!state.selectedDraftId) {
        state.draftDiff = null;
        state.draftDiffLoading = false;
        if (!silent) render();
        return Promise.resolve(null);
      }

      state.draftDiffLoading = true;
      if (!silent) render();
      return callTool('manage_data_draft', withOrg(state, {
        action: 'get_diff',
        draft_id: state.selectedDraftId
      }))
        .then(function (payload) {
          state.draftDiff = payload.data || payload;
          state.draftDiffLoading = false;
          render();
          return state.draftDiff;
        })
        .catch(function (error) {
          state.draftDiffLoading = false;
          state.error = error.message || 'Failed to load draft changes.';
          render();
          return null;
        });
    }

    function refreshDrafts(silent) {
      if (!state.selectedTableId || !orgHasToken(state)) {
        resetDraftState();
        if (!silent) render();
        return Promise.resolve([]);
      }

      state.draftsLoading = true;
      if (!silent) render();
      return callTool('manage_data_draft', withOrg(state, {
        action: 'list_drafts',
        table_id: state.selectedTableId
      }))
        .then(function (payload) {
          var info = payload.data || payload;
          state.drafts = safeArray(info.drafts || info);
          state.draftsLoading = false;
          if (state.selectedDraftId && !state.drafts.some(function (draft) { return draft.id === state.selectedDraftId; })) {
            state.selectedDraftId = null;
            state.draftDiff = null;
            state.cellEditor = null;
            state.draftProposeModalOpen = false;
          }
          render();
          if (state.selectedDraftId) return refreshDraftDiff(true);
          return state.drafts;
        })
        .catch(function (error) {
          state.draftsLoading = false;
          state.error = error.message || 'Failed to load table drafts.';
          render();
          return [];
        });
    }

    function selectDraft(draftId) {
      state.selectedDraftId = draftId || null;
      state.cellEditor = null;
      state.draftProposeModalOpen = false;
      if (!state.selectedDraftId) {
        state.draftDiff = null;
        render();
        return;
      }
      render();
      refreshDraftDiff(true);
    }

    function openDraftEditor(column, metadataColumn) {
      if (!state.selectedDraftId || isDraftReadOnly()) return;
      var cell = metadataCellState(column, metadataColumn);
      state.cellEditor = {
        columnId: column.id,
        columnName: column.name || 'Unnamed field',
        metadataColumnId: metadataColumn.id,
        metadataColumnName: metadataColumn.name || 'Metadata',
        dataType: metadataColumn.dataType || cell.type || 'TEXT',
        value: valueToEditorText(cell.value, metadataColumn.dataType || cell.type || 'TEXT'),
        error: ''
      };
      render();
    }

    function saveDraftEditorValue() {
      if (!state.cellEditor || !state.selectedDraftId) return;

      var parsedValue;
      try {
        parsedValue = parseEditorValue(state.cellEditor.value, state.cellEditor.dataType);
      } catch (error) {
        state.cellEditor.error = error.message || 'Invalid value.';
        render();
        return;
      }

      state.draftActionLoading = true;
      state.cellEditor.error = '';
      render();
      callTool('manage_data_draft', withOrg(state, {
        action: 'set_value',
        draft_id: state.selectedDraftId,
        column_id: state.cellEditor.columnId,
        metadata_column_id: state.cellEditor.metadataColumnId,
        value: parsedValue
      }))
        .then(function () {
          state.draftActionLoading = false;
          state.notice = {
            kind: 'success',
            text: 'Updated draft value for ' + safeText(state.cellEditor.metadataColumnName, 'metadata field') + '.'
          };
          state.cellEditor = null;
          return refreshDraftDiff(true);
        })
        .catch(function (error) {
          state.draftActionLoading = false;
          if (state.cellEditor) state.cellEditor.error = error.message || 'Failed to update draft value.';
          render();
        });
    }

    function createDraft() {
      if (!state.selectedTableId) return;
      state.draftActionLoading = true;
      state.error = '';
      render();
      callTool('manage_data_draft', withOrg(state, {
        action: 'create',
        table_id: state.selectedTableId,
        title: safeText(state.draftCreateModal.title).trim() || undefined,
        description: safeText(state.draftCreateModal.description).trim() || undefined
      }))
        .then(function (payload) {
          var info = payload.data || payload;
          state.notice = {
            kind: 'success',
            text: 'Created draft "' + safeText(info.title, 'Untitled Draft') + '".'
          };
          state.draftActionLoading = false;
          state.draftCreateModal = { open: false, title: '', description: '' };
          state.selectedDraftId = info.id || null;
          return refreshDrafts(true);
        })
        .then(function () {
          if (state.selectedDraftId) return refreshDraftDiff(true);
          return null;
        })
        .catch(function (error) {
          state.draftActionLoading = false;
          state.error = error.message || 'Failed to create draft.';
          render();
        });
    }

    function openProposeDraftModal() {
      if (!state.selectedDraftId) return;
      state.draftProposeModalOpen = true;
      render();
      refreshDraftDiff(true);
    }

    function promoteDraft() {
      if (!state.selectedDraftId) return;
      state.draftActionLoading = true;
      state.error = '';
      render();
      callTool('manage_data_draft', withOrg(state, {
        action: 'propose',
        draft_id: state.selectedDraftId
      }))
        .then(function () {
          state.notice = {
            kind: 'success',
            text: 'Promoted draft for review in Ludflow.'
          };
          state.draftActionLoading = false;
          state.draftProposeModalOpen = false;
          return refreshDrafts(true);
        })
        .then(function () {
          return refreshDraftDiff(true);
        })
        .catch(function (error) {
          state.draftActionLoading = false;
          state.error = error.message || 'Failed to promote draft.';
          render();
        });
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
        fetchPagedCollection('get_data_schema', withOrg(state, {
          format: 'full',
          include_metadata: true,
          include_values: true
        }), {
          limit: 500,
          extract: function (payload) {
            var data = payload.data || payload;
            return data.tables || data;
          }
        }),
        fetchPagedCollection('get_business_concepts', withOrg(state, {
          format: 'full',
          include_mappings: true
        }), {
          limit: 500,
          extract: function (payload) {
            var data = payload.data || payload;
            return data.concepts || data;
          }
        }),
        callTool('manage_knowledge_entries', withOrg(state, {
          action: 'list',
          include_metadata: true
        })),
        callTool('manage_knowledge_metadata', withOrg(state, {
          action: 'list_columns'
        }))
      ])
        .then(function (results) {
          state.tables = safeArray(results[0]);
          state.orgConcepts = rootOrganizationConcepts(safeArray(results[1]));

          var entryPayload = results[2].data || results[2];
          state.personalEntries = safeArray(entryPayload.entries || entryPayload);

          var metadataPayload = results[3].data || results[3];
          state.personalMetadataColumns = safeArray(metadataPayload.columns || []);

          ensureSelections();
          state.loading = false;
          state.initializing = false;
          render();
          prefetchPersonalMappings();

          var tasks = [];
          if (state.selectedTableId) tasks.push(refreshDrafts(true));
          else resetDraftState();
          if (state.selectedColumnId) tasks.push(loadColumnContext(state.selectedColumnId, true));
          return Promise.all(tasks);
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

    function renderGovernanceBanner(kind, title, copy, actionsBuilder) {
      var banner = el('section', 'lf-status-banner lf-status-banner-' + kind);
      banner.appendChild(el('div', 'lf-status-banner-title', title));
      banner.appendChild(el('div', 'lf-status-banner-copy', copy));
      if (actionsBuilder) {
        var actions = el('div', 'lf-status-banner-actions');
        actionsBuilder(actions);
        if (actions.childNodes.length) banner.appendChild(actions);
      }
      return banner;
    }

    function renderGovernanceCell(column, metadataColumn) {
      var cellState = metadataCellState(column, metadataColumn);
      var wrap = el('div', 'lf-cell-stack');
      wrap.appendChild(renderMetadataValue(cellState.value, cellState.type, cellState.displayValue));

      if (cellState.source === 'draft') {
        wrap.appendChild(el('div', 'lf-cell-change-note', cellState.changeType === 'added' ? 'Draft-only value' : 'Modified in draft'));
      }

      if (state.selectedDraftId && !isDraftReadOnly()) {
        var actionWrap = el('div', 'lf-cell-action');
        var editButton = createMiniButton(cellState.value == null || cellState.value === '' ? 'Set value' : 'Edit');
        editButton.addEventListener('click', function (event) {
          event.stopPropagation();
          openDraftEditor(column, metadataColumn);
        });
        actionWrap.appendChild(editButton);
        wrap.appendChild(actionWrap);
      }

      return wrap;
    }

    function renderGovernanceMain(main) {
      if (!state.selectedDataSourceId) {
        renderEmptyScreen(main, 'Select a data source to get started', 'Choose a data source from the left rail to browse its governed tables.');
        return;
      }
      if (!state.selectedTableId) {
        renderEmptyScreen(main, 'Select a table to view metadata', 'Choose a table from the current data source to open its production metadata view.');
        return;
      }

      var table = selectedTable();
      var source = tableDataSource(table);
      var metadataColumns = activeMetadataColumns();
      var visibleColumnRows = filteredColumns();
      var draft = selectedDraft();
      var draftSummary = state.draftDiff && state.draftDiff.summary ? state.draftDiff.summary : null;
      var draftChangeCount = draftSummary ? Number(draftSummary.added || 0) + Number(draftSummary.modified || 0) + Number(draftSummary.newColumns || 0) : 0;

      var panel = el('div', 'lf-panel-stack');
      main.appendChild(panel);

      var hero = el('section', 'lf-hero-card');
      panel.appendChild(hero);

      var heroTop = el('div', 'lf-hero-top');
      hero.appendChild(heroTop);

      var intro = el('div');
      intro.appendChild(el('div', 'lf-hero-title', table.name || 'Table'));
      intro.appendChild(el('div', 'lf-hero-copy', safeArray(table.columns).length + ' column' + (safeArray(table.columns).length === 1 ? '' : 's') + ' across ' + metadataColumns.length + ' metadata field' + (metadataColumns.length === 1 ? '' : 's') + '.'));
      heroTop.appendChild(intro);

      var headerControls = el('div', 'lf-toolbar-group');
      var draftSelect = createSelect(
        [{ value: '', label: 'Production (Live)' }].concat(state.drafts.map(function (item) {
          return {
            value: item.id,
            label: (item.title || 'Untitled Draft') + ' • ' + safeText(item.status, 'DRAFT')
          };
        })),
        state.selectedDraftId || ''
      );
      draftSelect.disabled = state.draftsLoading || !state.selectedTableId;
      draftSelect.addEventListener('change', function () {
        selectDraft(draftSelect.value || null);
      });
      headerControls.appendChild(draftSelect);
      var createDraftButton = createButton(state.draftActionLoading && state.draftCreateModal.open ? 'Creating...' : 'Create Draft', '', function () {
        state.draftCreateModal.open = true;
        render();
      });
      createDraftButton.disabled = !state.selectedTableId || state.draftActionLoading;
      headerControls.appendChild(createDraftButton);
      heroTop.appendChild(headerControls);

      var chips = el('div', 'lf-chip-row');
      chips.appendChild(makeChip(source.sourceType || source.source_type || 'Data Source'));
      chips.appendChild(makeChip(draft ? 'Draft Workspace' : 'Production Metadata'));
      chips.appendChild(makeChip(safeText(source.name, 'Data Source')));
      if (draft) chips.appendChild(makeChip(safeText(draft.status, 'DRAFT')));
      hero.appendChild(chips);

      var statRow = el('div', 'lf-stat-row');
      statRow.appendChild(el('div', 'lf-stat-pill lf-stat-pill-strong', safeArray(table.columns).length + ' fields'));
      statRow.appendChild(el('div', 'lf-stat-pill', metadataColumns.length + ' metadata columns'));
      statRow.appendChild(el('div', 'lf-stat-pill', metadataValueCount(table) + ' populated values'));
      statRow.appendChild(el('div', 'lf-stat-pill', 'Source: ' + safeText(source.name, 'Unknown')));
      if (draft) {
        statRow.appendChild(el('div', 'lf-stat-pill lf-stat-pill-strong', draftChangeCount + ' pending draft change' + (draftChangeCount === 1 ? '' : 's')));
      }
      hero.appendChild(statRow);

      if (!draft) {
        panel.appendChild(renderGovernanceBanner(
          'brand',
          'Production metadata (read-only)',
          'This mirrors Ludflow’s governance workflow. Create a draft to make changes, then promote it for review when you are ready.',
          function (actions) {
            var button = createButton('Create Draft', 'primary', function () {
              state.draftCreateModal.open = true;
              render();
            });
            button.disabled = !state.selectedTableId || state.draftActionLoading;
            actions.appendChild(button);
          }
        ));
      } else if (draft.status === 'DRAFT') {
        panel.appendChild(renderGovernanceBanner(
          'brand',
          'Editing Draft: ' + safeText(draft.title, 'Untitled Draft'),
          safeText(draft.description, 'Changes in this draft stay isolated from production until they are promoted for review in Ludflow.'),
          function (actions) {
            var promoteButton = createButton(state.draftActionLoading ? 'Promoting...' : 'Promote Draft', 'primary', openProposeDraftModal);
            promoteButton.disabled = state.draftActionLoading || state.draftDiffLoading;
            actions.appendChild(promoteButton);
            actions.appendChild(createButton('Exit Draft', '', function () {
              selectDraft(null);
            }));
          }
        ));
      } else if (draft.status === 'PROPOSED') {
        panel.appendChild(renderGovernanceBanner(
          'warning',
          'Draft Pending Review',
          'This draft is read-only here until it is reviewed in the main Ludflow app.',
          function (actions) {
            actions.appendChild(createButton('Exit Draft', '', function () {
              selectDraft(null);
            }));
          }
        ));
      } else {
        panel.appendChild(renderGovernanceBanner(
          'error',
          'Draft Status: ' + safeText(draft.status, 'Unknown'),
          'This draft is currently read-only in MCP Views. Continue its lifecycle from the full Ludflow application.',
          function (actions) {
            actions.appendChild(createButton('Exit Draft', '', function () {
              selectDraft(null);
            }));
          }
        ));
      }

      var metadataCard = el('section', 'lf-metadata-card');
      panel.appendChild(metadataCard);

      var toolbar = el('div', 'lf-metadata-toolbar');
      toolbar.appendChild(el('div', 'lf-metadata-toolbar-copy', draft
        ? 'You are viewing draft-aware values overlaid on top of production metadata. Edit cells to update the selected draft.'
        : (metadataColumns.length
          ? 'Scroll horizontally to inspect dynamic metadata columns.'
          : 'No metadata columns are defined for this table yet. The fixed schema fields still match Ludflow’s table layout.')));
      var toolbarRight = el('div', 'lf-metadata-toolbar-right');
      toolbarRight.appendChild(el('div', 'lf-toolbar-badge', draft
        ? (isDraftReadOnly() ? 'Draft is read-only' : 'Draft is editable')
        : 'Production view'));
      toolbarRight.appendChild(el('div', 'lf-toolbar-badge', state.selectedColumnId ? 'Context loaded' : 'Click row for context'));
      if (draft) {
        toolbarRight.appendChild(el('div', 'lf-toolbar-badge', draftChangeCount + ' changes'));
      }
      var search = createInput('text', state.columnSearch, 'Filter fields');
      search.style.width = '220px';
      search.addEventListener('input', function () {
        state.columnSearch = search.value;
        render();
      });
      toolbarRight.appendChild(search);
      toolbar.appendChild(toolbarRight);
      metadataCard.appendChild(toolbar);

      var schemaWrap = el('div', 'lf-table-scroll');
      metadataCard.appendChild(schemaWrap);
      var schemaTable = el('table', 'lf-table');
      schemaWrap.appendChild(schemaTable);
      var head = document.createElement('thead');
      var headRow = document.createElement('tr');
      ['Field Name', 'Data Type', 'Nullable', 'PK']
        .concat(metadataColumns.map(function (column) { return column.name; }))
        .forEach(function (label) {
          var th = document.createElement('th');
          th.textContent = label;
          headRow.appendChild(th);
        });
      head.appendChild(headRow);
      schemaTable.appendChild(head);

      var body = document.createElement('tbody');
      schemaTable.appendChild(body);

      if (!visibleColumnRows.length) {
        var emptyRow = document.createElement('tr');
        var emptyCell = document.createElement('td');
        emptyCell.colSpan = 4 + metadataColumns.length;
        emptyCell.className = 'lf-empty-table';
        emptyCell.textContent = 'No fields match the current filter.';
        emptyRow.appendChild(emptyCell);
        body.appendChild(emptyRow);
      }

      visibleColumnRows.forEach(function (column) {
        var row = document.createElement('tr');
        row.className = 'lf-meta-row' + (column.id === state.selectedColumnId ? ' lf-table-row-selected' : '');
        row.addEventListener('click', function () {
          loadColumnContext(column.id);
        });

        var nameCell = document.createElement('td');
        nameCell.appendChild(el('div', 'lf-field-name', column.name || 'Unnamed field'));
        if (column.description) nameCell.appendChild(el('div', 'lf-field-copy', column.description));
        row.appendChild(nameCell);

        var typeCell = document.createElement('td');
        typeCell.appendChild(el('span', 'lf-cell-code', columnTypeName(column)));
        row.appendChild(typeCell);

        var nullableCell = document.createElement('td');
        var nullableBadges = el('div', 'lf-cell-badges');
        nullableBadges.appendChild(el('span', 'lf-cell-badge ' + (column.nullable ? 'lf-cell-badge-muted' : 'lf-cell-badge-success'), column.nullable ? 'Yes' : 'No'));
        nullableCell.appendChild(nullableBadges);
        row.appendChild(nullableCell);

        var pkCell = document.createElement('td');
        if (column.isPrimaryKey || column.is_primary_key) {
          var pkBadges = el('div', 'lf-cell-badges');
          pkBadges.appendChild(el('span', 'lf-cell-badge lf-cell-badge-brand', 'Primary'));
          pkCell.appendChild(pkBadges);
        } else {
          pkCell.appendChild(el('div', 'lf-cell-muted', '—'));
        }
        row.appendChild(pkCell);

        metadataColumns.forEach(function (metadataColumn) {
          var metaCell = document.createElement('td');
          metaCell.appendChild(renderGovernanceCell(column, metadataColumn));
          row.appendChild(metaCell);
        });

        body.appendChild(row);
      });

      if (state.contextLoading || state.columnContext || state.selectedColumnId) {
        var contextCard = el('section', 'lf-context-card');
        panel.appendChild(contextCard);

        var contextHeader = el('div', 'lf-context-header');
        contextHeader.appendChild(el('div', 'lf-sidebar-title', state.contextLoading ? 'Column Context' : 'Field Context'));
        var contextHeaderActions = el('div', 'lf-chip-row');
        if (state.selectedColumnId) contextHeaderActions.appendChild(makeChip('Selected field'));
        if (state.selectedColumnId) {
          contextHeaderActions.appendChild(createMiniButton('Clear', function () {
            state.selectedColumnId = null;
            state.columnContext = null;
            render();
          }));
        }
        contextHeader.appendChild(contextHeaderActions);
        contextCard.appendChild(contextHeader);

        var contextBody = el('div', 'lf-context-body');
        contextCard.appendChild(contextBody);
        if (state.contextLoading) {
          contextBody.appendChild(el('div', 'lf-cell-muted', 'Fetching business concepts, linked documents, and cross-column relationships...'));
        } else if (state.columnContext && window.__renderers.column_context) {
          window.__renderers.column_context(contextBody, state.columnContext, {}, {}, false, function () {});
        } else if (state.columnContext) {
          contextBody.appendChild(renderMarkdownNode('`' + safeText(state.columnContext.column && state.columnContext.column.name, 'field') + '` loaded.'));
        } else {
          contextBody.appendChild(el('div', 'lf-cell-muted', 'Select a field row to inspect its deeper governed context.'));
        }
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

      var sourceRail = el('aside', 'lf-rail ' + (state.dataSourcesCollapsed ? 'lf-rail-collapsed' : 'lf-source-rail'));
      layout.appendChild(sourceRail);
      if (state.dataSourcesCollapsed) {
        var collapsedSources = el('div', 'lf-collapsed-rail');
        var expandSources = el('button', 'lf-panel-toggle', '>');
        expandSources.type = 'button';
        expandSources.addEventListener('click', function () {
          state.dataSourcesCollapsed = false;
          render();
        });
        collapsedSources.appendChild(expandSources);
        collapsedSources.appendChild(el('div', 'lf-vertical-label', 'Browse'));
        sourceRail.appendChild(collapsedSources);
      } else {
        var sourceHeader = el('div', 'lf-sidebar-header');
        sourceHeader.appendChild(el('div', 'lf-sidebar-title', 'Browse'));
        var collapseSources = el('button', 'lf-panel-toggle', '<');
        collapseSources.type = 'button';
        collapseSources.addEventListener('click', function () {
          state.dataSourcesCollapsed = true;
          render();
        });
        sourceHeader.appendChild(collapseSources);
        sourceRail.appendChild(sourceHeader);

        var sourceBody = el('div', 'lf-rail-body');
        sourceRail.appendChild(sourceBody);
        var railStack = el('div', 'lf-stacked-rail');
        sourceBody.appendChild(railStack);

        var sourceSection = el('section', 'lf-rail-section');
        railStack.appendChild(sourceSection);
        sourceSection.appendChild(el('div', 'lf-rail-section-title', 'Data Sources'));
        sourceSection.appendChild(el('div', 'lf-rail-section-copy', 'Choose a data source, then select one of its tables below.'));

        if (!dataSources().length) {
          sourceSection.appendChild(el('div', 'lf-list-subtitle', 'No data sources are available for this organization.'));
        } else {
          var sourceList = el('div', 'lf-list');
          dataSources().forEach(function (source) {
            var button = el('button', 'lf-list-button' + (source.id === state.selectedDataSourceId ? ' lf-list-button-active' : ''));
            button.type = 'button';
            button.addEventListener('click', function () {
              state.selectedDataSourceId = source.id;
              state.selectedTableId = null;
              state.selectedColumnId = null;
              state.columnContext = null;
              state.tableSearch = '';
              resetDraftState();
              ensureSelections();
              render();
              refreshDrafts(true);
            });
            button.appendChild(el('div', 'lf-list-title', source.name));
            button.appendChild(el('div', 'lf-list-subtitle', source.sourceType + ' • ' + source.tableCount + ' tables'));
            sourceList.appendChild(button);
          });
          sourceSection.appendChild(sourceList);
        }

        var tablesSection = el('section', 'lf-rail-section');
        railStack.appendChild(tablesSection);
        tablesSection.appendChild(el('div', 'lf-rail-section-title', 'Tables'));

        if (!state.selectedDataSourceId) {
          tablesSection.appendChild(el('div', 'lf-rail-section-copy', 'Select a data source to load its tables.'));
        } else {
          tablesSection.appendChild(el('div', 'lf-rail-section-copy', 'Filtered to ' + safeText(tableDataSource(selectedTable() || visibleTables()[0] || {}).name, 'the selected data source') + '.'));

          var search = createInput('text', state.tableSearch, 'Filter tables');
          search.addEventListener('input', function () {
            state.tableSearch = search.value;
            state.selectedColumnId = null;
            state.columnContext = null;
            ensureSelections();
            render();
          });
          tablesSection.appendChild(search);

          var tableList = el('div', 'lf-list');
          tablesSection.appendChild(tableList);
          if (!visibleTables().length) {
            tableList.appendChild(el('div', 'lf-list-subtitle', 'No tables match this filter.'));
          } else {
            visibleTables().forEach(function (table) {
              var button = el('button', 'lf-list-button' + (table.id === state.selectedTableId ? ' lf-list-button-active' : ''));
              button.type = 'button';
              button.addEventListener('click', function () {
                state.selectedTableId = table.id;
                state.selectedColumnId = null;
                state.columnContext = null;
                state.columnSearch = '';
                resetDraftState();
                render();
                refreshDrafts(true);
              });
              button.appendChild(el('div', 'lf-list-title', table.name || 'Untitled table'));
              button.appendChild(el('div', 'lf-list-subtitle', safeArray(table.columns).length + ' columns • ' + safeArray(table.metadataColumns || table.metadata_columns).length + ' metadata fields'));
              tableList.appendChild(button);
            });
          }
        }
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

      if (state.draftCreateModal.open) {
        var draftCreateBackdrop = el('div', 'lf-modal-backdrop');
        draftCreateBackdrop.addEventListener('click', function (event) {
          if (event.target === draftCreateBackdrop && !state.draftActionLoading) {
            state.draftCreateModal = { open: false, title: '', description: '' };
            render();
          }
        });
        var draftCreateModal = el('div', 'lf-modal');
        draftCreateBackdrop.appendChild(draftCreateModal);

        var draftCreateHeader = el('div', 'lf-modal-header');
        draftCreateHeader.appendChild(el('div', 'lf-modal-title', 'Create Draft'));
        draftCreateModal.appendChild(draftCreateHeader);

        var draftCreateBody = el('div', 'lf-modal-body');
        draftCreateModal.appendChild(draftCreateBody);
        draftCreateBody.appendChild(el('div', 'lf-modal-copy', 'Create a draft for ' + safeText(selectedTable() && selectedTable().name, 'this table') + '. Draft changes stay isolated from production until they are promoted for review.'));

        var draftCreateGrid = el('div', 'lf-grid-1');
        draftCreateBody.appendChild(draftCreateGrid);

        var draftTitleStack = el('label', 'lf-label-stack');
        draftTitleStack.appendChild(el('span', 'lf-label', 'Title'));
        var draftTitleInput = createInput('text', state.draftCreateModal.title, 'e.g. Q2 metadata refresh');
        draftTitleInput.addEventListener('input', function () {
          state.draftCreateModal.title = draftTitleInput.value;
        });
        draftTitleStack.appendChild(draftTitleInput);
        draftCreateGrid.appendChild(draftTitleStack);

        var draftDescriptionStack = el('label', 'lf-label-stack');
        draftDescriptionStack.appendChild(el('span', 'lf-label', 'Description'));
        var draftDescriptionInput = createTextarea(state.draftCreateModal.description, 'Describe the draft you want to create...');
        draftDescriptionInput.className = 'lf-textarea';
        draftDescriptionInput.style.minHeight = '140px';
        draftDescriptionInput.addEventListener('input', function () {
          state.draftCreateModal.description = draftDescriptionInput.value;
        });
        draftDescriptionStack.appendChild(draftDescriptionInput);
        draftCreateGrid.appendChild(draftDescriptionStack);

        var draftCreateFooter = el('div', 'lf-modal-footer');
        draftCreateFooter.appendChild(createButton('Cancel', '', function () {
          if (state.draftActionLoading) return;
          state.draftCreateModal = { open: false, title: '', description: '' };
          render();
        }));
        var submitDraftButton = createButton(state.draftActionLoading ? 'Creating...' : 'Create Draft', 'primary', createDraft);
        submitDraftButton.disabled = state.draftActionLoading;
        draftCreateFooter.appendChild(submitDraftButton);
        draftCreateModal.appendChild(draftCreateFooter);
        root.appendChild(draftCreateBackdrop);
      }

      if (state.draftProposeModalOpen) {
        var draftProposeBackdrop = el('div', 'lf-modal-backdrop');
        draftProposeBackdrop.addEventListener('click', function (event) {
          if (event.target === draftProposeBackdrop && !state.draftActionLoading) {
            state.draftProposeModalOpen = false;
            render();
          }
        });
        var draftProposeModal = el('div', 'lf-modal');
        draftProposeBackdrop.appendChild(draftProposeModal);

        var draftProposeHeader = el('div', 'lf-modal-header');
        draftProposeHeader.appendChild(el('div', 'lf-modal-title', 'Promote Draft for Review'));
        draftProposeModal.appendChild(draftProposeHeader);

        var draftProposeBody = el('div', 'lf-modal-body');
        draftProposeModal.appendChild(draftProposeBody);
        if (state.draftDiffLoading) {
          draftProposeBody.appendChild(el('div', 'lf-modal-copy', 'Loading draft changes...'));
        } else {
          var diff = state.draftDiff;
          var summary = diff && diff.summary ? diff.summary : { added: 0, modified: 0, newColumns: 0 };
          var totalChanges = Number(summary.added || 0) + Number(summary.modified || 0) + Number(summary.newColumns || 0);
          draftProposeBody.appendChild(el('div', 'lf-modal-copy', totalChanges
            ? 'Review the changes below before promoting this draft. After promotion, the draft becomes read-only in MCP Views until it is reviewed in Ludflow.'
            : 'This draft does not have any pending changes yet.'));
          if (totalChanges) {
            draftProposeBody.appendChild(el('div', 'lf-toolbar-badge', totalChanges + ' total change' + (totalChanges === 1 ? '' : 's')));
          }
          var diffList = el('div', 'lf-diff-list');
          draftProposeBody.appendChild(diffList);
          safeArray(diff && diff.changes).slice(0, 8).forEach(function (change) {
            var item = el('div', 'lf-diff-item');
            item.appendChild(el('div', 'lf-diff-item-title', safeText(change.columnName, 'Field') + ' / ' + safeText(change.metadataColumnName, 'Metadata')));
            item.appendChild(el('div', 'lf-diff-item-copy', (change.changeType === 'added' ? 'Added' : 'Modified') + ' draft value'));
            diffList.appendChild(item);
          });
          if (safeArray(diff && diff.newColumns).length) {
            safeArray(diff.newColumns).forEach(function (column) {
              var item = el('div', 'lf-diff-item');
              item.appendChild(el('div', 'lf-diff-item-title', safeText(column.name, 'New metadata column')));
              item.appendChild(el('div', 'lf-diff-item-copy', 'New metadata column • ' + safeText(column.dataType, 'TEXT')));
              diffList.appendChild(item);
            });
          }
          if (!totalChanges) {
            diffList.appendChild(el('div', 'lf-help', 'Make at least one draft edit before promoting this draft.'));
          } else if ((safeArray(diff && diff.changes).length || 0) > 8) {
            diffList.appendChild(el('div', 'lf-help', '+' + (safeArray(diff.changes).length - 8) + ' more field changes'));
          }
        }

        var draftProposeFooter = el('div', 'lf-modal-footer');
        draftProposeFooter.appendChild(createButton('Cancel', '', function () {
          if (state.draftActionLoading) return;
          state.draftProposeModalOpen = false;
          render();
        }));
        var canPromoteDraft = !!state.draftDiff && (
          Number(state.draftDiff.summary && state.draftDiff.summary.added || 0) +
          Number(state.draftDiff.summary && state.draftDiff.summary.modified || 0) +
          Number(state.draftDiff.summary && state.draftDiff.summary.newColumns || 0)
        ) > 0;
        var promoteButton = createButton(state.draftActionLoading ? 'Promoting...' : 'Promote Draft', 'primary', promoteDraft);
        promoteButton.disabled = state.draftActionLoading || state.draftDiffLoading || !canPromoteDraft;
        draftProposeFooter.appendChild(promoteButton);
        draftProposeModal.appendChild(draftProposeFooter);
        root.appendChild(draftProposeBackdrop);
      }

      if (state.cellEditor) {
        var editorBackdrop = el('div', 'lf-modal-backdrop');
        editorBackdrop.addEventListener('click', function (event) {
          if (event.target === editorBackdrop && !state.draftActionLoading) {
            state.cellEditor = null;
            render();
          }
        });
        var editorModal = el('div', 'lf-modal');
        editorBackdrop.appendChild(editorModal);

        var editorHeader = el('div', 'lf-modal-header');
        editorHeader.appendChild(el('div', 'lf-modal-title', 'Edit Draft Value'));
        editorModal.appendChild(editorHeader);

        var editorBody = el('div', 'lf-modal-body');
        editorModal.appendChild(editorBody);
        editorBody.appendChild(el('div', 'lf-modal-copy', safeText(state.cellEditor.columnName, 'Field') + ' / ' + safeText(state.cellEditor.metadataColumnName, 'Metadata field')));
        editorBody.appendChild(el('div', 'lf-help', 'Type: ' + safeText(state.cellEditor.dataType, 'TEXT') + '. ' + editorHelpText(state.cellEditor.dataType)));

        if (state.cellEditor.dataType === 'DATE') {
          var dateStack = el('label', 'lf-label-stack');
          dateStack.appendChild(el('span', 'lf-label', 'Value'));
          var dateInput = createInput('date', state.cellEditor.value, '');
          dateInput.addEventListener('input', function () {
            state.cellEditor.value = dateInput.value;
          });
          dateStack.appendChild(dateInput);
          editorBody.appendChild(dateStack);
        } else {
          var valueStack = el('label', 'lf-label-stack');
          valueStack.appendChild(el('span', 'lf-label', 'Value'));
          var valueInput = createTextarea(state.cellEditor.value, 'Enter the draft value...');
          valueInput.className = 'lf-textarea lf-value-editor';
          if (state.cellEditor.dataType !== 'TEXT') valueInput.className += ' lf-cell-input-mono';
          valueInput.addEventListener('input', function () {
            state.cellEditor.value = valueInput.value;
          });
          valueStack.appendChild(valueInput);
          editorBody.appendChild(valueStack);
        }

        if (state.cellEditor.error) {
          editorBody.appendChild(createNotice('error', state.cellEditor.error));
        }

        var editorFooter = el('div', 'lf-modal-footer');
        editorFooter.appendChild(createButton('Cancel', '', function () {
          if (state.draftActionLoading) return;
          state.cellEditor = null;
          render();
        }));
        var saveValueButton = createButton(state.draftActionLoading ? 'Saving...' : 'Save Value', 'primary', saveDraftEditorValue);
        saveValueButton.disabled = state.draftActionLoading;
        editorFooter.appendChild(saveValueButton);
        editorModal.appendChild(editorFooter);
        root.appendChild(editorBackdrop);
      }
    }

    function render() {
      renderWorkspaceShell(container, state, {
        activeNav: 'governance',
        onRefresh: refreshData,
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
          resetDraftState();
          refreshData();
        }
      }, renderBody, renderOverlay);
    }

    observeHostTheme(container, state, render);

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
