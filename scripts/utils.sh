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

function get_previous_git_tag {
  git describe --abbrev=0 --tags --exclude="$(git describe --abbrev=0 --tags)"
}
