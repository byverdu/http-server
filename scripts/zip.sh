#!/bin/bash
source ./scripts/utils.sh

mkdir -p http-server/lib
cp Readme.md package.json http-server
sleep 1
mv lib/* http-server/lib
tar -zcvf release.tar.gz http-server
zip -r release.zip http-server

printColors green "zip and tar files created"
