'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._switch = _switch;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {\@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link exhaust}
 * @see {\@link mergeAll}
 * @see {\@link switchMap}
 * @see {\@link switchMapTo}
 * @see {\@link zipAll}
 *
 * Observable most recently emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function _switch() {
    return this.lift(new SwitchOperator());
}

var SwitchOperator = function () {
    function SwitchOperator() {
        _classCallCheck(this, SwitchOperator);
    }

    _createClass(SwitchOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new SwitchSubscriber(subscriber));
        }
    }]);

    return SwitchOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SwitchSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     */
    function SwitchSubscriber(destination) {
        _classCallCheck(this, SwitchSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchSubscriber.__proto__ || Object.getPrototypeOf(SwitchSubscriber)).call(this, destination));

        _this.active = 0;
        _this.hasCompleted = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SwitchSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.unsubscribeInner();
            this.active++;
            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, value));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0) {
                this.destination.complete();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribeInner',
        value: function unsubscribeInner() {
            this.active = this.active > 0 ? this.active - 1 : 0;
            var /** @type {?} */innerSubscription = this.innerSubscription;
            if (innerSubscription) {
                innerSubscription.unsubscribe();
                this.remove(innerSubscription);
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
            this.destination.next(innerValue);
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
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.unsubscribeInner();
            if (this.hasCompleted && this.active === 0) {
                this.destination.complete();
            }
        }
    }]);

    return SwitchSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SwitchSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchSubscriber.prototype.active;
    /** @type {?} */
    SwitchSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchSubscriber.prototype.innerSubscription;
}