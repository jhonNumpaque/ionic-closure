'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeInterval = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.timeInterval = timeInterval;

var _Subscriber2 = require('../Subscriber');

var _async = require('../scheduler/async');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @param {?=} scheduler
 * @return {?}
 */
function timeInterval() {
    var scheduler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _async.async;

    return this.lift(new TimeIntervalOperator(scheduler));
}

var TimeInterval =
/**
 * @param {?} value
 * @param {?} interval
 */
exports.TimeInterval = function TimeInterval(value, interval) {
    _classCallCheck(this, TimeInterval);

    this.value = value;
    this.interval = interval;
};

;

var TimeIntervalOperator = function () {
    /**
     * @param {?} scheduler
     */
    function TimeIntervalOperator(scheduler) {
        _classCallCheck(this, TimeIntervalOperator);

        this.scheduler = scheduler;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(TimeIntervalOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
        }
    }]);

    return TimeIntervalOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TimeIntervalSubscriber = function (_Subscriber) {
    _inherits(TimeIntervalSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} scheduler
     */
    function TimeIntervalSubscriber(destination, scheduler) {
        _classCallCheck(this, TimeIntervalSubscriber);

        var _this = _possibleConstructorReturn(this, (TimeIntervalSubscriber.__proto__ || Object.getPrototypeOf(TimeIntervalSubscriber)).call(this, destination));

        _this.scheduler = scheduler;
        _this.lastTime = 0;
        _this.lastTime = scheduler.now();
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(TimeIntervalSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */now = this.scheduler.now();
            var /** @type {?} */span = now - this.lastTime;
            this.lastTime = now;
            this.destination.next(new TimeInterval(value, span));
        }
    }]);

    return TimeIntervalSubscriber;
}(_Subscriber2.Subscriber);

function TimeIntervalSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeIntervalSubscriber.prototype.lastTime;
}