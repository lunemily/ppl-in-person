ng build --output-path docs\$0 --base-href /$0/ --configuration=$0

Set-Location $srcRoot

Copy-Item "$srcRoot\docs\$0\index.html" "$srcRoot\docs\$0\404.html"

git add .

git commit -m "Build for deploy $0"

git push