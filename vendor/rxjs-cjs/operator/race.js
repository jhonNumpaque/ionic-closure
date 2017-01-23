'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RaceSubscriber = exports.RaceOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.race = race;
exports.raceStatic = raceStatic;

var _isArray = require('../util/isArray');

var _ArrayObservable = require('../observable/ArrayObservable');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
function race() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && (0, _isArray.isArray)(observables[0])) {
        observables = observables[0];
    }
    return this.lift.call(raceStatic.apply(undefined, [this].concat(_toConsumableArray(observables))));
}
/**
 * @param {...?} observables
 * @return {?}
 */
function raceStatic() {
    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        observables[_key2] = arguments[_key2];
    }

    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1) {
        if ((0, _isArray.isArray)(observables[0])) {
            observables = observables[0];
        } else {
            return observables[0];
        }
    }
    return new _ArrayObservable.ArrayObservable( /** @type {?} */observables).lift(new RaceOperator());
}

var RaceOperator = exports.RaceOperator = function () {
    function RaceOperator() {
        _classCallCheck(this, RaceOperator);
    }

    _createClass(RaceOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new RaceSubscriber(subscriber));
        }
    }]);

    return RaceOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var RaceSubscriber = exports.RaceSubscriber = function (_OuterSubscriber) {
    _inherits(RaceSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     */
    function RaceSubscriber(destination) {
        _classCallCheck(this, RaceSubscriber);

        var _this = _possibleConstructorReturn(this, (RaceSubscriber.__proto__ || Object.getPrototypeOf(RaceSubscriber)).call(this, destination));

        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    /**
     * @param {?} observable
     * @return {?}
     */


    _createClass(RaceSubscriber, [{
        key: '_next',
        value: function _next(observable) {
            this.observables.push(observable);
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */observables = this.observables;
            var /** @type {?} */len = observables.length;
            if (len === 0) {
                this.destination.complete();
            } else {
                for (var /** @type {?} */i = 0; i < len && !this.hasFirst; i++) {
                    var /** @type {?} */observable = observables[i];
                    var /** @type {?} */subscription = (0, _subscribeToResult.subscribeToResult)(this, observable, observable, i);
                    if (this.subscriptions) {
                        this.subscriptions.push(subscription);
                    }
                    this.add(subscription);
                }
                this.observables = null;
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
            if (!this.hasFirst) {
                this.hasFirst = true;
                for (var /** @type {?} */i = 0; i < this.subscriptions.length; i++) {
                    if (i !== outerIndex) {
                        var /** @type {?} */subscription = this.subscriptions[i];
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                }
                this.subscriptions = null;
            }
            this.destination.next(innerValue);
        }
    }]);

    return RaceSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function RaceSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RaceSubscriber.prototype.hasFirst;
    /** @type {?} */
    RaceSubscriber.prototype.observables;
    /** @type {?} */
    RaceSubscriber.prototype.subscriptions;
}