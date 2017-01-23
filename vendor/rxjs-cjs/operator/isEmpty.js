'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isEmpty = isEmpty;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function isEmpty() {
    return this.lift(new IsEmptyOperator());
}

var IsEmptyOperator = function () {
    function IsEmptyOperator() {
        _classCallCheck(this, IsEmptyOperator);
    }

    _createClass(IsEmptyOperator, [{
        key: 'call',

        /**
         * @param {?} observer
         * @param {?} source
         * @return {?}
         */
        value: function call(observer, source) {
            return source.subscribe(new IsEmptySubscriber(observer));
        }
    }]);

    return IsEmptyOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var IsEmptySubscriber = function (_Subscriber) {
    _inherits(IsEmptySubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function IsEmptySubscriber(destination) {
        _classCallCheck(this, IsEmptySubscriber);

        return _possibleConstructorReturn(this, (IsEmptySubscriber.__proto__ || Object.getPrototypeOf(IsEmptySubscriber)).call(this, destination));
    }
    /**
     * @param {?} isEmpty
     * @return {?}
     */


    _createClass(IsEmptySubscriber, [{
        key: 'notifyComplete',
        value: function notifyComplete(isEmpty) {
            var /** @type {?} */destination = this.destination;
            destination.next(isEmpty);
            destination.complete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            this.notifyComplete(false);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.notifyComplete(true);
        }
    }]);

    return IsEmptySubscriber;
}(_Subscriber2.Subscriber);