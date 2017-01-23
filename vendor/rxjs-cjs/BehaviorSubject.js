'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BehaviorSubject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Subject2 = require('./Subject');

var _ObjectUnsubscribedError = require('./util/ObjectUnsubscribedError');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BehaviorSubject = exports.BehaviorSubject = function (_Subject) {
    _inherits(BehaviorSubject, _Subject);

    /**
     * @param {?} _value
     */
    function BehaviorSubject(_value) {
        _classCallCheck(this, BehaviorSubject);

        var _this = _possibleConstructorReturn(this, (BehaviorSubject.__proto__ || Object.getPrototypeOf(BehaviorSubject)).call(this));

        _this._value = _value;
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(BehaviorSubject, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */subscription = _get(BehaviorSubject.prototype.__proto__ || Object.getPrototypeOf(BehaviorSubject.prototype), '_subscribe', this).call(this, subscriber);
            if (subscription && !subscription.closed) {
                subscriber.next(this._value);
            }
            return subscription;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.hasError) {
                throw this.thrownError;
            } else if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            } else {
                return this._value;
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next(value) {
            _get(BehaviorSubject.prototype.__proto__ || Object.getPrototypeOf(BehaviorSubject.prototype), 'next', this).call(this, this._value = value);
        }
    }, {
        key: 'value',
        get: function get() {
            return this.getValue();
        }
    }]);

    return BehaviorSubject;
}(_Subject2.Subject);