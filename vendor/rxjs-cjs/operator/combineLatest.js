'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CombineLatestSubscriber = exports.CombineLatestOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.combineLatest = combineLatest;

var _ArrayObservable = require('../observable/ArrayObservable');

var _isArray = require('../util/isArray');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var /** @type {?} */none = {};
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 * @see {\@link combineAll}
 * @see {\@link merge}
 * @see {\@link withLatestFrom}
 *
 * Observable. More than one input Observables may be given as argument.
 * the combined latest values into a new value on the output Observable.
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
function combineLatest() {
    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
        observables[_key] = arguments[_key];
    }

    var /** @type {?} */project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && (0, _isArray.isArray)(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return this.lift.call(new _ArrayObservable.ArrayObservable(observables), new CombineLatestOperator(project));
}

var CombineLatestOperator = exports.CombineLatestOperator = function () {
    /**
     * @param {?=} project
     */
    function CombineLatestOperator(project) {
        _classCallCheck(this, CombineLatestOperator);

        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(CombineLatestOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
        }
    }]);

    return CombineLatestOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var CombineLatestSubscriber = exports.CombineLatestSubscriber = function (_OuterSubscriber) {
    _inherits(CombineLatestSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?=} project
     */
    function CombineLatestSubscriber(destination, project) {
        _classCallCheck(this, CombineLatestSubscriber);

        var _this = _possibleConstructorReturn(this, (CombineLatestSubscriber.__proto__ || Object.getPrototypeOf(CombineLatestSubscriber)).call(this, destination));

        _this.project = project;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    /**
     * @param {?} observable
     * @return {?}
     */


    _createClass(CombineLatestSubscriber, [{
        key: '_next',
        value: function _next(observable) {
            this.values.push(none);
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
                this.active = len;
                this.toRespond = len;
                for (var /** @type {?} */i = 0; i < len; i++) {
                    var /** @type {?} */observable = observables[i];
                    this.add((0, _subscribeToResult.subscribeToResult)(this, observable, observable, i));
                }
            }
        }
        /**
         * @param {?} unused
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(unused) {
            if ((this.active -= 1) === 0) {
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
            var /** @type {?} */values = this.values;
            var /** @type {?} */oldVal = values[outerIndex];
            var /** @type {?} */toRespond = !this.toRespond ? 0 : oldVal === none ? --this.toRespond : this.toRespond;
            values[outerIndex] = innerValue;
            if (toRespond === 0) {
                if (this.project) {
                    this._tryProject(values);
                } else {
                    this.destination.next(values.slice());
                }
            }
        }
        /**
         * @param {?} values
         * @return {?}
         */

    }, {
        key: '_tryProject',
        value: function _tryProject(values) {
            var /** @type {?} */result = void 0;
            try {
                result = this.project.apply(this, values);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return CombineLatestSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function CombineLatestSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    CombineLatestSubscriber.prototype.active;
    /** @type {?} */
    CombineLatestSubscriber.prototype.values;
    /** @type {?} */
    CombineLatestSubscriber.prototype.observables;
    /** @type {?} */
    CombineLatestSubscriber.prototype.toRespond;
}