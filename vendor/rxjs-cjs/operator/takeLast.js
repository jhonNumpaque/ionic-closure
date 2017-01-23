'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.takeLast = takeLast;

var _Subscriber2 = require('../Subscriber');

var _ArgumentOutOfRangeError = require('../util/ArgumentOutOfRangeError');

var _EmptyObservable = require('../observable/EmptyObservable');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeUntil}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * the sequence of values emitted by the source Observable.
 * values emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} count
 * @return {?}
 */
function takeLast(count) {
    if (count === 0) {
        return new _EmptyObservable.EmptyObservable();
    } else {
        return this.lift(new TakeLastOperator(count));
    }
}

var TakeLastOperator = function () {
    /**
     * @param {?} total
     */
    function TakeLastOperator(total) {
        _classCallCheck(this, TakeLastOperator);

        this.total = total;
        if (this.total < 0) {
            throw new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
        }
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(TakeLastOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
        }
    }]);

    return TakeLastOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TakeLastSubscriber = function (_Subscriber) {
    _inherits(TakeLastSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} total
     */
    function TakeLastSubscriber(destination, total) {
        _classCallCheck(this, TakeLastSubscriber);

        var _this = _possibleConstructorReturn(this, (TakeLastSubscriber.__proto__ || Object.getPrototypeOf(TakeLastSubscriber)).call(this, destination));

        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(TakeLastSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */ring = this.ring;
            var /** @type {?} */total = this.total;
            var /** @type {?} */count = this.count++;
            if (ring.length < total) {
                ring.push(value);
            } else {
                var /** @type {?} */index = count % total;
                ring[index] = value;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            var /** @type {?} */count = this.count;
            if (count > 0) {
                var /** @type {?} */total = this.count >= this.total ? this.total : this.count;
                var /** @type {?} */ring = this.ring;
                for (var /** @type {?} */i = 0; i < total; i++) {
                    var /** @type {?} */idx = count++ % total;
                    destination.next(ring[idx]);
                }
            }
            destination.complete();
        }
    }]);

    return TakeLastSubscriber;
}(_Subscriber2.Subscriber);

function TakeLastSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeLastSubscriber.prototype.ring;
    /** @type {?} */
    TakeLastSubscriber.prototype.count;
}