'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _ScalarObservable = require('./ScalarObservable');

var _EmptyObservable = require('./EmptyObservable');

var _isScheduler = require('../util/isScheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ArrayObservable = exports.ArrayObservable = function (_Observable) {
    _inherits(ArrayObservable, _Observable);

    /**
     * @param {?} array
     * @param {?=} scheduler
     */
    function ArrayObservable(array, scheduler) {
        _classCallCheck(this, ArrayObservable);

        var _this = _possibleConstructorReturn(this, (ArrayObservable.__proto__ || Object.getPrototypeOf(ArrayObservable)).call(this));

        _this.array = array;
        _this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            _this._isScalar = true;
            _this.value = array[0];
        }
        return _this;
    }
    /**
     * @param {?} array
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(ArrayObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var /** @type {?} */array = this.array;
            var /** @type {?} */count = array.length;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(ArrayObservable.dispatch, 0, {
                    array: array, index: index, count: count, subscriber: subscriber
                });
            } else {
                for (var /** @type {?} */i = 0; i < count && !subscriber.closed; i++) {
                    subscriber.next(array[i]);
                }
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(array, scheduler) {
            return new ArrayObservable(array, scheduler);
        }
        /**
         * Creates an Observable that emits some values you specify as arguments,
         * immediately one after the other, and then emits a complete notification.
         *
         * <span class="informal">Emits the arguments you provide, then completes.
         * </span>
         *
         * <img src="./img/of.png" width="100%">
         *
         * This static operator is useful for creating a simple Observable that only
         * emits the arguments given, and the complete notification thereafter. It can
         * be used for composing with other Observables, such as with {\@link concat}.
         * By default, it uses a `null` Scheduler, which means the `next`
         * notifications are sent synchronously, although with a different Scheduler
         * it is possible to determine when those notifications will be delivered.
         *
         * var numbers = Rx.Observable.of(10, 20, 30);
         * var letters = Rx.Observable.of('a', 'b', 'c');
         * var interval = Rx.Observable.interval(1000);
         * var result = numbers.concat(letters).concat(interval);
         * result.subscribe(x => console.log(x));
         *
         * @see {\@link create}
         * @see {\@link empty}
         * @see {\@link never}
         * @see {\@link throw}
         *
         * the emissions of the `next` notifications.
         * @owner Observable
         * @param {...?} array
         * @return {?}
         */

    }, {
        key: 'of',
        value: function of() {
            for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
                array[_key] = arguments[_key];
            }

            var /** @type {?} */scheduler = array[array.length - 1];
            if ((0, _isScheduler.isScheduler)(scheduler)) {
                array.pop();
            } else {
                scheduler = null;
            }
            var /** @type {?} */len = array.length;
            if (len > 1) {
                return new ArrayObservable( /** @type {?} */array, scheduler);
            } else if (len === 1) {
                return new _ScalarObservable.ScalarObservable( /** @type {?} */array[0], scheduler);
            } else {
                return new _EmptyObservable.EmptyObservable(scheduler);
            }
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var array = state.array,
                index = state.index,
                count = state.count,
                subscriber = state.subscriber;

            if (index >= count) {
                subscriber.complete();
                return;
            }
            subscriber.next(array[index]);
            if (subscriber.closed) {
                return;
            }
            state.index = index + 1;
            this.schedule(state);
        }
    }]);

    return ArrayObservable;
}(_Observable2.Observable);

function ArrayObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayObservable.prototype.value;
}