'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.skipWhile = skipWhile;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.
 *
 * <img src="./img/skipWhile.png" width="100%">
 *
 * specified predicate becomes false.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @return {?}
 */
function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
}

var SkipWhileOperator = function () {
    /**
     * @param {?} predicate
     */
    function SkipWhileOperator(predicate) {
        _classCallCheck(this, SkipWhileOperator);

        this.predicate = predicate;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SkipWhileOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
        }
    }]);

    return SkipWhileOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SkipWhileSubscriber = function (_Subscriber) {
    _inherits(SkipWhileSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} predicate
     */
    function SkipWhileSubscriber(destination, predicate) {
        _classCallCheck(this, SkipWhileSubscriber);

        var _this = _possibleConstructorReturn(this, (SkipWhileSubscriber.__proto__ || Object.getPrototypeOf(SkipWhileSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.skipping = true;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SkipWhileSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */destination = this.destination;
            if (this.skipping) {
                this.tryCallPredicate(value);
            }
            if (!this.skipping) {
                destination.next(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'tryCallPredicate',
        value: function tryCallPredicate(value) {
            try {
                var /** @type {?} */result = this.predicate(value, this.index++);
                this.skipping = Boolean(result);
            } catch (err) {
                this.destination.error(err);
            }
        }
    }]);

    return SkipWhileSubscriber;
}(_Subscriber2.Subscriber);

function SkipWhileSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipWhileSubscriber.prototype.skipping;
    /** @type {?} */
    SkipWhileSubscriber.prototype.index;
}