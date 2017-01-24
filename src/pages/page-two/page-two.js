"use strict";
const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
/*
  Generated class for the PageTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
class PageTwo {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ionViewDidLoad() {
    }
    goBack() {
        this.navCtrl.pop();
    }
}
PageTwo.decorators = [
    { type: core_1.Component, args: [{
                selector: 'page-page-two',
                template: `
  <ion-header>

  <ion-navbar>
    <ion-title>Page-Two</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>
  <button ion-button (click)="goBack()">Go Back</button>
</ion-content>
  `
            },] },
];
/** @nocollapse */
PageTwo.ctorParameters = [
    { type: ionic_angular_1.NavController, },
];
exports.PageTwo = PageTwo;
