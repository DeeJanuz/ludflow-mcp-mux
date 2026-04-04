#!/usr/bin/env bash
set -euo pipefail

PLUGIN_NAME="ludflow"
ZIP_NAME="${PLUGIN_NAME}-plugin.zip"
RELEASE_DIR="release"

echo "Building ${RELEASE_DIR}/${ZIP_NAME}..."

# Clean previous build
rm -rf "${RELEASE_DIR}"
mkdir -p "${RELEASE_DIR}"

# Create ZIP with manifest and renderers
zip -r "${RELEASE_DIR}/${ZIP_NAME}" manifest.json renderers/ prompts/

echo "Built ${RELEASE_DIR}/${ZIP_NAME} ($(du -h "${RELEASE_DIR}/${ZIP_NAME}" | cut -f1))"
