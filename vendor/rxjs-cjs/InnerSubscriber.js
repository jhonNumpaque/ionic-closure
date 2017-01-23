'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InnerSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscriber2 = require('./Subscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var InnerSubscriber = exports.InnerSubscriber = function (_Subscriber) {
    _inherits(InnerSubscriber, _Subscriber);

    /**
     * @param {?} parent
     * @param {?} outerValue
     * @param {?} outerIndex
     */
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _classCallCheck(this, InnerSubscriber);

        var _this = _possibleConstructorReturn(this, (InnerSubscriber.__proto__ || Object.getPrototypeOf(InnerSubscriber)).call(this));

        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(InnerSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        }
        /**
         * @param {?} error
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        }
    }]);

    return InnerSubscriber;
}(_Subscriber2.Subscriber);

function InnerSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    InnerSubscriber.prototype.index;
}