'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MulticastOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.multicast = multicast;

var _ConnectableObservable = require('../observable/ConnectableObservable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @owner Observable
 * @this {?}
 * @param {?} subjectOrSubjectFactory
 * @param {?=} selector
 * @return {?}
 */
function multicast(subjectOrSubjectFactory, selector) {
    var /** @type {?} */subjectFactory = void 0;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    } else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    var /** @type {?} */connectable = Object.create(this, _ConnectableObservable.connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return connectable;
}

var MulticastOperator = exports.MulticastOperator = function () {
    /**
     * @param {?} subjectFactory
     * @param {?} selector
     */
    function MulticastOperator(subjectFactory, selector) {
        _classCallCheck(this, MulticastOperator);

        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(MulticastOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            var selector = this.selector;

            var /** @type {?} */subject = this.subjectFactory();
            var /** @type {?} */subscription = selector(subject).subscribe(subscriber);
            subscription.add(source.subscribe(subject));
            return subscription;
        }
    }]);

    return MulticastOperator;
}();