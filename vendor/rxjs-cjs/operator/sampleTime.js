'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.sampleTime = sampleTime;

var _Subscriber2 = require('../Subscriber');

var _async = require('../scheduler/async');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.
 *
 * <span class="informal">Samples the source Observable at periodic time
 * intervals, emitting what it samples.</span>
 *
 * <img src="./img/sampleTime.png" width="100%">
 *
 * `sampleTime` periodically looks at the source Observable and emits whichever
 * value it has most recently emitted since the previous sampling, unless the
 * source has not emitted anything since the previous sampling. The sampling
 * happens periodically in time every `period` milliseconds (or the time unit
 * defined by the optional `scheduler` argument). The sampling starts as soon as
 * the output Observable is subscribed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.sampleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sample}
 * @see {\@link throttleTime}
 *
 * time unit determined internally by the optional `scheduler`.
 * managing the timers that handle the sampling.
 * values emitted by the source Observable at the specified time interval.
 * @owner Observable
 * @this {?}
 * @param {?} period
 * @param {?=} scheduler
 * @return {?}
 */
function sampleTime(period) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    return this.lift(new SampleTimeOperator(period, scheduler));
}

var SampleTimeOperator = function () {
    /**
     * @param {?} period
     * @param {?} scheduler
     */
    function SampleTimeOperator(period, scheduler) {
        _classCallCheck(this, SampleTimeOperator);

        this.period = period;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SampleTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
        }
    }]);

    return SampleTimeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SampleTimeSubscriber = function (_Subscriber) {
    _inherits(SampleTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} period
     * @param {?} scheduler
     */
    function SampleTimeSubscriber(destination, period, scheduler) {
        _classCallCheck(this, SampleTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (SampleTimeSubscriber.__proto__ || Object.getPrototypeOf(SampleTimeSubscriber)).call(this, destination));

        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SampleTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.lastValue = value;
            this.hasValue = true;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext() {
            if (this.hasValue) {
                this.hasValue = false;
                this.destination.next(this.lastValue);
            }
        }
    }]);

    return SampleTimeSubscriber;
}(_Subscriber2.Subscriber);

function SampleTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SampleTimeSubscriber.prototype.lastValue;
    /** @type {?} */
    SampleTimeSubscriber.prototype.hasValue;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchNotification(state) {
    var subscriber = state.subscriber,
        period = state.period;

    subscriber.notifyNext();
    this.schedule(state, period);
}