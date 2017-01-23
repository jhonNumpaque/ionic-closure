'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.retry = retry;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
 * predicate returns true for that specific exception and retry count.
 * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
 * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
 *
 * <img src="./img/retry.png" width="100%">
 *
 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @owner Observable
 * @this {?}
 * @param {?=} count
 * @return {?}
 */
function retry() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    return this.lift(new RetryOperator(count, this));
}

var RetryOperator = function () {
    /**
     * @param {?} count
     * @param {?} source
     */
    function RetryOperator(count, source) {
        _classCallCheck(this, RetryOperator);

        this.count = count;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(RetryOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
        }
    }]);

    return RetryOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var RetrySubscriber = function (_Subscriber) {
    _inherits(RetrySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} count
     * @param {?} source
     */
    function RetrySubscriber(destination, count, source) {
        _classCallCheck(this, RetrySubscriber);

        var _this = _possibleConstructorReturn(this, (RetrySubscriber.__proto__ || Object.getPrototypeOf(RetrySubscriber)).call(this, destination));

        _this.count = count;
        _this.source = source;
        return _this;
    }
    /**
     * @param {?} err
     * @return {?}
     */


    _createClass(RetrySubscriber, [{
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var source = this.source,
                    count = this.count;

                if (count === 0) {
                    return _get(RetrySubscriber.prototype.__proto__ || Object.getPrototypeOf(RetrySubscriber.prototype), 'error', this).call(this, err);
                } else if (count > -1) {
                    this.count = count - 1;
                }
                this.unsubscribe();
                this.isStopped = false;
                this.closed = false;
                source.subscribe(this);
            }
        }
    }]);

    return RetrySubscriber;
}(_Subscriber2.Subscriber);