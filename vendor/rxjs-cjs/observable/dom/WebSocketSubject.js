'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WebSocketSubject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Subject = require('../../Subject');

var _Subscriber = require('../../Subscriber');

var _Observable = require('../../Observable');

var _Subscription = require('../../Subscription');

var _root = require('../../util/root');

var _ReplaySubject = require('../../ReplaySubject');

var _tryCatch = require('../../util/tryCatch');

var _errorObject = require('../../util/errorObject');

var _assign = require('../../util/assign');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var WebSocketSubject = exports.WebSocketSubject = function (_AnonymousSubject) {
    _inherits(WebSocketSubject, _AnonymousSubject);

    /**
     * @param {?} urlConfigOrSource
     * @param {?=} destination
     */
    function WebSocketSubject(urlConfigOrSource, destination) {
        _classCallCheck(this, WebSocketSubject);

        if (urlConfigOrSource instanceof _Observable.Observable) {
            var _this = _possibleConstructorReturn(this, (WebSocketSubject.__proto__ || Object.getPrototypeOf(WebSocketSubject)).call(this, destination, urlConfigOrSource));
        } else {
            var _this = _possibleConstructorReturn(this, (WebSocketSubject.__proto__ || Object.getPrototypeOf(WebSocketSubject)).call(this));

            _this.WebSocketCtor = _root.root.WebSocket;
            _this._output = new _Subject.Subject();
            if (typeof urlConfigOrSource === 'string') {
                _this.url = urlConfigOrSource;
            } else {
                // WARNING: config object could override important members here.
                (0, _assign.assign)(_this, urlConfigOrSource);
            }
            if (!_this.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new _ReplaySubject.ReplaySubject();
        }
        return _possibleConstructorReturn(_this);
    }
    /**
     * @param {?} e
     * @return {?}
     */


    _createClass(WebSocketSubject, [{
        key: 'resultSelector',
        value: function resultSelector(e) {
            return JSON.parse(e.data);
        }
        /**
         * @owner Observable
         * @param {?} urlConfigOrSource
         * @return {?}
         */

    }, {
        key: 'lift',

        /**
         * @param {?} operator
         * @return {?}
         */
        value: function lift(operator) {
            var /** @type {?} */sock = new WebSocketSubject(this, /** @type {?} */this.destination);
            sock.operator = operator;
            return sock;
        }
        /**
         * @return {?}
         */

    }, {
        key: '_resetState',
        value: function _resetState() {
            this.socket = null;
            if (!this.source) {
                this.destination = new _ReplaySubject.ReplaySubject();
            }
            this._output = new _Subject.Subject();
        }
        /**
         * @param {?} subMsg
         * @param {?} unsubMsg
         * @param {?} messageFilter
         * @return {?}
         */

    }, {
        key: 'multiplex',
        value: function multiplex(subMsg, unsubMsg, messageFilter) {
            var /** @type {?} */self = this;
            return new _Observable.Observable(function (observer) {
                var /** @type {?} */result = (0, _tryCatch.tryCatch)(subMsg)();
                if (result === _errorObject.errorObject) {
                    observer.error(_errorObject.errorObject.e);
                } else {
                    self.next(result);
                }
                var /** @type {?} */subscription = self.subscribe(function (x) {
                    var /** @type {?} */result = (0, _tryCatch.tryCatch)(messageFilter)(x);
                    if (result === _errorObject.errorObject) {
                        observer.error(_errorObject.errorObject.e);
                    } else if (result) {
                        observer.next(x);
                    }
                }, function (err) {
                    return observer.error(err);
                }, function () {
                    return observer.complete();
                });
                return function () {
                    var /** @type {?} */result = (0, _tryCatch.tryCatch)(unsubMsg)();
                    if (result === _errorObject.errorObject) {
                        observer.error(_errorObject.errorObject.e);
                    } else {
                        self.next(result);
                    }
                    subscription.unsubscribe();
                };
            });
        }
        /**
         * @return {?}
         */

    }, {
        key: '_connectSocket',
        value: function _connectSocket() {
            var _this2 = this;

            var WebSocketCtor = this.WebSocketCtor;

            var /** @type {?} */observer = this._output;
            var /** @type {?} */socket = null;
            try {
                socket = this.protocol ? new WebSocketCtor(this.url, this.protocol) : new WebSocketCtor(this.url);
                this.socket = socket;
            } catch (e) {
                observer.error(e);
                return;
            }
            var /** @type {?} */subscription = new _Subscription.Subscription(function () {
                _this2.socket = null;
                if (socket && socket.readyState === 1) {
                    socket.close();
                }
            });
            socket.onopen = function (e) {
                var /** @type {?} */openObserver = _this2.openObserver;
                if (openObserver) {
                    openObserver.next(e);
                }
                var /** @type {?} */queue = _this2.destination;
                _this2.destination = _Subscriber.Subscriber.create(function (x) {
                    return socket.readyState === 1 && socket.send(x);
                }, function (e) {
                    var /** @type {?} */closingObserver = _this2.closingObserver;
                    if (closingObserver) {
                        closingObserver.next(undefined);
                    }
                    if (e && e.code) {
                        socket.close(e.code, e.reason);
                    } else {
                        observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' + 'and an optional reason: { code: number, reason: string }'));
                    }
                    _this2._resetState();
                }, function () {
                    var /** @type {?} */closingObserver = _this2.closingObserver;
                    if (closingObserver) {
                        closingObserver.next(undefined);
                    }
                    socket.close();
                    _this2._resetState();
                });
                if (queue && queue instanceof _ReplaySubject.ReplaySubject) {
                    subscription.add(queue.subscribe(_this2.destination));
                }
            };
            socket.onerror = function (e) {
                _this2._resetState();
                observer.error(e);
            };
            socket.onclose = function (e) {
                _this2._resetState();
                var /** @type {?} */closeObserver = _this2.closeObserver;
                if (closeObserver) {
                    closeObserver.next(e);
                }
                if (e.wasClean) {
                    observer.complete();
                } else {
                    observer.error(e);
                }
            };
            socket.onmessage = function (e) {
                var /** @type {?} */result = (0, _tryCatch.tryCatch)(_this2.resultSelector)(e);
                if (result === _errorObject.errorObject) {
                    observer.error(_errorObject.errorObject.e);
                } else {
                    observer.next(result);
                }
            };
        }
        /**
         * @param {?} subscriber
         * @return {?}
         */

    }, {
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            var _this3 = this;

            var source = this.source;

            if (source) {
                return source.subscribe(subscriber);
            }
            if (!this.socket) {
                this._connectSocket();
            }
            var /** @type {?} */subscription = new _Subscription.Subscription();
            subscription.add(this._output.subscribe(subscriber));
            subscription.add(function () {
                var socket = _this3.socket;

                if (_this3._output.observers.length === 0) {
                    if (socket && socket.readyState === 1) {
                        socket.close();
                    }
                    _this3._resetState();
                }
            });
            return subscription;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            var source = this.source,
                socket = this.socket;

            if (socket && socket.readyState === 1) {
                socket.close();
                this._resetState();
            }
            _get(WebSocketSubject.prototype.__proto__ || Object.getPrototypeOf(WebSocketSubject.prototype), 'unsubscribe', this).call(this);
            if (!source) {
                this.destination = new _ReplaySubject.ReplaySubject();
            }
        }
    }], [{
        key: 'create',
        value: function create(urlConfigOrSource) {
            return new WebSocketSubject(urlConfigOrSource);
        }
    }]);

    return WebSocketSubject;
}(_Subject.AnonymousSubject);

function WebSocketSubject_tsickle_Closure_declarations() {
    /** @type {?} */
    WebSocketSubject.prototype.url;
    /** @type {?} */
    WebSocketSubject.prototype.protocol;
    /** @type {?} */
    WebSocketSubject.prototype.socket;
    /** @type {?} */
    WebSocketSubject.prototype.openObserver;
    /** @type {?} */
    WebSocketSubject.prototype.closeObserver;
    /** @type {?} */
    WebSocketSubject.prototype.closingObserver;
    /** @type {?} */
    WebSocketSubject.prototype.WebSocketCtor;
    /** @type {?} */
    WebSocketSubject.prototype._output;
}