'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.scan = scan;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {\@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {\@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {\@link expand}
 * @see {\@link mergeScan}
 * @see {\@link reduce}
 *
 * The accumulator function called on each source value.
 * @owner Observable
 * @this {?}
 * @param {?} accumulator
 * @param {?=} seed
 * @return {?}
 */
function scan(accumulator, seed) {
    var /** @type {?} */hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}

var ScanOperator = function () {
    /**
     * @param {?} accumulator
     * @param {?=} seed
     * @param {?=} hasSeed
     */
    function ScanOperator(accumulator, seed) {
        var hasSeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, ScanOperator);

        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ScanOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
        }
    }]);

    return ScanOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ScanSubscriber = function (_Subscriber) {
    _inherits(ScanSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} accumulator
     * @param {?} _seed
     * @param {?} hasSeed
     */
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _classCallCheck(this, ScanSubscriber);

        var _this = _possibleConstructorReturn(this, (ScanSubscriber.__proto__ || Object.getPrototypeOf(ScanSubscriber)).call(this, destination));

        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(ScanSubscriber, [{
        key: '_next',

        /**
         * @param {?} value
         * @return {?}
         */
        value: function _next(value) {
            if (!this.hasSeed) {
                this.seed = value;
                this.destination.next(value);
            } else {
                return this._tryNext(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_tryNext',
        value: function _tryNext(value) {
            var /** @type {?} */index = this.index++;
            var /** @type {?} */result = void 0;
            try {
                result = this.accumulator( /** @type {?} */this.seed, value, index);
            } catch (err) {
                this.destination.error(err);
            }
            this.seed = result;
            this.destination.next(result);
        }
    }, {
        key: 'seed',
        get: function get() {
            return this._seed;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
            this.hasSeed = true;
            this._seed = value;
        }
    }]);

    return ScanSubscriber;
}(_Subscriber2.Subscriber);

function ScanSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ScanSubscriber.prototype.index;
}