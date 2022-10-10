#!/bin/bash

source ./scripts/utils.sh

if [ -z "$(git status --porcelain)" ]; then
  select version_type in major minor patch; do
    npm version "$version_type" -m "Package updated to version $package_version"
    package_version="v$(get_package_version)"

    git tag "$package_version"

    git push origin "$package_version"

    echo "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
