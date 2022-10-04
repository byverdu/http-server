#!/bin/bash
echo "Enter new Package version"

read -r version

npm version "$version"

yarn build