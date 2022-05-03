#!/bin/bash

set -eo pipefail

echo "Running release"
echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > ~/.npmrc

echo "Build @ladle/react"
turbo run build --filter=@ladle/react

echo "Changeset publish"
changeset publish

echo "Build and publish @ladle/react-cjs"
cd packages/ladle/cjs
pnpm publish
