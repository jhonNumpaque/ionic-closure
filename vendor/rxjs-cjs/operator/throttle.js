'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.throttle = throttle;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {\@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounce}
 * @see {\@link delayWhen}
 * @see {\@link sample}
 * @see {\@link throttleTime}
 *
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * limit the rate of emissions from the source.
 * @owner Observable
 * @this {?}
 * @param {?} durationSelector
 * @return {?}
 */
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}

var ThrottleOperator = function () {
    /**
     * @param {?} durationSelector
     */
    function ThrottleOperator(durationSelector) {
        _classCallCheck(this, ThrottleOperator);

        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ThrottleOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
        }
    }]);

    return ThrottleOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ThrottleSubscriber = function (_OuterSubscriber) {
    _inherits(ThrottleSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    function ThrottleSubscriber(destination, durationSelector) {
        _classCallCheck(this, ThrottleSubscriber);

        var _this = _possibleConstructorReturn(this, (ThrottleSubscriber.__proto__ || Object.getPrototypeOf(ThrottleSubscriber)).call(this, destination));

        _this.destination = destination;
        _this.durationSelector = durationSelector;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(ThrottleSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (!this.throttled) {
                this.tryDurationSelector(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'tryDurationSelector',
        value: function tryDurationSelector(value) {
            var /** @type {?} */duration = null;
            try {
                duration = this.durationSelector(value);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.emitAndThrottle(value, duration);
        }
        /**
         * @param {?} value
         * @param {?} duration
         * @return {?}
         */

    }, {
        key: 'emitAndThrottle',
        value: function emitAndThrottle(value, duration) {
            this.add(this.throttled = (0, _subscribeToResult.subscribeToResult)(this, duration));
            this.destination.next(value);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var /** @type {?} */throttled = this.throttled;
            if (throttled) {
                this.remove(throttled);
                this.throttled = null;
                throttled.unsubscribe();
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
            this._unsubscribe();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this._unsubscribe();
        }
    }]);

    return ThrottleSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function ThrottleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ThrottleSubscriber.prototype.throttled;
}