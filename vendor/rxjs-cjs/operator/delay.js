'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.delay = delay;

var _async = require('../scheduler/async');

var _isDate = require('../util/isDate');

var _Subscriber2 = require('../Subscriber');

var _Notification = require('../Notification');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {\@link debounceTime}
 * @see {\@link delayWhen}
 *
 * a `Date` until which the emission of the source items is delayed.
 * managing the timers that handle the time-shift for each item.
 * Observable by the specified timeout or Date.
 * @owner Observable
 * @this {?}
 * @param {?} delay
 * @param {?=} scheduler
 * @return {?}
 */
function delay(delay) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    var /** @type {?} */absoluteDelay = (0, _isDate.isDate)(delay);
    var /** @type {?} */delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs( /** @type {?} */delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}

var DelayOperator = function () {
    /**
     * @param {?} delay
     * @param {?} scheduler
     */
    function DelayOperator(delay, scheduler) {
        _classCallCheck(this, DelayOperator);

        this.delay = delay;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DelayOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
        }
    }]);

    return DelayOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DelaySubscriber = function (_Subscriber) {
    _inherits(DelaySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} delay
     * @param {?} scheduler
     */
    function DelaySubscriber(destination, delay, scheduler) {
        _classCallCheck(this, DelaySubscriber);

        var _this = _possibleConstructorReturn(this, (DelaySubscriber.__proto__ || Object.getPrototypeOf(DelaySubscriber)).call(this, destination));

        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
    }
    /**
     * @param {?} state
     * @return {?}
     */


    _createClass(DelaySubscriber, [{
        key: '_schedule',

        /**
         * @param {?} scheduler
         * @return {?}
         */
        value: function _schedule(scheduler) {
            this.active = true;
            this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
                source: this, destination: this.destination, scheduler: scheduler
            }));
        }
        /**
         * @param {?} notification
         * @return {?}
         */

    }, {
        key: 'scheduleNotification',
        value: function scheduleNotification(notification) {
            if (this.errored === true) {
                return;
            }
            var /** @type {?} */scheduler = this.scheduler;
            var /** @type {?} */message = new DelayMessage(scheduler.now() + this.delay, notification);
            this.queue.push(message);
            if (this.active === false) {
                this._schedule(scheduler);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.scheduleNotification(_Notification.Notification.createNext(value));
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.errored = true;
            this.queue = [];
            this.destination.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.scheduleNotification(_Notification.Notification.createComplete());
        }
    }], [{
        key: 'dispatch',
        value: function dispatch(state) {
            var /** @type {?} */source = state.source;
            var /** @type {?} */queue = source.queue;
            var /** @type {?} */scheduler = state.scheduler;
            var /** @type {?} */destination = state.destination;
            while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
                queue.shift().notification.observe(destination);
            }
            if (queue.length > 0) {
                var /** @type {?} */_delay = Math.max(0, queue[0].time - scheduler.now());
                this.schedule(state, _delay);
            } else {
                source.active = false;
            }
        }
    }]);

    return DelaySubscriber;
}(_Subscriber2.Subscriber);

function DelaySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DelaySubscriber.prototype.queue;
    /** @type {?} */
    DelaySubscriber.prototype.active;
    /** @type {?} */
    DelaySubscriber.prototype.errored;
}

var DelayMessage =
/**
 * @param {?} time
 * @param {?} notification
 */
function DelayMessage(time, notification) {
    _classCallCheck(this, DelayMessage);

    this.time = time;
    this.notification = notification;
};