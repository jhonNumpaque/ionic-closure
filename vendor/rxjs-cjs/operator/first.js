'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.first = first;

var _Subscriber2 = require('../Subscriber');

var _EmptyError = require('../util/EmptyError');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link filter}
 * @see {\@link find}
 * @see {\@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * An optional function called with each item to test for condition matching.
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * was found on the source.
 * condition.
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @param {?=} resultSelector
 * @param {?=} defaultValue
 * @return {?}
 */
function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}

var FirstOperator = function () {
    /**
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, FirstOperator);

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


    _createClass(FirstOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
        }
    }]);

    return FirstOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var FirstSubscriber = function (_Subscriber) {
    _inherits(FirstSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _classCallCheck(this, FirstSubscriber);

        var _this = _possibleConstructorReturn(this, (FirstSubscriber.__proto__ || Object.getPrototypeOf(FirstSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.resultSelector = resultSelector;
        _this.defaultValue = defaultValue;
        _this.source = source;
        _this.index = 0;
        _this.hasCompleted = false;
        _this._emitted = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(FirstSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */index = this.index++;
            if (this.predicate) {
                this._tryPredicate(value, index);
            } else {
                this._emit(value, index);
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
                this._emit(value, index);
            }
        }
        /**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_emit',
        value: function _emit(value, index) {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this._emitFinal(value);
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
            this._emitFinal(result);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_emitFinal',
        value: function _emitFinal(value) {
            var /** @type {?} */destination = this.destination;
            if (!this._emitted) {
                this._emitted = true;
                destination.next(value);
                destination.complete();
                this.hasCompleted = true;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
                destination.complete();
            } else if (!this.hasCompleted) {
                destination.error(new _EmptyError.EmptyError());
            }
        }
    }]);

    return FirstSubscriber;
}(_Subscriber2.Subscriber);

function FirstSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FirstSubscriber.prototype.index;
    /** @type {?} */
    FirstSubscriber.prototype.hasCompleted;
    /** @type {?} */
    FirstSubscriber.prototype._emitted;
}