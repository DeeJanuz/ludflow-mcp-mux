#!/usr/bin/env bash
set -euo pipefail

PLUGIN_NAME="ludflow"
ZIP_NAME="${PLUGIN_NAME}-plugin.zip"
RELEASE_DIR="release"

echo "Building ${ZIP_NAME}..."

# Clean previous build
rm -rf "${RELEASE_DIR}"
mkdir -p "${RELEASE_DIR}"

# Read version from manifest and sync download_url
VERSION=$(python3 -c "import json; print(json.load(open('manifest.json'))['version'])")
DOWNLOAD_URL="https://github.com/DeeJanuz/ludflow-mcpviews/releases/download/v${VERSION}/${ZIP_NAME}"

python3 -c "
import json
m = json.load(open('manifest.json'))
m['download_url'] = '${DOWNLOAD_URL}'
json.dump(m, open('manifest.json', 'w'), indent=2)
print('  Updated source manifest download_url')
"

echo "  Version: ${VERSION}"
echo "  Download URL: ${DOWNLOAD_URL}"

# Create ZIP with manifest, renderers, and prompts
zip -r "${RELEASE_DIR}/${ZIP_NAME}" manifest.json renderers/ prompts/

echo "Built ${RELEASE_DIR}/${ZIP_NAME} ($(du -h "${RELEASE_DIR}/${ZIP_NAME}" | cut -f1))"
