'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.defaultIfEmpty = defaultIfEmpty;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link empty}
 * @see {\@link last}
 *
 * Observable is empty.
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} defaultValue
 * @return {?}
 */
function defaultIfEmpty() {
    var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}

var DefaultIfEmptyOperator = function () {
    /**
     * @param {?} defaultValue
     */
    function DefaultIfEmptyOperator(defaultValue) {
        _classCallCheck(this, DefaultIfEmptyOperator);

        this.defaultValue = defaultValue;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DefaultIfEmptyOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
        }
    }]);

    return DefaultIfEmptyOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DefaultIfEmptySubscriber = function (_Subscriber) {
    _inherits(DefaultIfEmptySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} defaultValue
     */
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _classCallCheck(this, DefaultIfEmptySubscriber);

        var _this = _possibleConstructorReturn(this, (DefaultIfEmptySubscriber.__proto__ || Object.getPrototypeOf(DefaultIfEmptySubscriber)).call(this, destination));

        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(DefaultIfEmptySubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.isEmpty = false;
            this.destination.next(value);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            if (this.isEmpty) {
                this.destination.next(this.defaultValue);
            }
            this.destination.complete();
        }
    }]);

    return DefaultIfEmptySubscriber;
}(_Subscriber2.Subscriber);

function DefaultIfEmptySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultIfEmptySubscriber.prototype.isEmpty;
}