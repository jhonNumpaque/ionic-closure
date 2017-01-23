'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpandSubscriber = exports.ExpandOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.expand = expand;

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {\@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {\@link mergeMap}
 * @see {\@link mergeScan}
 *
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * Observables being subscribed to concurrently.
 * each projected inner Observable.
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} concurrent
 * @param {?=} scheduler
 * @return {?}
 */
function expand(project) {
    var concurrent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;
    var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}

var ExpandOperator = exports.ExpandOperator = function () {
    /**
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    function ExpandOperator(project, concurrent, scheduler) {
        _classCallCheck(this, ExpandOperator);

        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ExpandOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
        }
    }]);

    return ExpandOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ExpandSubscriber = exports.ExpandSubscriber = function (_OuterSubscriber) {
    _inherits(ExpandSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        _classCallCheck(this, ExpandSubscriber);

        var _this = _possibleConstructorReturn(this, (ExpandSubscriber.__proto__ || Object.getPrototypeOf(ExpandSubscriber)).call(this, destination));

        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
        }
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */


    _createClass(ExpandSubscriber, [{
        key: '_next',

        /**
         * @param {?} value
         * @return {?}
         */
        value: function _next(value) {
            var /** @type {?} */destination = this.destination;
            if (destination.closed) {
                this._complete();
                return;
            }
            var /** @type {?} */index = this.index++;
            if (this.active < this.concurrent) {
                destination.next(value);
                var /** @type {?} */result = (0, _tryCatch.tryCatch)(this.project)(value, index);
                if (result === _errorObject.errorObject) {
                    destination.error(_errorObject.errorObject.e);
                } else if (!this.scheduler) {
                    this.subscribeToProjection(result, value, index);
                } else {
                    var /** @type {?} */state = { subscriber: this, result: result, value: value, index: index };
                    this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
                }
            } else {
                this.buffer.push(value);
            }
        }
        /**
         * @param {?} result
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: 'subscribeToProjection',
        value: function subscribeToProjection(result, value, index) {
            this.active++;
            this.add((0, _subscribeToResult.subscribeToResult)(this, result, value, index));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.hasCompleted && this.active === 0) {
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
            this._next(innerValue);
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
            if (buffer && buffer.length > 0) {
                this._next(buffer.shift());
            }
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        }
    }], [{
        key: 'dispatch',
        value: function dispatch(arg) {
            var subscriber = arg.subscriber,
                result = arg.result,
                value = arg.value,
                index = arg.index;

            subscriber.subscribeToProjection(result, value, index);
        }
    }]);

    return ExpandSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function ExpandSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ExpandSubscriber.prototype.index;
    /** @type {?} */
    ExpandSubscriber.prototype.active;
    /** @type {?} */
    ExpandSubscriber.prototype.hasCompleted;
    /** @type {?} */
    ExpandSubscriber.prototype.buffer;
}