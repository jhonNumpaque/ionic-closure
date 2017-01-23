'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._finally = _finally;

var _Subscriber2 = require('../Subscriber');

var _Subscription = require('../Subscription');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @owner Observable
 * @this {?}
 * @param {?} callback
 * @return {?}
 */
function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
}

var FinallyOperator = function () {
    /**
     * @param {?} callback
     */
    function FinallyOperator(callback) {
        _classCallCheck(this, FinallyOperator);

        this.callback = callback;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(FinallyOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new FinallySubscriber(subscriber, this.callback));
        }
    }]);

    return FinallyOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var FinallySubscriber = function (_Subscriber) {
    _inherits(FinallySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} callback
     */
    function FinallySubscriber(destination, callback) {
        _classCallCheck(this, FinallySubscriber);

        var _this = _possibleConstructorReturn(this, (FinallySubscriber.__proto__ || Object.getPrototypeOf(FinallySubscriber)).call(this, destination));

        _this.add(new _Subscription.Subscription(callback));
        return _this;
    }

    return FinallySubscriber;
}(_Subscriber2.Subscriber);