"use strict";
const core_1 = require('@angular/core');
const page_two_1 = require('./page-two');
const ionic_angular_1 = require('ionic-angular');
class PageTwoModule {
}
PageTwoModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    page_two_1.PageTwo,
                ],
                imports: [
                    ionic_angular_1.IonicModule.forChild(page_two_1.PageTwo)
                ],
                entryComponents: [
                    page_two_1.PageTwo
                ],
                providers: []
            },] },
];
/** @nocollapse */
PageTwoModule.ctorParameters = [];
exports.PageTwoModule = PageTwoModule;
