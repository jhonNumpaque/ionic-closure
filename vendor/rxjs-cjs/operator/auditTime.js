'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.auditTime = auditTime;

var _async = require('../scheduler/async');

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.
 *
 * <span class="informal">When it sees a source values, it ignores that plus
 * the next ones for `duration` milliseconds, and then it emits the most recent
 * value from the source.</span>
 *
 * <img src="./img/auditTime.png" width="100%">
 *
 * `auditTime` is similar to `throttleTime`, but emits the last value from the
 * silenced time window, instead of the first value. `auditTime` emits the most
 * recent value from the source Observable on the output Observable as soon as
 * its internal timer becomes disabled, and ignores source values while the
 * timer is enabled. Initially, the timer is disabled. As soon as the first
 * source value arrives, the timer is enabled. After `duration` milliseconds (or
 * the time unit determined internally by the optional `scheduler`) has passed,
 * the timer is disabled, then the most recent source value is emitted on the
 * output Observable, and this process repeats for the next source value.
 * Optionally takes a {\@link Scheduler} for managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.auditTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttleTime}
 *
 * value, measured in milliseconds or the time unit determined internally
 * by the optional `scheduler`.
 * managing the timers that handle the rate-limiting behavior.
 * emissions from the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} duration
 * @param {?=} scheduler
 * @return {?}
 */
function auditTime(duration) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    return this.lift(new AuditTimeOperator(duration, scheduler));
}

var AuditTimeOperator = function () {
    /**
     * @param {?} duration
     * @param {?} scheduler
     */
    function AuditTimeOperator(duration, scheduler) {
        _classCallCheck(this, AuditTimeOperator);

        this.duration = duration;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(AuditTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
        }
    }]);

    return AuditTimeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var AuditTimeSubscriber = function (_Subscriber) {
    _inherits(AuditTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} duration
     * @param {?} scheduler
     */
    function AuditTimeSubscriber(destination, duration, scheduler) {
        _classCallCheck(this, AuditTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (AuditTimeSubscriber.__proto__ || Object.getPrototypeOf(AuditTimeSubscriber)).call(this, destination));

        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(AuditTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.value = value;
            this.hasValue = true;
            if (!this.throttled) {
                this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'clearThrottle',
        value: function clearThrottle() {
            var value = this.value,
                hasValue = this.hasValue,
                throttled = this.throttled;

            if (throttled) {
                this.remove(throttled);
                this.throttled = null;
                throttled.unsubscribe();
            }
            if (hasValue) {
                this.value = null;
                this.hasValue = false;
                this.destination.next(value);
            }
        }
    }]);

    return AuditTimeSubscriber;
}(_Subscriber2.Subscriber);

function AuditTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditTimeSubscriber.prototype.value;
    /** @type {?} */
    AuditTimeSubscriber.prototype.hasValue;
    /** @type {?} */
    AuditTimeSubscriber.prototype.throttled;
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}