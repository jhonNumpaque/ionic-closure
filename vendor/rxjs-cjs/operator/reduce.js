'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReduceSubscriber = exports.ReduceOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.reduce = reduce;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {\@link scan} followed by operator {\@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {\@link count}
 * @see {\@link expand}
 * @see {\@link mergeScan}
 * @see {\@link scan}
 *
 * called on each source value.
 * result of accumulating the values emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} accumulator
 * @param {?=} seed
 * @return {?}
 */
function reduce(accumulator, seed) {
    var /** @type {?} */hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
}

var ReduceOperator = exports.ReduceOperator = function () {
    /**
     * @param {?} accumulator
     * @param {?=} seed
     * @param {?=} hasSeed
     */
    function ReduceOperator(accumulator, seed) {
        var hasSeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, ReduceOperator);

        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ReduceOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
        }
    }]);

    return ReduceOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ReduceSubscriber = exports.ReduceSubscriber = function (_Subscriber) {
    _inherits(ReduceSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} accumulator
     * @param {?} seed
     * @param {?} hasSeed
     */
    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
        _classCallCheck(this, ReduceSubscriber);

        var _this = _possibleConstructorReturn(this, (ReduceSubscriber.__proto__ || Object.getPrototypeOf(ReduceSubscriber)).call(this, destination));

        _this.accumulator = accumulator;
        _this.hasSeed = hasSeed;
        _this.hasValue = false;
        _this.acc = seed;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(ReduceSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.hasValue || (this.hasValue = this.hasSeed)) {
                this._tryReduce(value);
            } else {
                this.acc = value;
                this.hasValue = true;
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_tryReduce',
        value: function _tryReduce(value) {
            var /** @type {?} */result = void 0;
            try {
                result = this.accumulator( /** @type {?} */this.acc, value);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.acc = result;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            if (this.hasValue || this.hasSeed) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    }]);

    return ReduceSubscriber;
}(_Subscriber2.Subscriber);

function ReduceSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ReduceSubscriber.prototype.acc;
    /** @type {?} */
    ReduceSubscriber.prototype.hasValue;
}