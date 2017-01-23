'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DistinctSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.distinct = distinct;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

var _Set = require('../util/Set');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
 * source observable directly with an equality check against previous values.
 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
 * that the internal `Set` can be "flushed", basically clearing it of values.
 * @owner Observable
 * @this {?}
 * @param {?=} keySelector
 * @param {?=} flushes
 * @return {?}
 */
function distinct(keySelector, flushes) {
    return this.lift(new DistinctOperator(keySelector, flushes));
}

var DistinctOperator = function () {
    /**
     * @param {?} keySelector
     * @param {?} flushes
     */
    function DistinctOperator(keySelector, flushes) {
        _classCallCheck(this, DistinctOperator);

        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DistinctOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
        }
    }]);

    return DistinctOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DistinctSubscriber = exports.DistinctSubscriber = function (_OuterSubscriber) {
    _inherits(DistinctSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} keySelector
     * @param {?} flushes
     */
    function DistinctSubscriber(destination, keySelector, flushes) {
        _classCallCheck(this, DistinctSubscriber);

        var _this = _possibleConstructorReturn(this, (DistinctSubscriber.__proto__ || Object.getPrototypeOf(DistinctSubscriber)).call(this, destination));

        _this.keySelector = keySelector;
        _this.values = new _Set.Set();
        if (flushes) {
            _this.add((0, _subscribeToResult.subscribeToResult)(_this, flushes));
        }
        return _this;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(DistinctSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.values.clear();
        }
        /**
         * @param {?} error
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyError',
        value: function notifyError(error, innerSub) {
            this._error(error);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            if (this.keySelector) {
                this._useKeySelector(value);
            } else {
                this._finalizeNext(value, value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_useKeySelector',
        value: function _useKeySelector(value) {
            var /** @type {?} */key = void 0;
            var destination = this.destination;

            try {
                key = this.keySelector(value);
            } catch (err) {
                destination.error(err);
                return;
            }
            this._finalizeNext(key, value);
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_finalizeNext',
        value: function _finalizeNext(key, value) {
            var values = this.values;

            if (!values.has( /** @type {?} */key)) {
                values.add( /** @type {?} */key);
                this.destination.next(value);
            }
        }
    }]);

    return DistinctSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function DistinctSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DistinctSubscriber.prototype.values;
}