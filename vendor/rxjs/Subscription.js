import { isArray } from './util/isArray';
import { isObject } from './util/isObject';
import { isFunction } from './util/isFunction';
import { tryCatch } from './util/tryCatch';
import { errorObject } from './util/errorObject';
import { UnsubscriptionError } from './util/UnsubscriptionError';
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
export class Subscription {
    /**
     * perform the disposal of resources when the `unsubscribe` method is called.
     * @param {?=} unsubscribe
     */
    constructor(unsubscribe) {
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
    unsubscribe() {
        let /** @type {?} */ hasErrors = false;
        let /** @type {?} */ errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        const { _unsubscribe, _subscriptions } = ((this));
        ((this))._subscriptions = null;
        if (isFunction(_unsubscribe)) {
            let /** @type {?} */ trial = tryCatch(_unsubscribe).call(this);
            if (trial === errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject.e);
            }
        }
        if (isArray(_subscriptions)) {
            let /** @type {?} */ index = -1;
            const /** @type {?} */ len = _subscriptions.length;
            while (++index < len) {
                const /** @type {?} */ sub = _subscriptions[index];
                if (isObject(sub)) {
                    let /** @type {?} */ trial = tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        let /** @type {?} */ err = errorObject.e;
                        if (err instanceof UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError(errors);
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
    add(teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        let /** @type {?} */ sub = ((teardown));
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(/** @type {?} */ (teardown));
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (((this))._subscriptions || (((this))._subscriptions = [])).push(sub);
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
    remove(subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        const /** @type {?} */ subscriptions = ((this))._subscriptions;
        if (subscriptions) {
            const /** @type {?} */ subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    }
}
Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
}(new Subscription()));
function Subscription_tsickle_Closure_declarations() {
    /** @type {?} */
    Subscription.prototype.EMPTY;
    /**
     * A flag to indicate whether this Subscription has already been unsubscribed.
     * @type {?}
     */
    Subscription.prototype.closed;
}
