'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeAllSubscriber = exports.MergeAllOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mergeAll = mergeAll;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link exhaust}
 * @see {\@link merge}
 * @see {\@link mergeMap}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 * @see {\@link switch}
 * @see {\@link zipAll}
 *
 * Observables being subscribed to concurrently.
 * inner Observables emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} concurrent
 * @return {?}
 */
function mergeAll() {
    var concurrent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.POSITIVE_INFINITY;

    return this.lift(new MergeAllOperator(concurrent));
}

var MergeAllOperator = exports.MergeAllOperator = function () {
    /**
     * @param {?} concurrent
     */
    function MergeAllOperator(concurrent) {
        _classCallCheck(this, MergeAllOperator);

        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(MergeAllOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
        }
    }]);

    return MergeAllOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MergeAllSubscriber = exports.MergeAllSubscriber = function (_OuterSubscriber) {
    _inherits(MergeAllSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} concurrent
     */
    function MergeAllSubscriber(destination, concurrent) {
        _classCallCheck(this, MergeAllSubscriber);

        var _this = _possibleConstructorReturn(this, (MergeAllSubscriber.__proto__ || Object.getPrototypeOf(MergeAllSubscriber)).call(this, destination));

        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        return _this;
    }
    /**
     * @param {?} observable
     * @return {?}
     */


    _createClass(MergeAllSubscriber, [{
        key: '_next',
        value: function _next(observable) {
            if (this.active < this.concurrent) {
                this.active++;
                this.add((0, _subscribeToResult.subscribeToResult)(this, observable));
            } else {
                this.buffer.push(observable);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.hasCompleted = true;
            if (this.active === 0 && this.buffer.length === 0) {
                this.destination.complete();
            }
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
                this.destination.complete();
            }
        }
    }]);

    return MergeAllSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function MergeAllSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeAllSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeAllSubscriber.prototype.buffer;
    /** @type {?} */
    MergeAllSubscriber.prototype.active;
}