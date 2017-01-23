'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.bufferWhen = bufferWhen;

var _Subscription = require('../Subscription');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link windowWhen}
 *
 * arguments and returns an Observable that signals buffer closure.
 * @owner Observable
 * @this {?}
 * @param {?} closingSelector
 * @return {?}
 */
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}

var BufferWhenOperator = function () {
    /**
     * @param {?} closingSelector
     */
    function BufferWhenOperator(closingSelector) {
        _classCallCheck(this, BufferWhenOperator);

        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(BufferWhenOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
        }
    }]);

    return BufferWhenOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var BufferWhenSubscriber = function (_OuterSubscriber) {
    _inherits(BufferWhenSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} closingSelector
     */
    function BufferWhenSubscriber(destination, closingSelector) {
        _classCallCheck(this, BufferWhenSubscriber);

        var _this = _possibleConstructorReturn(this, (BufferWhenSubscriber.__proto__ || Object.getPrototypeOf(BufferWhenSubscriber)).call(this, destination));

        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(BufferWhenSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.buffer.push(value);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */buffer = this.buffer;
            if (buffer) {
                this.destination.next(buffer);
            }
            _get(BufferWhenSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferWhenSubscriber.prototype), '_complete', this).call(this);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            this.buffer = null;
            this.subscribing = false;
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
            this.openBuffer();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            if (this.subscribing) {
                this.complete();
            } else {
                this.openBuffer();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'openBuffer',
        value: function openBuffer() {
            var closingSubscription = this.closingSubscription;

            if (closingSubscription) {
                this.remove(closingSubscription);
                closingSubscription.unsubscribe();
            }
            var /** @type {?} */buffer = this.buffer;
            if (this.buffer) {
                this.destination.next(buffer);
            }
            this.buffer = [];
            var /** @type {?} */closingNotifier = (0, _tryCatch.tryCatch)(this.closingSelector)();
            if (closingNotifier === _errorObject.errorObject) {
                this.error(_errorObject.errorObject.e);
            } else {
                closingSubscription = new _Subscription.Subscription();
                this.closingSubscription = closingSubscription;
                this.add(closingSubscription);
                this.subscribing = true;
                closingSubscription.add((0, _subscribeToResult.subscribeToResult)(this, closingNotifier));
                this.subscribing = false;
            }
        }
    }]);

    return BufferWhenSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function BufferWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferWhenSubscriber.prototype.buffer;
    /** @type {?} */
    BufferWhenSubscriber.prototype.subscribing;
    /** @type {?} */
    BufferWhenSubscriber.prototype.closingSubscription;
}