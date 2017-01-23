'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.buffer = buffer;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link window}
 *
 * buffer to be emitted on the output Observable.
 * values.
 * @owner Observable
 * @this {?}
 * @param {?} closingNotifier
 * @return {?}
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}

var BufferOperator = function () {
    /**
     * @param {?} closingNotifier
     */
    function BufferOperator(closingNotifier) {
        _classCallCheck(this, BufferOperator);

        this.closingNotifier = closingNotifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(BufferOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
        }
    }]);

    return BufferOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var BufferSubscriber = function (_OuterSubscriber) {
    _inherits(BufferSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} closingNotifier
     */
    function BufferSubscriber(destination, closingNotifier) {
        _classCallCheck(this, BufferSubscriber);

        var _this = _possibleConstructorReturn(this, (BufferSubscriber.__proto__ || Object.getPrototypeOf(BufferSubscriber)).call(this, destination));

        _this.buffer = [];
        _this.add((0, _subscribeToResult.subscribeToResult)(_this, closingNotifier));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(BufferSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.buffer.push(value);
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
            var /** @type {?} */buffer = this.buffer;
            this.buffer = [];
            this.destination.next(buffer);
        }
    }]);

    return BufferSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function BufferSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferSubscriber.prototype.buffer;
}