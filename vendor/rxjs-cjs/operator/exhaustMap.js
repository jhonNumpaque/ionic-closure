'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.exhaustMap = exhaustMap;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to an Observable which is merged in the output
 * Observable only if the previous projected Observable has completed.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link exhaust}.</span>
 *
 * <img src="./img/exhaustMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. When it projects a source value to
 * an Observable, the output Observable begins emitting the items emitted by
 * that projected Observable. However, `exhaustMap` ignores every new projected
 * Observable if the previous projected Observable has not yet completed. Once
 * that one completes, it will accept and flatten the next projected Observable
 * and repeat this process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMap}
 * @see {\@link exhaust}
 * @see {\@link mergeMap}
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
 * of each item of the source, ignoring projected Observables that start before
 * their preceding Observable has completed.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @return {?}
 */
function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
}

var SwitchFirstMapOperator = function () {
    /**
     * @param {?} project
     * @param {?=} resultSelector
     */
    function SwitchFirstMapOperator(project, resultSelector) {
        _classCallCheck(this, SwitchFirstMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SwitchFirstMapOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
        }
    }]);

    return SwitchFirstMapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SwitchFirstMapSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchFirstMapSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     */
    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
        _classCallCheck(this, SwitchFirstMapSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchFirstMapSubscriber.__proto__ || Object.getPrototypeOf(SwitchFirstMapSubscriber)).call(this, destination));

        _this.project = project;
        _this.resultSelector = resultSelector;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SwitchFirstMapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (!this.hasSubscription) {
                this.tryNext(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'tryNext',
        value: function tryNext(value) {
            var /** @type {?} */index = this.index++;
            var /** @type {?} */destination = this.destination;
            try {
                var /** @type {?} */result = this.project(value, index);
                this.hasSubscription = true;
                this.add((0, _subscribeToResult.subscribeToResult)(this, result, value, index));
            } catch (err) {
                destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (!this.hasSubscription) {
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

            try {
                var /** @type {?} */result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
                destination.next(result);
            } catch (err) {
                destination.error(err);
            }
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
            this.remove(innerSub);
            this.hasSubscription = false;
            if (this.hasCompleted) {
                this.destination.complete();
            }
        }
    }]);

    return SwitchFirstMapSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SwitchFirstMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.hasSubscription;
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.index;
}