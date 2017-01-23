'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReplaySubject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Subject2 = require('./Subject');

var _queue = require('./scheduler/queue');

var _Subscription = require('./Subscription');

var _observeOn = require('./operator/observeOn');

var _ObjectUnsubscribedError = require('./util/ObjectUnsubscribedError');

var _SubjectSubscription = require('./SubjectSubscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplaySubject = exports.ReplaySubject = function (_Subject) {
    _inherits(ReplaySubject, _Subject);

    /**
     * @param {?=} bufferSize
     * @param {?=} windowTime
     * @param {?=} scheduler
     */
    function ReplaySubject() {
        var bufferSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.POSITIVE_INFINITY;
        var windowTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;
        var scheduler = arguments[2];

        _classCallCheck(this, ReplaySubject);

        var _this = _possibleConstructorReturn(this, (ReplaySubject.__proto__ || Object.getPrototypeOf(ReplaySubject)).call(this));

        _this.scheduler = scheduler;
        _this._events = [];
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(ReplaySubject, [{
        key: 'next',
        value: function next(value) {
            var /** @type {?} */now = this._getNow();
            this._events.push(new ReplayEvent(now, value));
            this._trimBufferThenGetEvents();
            _get(ReplaySubject.prototype.__proto__ || Object.getPrototypeOf(ReplaySubject.prototype), 'next', this).call(this, value);
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */

    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var /** @type {?} */_events = this._trimBufferThenGetEvents();
            var /** @type {?} */scheduler = this.scheduler;
            var /** @type {?} */subscription = void 0;
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            } else if (this.hasError) {
                subscription = _Subscription.Subscription.EMPTY;
            } else if (this.isStopped) {
                subscription = _Subscription.Subscription.EMPTY;
            } else {
                this.observers.push(subscriber);
                subscription = new _SubjectSubscription.SubjectSubscription(this, subscriber);
            }
            if (scheduler) {
                subscriber.add(subscriber = new _observeOn.ObserveOnSubscriber(subscriber, scheduler));
            }
            var /** @type {?} */len = _events.length;
            for (var /** @type {?} */i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
            if (this.hasError) {
                subscriber.error(this.thrownError);
            } else if (this.isStopped) {
                subscriber.complete();
            }
            return subscription;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_getNow',
        value: function _getNow() {
            return (this.scheduler || _queue.queue).now();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_trimBufferThenGetEvents',
        value: function _trimBufferThenGetEvents() {
            var /** @type {?} */now = this._getNow();
            var /** @type {?} */_bufferSize = this._bufferSize;
            var /** @type {?} */_windowTime = this._windowTime;
            var /** @type {?} */_events = this._events;
            var /** @type {?} */eventsCount = _events.length;
            var /** @type {?} */spliceCount = 0;
            // Trim events that fall out of the time window.
            // Start at the front of the list. Break early once
            // we encounter an event that falls within the window.
            while (spliceCount < eventsCount) {
                if (now - _events[spliceCount].time < _windowTime) {
                    break;
                }
                spliceCount++;
            }
            if (eventsCount > _bufferSize) {
                spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
            }
            if (spliceCount > 0) {
                _events.splice(0, spliceCount);
            }
            return _events;
        }
    }]);

    return ReplaySubject;
}(_Subject2.Subject);

function ReplaySubject_tsickle_Closure_declarations() {
    /** @type {?} */
    ReplaySubject.prototype._events;
    /** @type {?} */
    ReplaySubject.prototype._bufferSize;
    /** @type {?} */
    ReplaySubject.prototype._windowTime;
}

var ReplayEvent =
/**
 * @param {?} time
 * @param {?} value
 */
function ReplayEvent(time, value) {
    _classCallCheck(this, ReplayEvent);

    this.time = time;
    this.value = value;
};