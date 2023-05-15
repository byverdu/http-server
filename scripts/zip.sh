#!/bin/bash

# shellcheck source=/dev/null
source ./scripts/utils.sh

printColors green "zipping files script"

printColors orange "removing old files"

rm -rf http-server.* temp

printColors green "creating temp folder and moving files into it"

mkdir temp
mv lib ./temp
cp package.json README.md temp/

# https://unix.stackexchange.com/questions/385405/zip-all-files-and-subfolder-in-directory-without-parent-directory
(cd temp && zip -r "$OLDPWD/http-server.zip" .) || printColors green "zip failed"
tar -zcvf http-server.tar.gz temp

sleep 1

rm -rf temp

printColors green "zip and tar files created"
