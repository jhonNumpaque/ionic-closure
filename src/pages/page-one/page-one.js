"use strict";
const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
/*
  Generated class for the PageOne page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
class PageOne {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ionViewDidLoad() {
        console.log('Hello PageOnePage Page one two three four');
    }
    nextPage() {
        this.navCtrl.push('PageTwo');
    }
    previousPage() {
        this.navCtrl.pop();
    }
}
PageOne.decorators = [
    { type: core_1.Component, args: [{
                selector: 'page-page-one',
                template: `
  <ion-header>

  <ion-navbar>
    <ion-title>Page-One</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>
  <button ion-button (click)="nextPage()">Next Page</button>
  <button ion-button (click)="previousPage()">Back</button>
</ion-content>
  `
            },] },
];
/** @nocollapse */
PageOne.ctorParameters = [
    { type: ionic_angular_1.NavController, },
];
exports.PageOne = PageOne;
