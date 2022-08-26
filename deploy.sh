#!/bin/bash -e

set -x

ng build --prod --output-path docs --base-href /$1/

cp docs/index.html docs/404.html

git add .

git commit -m "Build for deploy"

git push
