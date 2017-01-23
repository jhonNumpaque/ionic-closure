'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectableObservableDescriptor = exports.ConnectableObservable = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subject = require('../Subject');

var _Observable2 = require('../Observable');

var _Subscriber2 = require('../Subscriber');

var _Subscription = require('../Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectableObservable = exports.ConnectableObservable = function (_Observable) {
    _inherits(ConnectableObservable, _Observable);

    /**
     * @param {?} source
     * @param {?} subjectFactory
     */
    function ConnectableObservable(source, subjectFactory) {
        _classCallCheck(this, ConnectableObservable);

        var _this = _possibleConstructorReturn(this, (ConnectableObservable.__proto__ || Object.getPrototypeOf(ConnectableObservable)).call(this));

        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(ConnectableObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            return this.getSubject().subscribe(subscriber);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'getSubject',
        value: function getSubject() {
            var /** @type {?} */subject = this._subject;
            if (!subject || subject.isStopped) {
                this._subject = this.subjectFactory();
            }
            return this._subject;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'connect',
        value: function connect() {
            var /** @type {?} */connection = this._connection;
            if (!connection) {
                connection = this._connection = new _Subscription.Subscription();
                connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                if (connection.closed) {
                    this._connection = null;
                    connection = _Subscription.Subscription.EMPTY;
                } else {
                    this._connection = connection;
                }
            }
            return connection;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'refCount',
        value: function refCount() {
            return this.lift(new RefCountOperator(this));
        }
    }]);

    return ConnectableObservable;
}(_Observable2.Observable);

function ConnectableObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectableObservable.prototype._subject;
    /** @type {?} */
    ConnectableObservable.prototype._refCount;
    /** @type {?} */
    ConnectableObservable.prototype._connection;
}
var /** @type {?} */connectableObservableDescriptor = exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subscribe: { value: ConnectableObservable.prototype._subscribe },
    getSubject: { value: ConnectableObservable.prototype.getSubject },
    connect: { value: ConnectableObservable.prototype.connect },
    refCount: { value: ConnectableObservable.prototype.refCount }
};

var ConnectableSubscriber = function (_SubjectSubscriber) {
    _inherits(ConnectableSubscriber, _SubjectSubscriber);

    /**
     * @param {?} destination
     * @param {?} connectable
     */
    function ConnectableSubscriber(destination, connectable) {
        _classCallCheck(this, ConnectableSubscriber);

        var _this2 = _possibleConstructorReturn(this, (ConnectableSubscriber.__proto__ || Object.getPrototypeOf(ConnectableSubscriber)).call(this, destination));

        _this2.connectable = connectable;
        return _this2;
    }
    /**
     * @param {?} err
     * @return {?}
     */


    _createClass(ConnectableSubscriber, [{
        key: '_error',
        value: function _error(err) {
            this._unsubscribe();
            _get(ConnectableSubscriber.prototype.__proto__ || Object.getPrototypeOf(ConnectableSubscriber.prototype), '_error', this).call(this, err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this._unsubscribe();
            _get(ConnectableSubscriber.prototype.__proto__ || Object.getPrototypeOf(ConnectableSubscriber.prototype), '_complete', this).call(this);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var connectable = this.connectable;

            if (connectable) {
                this.connectable = null;
                var /** @type {?} */connection = connectable._connection;
                connectable._refCount = 0;
                connectable._subject = null;
                connectable._connection = null;
                if (connection) {
                    connection.unsubscribe();
                }
            }
        }
    }]);

    return ConnectableSubscriber;
}(_Subject.SubjectSubscriber);

var RefCountOperator = function () {
    /**
     * @param {?} connectable
     */
    function RefCountOperator(connectable) {
        _classCallCheck(this, RefCountOperator);

        this.connectable = connectable;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(RefCountOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            var connectable = this.connectable;

            connectable._refCount++;
            var /** @type {?} */refCounter = new RefCountSubscriber(subscriber, connectable);
            var /** @type {?} */subscription = source.subscribe(refCounter);
            if (!refCounter.closed) {
                refCounter.connection = connectable.connect();
            }
            return subscription;
        }
    }]);

    return RefCountOperator;
}();

var RefCountSubscriber = function (_Subscriber) {
    _inherits(RefCountSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} connectable
     */
    function RefCountSubscriber(destination, connectable) {
        _classCallCheck(this, RefCountSubscriber);

        var _this3 = _possibleConstructorReturn(this, (RefCountSubscriber.__proto__ || Object.getPrototypeOf(RefCountSubscriber)).call(this, destination));

        _this3.connectable = connectable;
        return _this3;
    }
    /**
     * @return {?}
     */


    _createClass(RefCountSubscriber, [{
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var connectable = this.connectable;

            if (!connectable) {
                this.connection = null;
                return;
            }
            this.connectable = null;
            var /** @type {?} */refCount = connectable._refCount;
            if (refCount <= 0) {
                this.connection = null;
                return;
            }
            connectable._refCount = refCount - 1;
            if (refCount > 1) {
                this.connection = null;
                return;
            }
            ///
            // Compare the local RefCountSubscriber's connection Subscription to the
            // connection Subscription on the shared ConnectableObservable. In cases
            // where the ConnectableObservable source synchronously emits values, and
            // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
            // execution continues to here before the RefCountOperator has a chance to
            // supply the RefCountSubscriber with the shared connection Subscription.
            // For example:
            // ```
            // Observable.range(0, 10)
            //   .publish()
            //   .refCount()
            //   .take(5)
            //   .subscribe();
            // ```
            // In order to account for this case, RefCountSubscriber should only dispose
            // the ConnectableObservable's shared connection Subscription if the
            // connection Subscription exists, *and* either:
            //   a. RefCountSubscriber doesn't have a reference to the shared connection
            //      Subscription yet, or,
            //   b. RefCountSubscriber's connection Subscription reference is identical
            //      to the shared connection Subscription
            ///
            var connection = this.connection;

            var /** @type {?} */sharedConnection = connectable._connection;
            this.connection = null;
            if (sharedConnection && (!connection || sharedConnection === connection)) {
                sharedConnection.unsubscribe();
            }
        }
    }]);

    return RefCountSubscriber;
}(_Subscriber2.Subscriber);

function RefCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RefCountSubscriber.prototype.connection;
}