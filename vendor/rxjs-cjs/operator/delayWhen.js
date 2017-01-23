'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.delayWhen = delayWhen;

var _Subscriber2 = require('../Subscriber');

var _Observable2 = require('../Observable');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Delays the emission of items from the source Observable by a given time span
 * determined by the emissions of another Observable.
 *
 * <span class="informal">It's like {\@link delay}, but the time span of the
 * delay duration is determined by a second Observable.</span>
 *
 * <img src="./img/delayWhen.png" width="100%">
 *
 * `delayWhen` time shifts each emitted value from the source Observable by a
 * time span determined by another Observable. When the source emits a value,
 * the `delayDurationSelector` function is called with the source value as
 * argument, and should return an Observable, called the "duration" Observable.
 * The source value is emitted on the output Observable only when the duration
 * Observable emits a value or completes.
 *
 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
 * is an Observable. When `subscriptionDelay` emits its first value or
 * completes, the source Observable is subscribed to and starts behaving like
 * described in the previous paragraph. If `subscriptionDelay` is not provided,
 * `delayWhen` will subscribe to the source Observable as soon as the output
 * Observable is subscribed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delayWhen(event =>
 *   Rx.Observable.interval(Math.random() * 5000)
 * );
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {\@link debounce}
 * @see {\@link delay}
 *
 * returns an Observable for each value emitted by the source Observable, which
 * is then used to delay the emission of that item on the output Observable
 * until the Observable returned from this function emits a value.
 * subscription to the source Observable once it emits any value.
 * Observable by an amount of time specified by the Observable returned by
 * `delayDurationSelector`.
 * @owner Observable
 * @this {?}
 * @param {?} delayDurationSelector
 * @param {?=} subscriptionDelay
 * @return {?}
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}

var DelayWhenOperator = function () {
    /**
     * @param {?} delayDurationSelector
     */
    function DelayWhenOperator(delayDurationSelector) {
        _classCallCheck(this, DelayWhenOperator);

        this.delayDurationSelector = delayDurationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DelayWhenOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
        }
    }]);

    return DelayWhenOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DelayWhenSubscriber = function (_OuterSubscriber) {
    _inherits(DelayWhenSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} delayDurationSelector
     */
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        _classCallCheck(this, DelayWhenSubscriber);

        var _this = _possibleConstructorReturn(this, (DelayWhenSubscriber.__proto__ || Object.getPrototypeOf(DelayWhenSubscriber)).call(this, destination));

        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        _this.values = [];
        return _this;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(DelayWhenSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(outerValue);
            this.removeSubscription(innerSub);
            this.tryComplete();
        }
        /**
         * @param {?} error
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyError',
        value: function notifyError(error, innerSub) {
            this._error(error);
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            var /** @type {?} */value = this.removeSubscription(innerSub);
            if (value) {
                this.destination.next(value);
            }
            this.tryComplete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            try {
                var /** @type {?} */delayNotifier = this.delayDurationSelector(value);
                if (delayNotifier) {
                    this.tryDelay(delayNotifier, value);
                }
            } catch (err) {
                this.destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.completed = true;
            this.tryComplete();
        }
        /**
         * @param {?} subscription
         * @return {?}
         */

    }, {
        key: 'removeSubscription',
        value: function removeSubscription(subscription) {
            subscription.unsubscribe();
            var /** @type {?} */subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
            var /** @type {?} */value = null;
            if (subscriptionIdx !== -1) {
                value = this.values[subscriptionIdx];
                this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
                this.values.splice(subscriptionIdx, 1);
            }
            return value;
        }
        /**
         * @param {?} delayNotifier
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'tryDelay',
        value: function tryDelay(delayNotifier, value) {
            var /** @type {?} */notifierSubscription = (0, _subscribeToResult.subscribeToResult)(this, delayNotifier, value);
            this.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
            this.values.push(value);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'tryComplete',
        value: function tryComplete() {
            if (this.completed && this.delayNotifierSubscriptions.length === 0) {
                this.destination.complete();
            }
        }
    }]);

    return DelayWhenSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function DelayWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DelayWhenSubscriber.prototype.completed;
    /** @type {?} */
    DelayWhenSubscriber.prototype.delayNotifierSubscriptions;
    /** @type {?} */
    DelayWhenSubscriber.prototype.values;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var SubscriptionDelayObservable = function (_Observable) {
    _inherits(SubscriptionDelayObservable, _Observable);

    /**
     * @param {?} source
     * @param {?} subscriptionDelay
     */
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        _classCallCheck(this, SubscriptionDelayObservable);

        var _this2 = _possibleConstructorReturn(this, (SubscriptionDelayObservable.__proto__ || Object.getPrototypeOf(SubscriptionDelayObservable)).call(this));

        _this2.source = source;
        _this2.subscriptionDelay = subscriptionDelay;
        return _this2;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(SubscriptionDelayObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
        }
    }]);

    return SubscriptionDelayObservable;
}(_Observable2.Observable);
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SubscriptionDelaySubscriber = function (_Subscriber) {
    _inherits(SubscriptionDelaySubscriber, _Subscriber);

    /**
     * @param {?} parent
     * @param {?} source
     */
    function SubscriptionDelaySubscriber(parent, source) {
        _classCallCheck(this, SubscriptionDelaySubscriber);

        var _this3 = _possibleConstructorReturn(this, (SubscriptionDelaySubscriber.__proto__ || Object.getPrototypeOf(SubscriptionDelaySubscriber)).call(this));

        _this3.parent = parent;
        _this3.source = source;
        _this3.sourceSubscribed = false;
        return _this3;
    }
    /**
     * @param {?} unused
     * @return {?}
     */


    _createClass(SubscriptionDelaySubscriber, [{
        key: '_next',
        value: function _next(unused) {
            this.subscribeToSource();
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.unsubscribe();
            this.parent.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.subscribeToSource();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'subscribeToSource',
        value: function subscribeToSource() {
            if (!this.sourceSubscribed) {
                this.sourceSubscribed = true;
                this.unsubscribe();
                this.source.subscribe(this.parent);
            }
        }
    }]);

    return SubscriptionDelaySubscriber;
}(_Subscriber2.Subscriber);

function SubscriptionDelaySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SubscriptionDelaySubscriber.prototype.sourceSubscribed;
}