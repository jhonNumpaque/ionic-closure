'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FromObservable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray = require('../util/isArray');

var _isPromise = require('../util/isPromise');

var _PromiseObservable = require('./PromiseObservable');

var _IteratorObservable = require('./IteratorObservable');

var _ArrayObservable = require('./ArrayObservable');

var _ArrayLikeObservable = require('./ArrayLikeObservable');

var _iterator = require('../symbol/iterator');

var _Observable2 = require('../Observable');

var _observeOn = require('../operator/observeOn');

var _observable = require('../symbol/observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var /** @type {?} */isArrayLike = function isArrayLike(x) {
    return x && typeof x.length === 'number';
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var FromObservable = exports.FromObservable = function (_Observable) {
    _inherits(FromObservable, _Observable);

    /**
     * @param {?} ish
     * @param {?=} scheduler
     */
    function FromObservable(ish, scheduler) {
        _classCallCheck(this, FromObservable);

        var _this = _possibleConstructorReturn(this, (FromObservable.__proto__ || Object.getPrototypeOf(FromObservable)).call(this, null));

        _this.ish = ish;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {\@link create}
     * @see {\@link fromEvent}
     * @see {\@link fromEventPattern}
     * @see {\@link fromPromise}
     *
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * emissions of values.
     * input object that was converted.
     * @owner Observable
     * @param {?} ish
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(FromObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */ish = this.ish;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler == null) {
                return ish[_observable.$$observable]().subscribe(subscriber);
            } else {
                return ish[_observable.$$observable]().subscribe(new _observeOn.ObserveOnSubscriber(subscriber, scheduler, 0));
            }
        }
    }], [{
        key: 'create',
        value: function create(ish, scheduler) {
            if (ish != null) {
                if (typeof ish[_observable.$$observable] === 'function') {
                    if (ish instanceof _Observable2.Observable && !scheduler) {
                        return ish;
                    }
                    return new FromObservable(ish, scheduler);
                } else if ((0, _isArray.isArray)(ish)) {
                    return new _ArrayObservable.ArrayObservable(ish, scheduler);
                } else if ((0, _isPromise.isPromise)(ish)) {
                    return new _PromiseObservable.PromiseObservable(ish, scheduler);
                } else if (typeof ish[_iterator.$$iterator] === 'function' || typeof ish === 'string') {
                    return new _IteratorObservable.IteratorObservable(ish, scheduler);
                } else if (isArrayLike(ish)) {
                    return new _ArrayLikeObservable.ArrayLikeObservable(ish, scheduler);
                }
            }
            throw new TypeError((ish !== null && (typeof ish === 'undefined' ? 'undefined' : _typeof(ish)) || ish) + ' is not observable');
        }
    }]);

    return FromObservable;
}(_Observable2.Observable);