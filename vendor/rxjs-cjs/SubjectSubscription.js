'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubjectSubscription = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscription2 = require('./Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var SubjectSubscription = exports.SubjectSubscription = function (_Subscription) {
    _inherits(SubjectSubscription, _Subscription);

    /**
     * @param {?} subject
     * @param {?} subscriber
     */
    function SubjectSubscription(subject, subscriber) {
        _classCallCheck(this, SubjectSubscription);

        console.log('SubjectSubscription');

        var _this = _possibleConstructorReturn(this, (SubjectSubscription.__proto__ || Object.getPrototypeOf(SubjectSubscription)).call(this));

        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(SubjectSubscription, [{
        key: 'unsubscribe',
        value: function unsubscribe() {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var /** @type {?} */subject = this.subject;
            var /** @type {?} */observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var /** @type {?} */subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        }
    }]);

    return SubjectSubscription;
}(_Subscription2.Subscription);

function SubjectSubscription_tsickle_Closure_declarations() {
    /** @type {?} */
    SubjectSubscription.prototype.closed;
}