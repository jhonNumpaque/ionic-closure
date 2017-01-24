"use strict";
const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
const home_1 = require('./pages/home/home');
class MyApp {
    constructor(platform) {
        this.rootPage = home_1.HomePage;
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            console.log('platform ready fired');
        });
    }
}
MyApp.decorators = [
    { type: core_1.Component, args: [{
                template: `
    <ion-nav [root]="rootPage"></ion-nav>
  `
            },] },
];
/** @nocollapse */
MyApp.ctorParameters = [
    { type: ionic_angular_1.Platform, },
];
exports.MyApp = MyApp;
