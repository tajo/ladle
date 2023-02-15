#!/bin/bash

set -eo pipefail

echo "Running release"

echo "Build @ladle/react"
turbo run build --filter=@ladle/react

echo "Update package.json"
node ./packages/ladle/scripts/update-package-types.js

echo "Generate Types":
pnpm --filter @ladle/react types
node ./packages/ladle/scripts/update-index-path.js

echo "Changeset publish"
changeset publish

echo "Revert package.json"
node ./packages/ladle/scripts/revert-package-types.js
