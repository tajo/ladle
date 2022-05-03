#!/bin/bash

set -eo pipefail

echo "//registry.npmjs.org/:_authToken=$NODE_AUTH_TOKEN" > ~/.npmrc

turbo run build
changeset publish

# build and publish @ladle/react-cjs
cd packages/ladle/cjs
pnpm publish
