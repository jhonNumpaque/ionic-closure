'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IteratorObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = require('../util/root');

var _Observable2 = require('../Observable');

var _iterator = require('../symbol/iterator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var IteratorObservable = exports.IteratorObservable = function (_Observable) {
    _inherits(IteratorObservable, _Observable);

    /**
     * @param {?} iterator
     * @param {?=} scheduler
     */
    function IteratorObservable(iterator, scheduler) {
        _classCallCheck(this, IteratorObservable);

        var _this = _possibleConstructorReturn(this, (IteratorObservable.__proto__ || Object.getPrototypeOf(IteratorObservable)).call(this));

        _this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        _this.iterator = getIterator(iterator);
        return _this;
    }
    /**
     * @param {?} iterator
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(IteratorObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var iterator = this.iterator,
                scheduler = this.scheduler;

            if (scheduler) {
                return scheduler.schedule(IteratorObservable.dispatch, 0, {
                    index: index, iterator: iterator, subscriber: subscriber
                });
            } else {
                do {
                    var /** @type {?} */result = iterator.next();
                    if (result.done) {
                        subscriber.complete();
                        break;
                    } else {
                        subscriber.next(result.value);
                    }
                    if (subscriber.closed) {
                        if (typeof iterator.return === 'function') {
                            iterator.return();
                        }
                        break;
                    }
                } while (true);
            }
        }
    }], [{
        key: 'create',
        value: function create(iterator, scheduler) {
            return new IteratorObservable(iterator, scheduler);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var index = state.index,
                hasError = state.hasError,
                iterator = state.iterator,
                subscriber = state.subscriber;

            if (hasError) {
                subscriber.error(state.error);
                return;
            }
            var /** @type {?} */result = iterator.next();
            if (result.done) {
                subscriber.complete();
                return;
            }
            subscriber.next(result.value);
            state.index = index + 1;
            if (subscriber.closed) {
                if (typeof iterator.return === 'function') {
                    iterator.return();
                }
                return;
            }
            this.schedule(state);
        }
    }]);

    return IteratorObservable;
}(_Observable2.Observable);

function IteratorObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    IteratorObservable.prototype.iterator;
}

var StringIterator = function () {
    /**
     * @param {?} str
     * @param {?=} idx
     * @param {?=} len
     */
    function StringIterator(str) {
        var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : str.length;

        _classCallCheck(this, StringIterator);

        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    /**
     * @return {?}
     */


    _createClass(StringIterator, [{
        key: _iterator.$$iterator,
        value: function value() {
            return this;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next() {
            return this.idx < this.len ? {
                done: false,
                value: this.str.charAt(this.idx++)
            } : {
                done: true,
                value: undefined
            };
        }
    }]);

    return StringIterator;
}();

var ArrayIterator = function () {
    /**
     * @param {?} arr
     * @param {?=} idx
     * @param {?=} len
     */
    function ArrayIterator(arr) {
        var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : toLength(arr);

        _classCallCheck(this, ArrayIterator);

        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    /**
     * @return {?}
     */


    _createClass(ArrayIterator, [{
        key: _iterator.$$iterator,
        value: function value() {
            return this;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next() {
            return this.idx < this.len ? {
                done: false,
                value: this.arr[this.idx++]
            } : {
                done: true,
                value: undefined
            };
        }
    }]);

    return ArrayIterator;
}();
/**
 * @param {?} obj
 * @return {?}
 */


function getIterator(obj) {
    var /** @type {?} */i = obj[_iterator.$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[_iterator.$$iterator]();
}
var /** @type {?} */maxSafeInteger = Math.pow(2, 53) - 1;
/**
 * @param {?} o
 * @return {?}
 */
function toLength(o) {
    var /** @type {?} */len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
/**
 * @param {?} value
 * @return {?}
 */
function numberIsFinite(value) {
    return typeof value === 'number' && _root.root.isFinite(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function sign(value) {
    var /** @type {?} */valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}