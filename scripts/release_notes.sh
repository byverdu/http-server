#!/bin/bash
source ./scripts/utils.sh

package_version="v$(get_package_version)"
previous_git_tag="$(get_previous_git_tag)"

printColors green "Creating release notes for $package_version"
echo -e "# Release notes for $package_version\n" >release.md
git log "$previous_git_tag"..Head --pretty=format:'%h - %as - %s - %an' --graph >>release.md || exit 1
printColors green "Release notes for $package_version created"
