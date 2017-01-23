'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscriber = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _isFunction = require('./util/isFunction');

var _Subscription2 = require('./Subscription');

var _Observer = require('./Observer');

var _rxSubscriber = require('./symbol/rxSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Implements the {\@link Observer} interface and extends the
 * {\@link Subscription} class. While the {\@link Observer} is the public API for
 * consuming the values of an {\@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 */
var Subscriber = exports.Subscriber = function (_Subscription) {
    _inherits(Subscriber, _Subscription);

    /**
     * defined Observer or a `next` callback function.
     * Observer.
     * Observer.
     * @param {?=} destinationOrNext
     * @param {?=} error
     * @param {?=} complete
     */
    function Subscriber(destinationOrNext, error, complete) {
        _classCallCheck(this, Subscriber);

        var _this = _possibleConstructorReturn(this, (Subscriber.__proto__ || Object.getPrototypeOf(Subscriber)).call(this));

        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = _Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = _Observer.empty;
                    break;
                }
                if ((typeof destinationOrNext === 'undefined' ? 'undefined' : _typeof(destinationOrNext)) === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.destination = destinationOrNext;
                        _this.destination.add(_this);
                    } else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(Subscriber, [{
        key: _rxSubscriber.$$rxSubscriber,
        value: function value() {
            return this;
        }
        /**
         * A static factory for a Subscriber, given a (potentially partial) definition
         * of an Observer.
         * Observer.
         * Observer.
         * Observer represented by the given arguments.
         * @param {?=} next
         * @param {?=} error
         * @param {?=} complete
         * @return {?}
         */

    }, {
        key: 'next',

        /**
         * The {\@link Observer} callback to receive notifications of type `next` from
         * the Observable, with a value. The Observable may call this method 0 or more
         * times.
         * @param {?=} value
         * @return {?}
         */
        value: function next(value) {
            if (!this.isStopped) {
                this._next(value);
            }
        }
        /**
         * The {\@link Observer} callback to receive notifications of type `error` from
         * the Observable, with an attached {\@link Error}. Notifies the Observer that
         * the Observable has experienced an error condition.
         * @param {?=} err
         * @return {?}
         */

    }, {
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        }
        /**
         * The {\@link Observer} callback to receive a valueless notification of type
         * `complete` from the Observable. Notifies the Observer that the Observable
         * has finished sending push-based notifications.
         * @return {?}
         */

    }, {
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _get(Subscriber.prototype.__proto__ || Object.getPrototypeOf(Subscriber.prototype), 'unsubscribe', this).call(this);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.destination.next(value);
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.destination.error(err);
            this.unsubscribe();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.destination.complete();
            this.unsubscribe();
        }
    }], [{
        key: 'create',
        value: function create(next, error, complete) {
            var /** @type {?} */subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        }
    }]);

    return Subscriber;
}(_Subscription2.Subscription);

function Subscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    Subscriber.prototype.syncErrorValue;
    /** @type {?} */
    Subscriber.prototype.syncErrorThrown;
    /** @type {?} */
    Subscriber.prototype.syncErrorThrowable;
    /** @type {?} */
    Subscriber.prototype.isStopped;
    /** @type {?} */
    Subscriber.prototype.destination;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var SafeSubscriber = function (_Subscriber) {
    _inherits(SafeSubscriber, _Subscriber);

    /**
     * @param {?} _parent
     * @param {?=} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     */
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _classCallCheck(this, SafeSubscriber);

        var _this2 = _possibleConstructorReturn(this, (SafeSubscriber.__proto__ || Object.getPrototypeOf(SafeSubscriber)).call(this));

        _this2._parent = _parent;
        var next = void 0;
        var context = _this2;
        if ((0, _isFunction.isFunction)(observerOrNext)) {
            next = observerOrNext;
        } else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if ((0, _isFunction.isFunction)(context.unsubscribe)) {
                _this2.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = _this2.unsubscribe.bind(_this2);
        }
        _this2._context = context;
        _this2._next = next;
        _this2._error = error;
        _this2._complete = complete;
        return _this2;
    }
    /**
     * @param {?=} value
     * @return {?}
     */


    _createClass(SafeSubscriber, [{
        key: 'next',
        value: function next(value) {
            if (!this.isStopped && this._next) {
                var _parent = this._parent;

                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                } else if (this.__tryOrSetError(_parent, this._next, value)) {
                    this.unsubscribe();
                }
            }
        }
        /**
         * @param {?=} err
         * @return {?}
         */

    }, {
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var _parent = this._parent;

                if (this._error) {
                    if (!_parent.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    } else {
                        this.__tryOrSetError(_parent, this._error, err);
                        this.unsubscribe();
                    }
                } else if (!_parent.syncErrorThrowable) {
                    this.unsubscribe();
                    throw err;
                } else {
                    _parent.syncErrorValue = err;
                    _parent.syncErrorThrown = true;
                    this.unsubscribe();
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                var _parent = this._parent;

                if (this._complete) {
                    if (!_parent.syncErrorThrowable) {
                        this.__tryOrUnsub(this._complete);
                        this.unsubscribe();
                    } else {
                        this.__tryOrSetError(_parent, this._complete);
                        this.unsubscribe();
                    }
                } else {
                    this.unsubscribe();
                }
            }
        }
        /**
         * @param {?} fn
         * @param {?=} value
         * @return {?}
         */

    }, {
        key: '__tryOrUnsub',
        value: function __tryOrUnsub(fn, value) {
            try {
                fn.call(this._context, value);
            } catch (err) {
                this.unsubscribe();
                throw err;
            }
        }
        /**
         * @param {?} parent
         * @param {?} fn
         * @param {?=} value
         * @return {?}
         */

    }, {
        key: '__tryOrSetError',
        value: function __tryOrSetError(parent, fn, value) {
            try {
                fn.call(this._context, value);
            } catch (err) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            return false;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var _parent = this._parent;

            this._context = null;
            this._parent = null;
            _parent.unsubscribe();
        }
    }]);

    return SafeSubscriber;
}(Subscriber);

function SafeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SafeSubscriber.prototype._context;
}