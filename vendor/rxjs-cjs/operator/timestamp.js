'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timestamp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.timestamp = timestamp;

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
function timestamp() {
    var scheduler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _async.async;

    return this.lift(new TimestampOperator(scheduler));
}

var Timestamp =
/**
 * @param {?} value
 * @param {?} timestamp
 */
exports.Timestamp = function Timestamp(value, timestamp) {
    _classCallCheck(this, Timestamp);

    this.value = value;
    this.timestamp = timestamp;
};

;

var TimestampOperator = function () {
    /**
     * @param {?} scheduler
     */
    function TimestampOperator(scheduler) {
        _classCallCheck(this, TimestampOperator);

        this.scheduler = scheduler;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(TimestampOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
        }
    }]);

    return TimestampOperator;
}();

var TimestampSubscriber = function (_Subscriber) {
    _inherits(TimestampSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} scheduler
     */
    function TimestampSubscriber(destination, scheduler) {
        _classCallCheck(this, TimestampSubscriber);

        var _this = _possibleConstructorReturn(this, (TimestampSubscriber.__proto__ || Object.getPrototypeOf(TimestampSubscriber)).call(this, destination));

        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(TimestampSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */now = this.scheduler.now();
            this.destination.next(new Timestamp(value, now));
        }
    }]);

    return TimestampSubscriber;
}(_Subscriber2.Subscriber);