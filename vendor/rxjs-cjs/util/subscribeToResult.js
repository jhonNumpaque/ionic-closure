'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subscribeToResult = subscribeToResult;

var _root = require('./root');

var _isArray = require('./isArray');

var _isPromise = require('./isPromise');

var _isObject = require('./isObject');

var _Observable = require('../Observable');

var _iterator = require('../symbol/iterator');

var _InnerSubscriber = require('../InnerSubscriber');

var _observable = require('../symbol/observable');

/**
 * @param {?} outerSubscriber
 * @param {?} result
 * @param {?=} outerValue
 * @param {?=} outerIndex
 * @return {?}
 */
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var /** @type {?} */destination = new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof _Observable.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        } else {
            return result.subscribe(destination);
        }
    } else if ((0, _isArray.isArray)(result)) {
        for (var /** @type {?} */i = 0, /** @type {?} */len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    } else if ((0, _isPromise.isPromise)(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next( /** @type {?} */value);
                destination.complete();
            }
        }, function (err) {
            return destination.error(err);
        }).then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            _root.root.setTimeout(function () {
                throw err;
            });
        });
        return destination;
    } else if (result && typeof result[_iterator.$$iterator] === 'function') {
        var /** @type {?} */iterator = result[_iterator.$$iterator]();
        do {
            var /** @type {?} */item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    } else if (result && typeof result[_observable.$$observable] === 'function') {
        var /** @type {?} */obs = result[_observable.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        } else {
            return obs.subscribe(new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    } else {
        var /** @type {?} */value = (0, _isObject.isObject)(result) ? 'an invalid object' : '\'' + result + '\'';
        var /** @type {?} */msg = 'You provided ' + value + ' where a stream was expected.' + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}