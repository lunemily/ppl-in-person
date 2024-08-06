Set-Variable -Name "ppl" -Value $args[0]

Set-Variable -Name "env" -Value $args[1]

ng build --output-path docs\$ppl\$env --base-href /$ppl/ --configuration=$ppl$env

Copy-Item ".\docs\$ppl\$env\index.html" ".\docs\$ppl\$env\404.html"

git add .

git commit -m "Build for deploy $ppl"

git push
