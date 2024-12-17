#!/bin/bash

VERSION=$1
PACKAGE=$2

if [ ! -d "./.git" ];then cd $(git rev-parse --show-cdup); fi;

# TODO: Since the versions are managed in the package.json, probably don't need this file anymore...
echo $VERSION

# sed -i.bak "s/[[:space:]]*\"version\"[[:space:]]*:[[:space:]]*\".*\",/  \"version\":\"$VERSION\",/g" app/projects/devcrate/${PACKAGE}/package.json && rm -f app/projects/devcrate/${PACKAGE}/package.json.bak

# TODO: Should I not update this version since we don't publish the main one?
# sed -i.bak "s/[[:space:]]*\"version\"[[:space:]]*:[[:space:]]*\".*\",/  \"version\":\"$VERSION\",/g" app/package.json && rm -f package.json.bak
# causes package-lock.json to be updated
# npm update
