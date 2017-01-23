'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.count = count;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Counts the number of emissions on the source and emits that number when the
 * source completes.
 *
 * <span class="informal">Tells how many values were emitted, when the source
 * completes.</span>
 *
 * <img src="./img/count.png" width="100%">
 *
 * `count` transforms an Observable that emits values into an Observable that
 * emits a single value that represents the number of values emitted by the
 * source Observable. If the source Observable terminates with an error, `count`
 * will pass this error notification along without emitting an value first. If
 * the source Observable does not terminate at all, `count` will neither emit
 * a value nor terminate. This operator takes an optional `predicate` function
 * as argument, in which case the output emission will represent the number of
 * source values that matched `true` with the `predicate`.
 *
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var secondsBeforeClick = seconds.takeUntil(clicks);
 * var result = secondsBeforeClick.count();
 * result.subscribe(x => console.log(x));
 *
 * var numbers = Rx.Observable.range(1, 7);
 * var result = numbers.count(i => i % 2 === 1);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // 4
 *
 * @see {\@link max}
 * @see {\@link min}
 * @see {\@link reduce}
 *
 * boolean function to select what values are to be counted. It is provided with
 * arguments of:
 * - `value`: the value from the source Observable.
 * - `index`: the (zero-based) "index" of the value from the source Observable.
 * - `source`: the source Observable instance itself.
 * described above.
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @return {?}
 */
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}

var CountOperator = function () {
    /**
     * @param {?=} predicate
     * @param {?=} source
     */
    function CountOperator(predicate, source) {
        _classCallCheck(this, CountOperator);

        this.predicate = predicate;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(CountOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
        }
    }]);

    return CountOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var CountSubscriber = function (_Subscriber) {
    _inherits(CountSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} source
     */
    function CountSubscriber(destination, predicate, source) {
        _classCallCheck(this, CountSubscriber);

        var _this = _possibleConstructorReturn(this, (CountSubscriber.__proto__ || Object.getPrototypeOf(CountSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(CountSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.predicate) {
                this._tryPredicate(value);
            } else {
                this.count++;
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_tryPredicate',
        value: function _tryPredicate(value) {
            var /** @type {?} */result = void 0;
            try {
                result = this.predicate(value, this.index++, this.source);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.count++;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.destination.next(this.count);
            this.destination.complete();
        }
    }]);

    return CountSubscriber;
}(_Subscriber2.Subscriber);

function CountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    CountSubscriber.prototype.count;
    /** @type {?} */
    CountSubscriber.prototype.index;
}