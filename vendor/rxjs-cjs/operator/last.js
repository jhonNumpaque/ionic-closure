'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.last = last;

var _Subscriber2 = require('../Subscriber');

var _EmptyError = require('../util/EmptyError');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @param {?=} resultSelector
 * @param {?=} defaultValue
 * @return {?}
 */
function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}

var LastOperator = function () {
    /**
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastOperator);

        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(LastOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
        }
    }]);

    return LastOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var LastSubscriber = function (_Subscriber) {
    _inherits(LastSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, LastSubscriber);

        var _this = _possibleConstructorReturn(this, (LastSubscriber.__proto__ || Object.getPrototypeOf(LastSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.resultSelector = resultSelector;
        _this.defaultValue = defaultValue;
        _this.source = source;
        _this.hasValue = false;
        _this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            _this.lastValue = defaultValue;
            _this.hasValue = true;
        }
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(LastSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */index = this.index++;
            if (this.predicate) {
                this._tryPredicate(value, index);
            } else {
                if (this.resultSelector) {
                    this._tryResultSelector(value, index);
                    return;
                }
                this.lastValue = value;
                this.hasValue = true;
            }
        }
        /**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_tryPredicate',
        value: function _tryPredicate(value, index) {
            var /** @type {?} */result = void 0;
            try {
                result = this.predicate(value, index, this.source);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            if (result) {
                if (this.resultSelector) {
                    this._tryResultSelector(value, index);
                    return;
                }
                this.lastValue = value;
                this.hasValue = true;
            }
        }
        /**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_tryResultSelector',
        value: function _tryResultSelector(value, index) {
            var /** @type {?} */result = void 0;
            try {
                result = this.resultSelector(value, index);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.lastValue = result;
            this.hasValue = true;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            if (this.hasValue) {
                destination.next(this.lastValue);
                destination.complete();
            } else {
                destination.error(new _EmptyError.EmptyError());
            }
        }
    }]);

    return LastSubscriber;
}(_Subscriber2.Subscriber);

function LastSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    LastSubscriber.prototype.lastValue;
    /** @type {?} */
    LastSubscriber.prototype.hasValue;
    /** @type {?} */
    LastSubscriber.prototype.index;
}