'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ForkJoinObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _EmptyObservable = require('./EmptyObservable');

var _isArray = require('../util/isArray');

var _subscribeToResult = require('../util/subscribeToResult');

var _OuterSubscriber2 = require('../OuterSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ForkJoinObservable = exports.ForkJoinObservable = function (_Observable) {
    _inherits(ForkJoinObservable, _Observable);

    /**
     * @param {?} sources
     * @param {?=} resultSelector
     */
    function ForkJoinObservable(sources, resultSelector) {
        _classCallCheck(this, ForkJoinObservable);

        var _this = _possibleConstructorReturn(this, (ForkJoinObservable.__proto__ || Object.getPrototypeOf(ForkJoinObservable)).call(this));

        _this.sources = sources;
        _this.resultSelector = resultSelector;
        return _this;
    }
    /**
     * @owner Observable
     * @param {...?} sources
     * @return {?}
     */


    _createClass(ForkJoinObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
        }
    }], [{
        key: 'create',
        value: function create() {
            for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
                sources[_key] = arguments[_key];
            }

            if (sources === null || arguments.length === 0) {
                return new _EmptyObservable.EmptyObservable();
            }
            var /** @type {?} */resultSelector = null;
            if (typeof sources[sources.length - 1] === 'function') {
                resultSelector = sources.pop();
            }
            // if the first and only other argument besides the resultSelector is an array
            // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
            if (sources.length === 1 && (0, _isArray.isArray)(sources[0])) {
                sources = sources[0];
            }
            if (sources.length === 0) {
                return new _EmptyObservable.EmptyObservable();
            }
            return new ForkJoinObservable( /** @type {?} */sources, resultSelector);
        }
    }]);

    return ForkJoinObservable;
}(_Observable2.Observable);
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ForkJoinSubscriber = function (_OuterSubscriber) {
    _inherits(ForkJoinSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} sources
     * @param {?=} resultSelector
     */
    function ForkJoinSubscriber(destination, sources, resultSelector) {
        _classCallCheck(this, ForkJoinSubscriber);

        var _this2 = _possibleConstructorReturn(this, (ForkJoinSubscriber.__proto__ || Object.getPrototypeOf(ForkJoinSubscriber)).call(this, destination));

        _this2.sources = sources;
        _this2.resultSelector = resultSelector;
        _this2.completed = 0;
        _this2.haveValues = 0;
        var len = sources.length;
        _this2.total = len;
        _this2.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = (0, _subscribeToResult.subscribeToResult)(_this2, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                _this2.add(innerSubscription);
            }
        }
        return _this2;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(ForkJoinSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.values[outerIndex] = innerValue;
            if (!innerSub._hasValue) {
                innerSub._hasValue = true;
                this.haveValues++;
            }
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            var /** @type {?} */destination = this.destination;
            var haveValues = this.haveValues,
                resultSelector = this.resultSelector,
                values = this.values;

            var /** @type {?} */len = values.length;
            if (!innerSub._hasValue) {
                destination.complete();
                return;
            }
            this.completed++;
            if (this.completed !== len) {
                return;
            }
            if (haveValues === len) {
                var /** @type {?} */value = resultSelector ? resultSelector.apply(this, values) : values;
                destination.next(value);
            }
            destination.complete();
        }
    }]);

    return ForkJoinSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function ForkJoinSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ForkJoinSubscriber.prototype.completed;
    /** @type {?} */
    ForkJoinSubscriber.prototype.total;
    /** @type {?} */
    ForkJoinSubscriber.prototype.values;
    /** @type {?} */
    ForkJoinSubscriber.prototype.haveValues;
}