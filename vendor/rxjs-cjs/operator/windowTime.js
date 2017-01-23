'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.windowTime = windowTime;

var _Subject = require('../Subject');

var _async = require('../scheduler/async');

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Branch out the source Observable values as a nested Observable periodically
 * in time.
 *
 * <span class="informal">It's like {\@link bufferTime}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowTime.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable starts a new window periodically, as
 * determined by the `windowCreationInterval` argument. It emits each window
 * after a fixed timespan, specified by the `windowTimeSpan` argument. When the
 * source Observable completes or encounters an error, the output Observable
 * emits the current window and propagates the notification from the source
 * Observable. If `windowCreationInterval` is not provided, the output
 * Observable starts a new window when the previous window of duration
 * `windowTimeSpan` completes.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000, 5000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowCount}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link bufferTime}
 *
 * windows.
 * intervals that determine window boundaries.
 * are Observables.
 * @owner Observable
 * @this {?}
 * @param {?} windowTimeSpan
 * @param {?=} windowCreationInterval
 * @param {?=} scheduler
 * @return {?}
 */
function windowTime(windowTimeSpan) {
    var windowCreationInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _async.async;

    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}

var WindowTimeOperator = function () {
    /**
     * @param {?} windowTimeSpan
     * @param {?} windowCreationInterval
     * @param {?} scheduler
     */
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
        _classCallCheck(this, WindowTimeOperator);

        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WindowTimeOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
        }
    }]);

    return WindowTimeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var WindowTimeSubscriber = function (_Subscriber) {
    _inherits(WindowTimeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} windowTimeSpan
     * @param {?} windowCreationInterval
     * @param {?} scheduler
     */
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        _classCallCheck(this, WindowTimeSubscriber);

        var _this = _possibleConstructorReturn(this, (WindowTimeSubscriber.__proto__ || Object.getPrototypeOf(WindowTimeSubscriber)).call(this, destination));

        _this.destination = destination;
        _this.windowTimeSpan = windowTimeSpan;
        _this.windowCreationInterval = windowCreationInterval;
        _this.scheduler = scheduler;
        _this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var window = _this.openWindow();
            var closeState = { subscriber: _this, window: window, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
            var _window = _this.openWindow();
            var timeSpanOnlyState = { subscriber: _this, window: _window, windowTimeSpan: windowTimeSpan };
            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(WindowTimeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */windows = this.windows;
            var /** @type {?} */len = windows.length;
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */window = windows[i];
                if (!window.closed) {
                    window.next(value);
                }
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var /** @type {?} */windows = this.windows;
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            this.destination.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */windows = this.windows;
            while (windows.length > 0) {
                var /** @type {?} */window = windows.shift();
                if (!window.closed) {
                    window.complete();
                }
            }
            this.destination.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'openWindow',
        value: function openWindow() {
            var /** @type {?} */window = new _Subject.Subject();
            this.windows.push(window);
            var /** @type {?} */destination = this.destination;
            destination.next(window);
            return window;
        }
        /**
         * @param {?} window
         * @return {?}
         */

    }, {
        key: 'closeWindow',
        value: function closeWindow(window) {
            window.complete();
            var /** @type {?} */windows = this.windows;
            windows.splice(windows.indexOf(window), 1);
        }
    }]);

    return WindowTimeSubscriber;
}(_Subscriber2.Subscriber);

function WindowTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowTimeSubscriber.prototype.windows;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber,
        windowTimeSpan = state.windowTimeSpan,
        window = state.window;

    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler,
        windowCreationInterval = state.windowCreationInterval;

    var /** @type {?} */window = subscriber.openWindow();
    var /** @type {?} */action = this;
    var /** @type {?} */context = { action: action, subscription: /** @type {?} */null };
    var /** @type {?} */timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchWindowClose(arg) {
    var subscriber = arg.subscriber,
        window = arg.window,
        context = arg.context;

    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}