#!/bin/bash

mkdir -p http-server/lib
cp Readme.md package.json http-server
sleep 1
mv lib/* http-server/lib
tar -zcvf release.tar.gz http-server
