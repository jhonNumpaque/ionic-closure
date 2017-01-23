'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.elementAt = elementAt;

var _Subscriber2 = require('../Subscriber');

var _ArgumentOutOfRangeError = require('../util/ArgumentOutOfRangeError');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.
 *
 * <span class="informal">Emits only the i-th value, then completes.</span>
 *
 * <img src="./img/elementAt.png" width="100%">
 *
 * `elementAt` returns an Observable that emits the item at the specified
 * `index` in the source Observable, or a default value if that `index` is out
 * of range and the `default` argument is provided. If the `default` argument is
 * not given and the `index` is out of range, the output Observable will emit an
 * `ArgumentOutOfRangeError` error.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.elementAt(2);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // click 1 = nothing
 * // click 2 = nothing
 * // click 3 = MouseEvent object logged to console
 *
 * @see {\@link first}
 * @see {\@link last}
 * @see {\@link skip}
 * @see {\@link single}
 * @see {\@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
 * Observable has completed before emitting the i-th `next` notification.
 *
 * happened since the subscription, starting from the number `0`.
 * Otherwise, will emit the default value if given. If not, then emits an error.
 * @owner Observable
 * @this {?}
 * @param {?} index
 * @param {?=} defaultValue
 * @return {?}
 */
function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}

var ElementAtOperator = function () {
    /**
     * @param {?} index
     * @param {?=} defaultValue
     */
    function ElementAtOperator(index, defaultValue) {
        _classCallCheck(this, ElementAtOperator);

        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
        }
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ElementAtOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
        }
    }]);

    return ElementAtOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ElementAtSubscriber = function (_Subscriber) {
    _inherits(ElementAtSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} index
     * @param {?=} defaultValue
     */
    function ElementAtSubscriber(destination, index, defaultValue) {
        _classCallCheck(this, ElementAtSubscriber);

        var _this = _possibleConstructorReturn(this, (ElementAtSubscriber.__proto__ || Object.getPrototypeOf(ElementAtSubscriber)).call(this, destination));

        _this.index = index;
        _this.defaultValue = defaultValue;
        return _this;
    }
    /**
     * @param {?} x
     * @return {?}
     */


    _createClass(ElementAtSubscriber, [{
        key: '_next',
        value: function _next(x) {
            if (this.index-- === 0) {
                this.destination.next(x);
                this.destination.complete();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            if (this.index >= 0) {
                if (typeof this.defaultValue !== 'undefined') {
                    destination.next(this.defaultValue);
                } else {
                    destination.error(new _ArgumentOutOfRangeError.ArgumentOutOfRangeError());
                }
            }
            destination.complete();
        }
    }]);

    return ElementAtSubscriber;
}(_Subscriber2.Subscriber);