#!/bin/bash

source ./scripts/utils.sh

if [ -z "$(git status --porcelain)" ]; then
  select version_type in major minor patch; do
    npm version "$version_type"
    # npm version "$version_type" -no-git-tag-version
    package_version="v$(get_package_version)"

    git push origin

    echo "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
