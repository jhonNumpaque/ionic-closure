'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObserveOnMessage = exports.ObserveOnSubscriber = exports.ObserveOnOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.observeOn = observeOn;

var _Subscriber2 = require('../Subscriber');

var _Notification = require('../Notification');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @see {\@link Notification}
 *
 * @owner Observable
 * @this {?}
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
function observeOn(scheduler) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return this.lift(new ObserveOnOperator(scheduler, delay));
}

var ObserveOnOperator = exports.ObserveOnOperator = function () {
    /**
     * @param {?} scheduler
     * @param {?=} delay
     */
    function ObserveOnOperator(scheduler) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, ObserveOnOperator);

        this.scheduler = scheduler;
        this.delay = delay;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ObserveOnOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
        }
    }]);

    return ObserveOnOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ObserveOnSubscriber = exports.ObserveOnSubscriber = function (_Subscriber) {
    _inherits(ObserveOnSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} scheduler
     * @param {?=} delay
     */
    function ObserveOnSubscriber(destination, scheduler) {
        var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, ObserveOnSubscriber);

        var _this = _possibleConstructorReturn(this, (ObserveOnSubscriber.__proto__ || Object.getPrototypeOf(ObserveOnSubscriber)).call(this, destination));

        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    /**
     * @param {?} arg
     * @return {?}
     */


    _createClass(ObserveOnSubscriber, [{
        key: 'scheduleMessage',

        /**
         * @param {?} notification
         * @return {?}
         */
        value: function scheduleMessage(notification) {
            this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.scheduleMessage(_Notification.Notification.createNext(value));
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.scheduleMessage(_Notification.Notification.createError(err));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.scheduleMessage(_Notification.Notification.createComplete());
        }
    }], [{
        key: 'dispatch',
        value: function dispatch(arg) {
            var notification = arg.notification,
                destination = arg.destination;

            notification.observe(destination);
        }
    }]);

    return ObserveOnSubscriber;
}(_Subscriber2.Subscriber);

var ObserveOnMessage =
/**
 * @param {?} notification
 * @param {?} destination
 */
exports.ObserveOnMessage = function ObserveOnMessage(notification, destination) {
    _classCallCheck(this, ObserveOnMessage);

    this.notification = notification;
    this.destination = destination;
};