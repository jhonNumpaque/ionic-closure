import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PageOne page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page-one',
  templateUrl: 'page-one.html'
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
