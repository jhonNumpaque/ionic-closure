'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.window = window;

var _Subject = require('../Subject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.
 *
 * <span class="informal">It's like {\@link buffer}, but emits a nested Observable
 * instead of an array.</span>
 *
 * <img src="./img/window.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping
 * windows. It emits the current window and opens a new one whenever the
 * Observable `windowBoundaries` emits an item. Because each window is an
 * Observable, the output is a higher-order Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var result = clicks.window(interval)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link windowCount}
 * @see {\@link windowTime}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link buffer}
 *
 * previous window and starts a new window.
 * Observables emitting values of the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} windowBoundaries
 * @return {?}
 */
function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
}

var WindowOperator = function () {
    /**
     * @param {?} windowBoundaries
     */
    function WindowOperator(windowBoundaries) {
        _classCallCheck(this, WindowOperator);

        this.windowBoundaries = windowBoundaries;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WindowOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            var /** @type {?} */windowSubscriber = new WindowSubscriber(subscriber);
            var /** @type {?} */sourceSubscription = source.subscribe(windowSubscriber);
            if (!sourceSubscription.closed) {
                windowSubscriber.add((0, _subscribeToResult.subscribeToResult)(windowSubscriber, this.windowBoundaries));
            }
            return sourceSubscription;
        }
    }]);

    return WindowOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var WindowSubscriber = function (_OuterSubscriber) {
    _inherits(WindowSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     */
    function WindowSubscriber(destination) {
        _classCallCheck(this, WindowSubscriber);

        var _this = _possibleConstructorReturn(this, (WindowSubscriber.__proto__ || Object.getPrototypeOf(WindowSubscriber)).call(this, destination));

        _this.window = new _Subject.Subject();
        destination.next(_this.window);
        return _this;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(WindowSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.openWindow();
        }
        /**
         * @param {?} error
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyError',
        value: function notifyError(error, innerSub) {
            this._error(error);
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this._complete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.window.next(value);
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.window.error(err);
            this.destination.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.window.complete();
            this.destination.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.window = null;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'openWindow',
        value: function openWindow() {
            var /** @type {?} */prevWindow = this.window;
            if (prevWindow) {
                prevWindow.complete();
            }
            var /** @type {?} */destination = this.destination;
            var /** @type {?} */newWindow = this.window = new _Subject.Subject();
            destination.next(newWindow);
        }
    }]);

    return WindowSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function WindowSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowSubscriber.prototype.window;
}