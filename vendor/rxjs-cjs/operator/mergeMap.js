'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeMapSubscriber = exports.MergeMapOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mergeMap = mergeMap;

var _subscribeToResult = require('../util/subscribeToResult');

var _OuterSubscriber2 = require('../OuterSubscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {\@link concatMap}
 * @see {\@link exhaustMap}
 * @see {\@link merge}
 * @see {\@link mergeAll}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 * @see {\@link switchMap}
 *
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * Observables being subscribed to concurrently.
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @param {?=} concurrent
 * @return {?}
 */
function mergeMap(project, resultSelector) {
    var concurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;

    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, /** @type {?} */resultSelector, concurrent));
}

var MergeMapOperator = exports.MergeMapOperator = function () {
    /**
     * @param {?} project
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    function MergeMapOperator(project, resultSelector) {
        var concurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, MergeMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(MergeMapOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
        }
    }]);

    return MergeMapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MergeMapSubscriber = exports.MergeMapSubscriber = function (_OuterSubscriber) {
    _inherits(MergeMapSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    function MergeMapSubscriber(destination, project, resultSelector) {
        var concurrent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, MergeMapSubscriber);

        var _this = _possibleConstructorReturn(this, (MergeMapSubscriber.__proto__ || Object.getPrototypeOf(MergeMapSubscriber)).call(this, destination));

        _this.project = project;
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


    _createClass(MergeMapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.active < this.concurrent) {
                this._tryNext(value);
            } else {
                this.buffer.push(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_tryNext',
        value: function _tryNext(value) {
            var /** @type {?} */result = void 0;
            var /** @type {?} */index = this.index++;
            try {
                result = this.project(value, index);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.active++;
            this._innerSub(result, value, index);
        }
        /**
         * @param {?} ish
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_innerSub',
        value: function _innerSub(ish, value, index) {
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
            if (this.resultSelector) {
                this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
            } else {
                this.destination.next(innerValue);
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
        key: '_notifyResultSelector',
        value: function _notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
            var /** @type {?} */result = void 0;
            try {
                result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
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

    return MergeMapSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function MergeMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeMapSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeMapSubscriber.prototype.buffer;
    /** @type {?} */
    MergeMapSubscriber.prototype.active;
    /** @type {?} */
    MergeMapSubscriber.prototype.index;
}