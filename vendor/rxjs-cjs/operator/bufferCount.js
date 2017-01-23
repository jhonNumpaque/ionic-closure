'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.bufferCount = bufferCount;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link pairwise}
 * @see {\@link windowCount}
 *
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @owner Observable
 * @this {?}
 * @param {?} bufferSize
 * @param {?=} startBufferEvery
 * @return {?}
 */
function bufferCount(bufferSize) {
    var startBufferEvery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}

var BufferCountOperator = function () {
    /**
     * @param {?} bufferSize
     * @param {?} startBufferEvery
     */
    function BufferCountOperator(bufferSize, startBufferEvery) {
        _classCallCheck(this, BufferCountOperator);

        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(BufferCountOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
        }
    }]);

    return BufferCountOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var BufferCountSubscriber = function (_Subscriber) {
    _inherits(BufferCountSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} bufferSize
     * @param {?} startBufferEvery
     */
    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
        _classCallCheck(this, BufferCountSubscriber);

        var _this = _possibleConstructorReturn(this, (BufferCountSubscriber.__proto__ || Object.getPrototypeOf(BufferCountSubscriber)).call(this, destination));

        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(BufferCountSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */count = this.count++;
            var destination = this.destination,
                bufferSize = this.bufferSize,
                startBufferEvery = this.startBufferEvery,
                buffers = this.buffers;

            var /** @type {?} */startOn = startBufferEvery == null ? bufferSize : startBufferEvery;
            if (count % startOn === 0) {
                buffers.push([]);
            }
            for (var /** @type {?} */i = buffers.length; i--;) {
                var /** @type {?} */buffer = buffers[i];
                buffer.push(value);
                if (buffer.length === bufferSize) {
                    buffers.splice(i, 1);
                    destination.next(buffer);
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            var /** @type {?} */buffers = this.buffers;
            while (buffers.length > 0) {
                var /** @type {?} */buffer = buffers.shift();
                if (buffer.length > 0) {
                    destination.next(buffer);
                }
            }
            _get(BufferCountSubscriber.prototype.__proto__ || Object.getPrototypeOf(BufferCountSubscriber.prototype), '_complete', this).call(this);
        }
    }]);

    return BufferCountSubscriber;
}(_Subscriber2.Subscriber);

function BufferCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferCountSubscriber.prototype.buffers;
    /** @type {?} */
    BufferCountSubscriber.prototype.count;
}