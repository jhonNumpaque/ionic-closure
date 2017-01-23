'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.windowCount = windowCount;

var _Subscriber2 = require('../Subscriber');

var _Subject = require('../Subject');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {\@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowTime}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link bufferCount}
 *
 * window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * are Observable of values.
 * @owner Observable
 * @this {?}
 * @param {?} windowSize
 * @param {?=} startWindowEvery
 * @return {?}
 */
function windowCount(windowSize) {
    var startWindowEvery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}

var WindowCountOperator = function () {
    /**
     * @param {?} windowSize
     * @param {?} startWindowEvery
     */
    function WindowCountOperator(windowSize, startWindowEvery) {
        _classCallCheck(this, WindowCountOperator);

        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WindowCountOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
        }
    }]);

    return WindowCountOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var WindowCountSubscriber = function (_Subscriber) {
    _inherits(WindowCountSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} windowSize
     * @param {?} startWindowEvery
     */
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        _classCallCheck(this, WindowCountSubscriber);

        var _this = _possibleConstructorReturn(this, (WindowCountSubscriber.__proto__ || Object.getPrototypeOf(WindowCountSubscriber)).call(this, destination));

        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new _Subject.Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(WindowCountSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
            var /** @type {?} */destination = this.destination;
            var /** @type {?} */windowSize = this.windowSize;
            var /** @type {?} */windows = this.windows;
            var /** @type {?} */len = windows.length;
            for (var /** @type {?} */i = 0; i < len && !this.closed; i++) {
                windows[i].next(value);
            }
            var /** @type {?} */c = this.count - windowSize + 1;
            if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
                windows.shift().complete();
            }
            if (++this.count % startWindowEvery === 0 && !this.closed) {
                var /** @type {?} */window = new _Subject.Subject();
                windows.push(window);
                destination.next(window);
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
            if (windows) {
                while (windows.length > 0 && !this.closed) {
                    windows.shift().error(err);
                }
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
            if (windows) {
                while (windows.length > 0 && !this.closed) {
                    windows.shift().complete();
                }
            }
            this.destination.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.count = 0;
            this.windows = null;
        }
    }]);

    return WindowCountSubscriber;
}(_Subscriber2.Subscriber);

function WindowCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowCountSubscriber.prototype.windows;
    /** @type {?} */
    WindowCountSubscriber.prototype.count;
}