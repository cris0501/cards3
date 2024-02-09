#!/bin/bash
files="'/'"

cd 'dist'
for file in '.'/*; do
  file=$(basename "$file")
  files="$files,\n'$file'"
done
#files=$(echo -e "$files" | sed '1d')

cd ..
awk -v files="$files" '{gsub(/\$\{shell\}/, files)} 1' src/sw.js > dist/sw.js
exit 0
