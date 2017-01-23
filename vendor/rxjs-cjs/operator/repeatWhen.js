'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.repeatWhen = repeatWhen;

var _Subject = require('../Subject');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits the same values as the source observable with the exception of a `complete`.
 * A `complete` will cause the emission of the Throwable that cause the complete to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `complete` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * aborting the retry.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier, this));
}

var RepeatWhenOperator = function () {
    /**
     * @param {?} notifier
     * @param {?} source
     */
    function RepeatWhenOperator(notifier, source) {
        _classCallCheck(this, RepeatWhenOperator);

        this.notifier = notifier;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(RepeatWhenOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, this.source));
        }
    }]);

    return RepeatWhenOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var RepeatWhenSubscriber = function (_OuterSubscriber) {
    _inherits(RepeatWhenSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} notifier
     * @param {?} source
     */
    function RepeatWhenSubscriber(destination, notifier, source) {
        _classCallCheck(this, RepeatWhenSubscriber);

        var _this = _possibleConstructorReturn(this, (RepeatWhenSubscriber.__proto__ || Object.getPrototypeOf(RepeatWhenSubscriber)).call(this, destination));

        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(RepeatWhenSubscriber, [{
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                var /** @type {?} */notifications = this.notifications;
                var /** @type {?} */retries = this.retries;
                var /** @type {?} */retriesSubscription = this.retriesSubscription;
                if (!retries) {
                    notifications = new _Subject.Subject();
                    retries = (0, _tryCatch.tryCatch)(this.notifier)(notifications);
                    if (retries === _errorObject.errorObject) {
                        return _get(RepeatWhenSubscriber.prototype.__proto__ || Object.getPrototypeOf(RepeatWhenSubscriber.prototype), 'complete', this).call(this);
                    }
                    retriesSubscription = (0, _subscribeToResult.subscribeToResult)(this, retries);
                } else {
                    this.notifications = null;
                    this.retriesSubscription = null;
                }
                this.unsubscribe();
                this.closed = false;
                this.notifications = notifications;
                this.retries = retries;
                this.retriesSubscription = retriesSubscription;
                notifications.next();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var notifications = this.notifications,
                retriesSubscription = this.retriesSubscription;

            if (notifications) {
                notifications.unsubscribe();
                this.notifications = null;
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
            var notifications = this.notifications,
                retries = this.retries,
                retriesSubscription = this.retriesSubscription;

            this.notifications = null;
            this.retries = null;
            this.retriesSubscription = null;
            this.unsubscribe();
            this.isStopped = false;
            this.closed = false;
            this.notifications = notifications;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            this.source.subscribe(this);
        }
    }]);

    return RepeatWhenSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function RepeatWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RepeatWhenSubscriber.prototype.notifications;
    /** @type {?} */
    RepeatWhenSubscriber.prototype.retries;
    /** @type {?} */
    RepeatWhenSubscriber.prototype.retriesSubscription;
}