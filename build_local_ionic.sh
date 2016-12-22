#!/bin/bash

cd ../ionic2
gulp release.prepareReleasePackage

cp -r ./dist/ionic-angular ../ionic-closure/node_modules/ionic-angular

cd ../