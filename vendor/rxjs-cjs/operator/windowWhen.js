'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.windowWhen = windowWhen;

var _Subject = require('../Subject');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Branch out the source Observable values as a nested Observable using a
 * factory function of closing Observables to determine when to start a new
 * window.
 *
 * <span class="informal">It's like {\@link bufferWhen}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowWhen.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping windows.
 * It emits the current window and opens a new one whenever the Observable
 * produced by the specified `closingSelector` function emits an item. The first
 * window is opened immediately when subscribing to the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks
 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowCount}
 * @see {\@link windowTime}
 * @see {\@link windowToggle}
 * @see {\@link bufferWhen}
 *
 * arguments and returns an Observable that signals (on either `next` or
 * `complete`) when to close the previous window and start a new one.
 * are Observables.
 * @owner Observable
 * @this {?}
 * @param {?} closingSelector
 * @return {?}
 */
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}

var WindowOperator = function () {
    /**
     * @param {?} closingSelector
     */
    function WindowOperator(closingSelector) {
        _classCallCheck(this, WindowOperator);

        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WindowOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
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
     * @param {?} closingSelector
     */
    function WindowSubscriber(destination, closingSelector) {
        _classCallCheck(this, WindowSubscriber);

        var _this = _possibleConstructorReturn(this, (WindowSubscriber.__proto__ || Object.getPrototypeOf(WindowSubscriber)).call(this, destination));

        _this.destination = destination;
        _this.closingSelector = closingSelector;
        _this.openWindow();
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
            this.openWindow(innerSub);
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
            this.openWindow(innerSub);
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
            this.unsubscribeClosingNotification();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.window.complete();
            this.destination.complete();
            this.unsubscribeClosingNotification();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribeClosingNotification',
        value: function unsubscribeClosingNotification() {
            if (this.closingNotification) {
                this.closingNotification.unsubscribe();
            }
        }
        /**
         * @param {?=} innerSub
         * @return {?}
         */

    }, {
        key: 'openWindow',
        value: function openWindow() {
            var innerSub = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (innerSub) {
                this.remove(innerSub);
                innerSub.unsubscribe();
            }
            var /** @type {?} */prevWindow = this.window;
            if (prevWindow) {
                prevWindow.complete();
            }
            var /** @type {?} */window = this.window = new _Subject.Subject();
            this.destination.next(window);
            var /** @type {?} */closingNotifier = (0, _tryCatch.tryCatch)(this.closingSelector)();
            if (closingNotifier === _errorObject.errorObject) {
                var /** @type {?} */err = _errorObject.errorObject.e;
                this.destination.error(err);
                this.window.error(err);
            } else {
                this.add(this.closingNotification = (0, _subscribeToResult.subscribeToResult)(this, closingNotifier));
            }
        }
    }]);

    return WindowSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function WindowSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowSubscriber.prototype.window;
    /** @type {?} */
    WindowSubscriber.prototype.closingNotification;
}