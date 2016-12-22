#!/bin/bash
cd node_modules/ionic-angular/es2015
find ./ -type f -exec sed -i -e 's/@angular\/common/@angular\/common\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/compiler/@angular\/compiler\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/core/@angular\/core\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/forms/@angular\/forms\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/http/@angular\/http\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/platform-browser/@angular\/platform-browser\/index.js/g' {} \;
find ./ -type f -exec sed -i -e 's/@angular\/platform-server/@angular\/platform-server\/index.js/g' {} \;
cd ../../..