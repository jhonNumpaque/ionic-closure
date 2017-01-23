'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AjaxTimeoutError = exports.AjaxError = exports.AjaxResponse = exports.AjaxSubscriber = exports.AjaxObservable = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ajaxGet = ajaxGet;
exports.ajaxPost = ajaxPost;
exports.ajaxDelete = ajaxDelete;
exports.ajaxPut = ajaxPut;
exports.ajaxGetJSON = ajaxGetJSON;

var _root = require('../../util/root');

var _tryCatch = require('../../util/tryCatch');

var _errorObject = require('../../util/errorObject');

var _Observable2 = require('../../Observable');

var _Subscriber2 = require('../../Subscriber');

var _map = require('../../operator/map');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @this {?}
 * @return {?}
 */
function getCORSRequest() {
    if (_root.root.XMLHttpRequest) {
        var /** @type {?} */xhr = new _root.root.XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.withCredentials = !!this.withCredentials;
        }
        return xhr;
    } else if (!!_root.root.XDomainRequest) {
        return new _root.root.XDomainRequest();
    } else {
        throw new Error('CORS is not supported by your browser');
    }
}
/**
 * @return {?}
 */
function getXMLHttpRequest() {
    if (_root.root.XMLHttpRequest) {
        return new _root.root.XMLHttpRequest();
    } else {
        var /** @type {?} */progId = void 0;
        try {
            var /** @type {?} */progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var /** @type {?} */i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new _root.root.ActiveXObject(progId)) {
                        break;
                    }
                } catch (e) {}
            }
            return new _root.root.ActiveXObject(progId);
        } catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
function ajaxGet(url) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
;
/**
 * @param {?} url
 * @param {?=} body
 * @param {?=} headers
 * @return {?}
 */
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
;
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
;
/**
 * @param {?} url
 * @param {?=} body
 * @param {?=} headers
 * @return {?}
 */
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
;
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers }).lift(new _map.MapOperator(function (x, index) {
        return x.response;
    }, null));
}
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var AjaxObservable = exports.AjaxObservable = function (_Observable) {
    _inherits(AjaxObservable, _Observable);

    /**
     * @param {?} urlOrRequest
     */
    function AjaxObservable(urlOrRequest) {
        _classCallCheck(this, AjaxObservable);

        var _this = _possibleConstructorReturn(this, (AjaxObservable.__proto__ || Object.getPrototypeOf(AjaxObservable)).call(this));

        var request = {
            async: true,
            createXHR: function createXHR() {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        } else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        _this.request = request;
        return _this;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */


    _createClass(AjaxObservable, [{
        key: '_subscribe',
        value: function _subscribe(subscriber) {
            return new AjaxSubscriber(subscriber, this.request);
        }
    }]);

    return AjaxObservable;
}(_Observable2.Observable);
/**
 * Creates an observable for an Ajax request with either a request object with
 * url, headers, etc or a string for a URL.
 *
 * @example
 * source = Rx.Observable.ajax('/products');
 * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
 *
 * @param {string|Object} request Can be one of the following:
 *   A string of the URL to make the Ajax call.
 *   An object with the following properties
 *   - url: URL of the request
 *   - body: The body of the request
 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
 *   - async: Whether the request is async
 *   - headers: Optional headers
 *   - crossDomain: true if a cross domain request, else false
 *   - createXHR: a function to override if you need to use an alternate
 *   XMLHttpRequest implementation.
 *   - resultSelector: a function to use to alter the output value type of
 *   the Observable. Gets {@link AjaxResponse} as an argument.
 * @return {Observable} An observable sequence containing the XMLHttpRequest.
 * @static true
 * @name ajax
 * @owner Observable
*/


AjaxObservable.create = function () {
    var /** @type {?} */create = function create(urlOrRequest) {
        return new AjaxObservable(urlOrRequest);
    };
    create.get = ajaxGet;
    create.post = ajaxPost;
    create.delete = ajaxDelete;
    create.put = ajaxPut;
    create.getJSON = ajaxGetJSON;
    return create;
}();
function AjaxObservable_tsickle_Closure_declarations() {
    /**
     * Creates an observable for an Ajax request with either a request object with
     * url, headers, etc or a string for a URL.
     *
     * source = Rx.Observable.ajax('/products');
     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
     *
     *   A string of the URL to make the Ajax call.
     *   An object with the following properties
     *   - url: URL of the request
     *   - body: The body of the request
     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
     *   - async: Whether the request is async
     *   - headers: Optional headers
     *   - crossDomain: true if a cross domain request, else false
     *   - createXHR: a function to override if you need to use an alternate
     *   XMLHttpRequest implementation.
     *   - resultSelector: a function to use to alter the output value type of
     *   the Observable. Gets {\@link AjaxResponse} as an argument.
     * @owner Observable
     * @type {?}
     */
    AjaxObservable.prototype.create;
    /** @type {?} */
    AjaxObservable.prototype.request;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var AjaxSubscriber = exports.AjaxSubscriber = function (_Subscriber) {
    _inherits(AjaxSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} request
     */
    function AjaxSubscriber(destination, request) {
        _classCallCheck(this, AjaxSubscriber);

        var _this2 = _possibleConstructorReturn(this, (AjaxSubscriber.__proto__ || Object.getPrototypeOf(AjaxSubscriber)).call(this, destination));

        _this2.request = request;
        _this2.done = false;
        var headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(_root.root.FormData && request.body instanceof _root.root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = _this2.serializeBody(request.body, request.headers['Content-Type']);
        _this2.send();
        return _this2;
    }
    /**
     * @param {?} e
     * @return {?}
     */


    _createClass(AjaxSubscriber, [{
        key: 'next',
        value: function next(e) {
            this.done = true;
            var xhr = this.xhr,
                request = this.request,
                destination = this.destination;

            var /** @type {?} */response = new AjaxResponse(e, xhr, request);
            destination.next(response);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'send',
        value: function send() {
            var request = this.request,
                _request = this.request,
                user = _request.user,
                method = _request.method,
                url = _request.url,
                async = _request.async,
                password = _request.password,
                headers = _request.headers,
                body = _request.body;

            var /** @type {?} */createXHR = request.createXHR;
            var /** @type {?} */xhr = (0, _tryCatch.tryCatch)(createXHR).call(request);
            if (xhr === _errorObject.errorObject) {
                this.error(_errorObject.errorObject.e);
            } else {
                this.xhr = xhr;
                // open XHR first
                var /** @type {?} */result = void 0;
                if (user) {
                    result = (0, _tryCatch.tryCatch)(xhr.open).call(xhr, method, url, async, user, password);
                } else {
                    result = (0, _tryCatch.tryCatch)(xhr.open).call(xhr, method, url, async);
                }
                if (result === _errorObject.errorObject) {
                    this.error(_errorObject.errorObject.e);
                    return null;
                }
                // timeout and responseType can be set once the XHR is open
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
                // set headers
                this.setHeaders(xhr, headers);
                // now set up the events
                this.setupEvents(xhr, request);
                // finally send the request
                result = body ? (0, _tryCatch.tryCatch)(xhr.send).call(xhr, body) : (0, _tryCatch.tryCatch)(xhr.send).call(xhr);
                if (result === _errorObject.errorObject) {
                    this.error(_errorObject.errorObject.e);
                    return null;
                }
            }
            return xhr;
        }
        /**
         * @param {?} body
         * @param {?=} contentType
         * @return {?}
         */

    }, {
        key: 'serializeBody',
        value: function serializeBody(body, contentType) {
            if (!body || typeof body === 'string') {
                return body;
            } else if (_root.root.FormData && body instanceof _root.root.FormData) {
                return body;
            }
            if (contentType) {
                var /** @type {?} */splitIndex = contentType.indexOf(';');
                if (splitIndex !== -1) {
                    contentType = contentType.substring(0, splitIndex);
                }
            }
            switch (contentType) {
                case 'application/x-www-form-urlencoded':
                    return Object.keys(body).map(function (key) {
                        return encodeURI(key) + '=' + encodeURI(body[key]);
                    }).join('&');
                case 'application/json':
                    return JSON.stringify(body);
                default:
                    return body;
            }
        }
        /**
         * @param {?} xhr
         * @param {?} headers
         * @return {?}
         */

    }, {
        key: 'setHeaders',
        value: function setHeaders(xhr, headers) {
            for (var /** @type {?} */key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        /**
         * @param {?} xhr
         * @param {?} request
         * @return {?}
         */

    }, {
        key: 'setupEvents',
        value: function setupEvents(xhr, request) {
            var _this3 = this;

            var /** @type {?} */progressSubscriber = request.progressSubscriber;
            /**
             * @this {?}
             * @param {?} e
             * @return {?}
             */
            function xhrTimeout(e) {
                var subscriber = xhrTimeout.subscriber,
                    progressSubscriber = xhrTimeout.progressSubscriber,
                    request = xhrTimeout.request;

                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
            }
            ;
            xhr.ontimeout = xhrTimeout;
            xhrTimeout.request = request;
            xhrTimeout.subscriber = this;
            xhrTimeout.progressSubscriber = progressSubscriber;
            if (xhr.upload && 'withCredentials' in xhr && _root.root.XDomainRequest) {
                (function () {
                    if (progressSubscriber) {
                        (function () {
                            var /** @type {?} */_xhrProgress2 = void 0;
                            _xhrProgress2 = function xhrProgress(e) {
                                var _xhrProgress = _xhrProgress2,
                                    progressSubscriber = _xhrProgress.progressSubscriber;

                                progressSubscriber.next(e);
                            };
                            xhr.onprogress = _xhrProgress2;
                            _xhrProgress2.progressSubscriber = progressSubscriber;
                        })();
                    }
                    var /** @type {?} */_xhrError2 = void 0;
                    _xhrError2 = function xhrError(e) {
                        var _xhrError = _xhrError2,
                            progressSubscriber = _xhrError.progressSubscriber,
                            subscriber = _xhrError.subscriber,
                            request = _xhrError.request;

                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxError('ajax error', this, request));
                    };
                    xhr.onerror = _xhrError2;
                    _xhrError2.request = request;
                    _xhrError2.subscriber = _this3;
                    _xhrError2.progressSubscriber = progressSubscriber;
                })();
            }
            /**
             * @this {?}
             * @param {?} e
             * @return {?}
             */
            function xhrReadyStateChange(e) {
                var subscriber = xhrReadyStateChange.subscriber,
                    progressSubscriber = xhrReadyStateChange.progressSubscriber,
                    request = xhrReadyStateChange.request;

                if (this.readyState === 4) {
                    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                    var /** @type {?} */status = this.status === 1223 ? 204 : this.status;
                    var /** @type {?} */response = this.responseType === 'text' ? this.response || this.responseText : this.response;
                    // fix status code when it is 0 (0 status is undocumented).
                    // Occurs when accessing file resources or on Android 4.1 stock browser
                    // while retrieving files from application cache.
                    if (status === 0) {
                        status = response ? 200 : 0;
                    }
                    if (200 <= status && status < 300) {
                        if (progressSubscriber) {
                            progressSubscriber.complete();
                        }
                        subscriber.next(e);
                        subscriber.complete();
                    } else {
                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxError('ajax error ' + status, this, request));
                    }
                }
            }
            ;
            xhr.onreadystatechange = xhrReadyStateChange;
            xhrReadyStateChange.subscriber = this;
            xhrReadyStateChange.progressSubscriber = progressSubscriber;
            xhrReadyStateChange.request = request;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            var done = this.done,
                xhr = this.xhr;

            if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
                xhr.abort();
            }
            _get(AjaxSubscriber.prototype.__proto__ || Object.getPrototypeOf(AjaxSubscriber.prototype), 'unsubscribe', this).call(this);
        }
    }]);

    return AjaxSubscriber;
}(_Subscriber2.Subscriber);

function AjaxSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxSubscriber.prototype.xhr;
    /** @type {?} */
    AjaxSubscriber.prototype.done;
}
/**
 * A normalized AJAX response.
 *
 * @see {\@link ajax}
 *
 */

var AjaxResponse =
/**
 * @param {?} originalEvent
 * @param {?} xhr
 * @param {?} request
 */
exports.AjaxResponse = function AjaxResponse(originalEvent, xhr, request) {
    _classCallCheck(this, AjaxResponse);

    this.originalEvent = originalEvent;
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType || request.responseType;
    switch (this.responseType) {
        case 'json':
            if ('response' in xhr) {
                //IE does not support json as responseType, parse it internally
                this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
            } else {
                this.response = JSON.parse(xhr.responseText || 'null');
            }
            break;
        case 'xml':
            this.response = xhr.responseXML;
            break;
        case 'text':
        default:
            this.response = 'response' in xhr ? xhr.response : xhr.responseText;
            break;
    }
};

function AjaxResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxResponse.prototype.status;
    /** @type {?} */
    AjaxResponse.prototype.response;
    /** @type {?} */
    AjaxResponse.prototype.responseText;
    /** @type {?} */
    AjaxResponse.prototype.responseType;
}
/**
 * A normalized AJAX error.
 *
 * @see {\@link ajax}
 *
 */

var AjaxError = exports.AjaxError = function (_Error) {
    _inherits(AjaxError, _Error);

    /**
     * @param {?} message
     * @param {?} xhr
     * @param {?} request
     */
    function AjaxError(message, xhr, request) {
        _classCallCheck(this, AjaxError);

        var _this4 = _possibleConstructorReturn(this, (AjaxError.__proto__ || Object.getPrototypeOf(AjaxError)).call(this, message));

        _this4.message = message;
        _this4.xhr = xhr;
        _this4.request = request;
        _this4.status = xhr.status;
        return _this4;
    }

    return AjaxError;
}(Error);

function AjaxError_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxError.prototype.xhr;
    /** @type {?} */
    AjaxError.prototype.request;
    /** @type {?} */
    AjaxError.prototype.status;
}
/**
 * @see {\@link ajax}
 *
 */

var AjaxTimeoutError = exports.AjaxTimeoutError = function (_AjaxError) {
    _inherits(AjaxTimeoutError, _AjaxError);

    /**
     * @param {?} xhr
     * @param {?} request
     */
    function AjaxTimeoutError(xhr, request) {
        _classCallCheck(this, AjaxTimeoutError);

        return _possibleConstructorReturn(this, (AjaxTimeoutError.__proto__ || Object.getPrototypeOf(AjaxTimeoutError)).call(this, 'ajax timeout', xhr, request));
    }

    return AjaxTimeoutError;
}(AjaxError);