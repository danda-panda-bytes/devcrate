#!/usr/bin/env bash

set -x

if [ ! -d "./.git" ];then cd $(git rev-parse --show-cdup); fi;

if [ -z "$1" ]
then
  SUFFIX=""
else
  SUFFIX="$1"
fi

#These are potentially useful items to extract for your package/build steps

PROJECT=devcrate

rm -rf ./build || true
rm -rf ${PROJECT}-*.tgz || true
mkdir -p ./build || true

GITCOMMIT=`git rev-parse --short HEAD`
GITTAG=`git describe --exact-match --tags $(git log -n1 --pretty='%h') 2>/dev/null`
DATE=`date +%Y-%m-%d:%H:%M:%S`

# do build here, that produces necessary files for artifact under build/ folder

# Define the list of package names
packages=("utils" "eslint-config" "playwright")


cd packages
npm ci

echo "Building package folder packages"
npm run build
PKG_RESULT=$?
if [ ${PKG_RESULT} -ne 0 ]; then
  echo Build of PRD package failed with error code: ${PKG_RESULT}
  exit ${PKG_RESULT}
fi


for package in "${packages[@]}"; do
  VERSION=$(grep '"version"' src/${package}/package.json | sed -E 's/.*"version": "([^"]+)".*/\1/' | tr -d '\n')


  echo "Built ${package} package"
  echo "version=$VERSION"
  echo "git_hash=$GITCOMMIT"
  echo "git_tag=$GITTAG"
  echo "built=$DATE"
done

cd ..
