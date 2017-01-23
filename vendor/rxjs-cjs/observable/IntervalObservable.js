'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IntervalObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isNumeric = require('../util/isNumeric');

var _Observable2 = require('../Observable');

var _async = require('../scheduler/async');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var IntervalObservable = exports.IntervalObservable = function (_Observable) {
    _inherits(IntervalObservable, _Observable);

    /**
     * @param {?=} period
     * @param {?=} scheduler
     */
    function IntervalObservable() {
        var period = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

        _classCallCheck(this, IntervalObservable);

        var _this = _possibleConstructorReturn(this, (IntervalObservable.__proto__ || Object.getPrototypeOf(IntervalObservable)).call(this));

        _this.period = period;
        _this.scheduler = scheduler;
        if (!(0, _isNumeric.isNumeric)(period) || period < 0) {
            _this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = _async.async;
        }
        return _this;
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified Scheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` Scheduler to provide a notion of time, but you may pass any
     * Scheduler to it.
     *
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {\@link timer}
     * @see {\@link delay}
     *
     * or the time unit determined by the scheduler's clock.
     * the emission of values, and providing a notion of "time".
     * interval.
     * @owner Observable
     * @param {?=} period
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(IntervalObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var /** @type {?} */period = this.period;
            var /** @type {?} */scheduler = this.scheduler;
            subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
                index: index, subscriber: subscriber, period: period
            }));
        }
    }], [{
        key: 'create',
        value: function create() {
            var period = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

            return new IntervalObservable(period, scheduler);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var index = state.index,
                subscriber = state.subscriber,
                period = state.period;

            subscriber.next(index);
            if (subscriber.closed) {
                return;
            }
            state.index += 1;
            this.schedule(state, period);
        }
    }]);

    return IntervalObservable;
}(_Observable2.Observable);