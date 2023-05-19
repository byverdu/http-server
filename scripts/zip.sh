#!/bin/bash

# shellcheck source=/dev/null
source ./scripts/utils.sh

printColors green "zipping files script"

printColors orange "removing old files"

rm -rf release.* temp

printColors green "creating temp folder and moving files into it"

mkdir temp
cp -r lib ./temp
cp package.json README.md temp/

# https://unix.stackexchange.com/questions/385405/zip-all-files-and-subfolder-in-directory-without-parent-directory
(cd temp && zip -r "$OLDPWD/release.zip" .) || printColors red "zip failed"
tar -zcvf release.tar.gz temp

sleep 1

rm -rf temp

printColors green "running release notes script"

pnpm run release:notes || printColors red "release notes script failed"

printColors green "zip and tar files created"
