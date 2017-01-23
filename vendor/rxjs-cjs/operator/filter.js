'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.filter = filter;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {\@link distinct}
 * @see {\@link distinctUntilChanged}
 * @see {\@link distinctUntilKeyChanged}
 * @see {\@link ignoreElements}
 * @see {\@link partition}
 * @see {\@link skip}
 *
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * in the `predicate` function.
 * allowed by the `predicate` function.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}

var FilterOperator = function () {
    /**
     * @param {?} predicate
     * @param {?=} thisArg
     */
    function FilterOperator(predicate, thisArg) {
        _classCallCheck(this, FilterOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(FilterOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
        }
    }]);

    return FilterOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var FilterSubscriber = function (_Subscriber) {
    _inherits(FilterSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} thisArg
     */
    function FilterSubscriber(destination, predicate, thisArg) {
        _classCallCheck(this, FilterSubscriber);

        var _this = _possibleConstructorReturn(this, (FilterSubscriber.__proto__ || Object.getPrototypeOf(FilterSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        _this.predicate = predicate;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(FilterSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */result = void 0;
            try {
                result = this.predicate.call(this.thisArg, value, this.count++);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                this.destination.next(value);
            }
        }
    }]);

    return FilterSubscriber;
}(_Subscriber2.Subscriber);

function FilterSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterSubscriber.prototype.count;
}