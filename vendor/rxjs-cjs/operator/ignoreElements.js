'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ignoreElements = ignoreElements;

var _Subscriber2 = require('../Subscriber');

var _noop = require('../util/noop');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * or `error`, based on which one is called by the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
;

var IgnoreElementsOperator = function () {
    function IgnoreElementsOperator() {
        _classCallCheck(this, IgnoreElementsOperator);
    }

    _createClass(IgnoreElementsOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new IgnoreElementsSubscriber(subscriber));
        }
    }]);

    return IgnoreElementsOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var IgnoreElementsSubscriber = function (_Subscriber) {
    _inherits(IgnoreElementsSubscriber, _Subscriber);

    function IgnoreElementsSubscriber() {
        _classCallCheck(this, IgnoreElementsSubscriber);

        return _possibleConstructorReturn(this, (IgnoreElementsSubscriber.__proto__ || Object.getPrototypeOf(IgnoreElementsSubscriber)).apply(this, arguments));
    }

    _createClass(IgnoreElementsSubscriber, [{
        key: '_next',

        /**
         * @param {?} unused
         * @return {?}
         */
        value: function _next(unused) {
            (0, _noop.noop)();
        }
    }]);

    return IgnoreElementsSubscriber;
}(_Subscriber2.Subscriber);