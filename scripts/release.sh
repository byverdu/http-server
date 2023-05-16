#!/bin/bash

# shellcheck source=/dev/null
source ./scripts/utils.sh

BRANCH=$(git branch --show-current)

if [ -z "$BRANCH" ] || [ "$BRANCH" != "master" ]; then
  printColors red "A release can only be done in the master branch"
  exit
fi

if [ -z "$(git status --porcelain)" ]; then

  printColors green "pulling latest changes from master"

  git pull origin master

  select version_type in major minor patch; do
    npm version "$version_type"

    package_version="v$(get_package_version)"

    # pushing branches and tags is a two step process
    git push --no-verify
    git push origin "$package_version" --no-verify

    printColors green "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
