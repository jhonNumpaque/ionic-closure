'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Observable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = require('./util/root');

var _toSubscriber = require('./util/toSubscriber');

var _observable = require('./symbol/observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 */
var Observable = exports.Observable = function () {
    /**
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     * @param {?=} subscribe
     */
    function Observable(subscribe) {
        _classCallCheck(this, Observable);

        console.log('Observable');
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @param {?} operator
     * @return {?}
     */


    _createClass(Observable, [{
        key: 'lift',
        value: function lift(operator) {
            var /** @type {?} */observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        }
        /**
         * @param {?=} observerOrNext
         * @param {?=} error
         * @param {?=} complete
         * @return {?}
         */

    }, {
        key: 'subscribe',
        value: function subscribe(observerOrNext, error, complete) {
            var operator = this.operator;

            var /** @type {?} */sink = (0, _toSubscriber.toSubscriber)(observerOrNext, error, complete);
            if (operator) {
                operator.call(sink, this.source);
            } else {
                sink.add(this._subscribe(sink));
            }
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
            return sink;
        }
        /**
         *  rejects with the handled error
         * @param {?} next
         * @param {?=} PromiseCtor
         * @return {?}
         */

    }, {
        key: 'forEach',
        value: function forEach(next, PromiseCtor) {
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
                var /** @type {?} */subscription = _this.subscribe(function (value) {
                    if (subscription) {
                        // if there is a subscription, then we can surmise
                        // the next handling is asynchronous. Any errors thrown
                        // need to be rejected explicitly and unsubscribe must be
                        // called manually
                        try {
                            next(value);
                        } catch (err) {
                            reject(err);
                            subscription.unsubscribe();
                        }
                    } else {
                        // if there is NO subscription, then we're getting a nexted
                        // value synchronously during subscription. We can just call it.
                        // If it errors, Observable's `subscribe` will ensure the
                        // unsubscription logic is called, then synchronously rethrow the error.
                        // After that, Promise will trap the error and send it
                        // down the rejection path.
                        next(value);
                    }
                }, reject, resolve);
            });
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */

    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            return this.source.subscribe(subscriber);
        }
        /**
         * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
         * @return {?}
         */

    }, {
        key: _observable.$$observable,
        value: function value() {
            return this;
        }
    }]);

    return Observable;
}();
// HACK: Since TypeScript inherits static properties too, we have to
// fight against TypeScript here so Subject can have a different static create signature
/**
 * Creates a new cold Observable by calling the Observable constructor
 * @static true
 * @owner Observable
 * @method create
 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
 * @return {Observable} a new cold observable
 */


Observable.create = function (subscribe) {
    return new Observable(subscribe);
};
function Observable_tsickle_Closure_declarations() {
    /** @type {?} */
    Observable.prototype._isScalar;
    /** @type {?} */
    Observable.prototype.source;
    /** @type {?} */
    Observable.prototype.operator;
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @owner Observable
     * @type {?}
     */
    Observable.prototype.create;
    /** @type {?} */
    Observable.prototype.if;
    /** @type {?} */
    Observable.prototype.throw;
}