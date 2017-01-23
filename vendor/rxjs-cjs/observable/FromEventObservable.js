'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FromEventObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _tryCatch = require('../util/tryCatch');

var _isFunction = require('../util/isFunction');

var _errorObject = require('../util/errorObject');

var _Subscription = require('../Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var /** @type {?} */toString = Object.prototype.toString;
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var FromEventObservable = exports.FromEventObservable = function (_Observable) {
    _inherits(FromEventObservable, _Observable);

    /**
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?=} selector
     * @param {?=} options
     */
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _classCallCheck(this, FromEventObservable);

        var _this = _possibleConstructorReturn(this, (FromEventObservable.__proto__ || Object.getPrototypeOf(FromEventObservable)).call(this));

        _this.sourceObj = sourceObj;
        _this.eventName = eventName;
        _this.selector = selector;
        _this.options = options;
        return _this;
    }
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {\@link from}
     * @see {\@link fromEventPattern}
     *
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * `target`.
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @owner Observable
     * @param {?} target
     * @param {?} eventName
     * @param {?=} options
     * @param {?=} selector
     * @return {?}
     */


    _createClass(FromEventObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */sourceObj = this.sourceObj;
            var /** @type {?} */eventName = this.eventName;
            var /** @type {?} */options = this.options;
            var /** @type {?} */selector = this.selector;
            var /** @type {?} */handler = selector ? function () {
                var /** @type {?} */result = (0, _tryCatch.tryCatch)(selector).apply(undefined, arguments);
                if (result === _errorObject.errorObject) {
                    subscriber.error(_errorObject.errorObject.e);
                } else {
                    subscriber.next(result);
                }
            } : function (e) {
                return subscriber.next(e);
            };
            FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
        }
    }], [{
        key: 'create',
        value: function create(target, eventName, options, selector) {
            if ((0, _isFunction.isFunction)(options)) {
                selector = options;
                options = undefined;
            }
            return new FromEventObservable(target, eventName, selector, options);
        }
        /**
         * @param {?} sourceObj
         * @param {?} eventName
         * @param {?} handler
         * @param {?} subscriber
         * @param {?=} options
         * @return {?}
         */

    }, {
        key: 'setupSubscription',
        value: function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
            var /** @type {?} */unsubscribe = void 0;
            if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
                for (var /** @type {?} */i = 0, /** @type {?} */len = sourceObj.length; i < len; i++) {
                    FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
                }
            } else if (isEventTarget(sourceObj)) {
                (function () {
                    var /** @type {?} */source = sourceObj;
                    sourceObj.addEventListener(eventName, /** @type {?} */handler, /** @type {?} */options);
                    unsubscribe = function unsubscribe() {
                        return source.removeEventListener(eventName, /** @type {?} */handler);
                    };
                })();
            } else if (isJQueryStyleEventEmitter(sourceObj)) {
                (function () {
                    var /** @type {?} */source = sourceObj;
                    sourceObj.on(eventName, handler);
                    unsubscribe = function unsubscribe() {
                        return source.off(eventName, handler);
                    };
                })();
            } else if (isNodeStyleEventEmmitter(sourceObj)) {
                (function () {
                    var /** @type {?} */source = sourceObj;
                    sourceObj.addListener(eventName, handler);
                    unsubscribe = function unsubscribe() {
                        return source.removeListener(eventName, handler);
                    };
                })();
            } else {
                throw new TypeError('Invalid event target');
            }
            subscriber.add(new _Subscription.Subscription(unsubscribe));
        }
    }]);

    return FromEventObservable;
}(_Observable2.Observable);