#!/bin/bash

function get_package_version {
  npm pkg get version
}

if [ -z "$(git status --porcelain)" ]; then 
  echo "Package version updated to $package_version"
else
  echo "Package"
fi


# select version_type in major minor patch
# do
#   npm version "$version_type" -no-git-tag-version
#   package_version=$(get_package_version)

#   echo "Package version updated to $package_version"
#   break
# done
