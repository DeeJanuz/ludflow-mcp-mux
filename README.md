# Ludflow MCP Views Plugin

Custom renderers for [Ludflow](https://ludflow.com) tools in [MCP Views](https://github.com/DeeJanuz/ludflow-mcpviews).

## Installation

Install via the MCP Views plugin registry:

```
mcp-views-cli plugin add ludflow
```

Or install manually by downloading the latest release ZIP and extracting to `~/.mcp-views/plugins/ludflow/`.

## Building

```bash
./build.sh
```

This produces `ludflow-plugin.zip` containing the manifest and all renderer files.

## Multi-Org Auth

Ludflow uses org-scoped OAuth tokens in MCPViews.

- Use `list_organizations` to discover which organizations the user belongs to.
- MCPViews enriches those results with `has_mcpviews_token` so agents can see whether a given org is already authenticated locally.
- For follow-up Ludflow tool calls in a non-default org, include `organization_id` in the tool arguments.
- If a target org has no stored token, call `start_plugin_auth` with plugin `ludflow` and that `organization_id` before retrying.

## Renderers

| Renderer | Tools |
|----------|-------|
| `rich_content` | `list_organizations` |
| `search_results` | `search_codebase`, `vector_search` |
| `code_units` | `get_code_units` |
| `document_preview` | `get_document`, `write_document`, `list_documents` |
| `data_schema` | `get_data_schema`, `get_data_lake_schema` |
| `data_draft_diff` | `manage_data_draft` |
| `dependencies` | `get_dependencies` |
| `file_content` | `get_file_content` |
| `module_overview` | `get_module_overview` |
| `analysis_stats` | `get_analysis_stats` |
| `knowledge_dex` | `get_business_concepts`, `manage_knowledge_entries` |
| `column_context` | `get_column_context` |

## License

Proprietary — free to use, not open source. See [LICENSE](LICENSE) for details.
