#!/bin/bash -e

set -x

ng build --output-path docs/$1 --base-href /$1/ --configuration=$1

cp docs/$1/index.html docs/$1/404.html

git add .

git commit -m "Build for deploy $1"

git push
