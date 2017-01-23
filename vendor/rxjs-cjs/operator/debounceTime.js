'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.debounceTime = debounceTime;

var _Subscriber2 = require('../Subscriber');

var _async = require('../scheduler/async');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {\@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {\@link Scheduler} for
 * managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounce}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttleTime}
 *
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * managing the timers that handle the timeout for each value.
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @owner Observable
 * @this {?}
 * @param {?} dueTime
 * @param {?=} scheduler
 * @return {?}
 */
function debounceTime(dueTime) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}

var DebounceTimeOperator = function () {
    /**
     * @param {?} dueTime
     * @param {?} scheduler
     */
    function DebounceTimeOperator(dueTime, scheduler) {
        _classCallCheck(this, DebounceTimeOperator);

        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DebounceTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
        }
    }]);

    return DebounceTimeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DebounceTimeSubscriber = function (_Subscriber) {
    _inherits(DebounceTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} dueTime
     * @param {?} scheduler
     */
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _classCallCheck(this, DebounceTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (DebounceTimeSubscriber.__proto__ || Object.getPrototypeOf(DebounceTimeSubscriber)).call(this, destination));

        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(DebounceTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.clearDebounce();
            this.lastValue = value;
            this.hasValue = true;
            this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.debouncedNext();
            this.destination.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'debouncedNext',
        value: function debouncedNext() {
            this.clearDebounce();
            if (this.hasValue) {
                this.destination.next(this.lastValue);
                this.lastValue = null;
                this.hasValue = false;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'clearDebounce',
        value: function clearDebounce() {
            var /** @type {?} */debouncedSubscription = this.debouncedSubscription;
            if (debouncedSubscription !== null) {
                this.remove(debouncedSubscription);
                debouncedSubscription.unsubscribe();
                this.debouncedSubscription = null;
            }
        }
    }]);

    return DebounceTimeSubscriber;
}(_Subscriber2.Subscriber);

function DebounceTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DebounceTimeSubscriber.prototype.debouncedSubscription;
    /** @type {?} */
    DebounceTimeSubscriber.prototype.lastValue;
    /** @type {?} */
    DebounceTimeSubscriber.prototype.hasValue;
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}