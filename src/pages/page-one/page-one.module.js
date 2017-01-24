"use strict";
const core_1 = require('@angular/core');
const page_one_1 = require('./page-one');
const ionic_angular_1 = require('ionic-angular');
class PageOneModule {
}
PageOneModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [
                    page_one_1.PageOne,
                ],
                imports: [
                    ionic_angular_1.IonicModule.forChild(page_one_1.PageOne)
                ],
                entryComponents: [
                    page_one_1.PageOne
                ],
                providers: []
            },] },
];
/** @nocollapse */
PageOneModule.ctorParameters = [];
exports.PageOneModule = PageOneModule;
