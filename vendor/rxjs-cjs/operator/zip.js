'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ZipSubscriber = exports.ZipOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.zipProto = zipProto;
exports.zipStatic = zipStatic;

var _ArrayObservable = require('../observable/ArrayObservable');

var _isArray = require('../util/isArray');

var _Subscriber2 = require('../Subscriber');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

var _iterator2 = require('../symbol/iterator');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
function zipProto() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    return this.lift.call(zipStatic.apply(undefined, [this].concat(observables)));
}
/**
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function zipStatic() {
    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        observables[_key2] = arguments[_key2];
    }

    var /** @type {?} */project = observables[observables.length - 1];
    if (typeof project === 'function') {
        observables.pop();
    }
    return new _ArrayObservable.ArrayObservable(observables).lift(new ZipOperator(project));
}

var ZipOperator = exports.ZipOperator = function () {
    /**
     * @param {?=} project
     */
    function ZipOperator(project) {
        _classCallCheck(this, ZipOperator);

        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(ZipOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new ZipSubscriber(subscriber, this.project));
        }
    }]);

    return ZipOperator;
}();

function ZipOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipOperator.prototype.project;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var ZipSubscriber = exports.ZipSubscriber = function (_Subscriber) {
    _inherits(ZipSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} project
     * @param {?=} values
     */
    function ZipSubscriber(destination, project) {
        var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object.create(null);

        _classCallCheck(this, ZipSubscriber);

        var _this = _possibleConstructorReturn(this, (ZipSubscriber.__proto__ || Object.getPrototypeOf(ZipSubscriber)).call(this, destination));

        _this.iterators = [];
        _this.active = 0;
        _this.project = typeof project === 'function' ? project : null;
        _this.values = values;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(ZipSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */iterators = this.iterators;
            if ((0, _isArray.isArray)(value)) {
                iterators.push(new StaticArrayIterator(value));
            } else if (typeof value[_iterator2.$$iterator] === 'function') {
                iterators.push(new StaticIterator(value[_iterator2.$$iterator]()));
            } else {
                iterators.push(new ZipBufferIterator(this.destination, this, value));
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */iterators = this.iterators;
            var /** @type {?} */len = iterators.length;
            this.active = len;
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */iterator = iterators[i];
                if (iterator.stillUnsubscribed) {
                    this.add(iterator.subscribe(iterator, i));
                } else {
                    this.active--; // not an observable
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyInactive',
        value: function notifyInactive() {
            this.active--;
            if (this.active === 0) {
                this.destination.complete();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'checkIterators',
        value: function checkIterators() {
            var /** @type {?} */iterators = this.iterators;
            var /** @type {?} */len = iterators.length;
            var /** @type {?} */destination = this.destination;
            // abort if not all of them have values
            for (var /** @type {?} */i = 0; i < len; i++) {
                var /** @type {?} */iterator = iterators[i];
                if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                    return;
                }
            }
            var /** @type {?} */shouldComplete = false;
            var /** @type {?} */args = [];
            for (var /** @type {?} */_i = 0; _i < len; _i++) {
                var /** @type {?} */_iterator = iterators[_i];
                var /** @type {?} */result = _iterator.next();
                // check to see if it's completed now that you've gotten
                // the next value.
                if (_iterator.hasCompleted()) {
                    shouldComplete = true;
                }
                if (result.done) {
                    destination.complete();
                    return;
                }
                args.push(result.value);
            }
            if (this.project) {
                this._tryProject(args);
            } else {
                destination.next(args);
            }
            if (shouldComplete) {
                destination.complete();
            }
        }
        /**
         * @param {?} args
         * @return {?}
         */

    }, {
        key: '_tryProject',
        value: function _tryProject(args) {
            var /** @type {?} */result = void 0;
            try {
                result = this.project.apply(this, args);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return ZipSubscriber;
}(_Subscriber2.Subscriber);

function ZipSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipSubscriber.prototype.values;
    /** @type {?} */
    ZipSubscriber.prototype.project;
    /** @type {?} */
    ZipSubscriber.prototype.iterators;
    /** @type {?} */
    ZipSubscriber.prototype.active;
}

var StaticIterator = function () {
    /**
     * @param {?} iterator
     */
    function StaticIterator(iterator) {
        _classCallCheck(this, StaticIterator);

        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    /**
     * @return {?}
     */


    _createClass(StaticIterator, [{
        key: 'hasValue',
        value: function hasValue() {
            return true;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next() {
            var /** @type {?} */result = this.nextResult;
            this.nextResult = this.iterator.next();
            return result;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasCompleted',
        value: function hasCompleted() {
            var /** @type {?} */nextResult = this.nextResult;
            return nextResult && nextResult.done;
        }
    }]);

    return StaticIterator;
}();

function StaticIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticIterator.prototype.nextResult;
}

var StaticArrayIterator = function () {
    /**
     * @param {?} array
     */
    function StaticArrayIterator(array) {
        _classCallCheck(this, StaticArrayIterator);

        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    /**
     * @return {?}
     */


    _createClass(StaticArrayIterator, [{
        key: _iterator2.$$iterator,
        value: function value() {
            return this;
        }
        /**
         * @param {?=} value
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next(value) {
            var /** @type {?} */i = this.index++;
            var /** @type {?} */array = this.array;
            return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasValue',
        value: function hasValue() {
            return this.array.length > this.index;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasCompleted',
        value: function hasCompleted() {
            return this.array.length === this.index;
        }
    }]);

    return StaticArrayIterator;
}();

function StaticArrayIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticArrayIterator.prototype.index;
    /** @type {?} */
    StaticArrayIterator.prototype.length;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var ZipBufferIterator = function (_OuterSubscriber) {
    _inherits(ZipBufferIterator, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} parent
     * @param {?} observable
     */
    function ZipBufferIterator(destination, parent, observable) {
        _classCallCheck(this, ZipBufferIterator);

        var _this2 = _possibleConstructorReturn(this, (ZipBufferIterator.__proto__ || Object.getPrototypeOf(ZipBufferIterator)).call(this, destination));

        _this2.parent = parent;
        _this2.observable = observable;
        _this2.stillUnsubscribed = true;
        _this2.buffer = [];
        _this2.isComplete = false;
        return _this2;
    }
    /**
     * @return {?}
     */


    _createClass(ZipBufferIterator, [{
        key: _iterator2.$$iterator,
        value: function value() {
            return this;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'next',
        value: function next() {
            var /** @type {?} */buffer = this.buffer;
            if (buffer.length === 0 && this.isComplete) {
                return { value: null, done: true };
            } else {
                return { value: buffer.shift(), done: false };
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasValue',
        value: function hasValue() {
            return this.buffer.length > 0;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'hasCompleted',
        value: function hasCompleted() {
            return this.buffer.length === 0 && this.isComplete;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            if (this.buffer.length > 0) {
                this.isComplete = true;
                this.parent.notifyInactive();
            } else {
                this.destination.complete();
            }
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.buffer.push(innerValue);
            this.parent.checkIterators();
        }
        /**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: 'subscribe',
        value: function subscribe(value, index) {
            return (0, _subscribeToResult.subscribeToResult)(this, this.observable, this, index);
        }
    }]);

    return ZipBufferIterator;
}(_OuterSubscriber2.OuterSubscriber);

function ZipBufferIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipBufferIterator.prototype.stillUnsubscribed;
    /** @type {?} */
    ZipBufferIterator.prototype.buffer;
    /** @type {?} */
    ZipBufferIterator.prototype.isComplete;
}