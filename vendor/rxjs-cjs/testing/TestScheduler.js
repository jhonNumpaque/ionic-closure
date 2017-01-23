'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TestScheduler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Observable = require('../Observable');

var _Notification = require('../Notification');

var _ColdObservable = require('./ColdObservable');

var _HotObservable = require('./HotObservable');

var _SubscriptionLog = require('./SubscriptionLog');

var _VirtualTimeScheduler2 = require('../scheduler/VirtualTimeScheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var /** @type {?} */defaultMaxFrame = 750;

var TestScheduler = exports.TestScheduler = function (_VirtualTimeScheduler) {
    _inherits(TestScheduler, _VirtualTimeScheduler);

    /**
     * @param {?} assertDeepEqual
     */
    function TestScheduler(assertDeepEqual) {
        _classCallCheck(this, TestScheduler);

        var _this = _possibleConstructorReturn(this, (TestScheduler.__proto__ || Object.getPrototypeOf(TestScheduler)).call(this, _VirtualTimeScheduler2.VirtualAction, defaultMaxFrame));

        _this.assertDeepEqual = assertDeepEqual;
        _this.hotObservables = [];
        _this.coldObservables = [];
        _this.flushTests = [];
        return _this;
    }
    /**
     * @param {?} marbles
     * @return {?}
     */


    _createClass(TestScheduler, [{
        key: 'createTime',
        value: function createTime(marbles) {
            var /** @type {?} */indexOf = marbles.indexOf('|');
            if (indexOf === -1) {
                throw new Error('marble diagram for time should have a completion marker "|"');
            }
            return indexOf * TestScheduler.frameTimeFactor;
        }
        /**
         * @param {?} marbles
         * @param {?=} values
         * @param {?=} error
         * @return {?}
         */

    }, {
        key: 'createColdObservable',
        value: function createColdObservable(marbles, values, error) {
            if (marbles.indexOf('^') !== -1) {
                throw new Error('cold observable cannot have subscription offset "^"');
            }
            if (marbles.indexOf('!') !== -1) {
                throw new Error('cold observable cannot have unsubscription marker "!"');
            }
            var /** @type {?} */messages = TestScheduler.parseMarbles(marbles, values, error);
            var /** @type {?} */cold = new _ColdObservable.ColdObservable(messages, this);
            this.coldObservables.push(cold);
            return cold;
        }
        /**
         * @param {?} marbles
         * @param {?=} values
         * @param {?=} error
         * @return {?}
         */

    }, {
        key: 'createHotObservable',
        value: function createHotObservable(marbles, values, error) {
            if (marbles.indexOf('!') !== -1) {
                throw new Error('hot observable cannot have unsubscription marker "!"');
            }
            var /** @type {?} */messages = TestScheduler.parseMarbles(marbles, values, error);
            var /** @type {?} */subject = new _HotObservable.HotObservable(messages, this);
            this.hotObservables.push(subject);
            return subject;
        }
        /**
         * @param {?} observable
         * @param {?} outerFrame
         * @return {?}
         */

    }, {
        key: 'materializeInnerObservable',
        value: function materializeInnerObservable(observable, outerFrame) {
            var _this2 = this;

            var /** @type {?} */messages = [];
            observable.subscribe(function (value) {
                messages.push({ frame: _this2.frame - outerFrame, notification: _Notification.Notification.createNext(value) });
            }, function (err) {
                messages.push({ frame: _this2.frame - outerFrame, notification: _Notification.Notification.createError(err) });
            }, function () {
                messages.push({ frame: _this2.frame - outerFrame, notification: _Notification.Notification.createComplete() });
            });
            return messages;
        }
        /**
         * @param {?} observable
         * @param {?=} unsubscriptionMarbles
         * @return {?}
         */

    }, {
        key: 'expectObservable',
        value: function expectObservable(observable) {
            var _this3 = this;

            var unsubscriptionMarbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var /** @type {?} */actual = [];
            var /** @type {?} */flushTest = { actual: actual, ready: false };
            var /** @type {?} */unsubscriptionFrame = TestScheduler.parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
            var /** @type {?} */subscription = void 0;
            this.schedule(function () {
                subscription = observable.subscribe(function (x) {
                    var /** @type {?} */value = x;
                    // Support Observable-of-Observables
                    if (x instanceof _Observable.Observable) {
                        value = _this3.materializeInnerObservable(value, _this3.frame);
                    }
                    actual.push({ frame: _this3.frame, notification: _Notification.Notification.createNext(value) });
                }, function (err) {
                    actual.push({ frame: _this3.frame, notification: _Notification.Notification.createError(err) });
                }, function () {
                    actual.push({ frame: _this3.frame, notification: _Notification.Notification.createComplete() });
                });
            }, 0);
            if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                this.schedule(function () {
                    return subscription.unsubscribe();
                }, unsubscriptionFrame);
            }
            this.flushTests.push(flushTest);
            return {
                /**
                 * @param {?} marbles
                 * @param {?=} values
                 * @param {?=} errorValue
                 * @return {?}
                 */
                toBe: function toBe(marbles, values, errorValue) {
                    flushTest.ready = true;
                    flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
                }
            };
        }
        /**
         * @param {?} actualSubscriptionLogs
         * @return {?}
         */

    }, {
        key: 'expectSubscriptions',
        value: function expectSubscriptions(actualSubscriptionLogs) {
            var /** @type {?} */flushTest = { actual: actualSubscriptionLogs, ready: false };
            this.flushTests.push(flushTest);
            return {
                /**
                 * @param {?} marbles
                 * @return {?}
                 */
                toBe: function toBe(marbles) {
                    var /** @type {?} */marblesArray = typeof marbles === 'string' ? [marbles] : marbles;
                    flushTest.ready = true;
                    flushTest.expected = marblesArray.map(function (marbles) {
                        return TestScheduler.parseMarblesAsSubscriptions(marbles);
                    });
                }
            };
        }
        /**
         * @return {?}
         */

    }, {
        key: 'flush',
        value: function flush() {
            var /** @type {?} */hotObservables = this.hotObservables;
            while (hotObservables.length > 0) {
                hotObservables.shift().setup();
            }
            _get(TestScheduler.prototype.__proto__ || Object.getPrototypeOf(TestScheduler.prototype), 'flush', this).call(this);
            var /** @type {?} */readyFlushTests = this.flushTests.filter(function (test) {
                return test.ready;
            });
            while (readyFlushTests.length > 0) {
                var /** @type {?} */test = readyFlushTests.shift();
                this.assertDeepEqual(test.actual, test.expected);
            }
        }
        /**
         * @param {?} marbles
         * @return {?}
         */

    }], [{
        key: 'parseMarblesAsSubscriptions',
        value: function parseMarblesAsSubscriptions(marbles) {
            if (typeof marbles !== 'string') {
                return new _SubscriptionLog.SubscriptionLog(Number.POSITIVE_INFINITY);
            }
            var /** @type {?} */len = marbles.length;
            var /** @type {?} */groupStart = -1;
            var /** @type {?} */subscriptionFrame = Number.POSITIVE_INFINITY;
            var /** @type {?} */unsubscriptionFrame = Number.POSITIVE_INFINITY;
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */frame = i * this.frameTimeFactor;
                var /** @type {?} */c = marbles[i];
                switch (c) {
                    case '-':
                    case ' ':
                        break;
                    case '(':
                        groupStart = frame;
                        break;
                    case ')':
                        groupStart = -1;
                        break;
                    case '^':
                        if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                            throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
                        }
                        subscriptionFrame = groupStart > -1 ? groupStart : frame;
                        break;
                    case '!':
                        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                            throw new Error('found a second subscription point \'^\' in a ' + 'subscription marble diagram. There can only be one.');
                        }
                        unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                        break;
                    default:
                        throw new Error('there can only be \'^\' and \'!\' markers in a ' + 'subscription marble diagram. Found instead \'' + c + '\'.');
                }
            }
            if (unsubscriptionFrame < 0) {
                return new _SubscriptionLog.SubscriptionLog(subscriptionFrame);
            } else {
                return new _SubscriptionLog.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
            }
        }
        /**
         * @param {?} marbles
         * @param {?=} values
         * @param {?=} errorValue
         * @param {?=} materializeInnerObservables
         * @return {?}
         */

    }, {
        key: 'parseMarbles',
        value: function parseMarbles(marbles, values, errorValue) {
            var materializeInnerObservables = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (marbles.indexOf('!') !== -1) {
                throw new Error('conventional marble diagrams cannot have the ' + 'unsubscription marker "!"');
            }
            var /** @type {?} */len = marbles.length;
            var /** @type {?} */testMessages = [];
            var /** @type {?} */subIndex = marbles.indexOf('^');
            var /** @type {?} */frameOffset = subIndex === -1 ? 0 : subIndex * -this.frameTimeFactor;
            var /** @type {?} */getValue = (typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object' ? function (x) {
                return x;
            } : function (x) {
                // Support Observable-of-Observables
                if (materializeInnerObservables && values[x] instanceof _ColdObservable.ColdObservable) {
                    return values[x].messages;
                }
                return values[x];
            };
            var /** @type {?} */groupStart = -1;
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */frame = i * this.frameTimeFactor + frameOffset;
                var /** @type {?} */notification = void 0;
                var /** @type {?} */c = marbles[i];
                switch (c) {
                    case '-':
                    case ' ':
                        break;
                    case '(':
                        groupStart = frame;
                        break;
                    case ')':
                        groupStart = -1;
                        break;
                    case '|':
                        notification = _Notification.Notification.createComplete();
                        break;
                    case '^':
                        break;
                    case '#':
                        notification = _Notification.Notification.createError(errorValue || 'error');
                        break;
                    default:
                        notification = _Notification.Notification.createNext(getValue(c));
                        break;
                }
                if (notification) {
                    testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification: notification });
                }
            }
            return testMessages;
        }
    }]);

    return TestScheduler;
}(_VirtualTimeScheduler2.VirtualTimeScheduler);

function TestScheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    TestScheduler.prototype.hotObservables;
    /** @type {?} */
    TestScheduler.prototype.coldObservables;
    /** @type {?} */
    TestScheduler.prototype.flushTests;
}