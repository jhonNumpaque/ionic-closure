'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toPromise = toPromise;

var _root = require('../util/root');

/**
 * @owner Observable
 * @this {?}
 * @param {?=} PromiseCtor
 * @return {?}
 */
function toPromise(PromiseCtor) {
    var _this = this;

    if (!PromiseCtor) {
        if (_root.root.Rx && _root.root.Rx.config && _root.root.Rx.config.Promise) {
            PromiseCtor = _root.root.Rx.config.Promise;
        } else if (_root.root.Promise) {
            PromiseCtor = _root.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var /** @type {?} */value = void 0;
        _this.subscribe(function (x) {
            return value = x;
        }, function (err) {
            return reject(err);
        }, function () {
            return resolve(value);
        });
    });
}