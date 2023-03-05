Set-Variable -Name "ppl" -Value $args[0]

ng build --output-path docs\$ppl --base-href /$ppl/ --configuration=$ppl

Copy-Item ".\docs\$ppl\index.html" ".\docs\$ppl\404.html"

git add .

git commit -m "Build for deploy $ppl"

git push