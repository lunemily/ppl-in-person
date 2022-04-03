#!/bin/bash -e

set -x

ng build --prod --output-path docs --base-href /east/

cp docs/index.html docs/404.html

git add .

git commit -m "$1"

git push
