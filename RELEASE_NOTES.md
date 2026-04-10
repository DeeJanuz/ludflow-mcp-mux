# v0.5.2

## Standalone Ludflow Pages

- **feat**: Add launcher-visible standalone Ludflow renderers for `Documents`, `Data Governance`, and `Knowledge Dex`
- **feat**: Adapt Ludflow's core documents, governance, and Knowledge Dex workflows into MCP-backed companion pages that run inside MCP Views
- **feat**: Add app-launcher metadata and documentation for the new standalone renderer entry points
- **feat**: Add document publish and unpublish controls to the standalone Documents workspace
- **feat**: Add draft-aware metadata editing, draft creation, and draft promotion flows to the standalone Data Governance workspace
- **feat**: Add an organization settings shortcut in the standalone header that opens Ludflow for the currently selected org
- **fix**: Sync standalone renderer theming with the host MCP Views light/dark mode instead of maintaining a separate in-renderer theme toggle

# v0.5.1

## Multi-Org Auth

- **fix**: Add active top-level `plugin_rules` and `tool_rules` so MCPViews actually injects Ludflow's multi-org auth guidance into sessions instead of only showing it in registry metadata
- **feat**: Add `list_organizations` renderer mapping and org-discovery guidance so agents can discover org membership, inspect `has_mcpviews_token`, and authenticate the correct organization before cross-org Ludflow tool calls

# v0.5.0

## Renderer Convergence

- **feat**: Converge all custom renderers to built-in `rich_content` and `structured_data` — slideout components and rich_content routing replace per-tool custom renderers
- **feat**: Migrate `analysis_stats` and `module_overview` renderers to built-in `rich_content` with renderer rules (~19KB reduction)
- **feat**: Migrate `knowledge_dex` and `data_schema` renderers to built-in `structured_data` with renderer rules
- **feat**: Rebrand to MCP Views with full `renderer_definitions` in manifest

## Plugin Features

- **feat**: `knowledge_dex_onboard` prompt — guided onboarding to bootstrap your Knowledge Dex with business concepts, entities, and attributes
- **feat**: `registry_index` for lazy-load plugin discovery — summary, tags, tool_groups, and renderer_names
- **feat**: Dark mode theme support via `prefers-color-scheme`
- **feat**: `download_url` in manifest for plugin auto-update

## Infrastructure

- **feat**: Auto-release GitHub Actions workflow with version-aware build script
- **feat**: Build output moved to `release/` directory
- **fix**: OAuth `client_id` added to manifest for streamlined auth
- **fix**: MCP URLs corrected: `ludflow.com` -> `app.ludflow.com`
