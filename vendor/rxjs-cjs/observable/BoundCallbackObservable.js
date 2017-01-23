'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoundCallbackObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _AsyncSubject = require('../AsyncSubject');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var BoundCallbackObservable = exports.BoundCallbackObservable = function (_Observable) {
    _inherits(BoundCallbackObservable, _Observable);

    /**
     * @param {?} callbackFunc
     * @param {?} selector
     * @param {?} args
     * @param {?} scheduler
     */
    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
        _classCallCheck(this, BoundCallbackObservable);

        var _this = _possibleConstructorReturn(this, (BoundCallbackObservable.__proto__ || Object.getPrototypeOf(BoundCallbackObservable)).call(this));

        _this.callbackFunc = callbackFunc;
        _this.selector = selector;
        _this.args = args;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Converts a callback API to a function that returns an Observable.
     *
     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
     * it will return a function `g` that when called as `g(x)` will output an
     * Observable.</span>
     *
     * `bindCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The output of `bindCallback` is a function that takes the same
     * parameters as `func`, except the last one (the callback). When the output
     * function is called with arguments, it will return an Observable where the
     * results will be delivered to.
     *
     * // Suppose we have jQuery.getJSON('/my/url', callback)
     * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
     * var result = getJSONAsObservable('/my/url');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link bindNodeCallback}
     * @see {\@link from}
     * @see {\@link fromPromise}
     *
     * callback and maps those a value to emit on the output Observable.
     * callbacks.
     * Observable that delivers the same values the callback would deliver.
     * @owner Observable
     * @param {?} func
     * @param {?=} selector
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(BoundCallbackObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */callbackFunc = this.callbackFunc;
            var /** @type {?} */args = this.args;
            var /** @type {?} */scheduler = this.scheduler;
            var /** @type {?} */subject = this.subject;
            if (!scheduler) {
                if (!subject) {
                    subject = this.subject = new _AsyncSubject.AsyncSubject();
                    var /** @type {?} */handler = function handlerFn() {
                        var /** @type {?} */source = handlerFn.source;
                        var selector = source.selector,
                            subject = source.subject;

                        for (var _len = arguments.length, innerArgs = Array(_len), _key = 0; _key < _len; _key++) {
                            innerArgs[_key] = arguments[_key];
                        }

                        if (selector) {
                            var /** @type {?} */_result = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
                            if (_result === _errorObject.errorObject) {
                                subject.error(_errorObject.errorObject.e);
                            } else {
                                subject.next(_result);
                                subject.complete();
                            }
                        } else {
                            subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                            subject.complete();
                        }
                    };
                    // use named function instance to avoid closure.
                    handler.source = this;
                    var /** @type {?} */result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
                    if (result === _errorObject.errorObject) {
                        subject.error(_errorObject.errorObject.e);
                    }
                }
                return subject.subscribe(subscriber);
            } else {
                return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber });
            }
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }], [{
        key: 'create',
        value: function create(func) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var scheduler = arguments[2];

            return function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return new BoundCallbackObservable(func, /** @type {?} */selector, args, scheduler);
            };
        }
    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var /** @type {?} */self = this;
            var source = state.source,
                subscriber = state.subscriber;
            var callbackFunc = source.callbackFunc,
                args = source.args,
                scheduler = source.scheduler;

            var /** @type {?} */subject = source.subject;
            if (!subject) {
                subject = source.subject = new _AsyncSubject.AsyncSubject();
                var /** @type {?} */handler = function handlerFn() {
                    var /** @type {?} */source = handlerFn.source;
                    var selector = source.selector,
                        subject = source.subject;

                    for (var _len3 = arguments.length, innerArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        innerArgs[_key3] = arguments[_key3];
                    }

                    if (selector) {
                        var /** @type {?} */_result2 = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
                        if (_result2 === _errorObject.errorObject) {
                            self.add(scheduler.schedule(dispatchError, 0, { err: _errorObject.errorObject.e, subject: subject }));
                        } else {
                            self.add(scheduler.schedule(dispatchNext, 0, { value: _result2, subject: subject }));
                        }
                    } else {
                        var /** @type {?} */value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                        self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
                    }
                };
                // use named function to pass values in without closure
                handler.source = source;
                var /** @type {?} */result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
                if (result === _errorObject.errorObject) {
                    subject.error(_errorObject.errorObject.e);
                }
            }
            self.add(subject.subscribe(subscriber));
        }
    }]);

    return BoundCallbackObservable;
}(_Observable2.Observable);

function BoundCallbackObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    BoundCallbackObservable.prototype.subject;
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    var value = arg.value,
        subject = arg.subject;

    subject.next(value);
    subject.complete();
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchError(arg) {
    var err = arg.err,
        subject = arg.subject;

    subject.error(err);
}