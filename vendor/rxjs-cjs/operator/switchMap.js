'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.switchMap = switchMap;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMap}
 * @see {\@link exhaustMap}
 * @see {\@link mergeMap}
 * @see {\@link switch}
 * @see {\@link switchMapTo}
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
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @return {?}
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}

var SwitchMapOperator = function () {
    /**
     * @param {?} project
     * @param {?=} resultSelector
     */
    function SwitchMapOperator(project, resultSelector) {
        _classCallCheck(this, SwitchMapOperator);

        this.project = project;
        this.resultSelector = resultSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SwitchMapOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
        }
    }]);

    return SwitchMapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SwitchMapSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchMapSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     */
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _classCallCheck(this, SwitchMapSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchMapSubscriber.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber)).call(this, destination));

        _this.project = project;
        _this.resultSelector = resultSelector;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SwitchMapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */result = void 0;
            var /** @type {?} */index = this.index++;
            try {
                result = this.project(value, index);
            } catch (error) {
                this.destination.error(error);
                return;
            }
            this._innerSub(result, value, index);
        }
        /**
         * @param {?} result
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_innerSub',
        value: function _innerSub(result, value, index) {
            var /** @type {?} */innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, result, value, index));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var innerSubscription = this.innerSubscription;

            if (!innerSubscription || innerSubscription.closed) {
                _get(SwitchMapSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.innerSubscription = null;
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this.remove(innerSub);
            this.innerSubscription = null;
            if (this.isStopped) {
                _get(SwitchMapSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
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
                this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
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
        key: '_tryNotifyNext',
        value: function _tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex) {
            var /** @type {?} */result = void 0;
            try {
                result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return SwitchMapSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SwitchMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchMapSubscriber.prototype.index;
    /** @type {?} */
    SwitchMapSubscriber.prototype.innerSubscription;
}