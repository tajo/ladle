#!/bin/bash

set -eo pipefail

echo "Running release"

echo "Build @ladle/react"
turbo run build --filter=@ladle/react

echo "Changeset publish"
changeset publish
