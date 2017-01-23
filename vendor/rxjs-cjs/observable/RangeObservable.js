'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var RangeObservable = exports.RangeObservable = function (_Observable) {
    _inherits(RangeObservable, _Observable);

    _createClass(RangeObservable, null, [{
        key: 'create',

        /**
         * Creates an Observable that emits a sequence of numbers within a specified
         * range.
         *
         * <span class="informal">Emits a sequence of numbers in a range.</span>
         *
         * <img src="./img/range.png" width="100%">
         *
         * `range` operator emits a range of sequential integers, in order, where you
         * select the `start` of the range and its `length`. By default, uses no
         * Scheduler and just delivers the notifications synchronously, but may use
         * an optional Scheduler to regulate those deliveries.
         *
         * var numbers = Rx.Observable.range(1, 10);
         * numbers.subscribe(x => console.log(x));
         *
         * @see {\@link timer}
         * @see {\@link interval}
         *
         * the emissions of the notifications.
         * sequential integers.
         * @owner Observable
         * @param {?=} start
         * @param {?=} count
         * @param {?=} scheduler
         * @return {?}
         */
        value: function create() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var scheduler = arguments[2];

            return new RangeObservable(start, count, scheduler);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var start = state.start,
                index = state.index,
                count = state.count,
                subscriber = state.subscriber;

            if (index >= count) {
                subscriber.complete();
                return;
            }
            subscriber.next(start);
            if (subscriber.closed) {
                return;
            }
            state.index = index + 1;
            state.start = start + 1;
            this.schedule(state);
        }
        /**
         * @param {?} start
         * @param {?} count
         * @param {?=} scheduler
         */

    }]);

    function RangeObservable(start, count, scheduler) {
        _classCallCheck(this, RangeObservable);

        var _this = _possibleConstructorReturn(this, (RangeObservable.__proto__ || Object.getPrototypeOf(RangeObservable)).call(this));

        _this.start = start;
        _this._count = count;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(RangeObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var /** @type {?} */start = this.start;
            var /** @type {?} */count = this._count;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(RangeObservable.dispatch, 0, {
                    index: index, count: count, start: start, subscriber: subscriber
                });
            } else {
                do {
                    if (index++ >= count) {
                        subscriber.complete();
                        break;
                    }
                    subscriber.next(start++);
                    if (subscriber.closed) {
                        break;
                    }
                } while (true);
            }
        }
    }]);

    return RangeObservable;
}(_Observable2.Observable);

function RangeObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    RangeObservable.prototype.start;
    /** @type {?} */
    RangeObservable.prototype._count;
    /** @type {?} */
    RangeObservable.prototype.scheduler;
}