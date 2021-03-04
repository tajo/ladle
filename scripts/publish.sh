#!/bin/bash

set -euo pipefail

# Setup SSH keys so we can push lerna commits and tags to master branch

mkdir -p /root/.ssh
ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
echo "$GIT_DEPLOY_KEY" > /root/.ssh/id_rsa
chmod 400 /root/.ssh/id_rsa

# The script is run as root so we need to allow npm to execute scripts as root.
echo "unsafe-perm = true" >> ~/.npmrc

# Setup git and pull tags for Lerna

git config user.email "vojtech@miksu.cz"
git config user.name "tajo"

git remote set-url origin git@github.com:tajo/ladle.git

git fetch --unshallow --tags

# Run lerna
node_modules/.bin/lerna publish
