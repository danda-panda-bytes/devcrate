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
# Note that ngx-dc-utils must be first and ngx-dc-data-sources must be second or it will fail.
packages=("ngx-dc-utils" "ngx-dc-data-sources" "ngx-dc-file-viewer" "ngx-dc-mat-select-data-source" "ngx-dc-navbar" "ngx-dc-side-pane-list" "ngx-dc-dropdown" "ngx-dc-demo-card")

cd app
npm ci

for package in "${packages[@]}"; do
  VERSION=$(grep '"version"' projects/devcrate/${package}/package.json | sed -E 's/.*"version": "([^"]+)".*/\1/' | tr -d '\n')

  echo "version=$VERSION"
  echo "git_hash=$GITCOMMIT"
  echo "git_tag=$GITTAG"
  echo "built=$DATE"

  echo Building library ${package} package
  # ./set-version.sh ${VERSION}${SUFFIX} ${package}
  pwd
  node_modules/.bin/ng build @devcrate/${package} --configuration=production
  PKG_RESULT=$?

  if [ ${PKG_RESULT} -ne 0 ]; then
    echo Build of PRD package failed with error code: ${PKG_RESULT}
    exit ${PKG_RESULT}
  fi
  # cp package.json dist

  # set version back so no environment gets appended in git
  # ./set-version.sh ${VERSION} ${package}
done



cd ..
