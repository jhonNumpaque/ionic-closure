'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.retryWhen = retryWhen;

var _Subject = require('../Subject');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
 * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * aborting the retry.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}

var RetryWhenOperator = function () {
    /**
     * @param {?} notifier
     * @param {?} source
     */
    function RetryWhenOperator(notifier, source) {
        _classCallCheck(this, RetryWhenOperator);

        this.notifier = notifier;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(RetryWhenOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
        }
    }]);

    return RetryWhenOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var RetryWhenSubscriber = function (_OuterSubscriber) {
    _inherits(RetryWhenSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} notifier
     * @param {?} source
     */
    function RetryWhenSubscriber(destination, notifier, source) {
        _classCallCheck(this, RetryWhenSubscriber);

        var _this = _possibleConstructorReturn(this, (RetryWhenSubscriber.__proto__ || Object.getPrototypeOf(RetryWhenSubscriber)).call(this, destination));

        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    /**
     * @param {?} err
     * @return {?}
     */


    _createClass(RetryWhenSubscriber, [{
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var /** @type {?} */errors = this.errors;
                var /** @type {?} */retries = this.retries;
                var /** @type {?} */retriesSubscription = this.retriesSubscription;
                if (!retries) {
                    errors = new _Subject.Subject();
                    retries = (0, _tryCatch.tryCatch)(this.notifier)(errors);
                    if (retries === _errorObject.errorObject) {
                        return _get(RetryWhenSubscriber.prototype.__proto__ || Object.getPrototypeOf(RetryWhenSubscriber.prototype), 'error', this).call(this, _errorObject.errorObject.e);
                    }
                    retriesSubscription = (0, _subscribeToResult.subscribeToResult)(this, retries);
                } else {
                    this.errors = null;
                    this.retriesSubscription = null;
                }
                this.unsubscribe();
                this.closed = false;
                this.errors = errors;
                this.retries = retries;
                this.retriesSubscription = retriesSubscription;
                errors.next(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var errors = this.errors,
                retriesSubscription = this.retriesSubscription;

            if (errors) {
                errors.unsubscribe();
                this.errors = null;
            }
            if (retriesSubscription) {
                retriesSubscription.unsubscribe();
                this.retriesSubscription = null;
            }
            this.retries = null;
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            var errors = this.errors,
                retries = this.retries,
                retriesSubscription = this.retriesSubscription;

            this.errors = null;
            this.retries = null;
            this.retriesSubscription = null;
            this.unsubscribe();
            this.isStopped = false;
            this.closed = false;
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            this.source.subscribe(this);
        }
    }]);

    return RetryWhenSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function RetryWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RetryWhenSubscriber.prototype.errors;
    /** @type {?} */
    RetryWhenSubscriber.prototype.retries;
    /** @type {?} */
    RetryWhenSubscriber.prototype.retriesSubscription;
}