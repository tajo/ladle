#!/bin/bash

set -eo pipefail

echo "Running release"

echo "Build @ladle/react"
turbo run build --filter=@ladle/react

echo "Changeset publish"
changeset publish

echo "Build and publish @ladle/react-cjs"
cd packages/ladle/cjs

remote_version=$(pnpm view @ladle/react-cjs --json | jq -r '.version')
local_version=$(jq -r '.version' package.json)

if [ "$local_version" != "$remote_version" ]; then
  echo "Publishing @ladle/react-cjs@$local_version"
  pnpm publish
else
  echo "@ladle/react-cjs@$local_version has been published already."
fi

