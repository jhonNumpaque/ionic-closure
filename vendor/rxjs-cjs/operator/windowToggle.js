'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.windowToggle = windowToggle;

var _Subject = require('../Subject');

var _Subscription = require('../Subscription');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Branch out the source Observable values as a nested Observable starting from
 * an emission from `openings` and ending when the output of `closingSelector`
 * emits.
 *
 * <span class="informal">It's like {\@link bufferToggle}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowToggle.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows that contain those items
 * emitted by the source Observable between the time when the `openings`
 * Observable emits an item and when the Observable returned by
 * `closingSelector` emits an item.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var result = clicks.windowToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * ).mergeAll();
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowCount}
 * @see {\@link windowTime}
 * @see {\@link windowWhen}
 * @see {\@link bufferToggle}
 *
 * windows.
 * the value emitted by the `openings` observable and returns an Observable,
 * which, when it emits (either `next` or `complete`), signals that the
 * associated window should complete.
 * are Observables.
 * @owner Observable
 * @this {?}
 * @param {?} openings
 * @param {?} closingSelector
 * @return {?}
 */
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}

var WindowToggleOperator = function () {
    /**
     * @param {?} openings
     * @param {?} closingSelector
     */
    function WindowToggleOperator(openings, closingSelector) {
        _classCallCheck(this, WindowToggleOperator);

        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WindowToggleOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
        }
    }]);

    return WindowToggleOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var WindowToggleSubscriber = function (_OuterSubscriber) {
    _inherits(WindowToggleSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} openings
     * @param {?} closingSelector
     */
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        _classCallCheck(this, WindowToggleSubscriber);

        var _this = _possibleConstructorReturn(this, (WindowToggleSubscriber.__proto__ || Object.getPrototypeOf(WindowToggleSubscriber)).call(this, destination));

        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = (0, _subscribeToResult.subscribeToResult)(_this, openings, openings));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(WindowToggleSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var contexts = this.contexts;

            if (contexts) {
                var /** @type {?} */len = contexts.length;
                for (var /** @type {?} */i = 0; i < len; i++) {
                    contexts[i].window.next(value);
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
            var contexts = this.contexts;

            this.contexts = null;
            if (contexts) {
                var /** @type {?} */len = contexts.length;
                var /** @type {?} */index = -1;
                while (++index < len) {
                    var /** @type {?} */context = contexts[index];
                    context.window.error(err);
                    context.subscription.unsubscribe();
                }
            }
            _get(WindowToggleSubscriber.prototype.__proto__ || Object.getPrototypeOf(WindowToggleSubscriber.prototype), '_error', this).call(this, err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var contexts = this.contexts;

            this.contexts = null;
            if (contexts) {
                var /** @type {?} */len = contexts.length;
                var /** @type {?} */index = -1;
                while (++index < len) {
                    var /** @type {?} */context = contexts[index];
                    context.window.complete();
                    context.subscription.unsubscribe();
                }
            }
            _get(WindowToggleSubscriber.prototype.__proto__ || Object.getPrototypeOf(WindowToggleSubscriber.prototype), '_complete', this).call(this);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var contexts = this.contexts;

            this.contexts = null;
            if (contexts) {
                var /** @type {?} */len = contexts.length;
                var /** @type {?} */index = -1;
                while (++index < len) {
                    var /** @type {?} */context = contexts[index];
                    context.window.unsubscribe();
                    context.subscription.unsubscribe();
                }
            }
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            if (outerValue === this.openings) {
                var closingSelector = this.closingSelector;

                var /** @type {?} */closingNotifier = (0, _tryCatch.tryCatch)(closingSelector)(innerValue);
                if (closingNotifier === _errorObject.errorObject) {
                    return this.error(_errorObject.errorObject.e);
                } else {
                    var /** @type {?} */window = new _Subject.Subject();
                    var /** @type {?} */subscription = new _Subscription.Subscription();
                    var /** @type {?} */context = { window: window, subscription: subscription };
                    this.contexts.push(context);
                    var /** @type {?} */innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, closingNotifier, context);
                    if (innerSubscription.closed) {
                        this.closeWindow(this.contexts.length - 1);
                    } else {
                        innerSubscription.context = context;
                        subscription.add(innerSubscription);
                    }
                    this.destination.next(window);
                }
            } else {
                this.closeWindow(this.contexts.indexOf(outerValue));
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: 'notifyError',
        value: function notifyError(err) {
            this.error(err);
        }
        /**
         * @param {?} inner
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(inner) {
            if (inner !== this.openSubscription) {
                this.closeWindow(this.contexts.indexOf(inner.context));
            }
        }
        /**
         * @param {?} index
         * @return {?}
         */

    }, {
        key: 'closeWindow',
        value: function closeWindow(index) {
            if (index === -1) {
                return;
            }
            var contexts = this.contexts;

            var /** @type {?} */context = contexts[index];
            var window = context.window,
                subscription = context.subscription;

            contexts.splice(index, 1);
            window.complete();
            subscription.unsubscribe();
        }
    }]);

    return WindowToggleSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function WindowToggleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowToggleSubscriber.prototype.contexts;
    /** @type {?} */
    WindowToggleSubscriber.prototype.openSubscription;
}