'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SequenceEqualSubscriber = exports.SequenceEqualOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.sequenceEqual = sequenceEqual;

var _Subscriber3 = require('../Subscriber');

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
 * are equal.
 *
 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
 *
 * <img src="./img/sequenceEqual.png" width="100%">
 *
 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
 * observables completes, the operator will wait for the other observable to complete; If the other
 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
 * completes or emits after the other complets, the returned observable will never complete.
 *
 * var code = Rx.Observable.from([
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "KeyB",
 *  "KeyA",
 *  "Enter" // no start key, clearly.
 * ]);
 *
 * var keys = Rx.Observable.fromEvent(document, 'keyup')
 *  .map(e => e.code);
 * var matches = keys.bufferCount(11, 1)
 *  .mergeMap(
 *    last11 =>
 *      Rx.Observable.from(last11)
 *        .sequenceEqual(code)
 *   );
 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
 *
 * @see {\@link combineLatest}
 * @see {\@link zip}
 * @see {\@link withLatestFrom}
 *
 * the values emitted by both observables were equal in sequence
 * @owner Observable
 * @this {?}
 * @param {?} compareTo
 * @param {?=} comparor
 * @return {?}
 */
function sequenceEqual(compareTo, comparor) {
    return this.lift(new SequenceEqualOperator(compareTo, comparor));
}

var SequenceEqualOperator = exports.SequenceEqualOperator = function () {
    /**
     * @param {?} compareTo
     * @param {?} comparor
     */
    function SequenceEqualOperator(compareTo, comparor) {
        _classCallCheck(this, SequenceEqualOperator);

        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SequenceEqualOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
        }
    }]);

    return SequenceEqualOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SequenceEqualSubscriber = exports.SequenceEqualSubscriber = function (_Subscriber) {
    _inherits(SequenceEqualSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} compareTo
     * @param {?} comparor
     */
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        _classCallCheck(this, SequenceEqualSubscriber);

        var _this = _possibleConstructorReturn(this, (SequenceEqualSubscriber.__proto__ || Object.getPrototypeOf(SequenceEqualSubscriber)).call(this, destination));

        _this.compareTo = compareTo;
        _this.comparor = comparor;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SequenceEqualSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this._oneComplete && this._b.length === 0) {
                this.emit(false);
            } else {
                this._a.push(value);
                this.checkValues();
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            if (this._oneComplete) {
                this.emit(this._a.length === 0 && this._b.length === 0);
            } else {
                this._oneComplete = true;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'checkValues',
        value: function checkValues() {
            var _a = this._a,
                _b = this._b,
                comparor = this.comparor;

            while (_a.length > 0 && _b.length > 0) {
                var /** @type {?} */a = _a.shift();
                var /** @type {?} */b = _b.shift();
                var /** @type {?} */areEqual = false;
                if (comparor) {
                    areEqual = (0, _tryCatch.tryCatch)(comparor)(a, b);
                    if (areEqual === _errorObject.errorObject) {
                        this.destination.error(_errorObject.errorObject.e);
                    }
                } else {
                    areEqual = a === b;
                }
                if (!areEqual) {
                    this.emit(false);
                }
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'emit',
        value: function emit(value) {
            var destination = this.destination;

            destination.next(value);
            destination.complete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'nextB',
        value: function nextB(value) {
            if (this._oneComplete && this._a.length === 0) {
                this.emit(false);
            } else {
                this._b.push(value);
                this.checkValues();
            }
        }
    }]);

    return SequenceEqualSubscriber;
}(_Subscriber3.Subscriber);

function SequenceEqualSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SequenceEqualSubscriber.prototype._a;
    /** @type {?} */
    SequenceEqualSubscriber.prototype._b;
    /** @type {?} */
    SequenceEqualSubscriber.prototype._oneComplete;
}

var SequenceEqualCompareToSubscriber = function (_Subscriber2) {
    _inherits(SequenceEqualCompareToSubscriber, _Subscriber2);

    /**
     * @param {?} destination
     * @param {?} parent
     */
    function SequenceEqualCompareToSubscriber(destination, parent) {
        _classCallCheck(this, SequenceEqualCompareToSubscriber);

        var _this2 = _possibleConstructorReturn(this, (SequenceEqualCompareToSubscriber.__proto__ || Object.getPrototypeOf(SequenceEqualCompareToSubscriber)).call(this, destination));

        _this2.parent = parent;
        return _this2;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SequenceEqualCompareToSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.parent.nextB(value);
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.parent.error(err);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.parent._complete();
        }
    }]);

    return SequenceEqualCompareToSubscriber;
}(_Subscriber3.Subscriber);