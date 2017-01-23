'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.debounce = debounce;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a value from the source Observable only after a particular time span
 * determined by another Observable has passed without another source emission.
 *
 * <span class="informal">It's like {\@link debounceTime}, but the time span of
 * emission silence is determined by a second Observable.</span>
 *
 * <img src="./img/debounce.png" width="100%">
 *
 * `debounce` delays values emitted by the source Observable, but drops previous
 * pending delayed emissions if a new value arrives on the source Observable.
 * This operator keeps track of the most recent value from the source
 * Observable, and spawns a duration Observable by calling the
 * `durationSelector` function. The value is emitted only when the duration
 * Observable emits a value or completes, and if no other value was emitted on
 * the source Observable since the duration Observable was spawned. If a new
 * value appears before the duration Observable emits, the previous value will
 * be dropped and will not be emitted on the output Observable.
 *
 * Like {\@link debounceTime}, this is a rate-limiting operator, and also a
 * delay-like operator since output emissions do not necessarily occur at the
 * same time as they did on the source Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounce(() => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounceTime}
 * @see {\@link delayWhen}
 * @see {\@link throttle}
 *
 * that receives a value from the source Observable, for computing the timeout
 * duration for each source value, returned as an Observable or a Promise.
 * Observable by the specified duration Observable returned by
 * `durationSelector`, and may drop some values if they occur too frequently.
 * @owner Observable
 * @this {?}
 * @param {?} durationSelector
 * @return {?}
 */
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}

var DebounceOperator = function () {
    /**
     * @param {?} durationSelector
     */
    function DebounceOperator(durationSelector) {
        _classCallCheck(this, DebounceOperator);

        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DebounceOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
        }
    }]);

    return DebounceOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DebounceSubscriber = function (_OuterSubscriber) {
    _inherits(DebounceSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    function DebounceSubscriber(destination, durationSelector) {
        _classCallCheck(this, DebounceSubscriber);

        var _this = _possibleConstructorReturn(this, (DebounceSubscriber.__proto__ || Object.getPrototypeOf(DebounceSubscriber)).call(this, destination));

        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        _this.durationSubscription = null;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(DebounceSubscriber, [{
        key: '_next',
        value: function _next(value) {
            try {
                var /** @type {?} */result = this.durationSelector.call(this, value);
                if (result) {
                    this._tryNext(value, result);
                }
            } catch (err) {
                this.destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.emitValue();
            this.destination.complete();
        }
        /**
         * @param {?} value
         * @param {?} duration
         * @return {?}
         */

    }, {
        key: '_tryNext',
        value: function _tryNext(value, duration) {
            var /** @type {?} */subscription = this.durationSubscription;
            this.value = value;
            this.hasValue = true;
            if (subscription) {
                subscription.unsubscribe();
                this.remove(subscription);
            }
            subscription = (0, _subscribeToResult.subscribeToResult)(this, duration);
            if (!subscription.closed) {
                this.add(this.durationSubscription = subscription);
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
            this.emitValue();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.emitValue();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'emitValue',
        value: function emitValue() {
            if (this.hasValue) {
                var /** @type {?} */value = this.value;
                var /** @type {?} */subscription = this.durationSubscription;
                if (subscription) {
                    this.durationSubscription = null;
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
                this.value = null;
                this.hasValue = false;
                _get(DebounceSubscriber.prototype.__proto__ || Object.getPrototypeOf(DebounceSubscriber.prototype), '_next', this).call(this, value);
            }
        }
    }]);

    return DebounceSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function DebounceSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DebounceSubscriber.prototype.value;
    /** @type {?} */
    DebounceSubscriber.prototype.hasValue;
    /** @type {?} */
    DebounceSubscriber.prototype.durationSubscription;
}