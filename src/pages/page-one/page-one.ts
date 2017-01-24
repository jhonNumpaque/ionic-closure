import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PageOne page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
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
})
export class PageOne {

  constructor(public navCtrl: NavController) {}

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
