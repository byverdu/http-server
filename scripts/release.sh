#!/bin/bash

source ./scripts/utils.sh

if [ -z "$(git status --porcelain)" ]; then
  select version_type in major minor patch; do
    npm version "$version_type"
    package_version="v$(get_package_version)"
    previous_git_tag="get_previous_git_tag"

    echo -e "# Release notes for $package_version\n" >release.md
    git log "$previous_git_tag"..Head --oneline >>release.md

    git push origin "$package_version"

    printColors green "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
