'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startWith = startWith;

var _ArrayObservable = require('../observable/ArrayObservable');

var _ScalarObservable = require('../observable/ScalarObservable');

var _EmptyObservable = require('../observable/EmptyObservable');

var _concat = require('./concat');

var _isScheduler = require('../util/isScheduler');

/**
 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
 * source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} array
 * @return {?}
 */
function startWith() {
    for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
        array[_key] = arguments[_key];
    }

    var /** @type {?} */scheduler = array[array.length - 1];
    if ((0, _isScheduler.isScheduler)(scheduler)) {
        array.pop();
    } else {
        scheduler = null;
    }
    var /** @type {?} */len = array.length;
    if (len === 1) {
        return (0, _concat.concatStatic)(new _ScalarObservable.ScalarObservable( /** @type {?} */array[0], scheduler), /** @type {?} */this);
    } else if (len > 1) {
        return (0, _concat.concatStatic)(new _ArrayObservable.ArrayObservable( /** @type {?} */array, scheduler), /** @type {?} */this);
    } else {
        return (0, _concat.concatStatic)(new _EmptyObservable.EmptyObservable(scheduler), /** @type {?} */this);
    }
}