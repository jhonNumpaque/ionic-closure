'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimerObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isNumeric = require('../util/isNumeric');

var _Observable2 = require('../Observable');

var _async = require('../scheduler/async');

var _isScheduler = require('../util/isScheduler');

var _isDate = require('../util/isDate');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var TimerObservable = exports.TimerObservable = function (_Observable) {
    _inherits(TimerObservable, _Observable);

    /**
     * @param {?=} dueTime
     * @param {?=} period
     * @param {?=} scheduler
     */
    function TimerObservable() {
        var dueTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var period = arguments[1];
        var scheduler = arguments[2];

        _classCallCheck(this, TimerObservable);

        var _this = _possibleConstructorReturn(this, (TimerObservable.__proto__ || Object.getPrototypeOf(TimerObservable)).call(this));

        _this.period = -1;
        _this.dueTime = 0;
        if ((0, _isNumeric.isNumeric)(period)) {
            _this.period = Number(period) < 1 && 1 || Number(period);
        } else if ((0, _isScheduler.isScheduler)(period)) {
            scheduler = period;
        }
        if (!(0, _isScheduler.isScheduler)(scheduler)) {
            scheduler = _async.async;
        }
        _this.scheduler = scheduler;
        _this.dueTime = (0, _isDate.isDate)(dueTime) ? +dueTime - _this.scheduler.now() : dueTime;
        return _this;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {\@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {\@link Date}. By default, this
     * operator uses the `async` Scheduler to provide a notion of time, but you
     * may pass any Scheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {\@link interval}
     * @see {\@link delay}
     *
     * emitting the first value of `0`.
     * subsequent numbers.
     * the emission of values, and providing a notion of "time".
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @owner Observable
     * @param {?=} initialDelay
     * @param {?=} period
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(TimerObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var period = this.period,
                dueTime = this.dueTime,
                scheduler = this.scheduler;

            return scheduler.schedule(TimerObservable.dispatch, dueTime, {
                index: index, period: period, subscriber: subscriber
            });
        }
    }], [{
        key: 'create',
        value: function create() {
            var initialDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var period = arguments[1];
            var scheduler = arguments[2];

            return new TimerObservable(initialDelay, period, scheduler);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var index = state.index,
                period = state.period,
                subscriber = state.subscriber;

            var /** @type {?} */action = this;
            subscriber.next(index);
            if (subscriber.closed) {
                return;
            } else if (period === -1) {
                return subscriber.complete();
            }
            state.index = index + 1;
            action.schedule(state, period);
        }
    }]);

    return TimerObservable;
}(_Observable2.Observable);

function TimerObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    TimerObservable.prototype.period;
    /** @type {?} */
    TimerObservable.prototype.dueTime;
    /** @type {?} */
    TimerObservable.prototype.scheduler;
}