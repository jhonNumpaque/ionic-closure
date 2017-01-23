'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubscriptionLoggable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SubscriptionLog = require('./SubscriptionLog');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscriptionLoggable = exports.SubscriptionLoggable = function () {
    function SubscriptionLoggable() {
        _classCallCheck(this, SubscriptionLoggable);

        this.subscriptions = [];
    }
    /**
     * @return {?}
     */


    _createClass(SubscriptionLoggable, [{
        key: 'logSubscribedFrame',
        value: function logSubscribedFrame() {
            this.subscriptions.push(new _SubscriptionLog.SubscriptionLog(this.scheduler.now()));
            return this.subscriptions.length - 1;
        }
        /**
         * @param {?} index
         * @return {?}
         */

    }, {
        key: 'logUnsubscribedFrame',
        value: function logUnsubscribedFrame(index) {
            var /** @type {?} */subscriptionLogs = this.subscriptions;
            var /** @type {?} */oldSubscriptionLog = subscriptionLogs[index];
            subscriptionLogs[index] = new _SubscriptionLog.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
        }
    }]);

    return SubscriptionLoggable;
}();

function SubscriptionLoggable_tsickle_Closure_declarations() {
    /** @type {?} */
    SubscriptionLoggable.prototype.subscriptions;
    /** @type {?} */
    SubscriptionLoggable.prototype.scheduler;
}