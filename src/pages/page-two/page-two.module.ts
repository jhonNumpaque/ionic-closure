import { NgModule } from '@angular/core';
import { PageTwo } from './page-two';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    PageTwo,
  ],
  imports: [
    IonicModule.forChild(PageTwo)
  ],
  entryComponents: [
    PageTwo
  ],
  providers: []
})
export class PageTwoModule {

}
