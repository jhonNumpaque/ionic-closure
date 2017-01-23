'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.timeoutWith = timeoutWith;

var _async = require('../scheduler/async');

var _isDate = require('../util/isDate');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @param {?} due
 * @param {?} withObservable
 * @param {?=} scheduler
 * @return {?}
 */
function timeoutWith(due, withObservable) {
    var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _async.async;

    var /** @type {?} */absoluteTimeout = (0, _isDate.isDate)(due);
    var /** @type {?} */waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs( /** @type {?} */due);
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}

var TimeoutWithOperator = function () {
    /**
     * @param {?} waitFor
     * @param {?} absoluteTimeout
     * @param {?} withObservable
     * @param {?} scheduler
     */
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithOperator);

        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(TimeoutWithOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
        }
    }]);

    return TimeoutWithOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TimeoutWithSubscriber = function (_OuterSubscriber) {
    _inherits(TimeoutWithSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} absoluteTimeout
     * @param {?} waitFor
     * @param {?} withObservable
     * @param {?} scheduler
     */
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        _classCallCheck(this, TimeoutWithSubscriber);

        var _this = _possibleConstructorReturn(this, (TimeoutWithSubscriber.__proto__ || Object.getPrototypeOf(TimeoutWithSubscriber)).call(this));

        _this.destination = destination;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.withObservable = withObservable;
        _this.scheduler = scheduler;
        _this.timeoutSubscription = undefined;
        _this.index = 0;
        _this._previousIndex = 0;
        _this._hasCompleted = false;
        destination.add(_this);
        _this.scheduleTimeout();
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(TimeoutWithSubscriber, [{
        key: 'scheduleTimeout',

        /**
         * @return {?}
         */
        value: function scheduleTimeout() {
            var /** @type {?} */currentIndex = this.index;
            var /** @type {?} */timeoutState = { subscriber: this, index: currentIndex };
            this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
            this.index++;
            this._previousIndex = currentIndex;
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.destination.next(value);
            if (!this.absoluteTimeout) {
                this.scheduleTimeout();
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.destination.error(err);
            this._hasCompleted = true;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.destination.complete();
            this._hasCompleted = true;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'handleTimeout',
        value: function handleTimeout() {
            if (!this.closed) {
                var /** @type {?} */withObservable = this.withObservable;
                this.unsubscribe();
                this.destination.add(this.timeoutSubscription = (0, _subscribeToResult.subscribeToResult)(this, withObservable));
            }
        }
    }, {
        key: 'previousIndex',
        get: function get() {
            return this._previousIndex;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasCompleted',
        get: function get() {
            return this._hasCompleted;
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }], [{
        key: 'dispatchTimeout',
        value: function dispatchTimeout(state) {
            var /** @type {?} */source = state.subscriber;
            var /** @type {?} */currentIndex = state.index;
            if (!source.hasCompleted && source.previousIndex === currentIndex) {
                source.handleTimeout();
            }
        }
    }]);

    return TimeoutWithSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function TimeoutWithSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeoutWithSubscriber.prototype.timeoutSubscription;
    /** @type {?} */
    TimeoutWithSubscriber.prototype.index;
    /** @type {?} */
    TimeoutWithSubscriber.prototype._previousIndex;
    /** @type {?} */
    TimeoutWithSubscriber.prototype._hasCompleted;
}