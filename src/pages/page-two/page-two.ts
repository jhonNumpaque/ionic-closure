import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PageTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
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
})
export class PageTwo {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }
}
