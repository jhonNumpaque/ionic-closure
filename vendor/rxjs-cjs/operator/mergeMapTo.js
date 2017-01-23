'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeMapToSubscriber = exports.MergeMapToOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mergeMapTo = mergeMapTo;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {\@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMapTo}
 * @see {\@link merge}
 * @see {\@link mergeAll}
 * @see {\@link mergeMap}
 * @see {\@link mergeScan}
 * @see {\@link switchMapTo}
 *
 * the source Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * Observables being subscribed to concurrently.
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} innerObservable
 * @param {?=} resultSelector
 * @param {?=} concurrent
 * @return {?}
 */
function mergeMapTo(innerObservable, resultSelector) {
    var concurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;

    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, /** @type {?} */resultSelector, concurrent));
}

var MergeMapToOperator = exports.MergeMapToOperator = function () {
    /**
     * @param {?} ish
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    function MergeMapToOperator(ish, resultSelector) {
        var concurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, MergeMapToOperator);

        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(MergeMapToOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
        }
    }]);

    return MergeMapToOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MergeMapToSubscriber = exports.MergeMapToSubscriber = function (_OuterSubscriber) {
    _inherits(MergeMapToSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} ish
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    function MergeMapToSubscriber(destination, ish, resultSelector) {
        var concurrent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, MergeMapToSubscriber);

        var _this = _possibleConstructorReturn(this, (MergeMapToSubscriber.__proto__ || Object.getPrototypeOf(MergeMapToSubscriber)).call(this, destination));

        _this.ish = ish;
        _this.resultSelector = resultSelector;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(MergeMapToSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.active < this.concurrent) {
                var /** @type {?} */resultSelector = this.resultSelector;
                var /** @type {?} */index = this.index++;
                var /** @type {?} */ish = this.ish;
                var /** @type {?} */destination = this.destination;
                this.active++;
                this._innerSub(ish, destination, resultSelector, value, index);
            } else {
                this.buffer.push(value);
            }
        }
        /**
         * @param {?} ish
         * @param {?} destination
         * @param {?} resultSelector
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_innerSub',
        value: function _innerSub(ish, destination, resultSelector, value, index) {
            this.add((0, _subscribeToResult.subscribeToResult)(this, ish, value, index));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                this.destination.complete();
            }
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            var resultSelector = this.resultSelector,
                destination = this.destination;

            if (resultSelector) {
                this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
            } else {
                destination.next(innerValue);
            }
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @return {?}
         */

    }, {
        key: 'trySelectResult',
        value: function trySelectResult(outerValue, innerValue, outerIndex, innerIndex) {
            var resultSelector = this.resultSelector,
                destination = this.destination;

            var /** @type {?} */result = void 0;
            try {
                result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            } catch (err) {
                destination.error(err);
                return;
            }
            destination.next(result);
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: 'notifyError',
        value: function notifyError(err) {
            this.destination.error(err);
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            var /** @type {?} */buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            } else if (this.active === 0 && this.hasCompleted) {
                this.destination.complete();
            }
        }
    }]);

    return MergeMapToSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function MergeMapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeMapToSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeMapToSubscriber.prototype.buffer;
    /** @type {?} */
    MergeMapToSubscriber.prototype.active;
    /** @type {?} */
    MergeMapToSubscriber.prototype.index;
}