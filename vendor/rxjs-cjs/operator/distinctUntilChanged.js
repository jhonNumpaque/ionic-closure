'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.distinctUntilChanged = distinctUntilChanged;

var _Subscriber2 = require('../Subscriber');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @owner Observable
 * @this {?}
 * @param {?=} compare
 * @param {?=} keySelector
 * @return {?}
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}

var DistinctUntilChangedOperator = function () {
    /**
     * @param {?} compare
     * @param {?} keySelector
     */
    function DistinctUntilChangedOperator(compare, keySelector) {
        _classCallCheck(this, DistinctUntilChangedOperator);

        this.compare = compare;
        this.keySelector = keySelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DistinctUntilChangedOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
        }
    }]);

    return DistinctUntilChangedOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DistinctUntilChangedSubscriber = function (_Subscriber) {
    _inherits(DistinctUntilChangedSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} compare
     * @param {?} keySelector
     */
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _classCallCheck(this, DistinctUntilChangedSubscriber);

        var _this = _possibleConstructorReturn(this, (DistinctUntilChangedSubscriber.__proto__ || Object.getPrototypeOf(DistinctUntilChangedSubscriber)).call(this, destination));

        _this.keySelector = keySelector;
        _this.hasKey = false;
        if (typeof compare === 'function') {
            _this.compare = compare;
        }
        return _this;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */


    _createClass(DistinctUntilChangedSubscriber, [{
        key: 'compare',
        value: function compare(x, y) {
            return x === y;
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */keySelector = this.keySelector;
            var /** @type {?} */key = value;
            if (keySelector) {
                key = (0, _tryCatch.tryCatch)(this.keySelector)(value);
                if (key === _errorObject.errorObject) {
                    return this.destination.error(_errorObject.errorObject.e);
                }
            }
            var /** @type {?} */result = false;
            if (this.hasKey) {
                result = (0, _tryCatch.tryCatch)(this.compare)(this.key, key);
                if (result === _errorObject.errorObject) {
                    return this.destination.error(_errorObject.errorObject.e);
                }
            } else {
                this.hasKey = true;
            }
            if (Boolean(result) === false) {
                this.key = key;
                this.destination.next(value);
            }
        }
    }]);

    return DistinctUntilChangedSubscriber;
}(_Subscriber2.Subscriber);

function DistinctUntilChangedSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DistinctUntilChangedSubscriber.prototype.key;
    /** @type {?} */
    DistinctUntilChangedSubscriber.prototype.hasKey;
}