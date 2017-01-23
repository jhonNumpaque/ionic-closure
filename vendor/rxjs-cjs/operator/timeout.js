'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.timeout = timeout;

var _async = require('../scheduler/async');

var _isDate = require('../util/isDate');

var _Subscriber2 = require('../Subscriber');

var _TimeoutError = require('../util/TimeoutError');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @param {?} due
 * @param {?=} scheduler
 * @return {?}
 */
function timeout(due) {
    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _async.async;

    var /** @type {?} */absoluteTimeout = (0, _isDate.isDate)(due);
    var /** @type {?} */waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs( /** @type {?} */due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new _TimeoutError.TimeoutError()));
}

var TimeoutOperator = function () {
    /**
     * @param {?} waitFor
     * @param {?} absoluteTimeout
     * @param {?} scheduler
     * @param {?} errorInstance
     */
    function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
        _classCallCheck(this, TimeoutOperator);

        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(TimeoutOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
        }
    }]);

    return TimeoutOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TimeoutSubscriber = function (_Subscriber) {
    _inherits(TimeoutSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} absoluteTimeout
     * @param {?} waitFor
     * @param {?} scheduler
     * @param {?} errorInstance
     */
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        _classCallCheck(this, TimeoutSubscriber);

        var _this = _possibleConstructorReturn(this, (TimeoutSubscriber.__proto__ || Object.getPrototypeOf(TimeoutSubscriber)).call(this, destination));

        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.scheduler = scheduler;
        _this.errorInstance = errorInstance;
        _this.index = 0;
        _this._previousIndex = 0;
        _this._hasCompleted = false;
        _this.scheduleTimeout();
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(TimeoutSubscriber, [{
        key: 'scheduleTimeout',

        /**
         * @return {?}
         */
        value: function scheduleTimeout() {
            var /** @type {?} */currentIndex = this.index;
            this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
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
        key: 'notifyTimeout',
        value: function notifyTimeout() {
            this.error(this.errorInstance);
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
                source.notifyTimeout();
            }
        }
    }]);

    return TimeoutSubscriber;
}(_Subscriber2.Subscriber);

function TimeoutSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeoutSubscriber.prototype.index;
    /** @type {?} */
    TimeoutSubscriber.prototype._previousIndex;
    /** @type {?} */
    TimeoutSubscriber.prototype._hasCompleted;
}