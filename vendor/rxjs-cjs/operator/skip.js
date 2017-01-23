'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.skip = skip;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that skips `n` items emitted by an Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 *
 * @owner Observable
 * @this {?}
 * @param {?} total
 * @return {?}
 */
function skip(total) {
    return this.lift(new SkipOperator(total));
}

var SkipOperator = function () {
    /**
     * @param {?} total
     */
    function SkipOperator(total) {
        _classCallCheck(this, SkipOperator);

        this.total = total;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SkipOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SkipSubscriber(subscriber, this.total));
        }
    }]);

    return SkipOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SkipSubscriber = function (_Subscriber) {
    _inherits(SkipSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} total
     */
    function SkipSubscriber(destination, total) {
        _classCallCheck(this, SkipSubscriber);

        var _this = _possibleConstructorReturn(this, (SkipSubscriber.__proto__ || Object.getPrototypeOf(SkipSubscriber)).call(this, destination));

        _this.total = total;
        _this.count = 0;
        return _this;
    }
    /**
     * @param {?} x
     * @return {?}
     */


    _createClass(SkipSubscriber, [{
        key: '_next',
        value: function _next(x) {
            if (++this.count > this.total) {
                this.destination.next(x);
            }
        }
    }]);

    return SkipSubscriber;
}(_Subscriber2.Subscriber);

function SkipSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipSubscriber.prototype.count;
}