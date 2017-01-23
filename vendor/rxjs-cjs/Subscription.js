'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Subscription = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray = require('./util/isArray');

var _isObject = require('./util/isObject');

var _isFunction = require('./util/isFunction');

var _tryCatch = require('./util/tryCatch');

var _errorObject = require('./util/errorObject');

var _UnsubscriptionError = require('./util/UnsubscriptionError');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 */
var Subscription = exports.Subscription = function () {
    /**
     * perform the disposal of resources when the `unsubscribe` method is called.
     * @param {?=} unsubscribe
     */
    function Subscription(unsubscribe) {
        _classCallCheck(this, Subscription);

        console.log('Subscription');
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {?}
     */


    _createClass(Subscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            var /** @type {?} */hasErrors = false;
            var /** @type {?} */errors = void 0;
            if (this.closed) {
                return;
            }
            this.closed = true;
            var _unsubscribe = this._unsubscribe,
                _subscriptions = this._subscriptions;

            this._subscriptions = null;
            if ((0, _isFunction.isFunction)(_unsubscribe)) {
                var /** @type {?} */trial = (0, _tryCatch.tryCatch)(_unsubscribe).call(this);
                if (trial === _errorObject.errorObject) {
                    hasErrors = true;
                    (errors = errors || []).push(_errorObject.errorObject.e);
                }
            }
            if ((0, _isArray.isArray)(_subscriptions)) {
                var /** @type {?} */index = -1;
                var /** @type {?} */len = _subscriptions.length;
                while (++index < len) {
                    var /** @type {?} */sub = _subscriptions[index];
                    if ((0, _isObject.isObject)(sub)) {
                        var /** @type {?} */_trial = (0, _tryCatch.tryCatch)(sub.unsubscribe).call(sub);
                        if (_trial === _errorObject.errorObject) {
                            hasErrors = true;
                            errors = errors || [];
                            var /** @type {?} */err = _errorObject.errorObject.e;
                            if (err instanceof _UnsubscriptionError.UnsubscriptionError) {
                                errors = errors.concat(err.errors);
                            } else {
                                errors.push(err);
                            }
                        }
                    }
                }
            }
            if (hasErrors) {
                throw new _UnsubscriptionError.UnsubscriptionError(errors);
            }
        }
        /**
         * Adds a tear down to be called during the unsubscribe() of this
         * Subscription.
         *
         * If the tear down being added is a subscription that is already
         * unsubscribed, is the same reference `add` is being called on, or is
         * `Subscription.EMPTY`, it will not be added.
         *
         * If this subscription is already in an `closed` state, the passed
         * tear down logic will be executed immediately.
         *
         * teardown.
         * added to the inner subscriptions list. This Subscription can be used with
         * `remove()` to remove the passed teardown logic from the inner subscriptions
         * list.
         * @param {?} teardown
         * @return {?}
         */

    }, {
        key: 'add',
        value: function add(teardown) {
            if (!teardown || teardown === Subscription.EMPTY) {
                return Subscription.EMPTY;
            }
            if (teardown === this) {
                return this;
            }
            var /** @type {?} */sub = teardown;
            switch (typeof teardown === 'undefined' ? 'undefined' : _typeof(teardown)) {
                case 'function':
                    sub = new Subscription( /** @type {?} */teardown);
                case 'object':
                    if (sub.closed || typeof sub.unsubscribe !== 'function') {
                        break;
                    } else if (this.closed) {
                        sub.unsubscribe();
                    } else {
                        (this._subscriptions || (this._subscriptions = [])).push(sub);
                    }
                    break;
                default:
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
            return sub;
        }
        /**
         * Removes a Subscription from the internal list of subscriptions that will
         * unsubscribe during the unsubscribe process of this Subscription.
         * @param {?} subscription
         * @return {?}
         */

    }, {
        key: 'remove',
        value: function remove(subscription) {
            // HACK: This might be redundant because of the logic in `add()`
            if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
                return;
            }
            var /** @type {?} */subscriptions = this._subscriptions;
            if (subscriptions) {
                var /** @type {?} */subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        }
    }]);

    return Subscription;
}();

Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription());
function Subscription_tsickle_Closure_declarations() {
    /** @type {?} */
    Subscription.prototype.EMPTY;
    /**
     * A flag to indicate whether this Subscription has already been unsubscribed.
     * @type {?}
     */
    Subscription.prototype.closed;
}