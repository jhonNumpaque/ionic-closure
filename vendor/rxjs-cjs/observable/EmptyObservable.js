'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var EmptyObservable = exports.EmptyObservable = function (_Observable) {
    _inherits(EmptyObservable, _Observable);

    /**
     * @param {?=} scheduler
     */
    function EmptyObservable(scheduler) {
        _classCallCheck(this, EmptyObservable);

        var _this = _possibleConstructorReturn(this, (EmptyObservable.__proto__ || Object.getPrototypeOf(EmptyObservable)).call(this));

        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {\@link mergeMap}.
     *
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {\@link create}
     * @see {\@link never}
     * @see {\@link of}
     * @see {\@link throw}
     *
     * the emission of the complete notification.
     * notification.
     * @owner Observable
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(EmptyObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
            } else {
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(scheduler) {
            return new EmptyObservable(scheduler);
        }
        /**
         * @param {?} arg
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(arg) {
            var subscriber = arg.subscriber;

            subscriber.complete();
        }
    }]);

    return EmptyObservable;
}(_Observable2.Observable);