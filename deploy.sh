#!/usr/bin/env bash

if [ ! -d "./.git" ];then (cd $(git rev-parse --show-cdup)); fi;

ng_packages=("ngx-dc-utils" "ngx-dc-data-sources" "ngx-dc-file-viewer" "ngx-dc-mat-select-data-source" "ngx-dc-navbar" "ngx-dc-side-pane-list" "ngx-dc-dropdown" "ngx-dc-demo-card")

echo Publishing angular library packages

cd app/dist/devcrate || exit 1

for package in "${ng_packages[@]}"; do
  VERSION=$(grep '"version"' ./${package}/package.json | sed -E 's/.*"version": "([^"]+)".*/\1/' | tr -d '\n')
  echo Publishing @devcrate/${package}@${VERSION} package
  cd ${package} || exit 1
  npm --verbose publish
  PUB_RESULT=$?
  if [ ${PUB_RESULT} -ne 0 ]; then
    echo Publish of PRD package ${package} failed with error code: ${PUB_RESULT}
    exit ${PUB_RESULT}
  fi
  cd .. || exit 1
done

cd ../../..

echo Publishing node packages
packages=("utils" "eslint-config")

cd packages || exit 1

for package in "${packages[@]}"; do
  VERSION=$(grep '"version"' src/${package}/package.json | sed -E 's/.*"version": "([^"]+)".*/\1/' | tr -d '\n')
  echo "Publishing @devcrate/${package}@${VERSION} package"
  cd dist/${package} || exit 1
  npm --verbose publish
  PUB_RESULT=$?
  if [ ${PUB_RESULT} -ne 0 ]; then
    echo Publish of PRD package ${package} failed with error code: ${PUB_RESULT}
    exit ${PUB_RESULT}
  fi
  cd ../..
done

cd ..
