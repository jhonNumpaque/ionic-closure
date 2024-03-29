import { Component } from '@angular/core';
import { Platform } from 'ionic-angular/es2015/index';

import { HomePage } from './pages/home/home';


@Component({
  template: `
    <ion-nav [root]="rootPage"></ion-nav>
  `
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('platform ready fired');
    });
  }
}
