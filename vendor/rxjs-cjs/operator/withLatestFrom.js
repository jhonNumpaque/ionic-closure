'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.withLatestFrom = withLatestFrom;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link combineLatest}
 *
 * Observable. More than one input Observables may be given as argument.
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} args
 * @return {?}
 */
function withLatestFrom() {
    var /** @type {?} */project = void 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    var /** @type {?} */observables = args;
    return this.lift(new WithLatestFromOperator(observables, project));
}

var WithLatestFromOperator = function () {
    /**
     * @param {?} observables
     * @param {?=} project
     */
    function WithLatestFromOperator(observables, project) {
        _classCallCheck(this, WithLatestFromOperator);

        this.observables = observables;
        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(WithLatestFromOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
        }
    }]);

    return WithLatestFromOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var WithLatestFromSubscriber = function (_OuterSubscriber) {
    _inherits(WithLatestFromSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} observables
     * @param {?=} project
     */
    function WithLatestFromSubscriber(destination, observables, project) {
        _classCallCheck(this, WithLatestFromSubscriber);

        var _this = _possibleConstructorReturn(this, (WithLatestFromSubscriber.__proto__ || Object.getPrototypeOf(WithLatestFromSubscriber)).call(this, destination));

        _this.observables = observables;
        _this.project = project;
        _this.toRespond = [];
        var len = observables.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            _this.toRespond.push(i);
        }
        for (var _i = 0; _i < len; _i++) {
            var observable = observables[_i];
            _this.add((0, _subscribeToResult.subscribeToResult)(_this, observable, observable, _i));
        }
        return _this;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(WithLatestFromSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.values[outerIndex] = innerValue;
            var /** @type {?} */toRespond = this.toRespond;
            if (toRespond.length > 0) {
                var /** @type {?} */found = toRespond.indexOf(outerIndex);
                if (found !== -1) {
                    toRespond.splice(found, 1);
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {}
        // noop

        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            if (this.toRespond.length === 0) {
                var /** @type {?} */_args = [value].concat(_toConsumableArray(this.values));
                if (this.project) {
                    this._tryProject(_args);
                } else {
                    this.destination.next(_args);
                }
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

    return WithLatestFromSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function WithLatestFromSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WithLatestFromSubscriber.prototype.values;
    /** @type {?} */
    WithLatestFromSubscriber.prototype.toRespond;
}