'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColdObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _Subscription = require('../Subscription');

var _SubscriptionLoggable = require('./SubscriptionLoggable');

var _applyMixins = require('../util/applyMixins');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ColdObservable = exports.ColdObservable = function (_Observable) {
    _inherits(ColdObservable, _Observable);

    /**
     * @param {?} messages
     * @param {?} scheduler
     */
    function ColdObservable(messages, scheduler) {
        _classCallCheck(this, ColdObservable);

        var _this = _possibleConstructorReturn(this, (ColdObservable.__proto__ || Object.getPrototypeOf(ColdObservable)).call(this, function (subscriber) {
            var observable = this;
            var index = observable.logSubscribedFrame();
            subscriber.add(new _Subscription.Subscription(function () {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscriber;
        }));

        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(ColdObservable, [{
        key: 'scheduleMessages',
        value: function scheduleMessages(subscriber) {
            var /** @type {?} */messagesLength = this.messages.length;
            for (var /** @type {?} */i = 0; i < messagesLength; i++) {
                var /** @type {?} */message = this.messages[i];
                subscriber.add(this.scheduler.schedule(function (_ref) {
                    var message = _ref.message,
                        subscriber = _ref.subscriber;
                    message.notification.observe(subscriber);
                }, message.frame, { message: message, subscriber: subscriber }));
            }
        }
    }]);

    return ColdObservable;
}(_Observable2.Observable);

function ColdObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ColdObservable.prototype.subscriptions;
    /** @type {?} */
    ColdObservable.prototype.scheduler;
    /** @type {?} */
    ColdObservable.prototype.logSubscribedFrame;
    /** @type {?} */
    ColdObservable.prototype.logUnsubscribedFrame;
}
(0, _applyMixins.applyMixins)(ColdObservable, [_SubscriptionLoggable.SubscriptionLoggable]);