import { NgModule } from '@angular/core';
import { PageOne } from './page-one';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    PageOne,
  ],
  imports: [
    IonicModule.forChild(PageOne)
  ],
  entryComponents: [
    PageOne
  ],
  providers: []
})
export class PageOneModule {}
