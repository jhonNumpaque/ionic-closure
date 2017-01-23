'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.bufferToggle = bufferToggle;

var _Subscription = require('../Subscription');

var _subscribeToResult = require('../util/subscribeToResult');

var _OuterSubscriber2 = require('../OuterSubscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferWhen}
 * @see {\@link windowToggle}
 *
 * buffers.
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @owner Observable
 * @this {?}
 * @param {?} openings
 * @param {?} closingSelector
 * @return {?}
 */
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}

var BufferToggleOperator = function () {
    /**
     * @param {?} openings
     * @param {?} closingSelector
     */
    function BufferToggleOperator(openings, closingSelector) {
        _classCallCheck(this, BufferToggleOperator);

        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(BufferToggleOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
        }
    }]);

    return BufferToggleOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var BufferToggleSubscriber = function (_OuterSubscriber) {
    _inherits(BufferToggleSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} openings
     * @param {?} closingSelector
     */
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        _classCallCheck(this, BufferToggleSubscriber);

        var _this = _possibleConstructorReturn(this, (BufferToggleSubscriber.__proto__ || Object.getPrototypeOf(BufferToggleSubscriber)).call(this, destination));

        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add((0, _subscribeToResult.subscribeToResult)(_this, openings));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(BufferToggleSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */contexts = this.contexts;
            var /** @type {?} */len = contexts.length;
            for (var /** @type {?} */i = 0; i < len; i++) {
                contexts[i].buffer.push(value);
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var /** @type {?} */contexts = this.contexts;
            while (contexts.length > 0) {
                var /** @type {?} */context = contexts.shift();
                context.subscription.unsubscribe();
                context.buffer = null;
                context.subscription = null;
            }
            this.contexts = null;
            _get(BufferToggleSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferToggleSubscriber.prototype), '_error', this).call(this, err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */contexts = this.contexts;
            while (contexts.length > 0) {
                var /** @type {?} */context = contexts.shift();
                this.destination.next(context.buffer);
                context.subscription.unsubscribe();
                context.buffer = null;
                context.subscription = null;
            }
            this.contexts = null;
            _get(BufferToggleSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferToggleSubscriber.prototype), '_complete', this).call(this);
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
            outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this.closeBuffer(innerSub.context);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'openBuffer',
        value: function openBuffer(value) {
            try {
                var /** @type {?} */closingSelector = this.closingSelector;
                var /** @type {?} */closingNotifier = closingSelector.call(this, value);
                if (closingNotifier) {
                    this.trySubscribe(closingNotifier);
                }
            } catch (err) {
                this._error(err);
            }
        }
        /**
         * @param {?} context
         * @return {?}
         */

    }, {
        key: 'closeBuffer',
        value: function closeBuffer(context) {
            var /** @type {?} */contexts = this.contexts;
            if (contexts && context) {
                var buffer = context.buffer,
                    subscription = context.subscription;

                this.destination.next(buffer);
                contexts.splice(contexts.indexOf(context), 1);
                this.remove(subscription);
                subscription.unsubscribe();
            }
        }
        /**
         * @param {?} closingNotifier
         * @return {?}
         */

    }, {
        key: 'trySubscribe',
        value: function trySubscribe(closingNotifier) {
            var /** @type {?} */contexts = this.contexts;
            var /** @type {?} */buffer = [];
            var /** @type {?} */subscription = new _Subscription.Subscription();
            var /** @type {?} */context = { buffer: buffer, subscription: subscription };
            contexts.push(context);
            var /** @type {?} */innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, closingNotifier, /** @type {?} */context);
            if (!innerSubscription || innerSubscription.closed) {
                this.closeBuffer(context);
            } else {
                innerSubscription.context = context;
                this.add(innerSubscription);
                subscription.add(innerSubscription);
            }
        }
    }]);

    return BufferToggleSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function BufferToggleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferToggleSubscriber.prototype.contexts;
}