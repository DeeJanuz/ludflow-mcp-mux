#!/usr/bin/env bash
set -euo pipefail

PLUGIN_NAME="ludflow"
ZIP_NAME="${PLUGIN_NAME}-plugin.zip"

echo "Building ${ZIP_NAME}..."

# Clean previous build
rm -f "${ZIP_NAME}"

# Create ZIP with manifest and renderers
zip -r "${ZIP_NAME}" manifest.json renderers/

echo "Built ${ZIP_NAME} ($(du -h "${ZIP_NAME}" | cut -f1))"
