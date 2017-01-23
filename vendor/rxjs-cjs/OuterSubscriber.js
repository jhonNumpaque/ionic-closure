'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OuterSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscriber2 = require('./Subscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var OuterSubscriber = exports.OuterSubscriber = function (_Subscriber) {
  _inherits(OuterSubscriber, _Subscriber);

  function OuterSubscriber() {
    _classCallCheck(this, OuterSubscriber);

    return _possibleConstructorReturn(this, (OuterSubscriber.__proto__ || Object.getPrototypeOf(OuterSubscriber)).apply(this, arguments));
  }

  _createClass(OuterSubscriber, [{
    key: 'notifyNext',

    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */

  }, {
    key: 'notifyError',
    value: function notifyError(error, innerSub) {
      this.destination.error(error);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */

  }, {
    key: 'notifyComplete',
    value: function notifyComplete(innerSub) {
      this.destination.complete();
    }
  }]);

  return OuterSubscriber;
}(_Subscriber2.Subscriber);