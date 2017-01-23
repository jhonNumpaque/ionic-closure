'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.bufferTime = bufferTime;

var _async = require('../scheduler/async');

var _Subscriber2 = require('../Subscriber');

var _isScheduler = require('../util/isScheduler');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Buffers the source Observable values for a specific time period.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * those arrays periodically in time.</span>
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
 * Unless the optional argument `bufferCreationInterval` is given, it emits and
 * resets the buffer every `bufferTimeSpan` milliseconds. If
 * `bufferCreationInterval` is given, this operator opens the buffer every
 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
 * buffer every `bufferTimeSpan` milliseconds. When the optional argument
 * `maxBufferSize` is specified, the buffer will be closed either after
 * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(1000);
 * buffered.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(2000, 5000);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link windowTime}
 *
 * buffers.
 * intervals that determine buffer boundaries.
 * @owner Observable
 * @this {?}
 * @param {?} bufferTimeSpan
 * @return {?}
 */
function bufferTime(bufferTimeSpan) {
    var /** @type {?} */length = arguments.length;
    var /** @type {?} */scheduler = _async.async;
    if ((0, _isScheduler.isScheduler)(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    var /** @type {?} */bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    var /** @type {?} */maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
}

var BufferTimeOperator = function () {
    /**
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} maxBufferSize
     * @param {?} scheduler
     */
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        _classCallCheck(this, BufferTimeOperator);

        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(BufferTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
        }
    }]);

    return BufferTimeOperator;
}();

var Context = function Context() {
    _classCallCheck(this, Context);

    this.buffer = [];
};

function Context_tsickle_Closure_declarations() {
    /** @type {?} */
    Context.prototype.buffer;
    /** @type {?} */
    Context.prototype.closeAction;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var BufferTimeSubscriber = function (_Subscriber) {
    _inherits(BufferTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} maxBufferSize
     * @param {?} scheduler
     */
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        _classCallCheck(this, BufferTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (BufferTimeSubscriber.__proto__ || Object.getPrototypeOf(BufferTimeSubscriber)).call(this, destination));

        _this.bufferTimeSpan = bufferTimeSpan;
        _this.bufferCreationInterval = bufferCreationInterval;
        _this.maxBufferSize = maxBufferSize;
        _this.scheduler = scheduler;
        _this.contexts = [];
        var context = _this.openContext();
        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (_this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        } else {
            var closeState = { subscriber: _this, context: context };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(BufferTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */contexts = this.contexts;
            var /** @type {?} */len = contexts.length;
            var /** @type {?} */filledBufferContext = void 0;
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */context = contexts[i];
                var /** @type {?} */buffer = context.buffer;
                buffer.push(value);
                if (buffer.length == this.maxBufferSize) {
                    filledBufferContext = context;
                }
            }
            if (filledBufferContext) {
                this.onBufferFull(filledBufferContext);
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.contexts.length = 0;
            _get(BufferTimeSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferTimeSubscriber.prototype), '_error', this).call(this, err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var contexts = this.contexts,
                destination = this.destination;

            while (contexts.length > 0) {
                var /** @type {?} */context = contexts.shift();
                destination.next(context.buffer);
            }
            _get(BufferTimeSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferTimeSubscriber.prototype), '_complete', this).call(this);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.contexts = null;
        }
        /**
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'onBufferFull',
        value: function onBufferFull(context) {
            this.closeContext(context);
            var /** @type {?} */closeAction = context.closeAction;
            closeAction.unsubscribe();
            this.remove(closeAction);
            if (!this.closed && this.timespanOnly) {
                context = this.openContext();
                var /** @type {?} */bufferTimeSpan = this.bufferTimeSpan;
                var /** @type {?} */timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
                this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'openContext',
        value: function openContext() {
            var /** @type {?} */context = new Context();
            this.contexts.push(context);
            return context;
        }
        /**
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'closeContext',
        value: function closeContext(context) {
            this.destination.next(context.buffer);
            var /** @type {?} */contexts = this.contexts;
            var /** @type {?} */spliceIndex = contexts ? contexts.indexOf(context) : -1;
            if (spliceIndex >= 0) {
                contexts.splice(contexts.indexOf(context), 1);
            }
        }
    }]);

    return BufferTimeSubscriber;
}(_Subscriber2.Subscriber);

function BufferTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferTimeSubscriber.prototype.contexts;
    /** @type {?} */
    BufferTimeSubscriber.prototype.timespanOnly;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchBufferTimeSpanOnly(state) {
    var /** @type {?} */subscriber = state.subscriber;
    var /** @type {?} */prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval,
        bufferTimeSpan = state.bufferTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler;

    var /** @type {?} */context = subscriber.openContext();
    var /** @type {?} */action = this;
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
        action.schedule(state, bufferCreationInterval);
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber,
        context = arg.context;

    subscriber.closeContext(context);
}