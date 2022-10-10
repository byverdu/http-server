#!/bin/bash
source ./scripts/utils.sh

package_version="v$(get_package_version)"
previous_git_tag="$(get_previous_git_tag)"

echo -e "# Release notes for $package_version\n" >release.md
git log "$previous_git_tag"..Head --pretty=format:'%h - %as - %s - %an' --graph >>release.md
printColors green "Release notes for $package_version created"
