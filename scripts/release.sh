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
	npm pkg get version
}

if [ -z "$(git status --porcelain)" ]; then
select version_type in major minor patch; do
	npm version "$version_type" -no-git-tag-version
	package_version=$(get_package_version)

	echo "Package version updated to $package_version"
	break
done
else
	printColors red "You have changes pending to commit. A release needs a clean state"

	git status
fi
