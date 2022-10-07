#!/bin/bash

function printColors() {
  red='\033[0;31m'
  green='\033[0;32m'
  orange='\033[1;33m'
  end="\033[0m"

  case $1 in
  "red")
    color=$red
    ;;

  "green")
    color=$green
    ;;

  "orange")
    color=$orange
    ;;
  esac

  echo -e "${color}$2${end}"
}

function get_package_version {
  node -p "require('./package.json').version"
}

if [ -z "$(git status --porcelain)" ]; then
  select version_type in major minor patch; do
    npm version "$version_type"
    package_version="v$(get_package_version)"

    git push origin "$package_version"

    printColors green "Package version updated to $package_version"
    break
  done
else
  printColors red "You have changes pending to commit. A release needs a clean state"

  git status
fi
