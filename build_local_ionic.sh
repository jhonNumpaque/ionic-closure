#!/bin/bash

cd ../ionic2
gulp release.prepareReleasePackage

rm -R ../ionic-closure/node_modules/ionic-angular
cp -r ./dist/ionic-angular ../ionic-closure/node_modules/ionic-angular

cd ../