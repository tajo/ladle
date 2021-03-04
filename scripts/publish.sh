#!/bin/bash

set -eo pipefail

npm whoami

exit 0

# Setup SSH keys so we can push lerna commits and tags to master branch

mkdir -p ~/.ssh
ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts
echo "$GIT_DEPLOY_KEY" > ~/.ssh/id_rsa
chmod 400 ~/.ssh/id_rsa

# Setup git and pull tags for Lerna

git config user.email "vojtech@miksu.cz"
git config user.name "tajo"

git remote set-url origin git@github.com:tajo/ladle.git

git rebase origin/master
git fetch --unshallow --tags

# Run lerna
node_modules/.bin/lerna publish --yes
