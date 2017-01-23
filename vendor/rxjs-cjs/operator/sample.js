'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.sample = sample;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the `notifier`, emits.
 *
 * <span class="informal">It's like {\@link sampleTime}, but samples whenever
 * the `notifier` Observable emits something.</span>
 *
 * <img src="./img/sample.png" width="100%">
 *
 * Whenever the `notifier` Observable emits a value or completes, `sample`
 * looks at the source Observable and emits whichever value it has most recently
 * emitted since the previous sampling, unless the source has not emitted
 * anything since the previous sampling. The `notifier` is subscribed to as soon
 * as the output Observable is subscribed.
 *
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = seconds.sample(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounce}
 * @see {\@link sampleTime}
 * @see {\@link throttle}
 *
 * source Observable.
 * values emitted by the source Observable whenever the notifier Observable
 * emits value or completes.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}

var SampleOperator = function () {
    /**
     * @param {?} notifier
     */
    function SampleOperator(notifier) {
        _classCallCheck(this, SampleOperator);

        this.notifier = notifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SampleOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            var /** @type {?} */sampleSubscriber = new SampleSubscriber(subscriber);
            var /** @type {?} */subscription = source.subscribe(sampleSubscriber);
            subscription.add((0, _subscribeToResult.subscribeToResult)(sampleSubscriber, this.notifier));
            return subscription;
        }
    }]);

    return SampleOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SampleSubscriber = function (_OuterSubscriber) {
    _inherits(SampleSubscriber, _OuterSubscriber);

    function SampleSubscriber() {
        _classCallCheck(this, SampleSubscriber);

        var _this = _possibleConstructorReturn(this, (SampleSubscriber.__proto__ || Object.getPrototypeOf(SampleSubscriber)).apply(this, arguments));

        _this.hasValue = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SampleSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.value = value;
            this.hasValue = true;
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
            this.emitValue();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.emitValue();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'emitValue',
        value: function emitValue() {
            if (this.hasValue) {
                this.hasValue = false;
                this.destination.next(this.value);
            }
        }
    }]);

    return SampleSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function SampleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SampleSubscriber.prototype.value;
    /** @type {?} */
    SampleSubscriber.prototype.hasValue;
}