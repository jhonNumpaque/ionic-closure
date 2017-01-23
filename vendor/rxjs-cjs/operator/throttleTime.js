'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.throttleTime = throttleTime;

var _Subscriber2 = require('../Subscriber');

var _async = require('../scheduler/async');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.
 *
 * <span class="informal">Lets a value pass, then ignores source values for the
 * next `duration` milliseconds.</span>
 *
 * <img src="./img/throttleTime.png" width="100%">
 *
 * `throttleTime` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled. After `duration` milliseconds (or the time unit determined
 * internally by the optional `scheduler`) has passed, the timer is disabled,
 * and this process repeats for the next source value. Optionally takes a
 * {\@link Scheduler} for managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttle}
 *
 * emitting the last value, measured in milliseconds or the time unit determined
 * internally by the optional `scheduler`.
 * managing the timers that handle the sampling.
 * limit the rate of emissions from the source.
 * @owner Observable
 * @this {?}
 * @param {?} duration
 * @param {?=} scheduler
 * @return {?}
 */
function throttleTime(duration) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    return this.lift(new ThrottleTimeOperator(duration, scheduler));
}

var ThrottleTimeOperator = function () {
    /**
     * @param {?} duration
     * @param {?} scheduler
     */
    function ThrottleTimeOperator(duration, scheduler) {
        _classCallCheck(this, ThrottleTimeOperator);

        this.duration = duration;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ThrottleTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
        }
    }]);

    return ThrottleTimeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ThrottleTimeSubscriber = function (_Subscriber) {
    _inherits(ThrottleTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} duration
     * @param {?} scheduler
     */
    function ThrottleTimeSubscriber(destination, duration, scheduler) {
        _classCallCheck(this, ThrottleTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (ThrottleTimeSubscriber.__proto__ || Object.getPrototypeOf(ThrottleTimeSubscriber)).call(this, destination));

        _this.duration = duration;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(ThrottleTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (!this.throttled) {
                this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
                this.destination.next(value);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'clearThrottle',
        value: function clearThrottle() {
            var /** @type {?} */throttled = this.throttled;
            if (throttled) {
                throttled.unsubscribe();
                this.remove(throttled);
                this.throttled = null;
            }
        }
    }]);

    return ThrottleTimeSubscriber;
}(_Subscriber2.Subscriber);

function ThrottleTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ThrottleTimeSubscriber.prototype.throttled;
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    var subscriber = arg.subscriber;

    subscriber.clearThrottle();
}