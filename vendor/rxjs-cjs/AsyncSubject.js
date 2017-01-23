'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncSubject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Subject2 = require('./Subject');

var _Subscription = require('./Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncSubject = exports.AsyncSubject = function (_Subject) {
    _inherits(AsyncSubject, _Subject);

    function AsyncSubject() {
        _classCallCheck(this, AsyncSubject);

        var _this = _possibleConstructorReturn(this, (AsyncSubject.__proto__ || Object.getPrototypeOf(AsyncSubject)).apply(this, arguments));

        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(AsyncSubject, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            if (this.hasCompleted && this.hasNext) {
                subscriber.next(this.value);
                subscriber.complete();
                return _Subscription.Subscription.EMPTY;
            } else if (this.hasError) {
                subscriber.error(this.thrownError);
                return _Subscription.Subscription.EMPTY;
            }
            return _get(AsyncSubject.prototype.__proto__ || Object.getPrototypeOf(AsyncSubject.prototype), '_subscribe', this).call(this, subscriber);
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next(value) {
            if (!this.hasCompleted) {
                this.value = value;
                this.hasNext = true;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'complete',
        value: function complete() {
            this.hasCompleted = true;
            if (this.hasNext) {
                _get(AsyncSubject.prototype.__proto__ || Object.getPrototypeOf(AsyncSubject.prototype), 'next', this).call(this, this.value);
            }
            _get(AsyncSubject.prototype.__proto__ || Object.getPrototypeOf(AsyncSubject.prototype), 'complete', this).call(this);
        }
    }]);

    return AsyncSubject;
}(_Subject2.Subject);

function AsyncSubject_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncSubject.prototype.value;
    /** @type {?} */
    AsyncSubject.prototype.hasNext;
    /** @type {?} */
    AsyncSubject.prototype.hasCompleted;
}