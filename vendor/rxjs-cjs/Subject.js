'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnonymousSubject = exports.Subject = exports.SubjectSubscriber = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('./Observable');

var _Subscriber2 = require('./Subscriber');

var _Subscription = require('./Subscription');

var _ObjectUnsubscribedError = require('./util/ObjectUnsubscribedError');

var _SubjectSubscription = require('./SubjectSubscription');

var _rxSubscriber = require('./symbol/rxSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubjectSubscriber = exports.SubjectSubscriber = function (_Subscriber) {
    _inherits(SubjectSubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function SubjectSubscriber(destination) {
        _classCallCheck(this, SubjectSubscriber);

        var _this = _possibleConstructorReturn(this, (SubjectSubscriber.__proto__ || Object.getPrototypeOf(SubjectSubscriber)).call(this, destination));

        _this.destination = destination;
        return _this;
    }

    return SubjectSubscriber;
}(_Subscriber2.Subscriber);

var Subject = exports.Subject = function (_Observable) {
    _inherits(Subject, _Observable);

    function Subject() {
        _classCallCheck(this, Subject);

        var _this2 = _possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).call(this));

        _this2.observers = [];
        _this2.closed = false;
        _this2.isStopped = false;
        _this2.hasError = false;
        _this2.thrownError = null;
        return _this2;
    }
    /**
     * @return {?}
     */


    _createClass(Subject, [{
        key: _rxSubscriber.$$rxSubscriber,
        value: function value() {
            return new SubjectSubscriber(this);
        }
        /**
         * @param {?} operator
         * @return {?}
         */

    }, {
        key: 'lift',
        value: function lift(operator) {
            var /** @type {?} */subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        }
        /**
         * @param {?=} value
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next(value) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;

                var /** @type {?} */len = observers.length;
                var /** @type {?} */copy = observers.slice();
                for (var /** @type {?} */i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: 'error',
        value: function error(err) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;

            var /** @type {?} */len = observers.length;
            var /** @type {?} */copy = observers.slice();
            for (var /** @type {?} */i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'complete',
        value: function complete() {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;

            var /** @type {?} */len = observers.length;
            var /** @type {?} */copy = observers.slice();
            for (var /** @type {?} */i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */

    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            if (this.closed) {
                throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
            } else if (this.hasError) {
                subscriber.error(this.thrownError);
                return _Subscription.Subscription.EMPTY;
            } else if (this.isStopped) {
                subscriber.complete();
                return _Subscription.Subscription.EMPTY;
            } else {
                this.observers.push(subscriber);
                return new _SubjectSubscription.SubjectSubscription(this, subscriber);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'asObservable',
        value: function asObservable() {
            var /** @type {?} */observable = new _Observable2.Observable();
            observable.source = this;
            return observable;
        }
    }]);

    return Subject;
}(_Observable2.Observable);

Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
};
function Subject_tsickle_Closure_declarations() {
    /** @type {?} */
    Subject.prototype.observers;
    /** @type {?} */
    Subject.prototype.closed;
    /** @type {?} */
    Subject.prototype.isStopped;
    /** @type {?} */
    Subject.prototype.hasError;
    /** @type {?} */
    Subject.prototype.thrownError;
    /** @type {?} */
    Subject.prototype.create;
}

var AnonymousSubject = exports.AnonymousSubject = function (_Subject) {
    _inherits(AnonymousSubject, _Subject);

    /**
     * @param {?=} destination
     * @param {?=} source
     */
    function AnonymousSubject(destination, source) {
        _classCallCheck(this, AnonymousSubject);

        var _this3 = _possibleConstructorReturn(this, (AnonymousSubject.__proto__ || Object.getPrototypeOf(AnonymousSubject)).call(this));

        _this3.destination = destination;
        _this3.source = source;
        return _this3;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(AnonymousSubject, [{
        key: 'next',
        value: function next(value) {
            var destination = this.destination;

            if (destination && destination.next) {
                destination.next(value);
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: 'error',
        value: function error(err) {
            var destination = this.destination;

            if (destination && destination.error) {
                this.destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'complete',
        value: function complete() {
            var destination = this.destination;

            if (destination && destination.complete) {
                this.destination.complete();
            }
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */

    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var source = this.source;

            if (source) {
                return this.source.subscribe(subscriber);
            } else {
                return _Subscription.Subscription.EMPTY;
            }
        }
    }]);

    return AnonymousSubject;
}(Subject);