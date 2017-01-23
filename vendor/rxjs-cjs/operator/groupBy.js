'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupedObservable = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.groupBy = groupBy;

var _Subscriber3 = require('../Subscriber');

var _Subscription2 = require('../Subscription');

var _Observable2 = require('../Observable');

var _Subject = require('../Subject');

var _Map = require('../util/Map');

var _FastMap = require('../util/FastMap');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {\@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * for each item.
 * return element for each item.
 * a function that returns an Observable to determine how long each group should
 * exist.
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @owner Observable
 * @this {?}
 * @param {?} keySelector
 * @param {?=} elementSelector
 * @param {?=} durationSelector
 * @param {?=} subjectSelector
 * @return {?}
 */
function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}

var GroupByOperator = function () {
    /**
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     * @param {?=} subjectSelector
     */
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        _classCallCheck(this, GroupByOperator);

        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(GroupByOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
        }
    }]);

    return GroupByOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var GroupBySubscriber = function (_Subscriber) {
    _inherits(GroupBySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     * @param {?=} subjectSelector
     */
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        _classCallCheck(this, GroupBySubscriber);

        var _this = _possibleConstructorReturn(this, (GroupBySubscriber.__proto__ || Object.getPrototypeOf(GroupBySubscriber)).call(this, destination));

        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(GroupBySubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */key = void 0;
            try {
                key = this.keySelector(value);
            } catch (err) {
                this.error(err);
                return;
            }
            this._group(value, key);
        }
        /**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */

    }, {
        key: '_group',
        value: function _group(value, key) {
            var /** @type {?} */groups = this.groups;
            if (!groups) {
                groups = this.groups = typeof key === 'string' ? new _FastMap.FastMap() : new _Map.Map();
            }
            var /** @type {?} */group = groups.get(key);
            var /** @type {?} */element = void 0;
            if (this.elementSelector) {
                try {
                    element = this.elementSelector(value);
                } catch (err) {
                    this.error(err);
                }
            } else {
                element = value;
            }
            if (!group) {
                group = this.subjectSelector ? this.subjectSelector() : new _Subject.Subject();
                groups.set(key, group);
                var /** @type {?} */groupedObservable = new GroupedObservable(key, group, this);
                this.destination.next(groupedObservable);
                if (this.durationSelector) {
                    var /** @type {?} */duration = void 0;
                    try {
                        duration = this.durationSelector(new GroupedObservable(key, /** @type {?} */group));
                    } catch (err) {
                        this.error(err);
                        return;
                    }
                    this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
                }
            }
            if (!group.closed) {
                group.next(element);
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var /** @type {?} */groups = this.groups;
            if (groups) {
                groups.forEach(function (group, key) {
                    group.error(err);
                });
                groups.clear();
            }
            this.destination.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */groups = this.groups;
            if (groups) {
                groups.forEach(function (group, key) {
                    group.complete();
                });
                groups.clear();
            }
            this.destination.complete();
        }
        /**
         * @param {?} key
         * @return {?}
         */

    }, {
        key: 'removeGroup',
        value: function removeGroup(key) {
            this.groups.delete(key);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            if (!this.closed && !this.attemptedToUnsubscribe) {
                this.attemptedToUnsubscribe = true;
                if (this.count === 0) {
                    _get(GroupBySubscriber.prototype.__proto__ || Object.getPrototypeOf(GroupBySubscriber.prototype), 'unsubscribe', this).call(this);
                }
            }
        }
    }]);

    return GroupBySubscriber;
}(_Subscriber3.Subscriber);

function GroupBySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    GroupBySubscriber.prototype.groups;
    /** @type {?} */
    GroupBySubscriber.prototype.attemptedToUnsubscribe;
    /** @type {?} */
    GroupBySubscriber.prototype.count;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var GroupDurationSubscriber = function (_Subscriber2) {
    _inherits(GroupDurationSubscriber, _Subscriber2);

    /**
     * @param {?} key
     * @param {?} group
     * @param {?} parent
     */
    function GroupDurationSubscriber(key, group, parent) {
        _classCallCheck(this, GroupDurationSubscriber);

        var _this2 = _possibleConstructorReturn(this, (GroupDurationSubscriber.__proto__ || Object.getPrototypeOf(GroupDurationSubscriber)).call(this));

        _this2.key = key;
        _this2.group = group;
        _this2.parent = parent;
        return _this2;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(GroupDurationSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this._complete();
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var /** @type {?} */group = this.group;
            if (!group.closed) {
                group.error(err);
            }
            this.parent.removeGroup(this.key);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */group = this.group;
            if (!group.closed) {
                group.complete();
            }
            this.parent.removeGroup(this.key);
        }
    }]);

    return GroupDurationSubscriber;
}(_Subscriber3.Subscriber);
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 */


var GroupedObservable = exports.GroupedObservable = function (_Observable) {
    _inherits(GroupedObservable, _Observable);

    /**
     * @param {?} key
     * @param {?} groupSubject
     * @param {?=} refCountSubscription
     */
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        _classCallCheck(this, GroupedObservable);

        var _this3 = _possibleConstructorReturn(this, (GroupedObservable.__proto__ || Object.getPrototypeOf(GroupedObservable)).call(this));

        _this3.key = key;
        _this3.groupSubject = groupSubject;
        _this3.refCountSubscription = refCountSubscription;
        return _this3;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(GroupedObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var /** @type {?} */subscription = new _Subscription2.Subscription();
            var refCountSubscription = this.refCountSubscription,
                groupSubject = this.groupSubject;

            if (refCountSubscription && !refCountSubscription.closed) {
                subscription.add(new InnerRefCountSubscription(refCountSubscription));
            }
            subscription.add(groupSubject.subscribe(subscriber));
            return subscription;
        }
    }]);

    return GroupedObservable;
}(_Observable2.Observable);
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var InnerRefCountSubscription = function (_Subscription) {
    _inherits(InnerRefCountSubscription, _Subscription);

    /**
     * @param {?} parent
     */
    function InnerRefCountSubscription(parent) {
        _classCallCheck(this, InnerRefCountSubscription);

        console.log('InnerRefCountSubscription');

        var _this4 = _possibleConstructorReturn(this, (InnerRefCountSubscription.__proto__ || Object.getPrototypeOf(InnerRefCountSubscription)).call(this));

        _this4.parent = parent;
        parent.count++;
        return _this4;
    }
    /**
     * @return {?}
     */


    _createClass(InnerRefCountSubscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            var /** @type {?} */parent = this.parent;
            if (!parent.closed && !this.closed) {
                _get(InnerRefCountSubscription.prototype.__proto__ || Object.getPrototypeOf(InnerRefCountSubscription.prototype), 'unsubscribe', this).call(this);
                parent.count -= 1;
                if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                    parent.unsubscribe();
                }
            }
        }
    }]);

    return InnerRefCountSubscription;
}(_Subscription2.Subscription);