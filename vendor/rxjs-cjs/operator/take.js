'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.take = take;

var _Subscriber2 = require('../Subscriber');

var _ArgumentOutOfRangeError = require('../util/ArgumentOutOfRangeError');

var _EmptyObservable = require('../observable/EmptyObservable');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {\@link takeLast}
 * @see {\@link takeUntil}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @owner Observable
 * @this {?}
 * @param {?} count
 * @return {?}
 */
function take(count) {
    if (count === 0) {
        return new _EmptyObservable.EmptyObservable();
    } else {
        return this.lift(new TakeOperator(count));
    }
}

var TakeOperator = function () {
    /**
     * @param {?} total
     */
    function TakeOperator(total) {
        _classCallCheck(this, TakeOperator);

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


    _createClass(TakeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TakeSubscriber(subscriber, this.total));
        }
    }]);

    return TakeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TakeSubscriber = function (_Subscriber) {
    _inherits(TakeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} total
     */
    function TakeSubscriber(destination, total) {
        _classCallCheck(this, TakeSubscriber);

        var _this = _possibleConstructorReturn(this, (TakeSubscriber.__proto__ || Object.getPrototypeOf(TakeSubscriber)).call(this, destination));

        _this.total = total;
        _this.count = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(TakeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */total = this.total;
            var /** @type {?} */count = ++this.count;
            if (count <= total) {
                this.destination.next(value);
                if (count === total) {
                    this.destination.complete();
                    this.unsubscribe();
                }
            }
        }
    }]);

    return TakeSubscriber;
}(_Subscriber2.Subscriber);

function TakeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeSubscriber.prototype.count;
}