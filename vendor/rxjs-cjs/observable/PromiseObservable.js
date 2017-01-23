'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PromiseObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = require('../util/root');

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var PromiseObservable = exports.PromiseObservable = function (_Observable) {
    _inherits(PromiseObservable, _Observable);

    /**
     * @param {?} promise
     * @param {?=} scheduler
     */
    function PromiseObservable(promise, scheduler) {
        _classCallCheck(this, PromiseObservable);

        var _this = _possibleConstructorReturn(this, (PromiseObservable.__proto__ || Object.getPrototypeOf(PromiseObservable)).call(this));

        _this.promise = promise;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link bindCallback}
     * @see {\@link from}
     *
     * the delivery of the resolved value (or the rejection).
     * @owner Observable
     * @param {?} promise
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(PromiseObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var _this2 = this;

            var /** @type {?} */promise = this.promise;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler == null) {
                if (this._isScalar) {
                    if (!subscriber.closed) {
                        subscriber.next(this.value);
                        subscriber.complete();
                    }
                } else {
                    promise.then(function (value) {
                        _this2.value = value;
                        _this2._isScalar = true;
                        if (!subscriber.closed) {
                            subscriber.next(value);
                            subscriber.complete();
                        }
                    }, function (err) {
                        if (!subscriber.closed) {
                            subscriber.error(err);
                        }
                    }).then(null, function (err) {
                        // escape the promise trap, throw unhandled errors
                        _root.root.setTimeout(function () {
                            throw err;
                        });
                    });
                }
            } else {
                if (this._isScalar) {
                    if (!subscriber.closed) {
                        return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                    }
                } else {
                    promise.then(function (value) {
                        _this2.value = value;
                        _this2._isScalar = true;
                        if (!subscriber.closed) {
                            subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                        }
                    }, function (err) {
                        if (!subscriber.closed) {
                            subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                        }
                    }).then(null, function (err) {
                        // escape the promise trap, throw unhandled errors
                        _root.root.setTimeout(function () {
                            throw err;
                        });
                    });
                }
            }
        }
    }], [{
        key: 'create',
        value: function create(promise, scheduler) {
            return new PromiseObservable(promise, scheduler);
        }
    }]);

    return PromiseObservable;
}(_Observable2.Observable);

function PromiseObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    PromiseObservable.prototype.value;
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    var value = arg.value,
        subscriber = arg.subscriber;

    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchError(arg) {
    var err = arg.err,
        subscriber = arg.subscriber;

    if (!subscriber.closed) {
        subscriber.error(err);
    }
}