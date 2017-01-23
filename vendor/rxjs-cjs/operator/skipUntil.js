'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.skipUntil = skipUntil;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * be mirrored by the resulting Observable.
 * an item, then emits the remaining items.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
}

var SkipUntilOperator = function () {
    /**
     * @param {?} notifier
     */
    function SkipUntilOperator(notifier) {
        _classCallCheck(this, SkipUntilOperator);

        this.notifier = notifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SkipUntilOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
        }
    }]);

    return SkipUntilOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SkipUntilSubscriber = function (_OuterSubscriber) {
    _inherits(SkipUntilSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} notifier
     */
    function SkipUntilSubscriber(destination, notifier) {
        _classCallCheck(this, SkipUntilSubscriber);

        var _this = _possibleConstructorReturn(this, (SkipUntilSubscriber.__proto__ || Object.getPrototypeOf(SkipUntilSubscriber)).call(this, destination));

        _this.hasValue = false;
        _this.isInnerStopped = false;
        _this.add((0, _subscribeToResult.subscribeToResult)(_this, notifier));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SkipUntilSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.hasValue) {
                _get(SkipUntilSubscriber.prototype.__proto__ || Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_next', this).call(this, value);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            if (this.isInnerStopped) {
                _get(SkipUntilSubscriber.prototype.__proto__ || Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_complete', this).call(this);
            } else {
                this.unsubscribe();
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
            this.hasValue = true;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.isInnerStopped = true;
            if (this.isStopped) {
                _get(SkipUntilSubscriber.prototype.__proto__ || Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_complete', this).call(this);
            }
        }
    }]);

    return SkipUntilSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SkipUntilSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipUntilSubscriber.prototype.hasValue;
    /** @type {?} */
    SkipUntilSubscriber.prototype.isInnerStopped;
}