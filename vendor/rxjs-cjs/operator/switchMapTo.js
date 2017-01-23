'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.switchMapTo = switchMapTo;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Projects each source value to the same Observable which is flattened multiple
 * times with {\@link switch} in the output Observable.
 *
 * <span class="informal">It's like {\@link switchMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/switchMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. The output Observables
 * emits values only from the most recently emitted instance of
 * `innerObservable`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMapTo}
 * @see {\@link switch}
 * @see {\@link switchMap}
 * @see {\@link mergeMapTo}
 *
 * the source Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * `innerObservable` every time a value is emitted on the source Observable.
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable, and taking only the values
 * from the most recently projected inner Observable.
 * @owner Observable
 * @this {?}
 * @param {?} innerObservable
 * @param {?=} resultSelector
 * @return {?}
 */
function switchMapTo(innerObservable, resultSelector) {
    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
}

var SwitchMapToOperator = function () {
    /**
     * @param {?} observable
     * @param {?=} resultSelector
     */
    function SwitchMapToOperator(observable, resultSelector) {
        _classCallCheck(this, SwitchMapToOperator);

        this.observable = observable;
        this.resultSelector = resultSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SwitchMapToOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
        }
    }]);

    return SwitchMapToOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SwitchMapToSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchMapToSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} inner
     * @param {?=} resultSelector
     */
    function SwitchMapToSubscriber(destination, inner, resultSelector) {
        _classCallCheck(this, SwitchMapToSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchMapToSubscriber.__proto__ || Object.getPrototypeOf(SwitchMapToSubscriber)).call(this, destination));

        _this.inner = inner;
        _this.resultSelector = resultSelector;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SwitchMapToSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
            }
            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, this.inner, value, this.index++));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var innerSubscription = this.innerSubscription;

            if (!innerSubscription || innerSubscription.closed) {
                _get(SwitchMapToSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapToSubscriber.prototype), '_complete', this).call(this);
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
                _get(SwitchMapToSubscriber.prototype.__proto__ || Object.getPrototypeOf(SwitchMapToSubscriber.prototype), '_complete', this).call(this);
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
                this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
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
        key: 'tryResultSelector',
        value: function tryResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
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
    }]);

    return SwitchMapToSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SwitchMapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchMapToSubscriber.prototype.index;
    /** @type {?} */
    SwitchMapToSubscriber.prototype.innerSubscription;
}