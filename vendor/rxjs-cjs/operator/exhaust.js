'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.exhaust = exhaust;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a higher-order Observable into a first-order Observable by dropping
 * inner Observables while the previous inner Observable has not yet completed.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * next inner Observables while the current inner is still executing.</span>
 *
 * <img src="./img/exhaust.png" width="100%">
 *
 * `exhaust` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable begins emitting the items emitted by that
 * inner Observable. So far, it behaves like {\@link mergeAll}. However,
 * `exhaust` ignores every new inner Observable if the previous Observable has
 * not yet completed. Once that one completes, it will accept and flatten the
 * next inner Observable and repeat this process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var result = higherOrder.exhaust();
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link switch}
 * @see {\@link mergeAll}
 * @see {\@link exhaustMap}
 * @see {\@link zipAll}
 *
 * and propagates the first observable exclusively until it completes before
 * subscribing to the next.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function exhaust() {
    return this.lift(new SwitchFirstOperator());
}

var SwitchFirstOperator = function () {
    function SwitchFirstOperator() {
        _classCallCheck(this, SwitchFirstOperator);
    }

    _createClass(SwitchFirstOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new SwitchFirstSubscriber(subscriber));
        }
    }]);

    return SwitchFirstOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SwitchFirstSubscriber = function (_OuterSubscriber) {
    _inherits(SwitchFirstSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     */
    function SwitchFirstSubscriber(destination) {
        _classCallCheck(this, SwitchFirstSubscriber);

        var _this = _possibleConstructorReturn(this, (SwitchFirstSubscriber.__proto__ || Object.getPrototypeOf(SwitchFirstSubscriber)).call(this, destination));

        _this.hasCompleted = false;
        _this.hasSubscription = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SwitchFirstSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (!this.hasSubscription) {
                this.hasSubscription = true;
                this.add((0, _subscribeToResult.subscribeToResult)(this, value));
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

    return SwitchFirstSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SwitchFirstSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchFirstSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchFirstSubscriber.prototype.hasSubscription;
}