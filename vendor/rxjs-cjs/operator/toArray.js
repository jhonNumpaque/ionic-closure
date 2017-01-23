'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.toArray = toArray;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function toArray() {
    return this.lift(new ToArrayOperator());
}

var ToArrayOperator = function () {
    function ToArrayOperator() {
        _classCallCheck(this, ToArrayOperator);
    }

    _createClass(ToArrayOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new ToArraySubscriber(subscriber));
        }
    }]);

    return ToArrayOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var ToArraySubscriber = function (_Subscriber) {
    _inherits(ToArraySubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function ToArraySubscriber(destination) {
        _classCallCheck(this, ToArraySubscriber);

        var _this = _possibleConstructorReturn(this, (ToArraySubscriber.__proto__ || Object.getPrototypeOf(ToArraySubscriber)).call(this, destination));

        _this.array = [];
        return _this;
    }
    /**
     * @param {?} x
     * @return {?}
     */


    _createClass(ToArraySubscriber, [{
        key: '_next',
        value: function _next(x) {
            this.array.push(x);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.destination.next(this.array);
            this.destination.complete();
        }
    }]);

    return ToArraySubscriber;
}(_Subscriber2.Subscriber);

function ToArraySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ToArraySubscriber.prototype.array;
}