import { Component } from '@angular/core';

import { PopoverController } from 'ionic-angular/es2015/index.js'

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2015-05-14';

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
