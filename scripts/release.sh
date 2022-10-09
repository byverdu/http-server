#!/bin/bash

source ./scripts/utils.sh

if [ -z "$(git status --porcelain)" ]; then
  select version_type in major minor patch; do
    npm version "$version_type"
    package_version="v$(get_package_version)"

    git push origin "$package_version"

    echo -e "Release notes for $package_version\n" >>release.md
    git log "$package_version"..Head --oneline >release.md

    printColors green "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
