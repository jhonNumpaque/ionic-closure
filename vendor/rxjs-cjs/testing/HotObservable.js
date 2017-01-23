'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HotObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Subject2 = require('../Subject');

var _Subscription = require('../Subscription');

var _SubscriptionLoggable = require('./SubscriptionLoggable');

var _applyMixins = require('../util/applyMixins');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var HotObservable = exports.HotObservable = function (_Subject) {
    _inherits(HotObservable, _Subject);

    /**
     * @param {?} messages
     * @param {?} scheduler
     */
    function HotObservable(messages, scheduler) {
        _classCallCheck(this, HotObservable);

        var _this = _possibleConstructorReturn(this, (HotObservable.__proto__ || Object.getPrototypeOf(HotObservable)).call(this));

        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(HotObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var /** @type {?} */subject = this;
            var /** @type {?} */index = subject.logSubscribedFrame();
            subscriber.add(new _Subscription.Subscription(function () {
                subject.logUnsubscribedFrame(index);
            }));
            return _get(HotObservable.prototype.__proto__ || Object.getPrototypeOf(HotObservable.prototype), '_subscribe', this).call(this, subscriber);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'setup',
        value: function setup() {
            var /** @type {?} */subject = this;
            var /** @type {?} */messagesLength = subject.messages.length;
            /* tslint:disable:no-var-keyword */
            for (var /** @type {?} */i = 0; i < messagesLength; i++) {
                (function () {
                    var /** @type {?} */message = subject.messages[i];
                    /* tslint:enable */
                    subject.scheduler.schedule(function () {
                        message.notification.observe(subject);
                    }, message.frame);
                })();
            }
        }
    }]);

    return HotObservable;
}(_Subject2.Subject);

function HotObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    HotObservable.prototype.subscriptions;
    /** @type {?} */
    HotObservable.prototype.scheduler;
    /** @type {?} */
    HotObservable.prototype.logSubscribedFrame;
    /** @type {?} */
    HotObservable.prototype.logUnsubscribedFrame;
}
(0, _applyMixins.applyMixins)(HotObservable, [_SubscriptionLoggable.SubscriptionLoggable]);