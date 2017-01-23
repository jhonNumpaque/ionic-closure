'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FromEventPatternObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _Subscription = require('../Subscription');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var FromEventPatternObservable = exports.FromEventPatternObservable = function (_Observable) {
    _inherits(FromEventPatternObservable, _Observable);

    /**
     * @param {?} addHandler
     * @param {?} removeHandler
     * @param {?=} selector
     */
    function FromEventPatternObservable(addHandler, removeHandler, selector) {
        _classCallCheck(this, FromEventPatternObservable);

        var _this = _possibleConstructorReturn(this, (FromEventPatternObservable.__proto__ || Object.getPrototypeOf(FromEventPatternObservable)).call(this));

        _this.addHandler = addHandler;
        _this.removeHandler = removeHandler;
        _this.selector = selector;
        return _this;
    }
    /**
     * Creates an Observable from an API based on addHandler/removeHandler
     * functions.
     *
     * <span class="informal">Converts any addHandler/removeHandler API to an
     * Observable.</span>
     *
     * <img src="./img/fromEventPattern.png" width="100%">
     *
     * Creates an Observable by using the `addHandler` and `removeHandler`
     * functions to add and remove the handlers, with an optional selector
     * function to project the event arguments to a result. The `addHandler` is
     * called when the output Observable is subscribed, and `removeHandler` is
     * called when the Subscription is unsubscribed.
     *
     * function addClickHandler(handler) {
     *   document.addEventListener('click', handler);
     * }
     *
     * function removeClickHandler(handler) {
     *   document.removeEventListener('click', handler);
     * }
     *
     * var clicks = Rx.Observable.fromEventPattern(
     *   addClickHandler,
     *   removeClickHandler
     * );
     * clicks.subscribe(x => console.log(x));
     *
     * @see {\@link from}
     * @see {\@link fromEvent}
     *
     * a `handler` function as argument and attaches it somehow to the actual
     * source of events.
     * takes a `handler` function as argument and removes it in case it was
     * previously attached using `addHandler`.
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @owner Observable
     * @param {?} addHandler
     * @param {?} removeHandler
     * @param {?=} selector
     * @return {?}
     */


    _createClass(FromEventPatternObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var _this2 = this;

            var /** @type {?} */removeHandler = this.removeHandler;
            var /** @type {?} */handler = !!this.selector ? function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _this2._callSelector(subscriber, args);
            } : function (e) {
                subscriber.next(e);
            };
            this._callAddHandler(handler, subscriber);
            subscriber.add(new _Subscription.Subscription(function () {
                //TODO: determine whether or not to forward to error handler
                removeHandler(handler);
            }));
        }
        /**
         * @param {?} subscriber
         * @param {?} args
         * @return {?}
         */

    }, {
        key: '_callSelector',
        value: function _callSelector(subscriber, args) {
            try {
                var /** @type {?} */result = this.selector.apply(this, _toConsumableArray(args));
                subscriber.next(result);
            } catch (e) {
                subscriber.error(e);
            }
        }
        /**
         * @param {?} handler
         * @param {?} errorSubscriber
         * @return {?}
         */

    }, {
        key: '_callAddHandler',
        value: function _callAddHandler(handler, errorSubscriber) {
            try {
                this.addHandler(handler);
            } catch (e) {
                errorSubscriber.error(e);
            }
        }
    }], [{
        key: 'create',
        value: function create(addHandler, removeHandler, selector) {
            return new FromEventPatternObservable(addHandler, removeHandler, selector);
        }
    }]);

    return FromEventPatternObservable;
}(_Observable2.Observable);