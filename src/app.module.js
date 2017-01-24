"use strict";
const platform_browser_1 = require('@angular/platform-browser');
const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
const app_component_1 = require('./app.component');
const home_1 = require('./pages/home/home');
class AppModule {
}
AppModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    app_component_1.MyApp,
                    home_1.HomePage
                ],
                imports: [
                    platform_browser_1.BrowserModule,
                    ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {}, {
                        links: [
                            { loadChildren: '../pages/page-one/page-one.module#PageOneModule', name: 'PageOne' },
                            { loadChildren: '../pages/page-two/page-two.module#PageTwoModule', name: 'PageTwo' }
                        ]
                    })
                ],
                bootstrap: [ionic_angular_1.IonicApp],
                entryComponents: [
                    app_component_1.MyApp,
                    home_1.HomePage
                ]
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = [];
exports.AppModule = AppModule;
