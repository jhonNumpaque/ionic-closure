'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeScanSubscriber = exports.MergeScanOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mergeScan = mergeScan;

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _subscribeToResult = require('../util/subscribeToResult');

var _OuterSubscriber2 = require('../OuterSubscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?} seed
 * @param {?=} concurrent
 * @return {?}
 */
function mergeScan(project, seed) {
    var concurrent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;

    return this.lift(new MergeScanOperator(project, seed, concurrent));
}

var MergeScanOperator = exports.MergeScanOperator = function () {
    /**
     * @param {?} project
     * @param {?} seed
     * @param {?} concurrent
     */
    function MergeScanOperator(project, seed, concurrent) {
        _classCallCheck(this, MergeScanOperator);

        this.project = project;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(MergeScanOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new MergeScanSubscriber(subscriber, this.project, this.seed, this.concurrent));
        }
    }]);

    return MergeScanOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MergeScanSubscriber = exports.MergeScanSubscriber = function (_OuterSubscriber) {
    _inherits(MergeScanSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} acc
     * @param {?} concurrent
     */
    function MergeScanSubscriber(destination, project, acc, concurrent) {
        _classCallCheck(this, MergeScanSubscriber);

        var _this = _possibleConstructorReturn(this, (MergeScanSubscriber.__proto__ || Object.getPrototypeOf(MergeScanSubscriber)).call(this, destination));

        _this.project = project;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(MergeScanSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.active < this.concurrent) {
                var /** @type {?} */index = this.index++;
                var /** @type {?} */ish = (0, _tryCatch.tryCatch)(this.project)(this.acc, value);
                var /** @type {?} */destination = this.destination;
                if (ish === _errorObject.errorObject) {
                    destination.error(_errorObject.errorObject.e);
                } else {
                    this.active++;
                    this._innerSub(ish, value, index);
                }
            } else {
                this.buffer.push(value);
            }
        }
        /**
         * @param {?} ish
         * @param {?} value
         * @param {?} index
         * @return {?}
         */

    }, {
        key: '_innerSub',
        value: function _innerSub(ish, value, index) {
            this.add((0, _subscribeToResult.subscribeToResult)(this, ish, value, index));
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                if (this.hasValue === false) {
                    this.destination.next(this.acc);
                }
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
            var destination = this.destination;

            this.acc = innerValue;
            this.hasValue = true;
            destination.next(innerValue);
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            var /** @type {?} */buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            if (buffer.length > 0) {
                this._next(buffer.shift());
            } else if (this.active === 0 && this.hasCompleted) {
                if (this.hasValue === false) {
                    this.destination.next(this.acc);
                }
                this.destination.complete();
            }
        }
    }]);

    return MergeScanSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function MergeScanSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeScanSubscriber.prototype.hasValue;
    /** @type {?} */
    MergeScanSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeScanSubscriber.prototype.buffer;
    /** @type {?} */
    MergeScanSubscriber.prototype.active;
    /** @type {?} */
    MergeScanSubscriber.prototype.index;
}