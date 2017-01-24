"use strict";
const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
class HomePage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    nextPage() {
        this.navCtrl.push('PageOne');
        console.log();
    }
}
HomePage.decorators = [
    { type: core_1.Component, args: [{
                selector: 'page-home',
                template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        Ionic Blank
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>
    The world is your oyster.
    <p>
      If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.
    </p>
    <button ion-button (click)="nextPage()">Next Page</button>
  </ion-content>
  `
            },] },
];
/** @nocollapse */
HomePage.ctorParameters = [
    { type: ionic_angular_1.NavController, },
];
exports.HomePage = HomePage;
