#!/bin/bash

# shellcheck source=/dev/null
source ./scripts/utils.sh

package_version="v$(get_package_version)"
previous_git_tag="$(get_previous_git_tag)"

echo -e "# Release notes\n" >release.md
git log "$previous_git_tag"..HEAD --pretty=format:'%h - %as - %s - %an' --graph >>release.md || exit 1

ls -a

printColors green "Release notes for $package_version created"
