import { BrowserModule } from '@angular/platform-browser/index';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular/es2015/index';
import { MyApp } from './app.component';
import { HomePage } from './pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { loadChildren: '../pages/page-one/page-one.module#PageOneModule', name: 'PageOne' },
        { loadChildren: '../pages/page-two/page-two.module#PageTwoModule', name: 'PageTwo' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ]
})
export class AppModule {}