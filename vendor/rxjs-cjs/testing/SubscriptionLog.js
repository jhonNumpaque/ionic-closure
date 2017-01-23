"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscriptionLog =
/**
 * @param {?} subscribedFrame
 * @param {?=} unsubscribedFrame
 */
exports.SubscriptionLog = function SubscriptionLog(subscribedFrame) {
    var unsubscribedFrame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;

    _classCallCheck(this, SubscriptionLog);

    this.subscribedFrame = subscribedFrame;
    this.unsubscribedFrame = unsubscribedFrame;
};