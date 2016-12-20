var fs = require('fs');
var packageFile = 'node_modules/ionic-angular/package.json';

var packageJson = JSON.parse(fs.readFileSync(packageFile).toString());

packageJson.main = 'es2015/index.js';
packageJson.module = 'es2015/index.js';

fs.writeFileSync(packageFile, JSON.stringify(packageJson, null, 2));
