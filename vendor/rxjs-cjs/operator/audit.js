'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.audit = audit;

var _tryCatch = require('../util/tryCatch');

var _errorObject = require('../util/errorObject');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {\@link auditTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/audit.png" width="100%">
 *
 * `audit` is similar to `throttle`, but emits the last value from the silenced
 * time window, instead of the first value. `audit` emits the most recent value
 * from the source Observable on the output Observable as soon as its internal
 * timer becomes disabled, and ignores source values while the timer is enabled.
 * Initially, the timer is disabled. As soon as the first source value arrives,
 * the timer is enabled by calling the `durationSelector` function with the
 * source value, which returns the "duration" Observable. When the duration
 * Observable emits a value or completes, the timer is disabled, then the most
 * recent source value is emitted on the output Observable, and this process
 * repeats for the next source value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounce}
 * @see {\@link delayWhen}
 * @see {\@link sample}
 * @see {\@link throttle}
 *
 * that receives a value from the source Observable, for computing the silencing
 * duration, returned as an Observable or a Promise.
 * emissions from the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} durationSelector
 * @return {?}
 */
function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}

var AuditOperator = function () {
    /**
     * @param {?} durationSelector
     */
    function AuditOperator(durationSelector) {
        _classCallCheck(this, AuditOperator);

        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(AuditOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
        }
    }]);

    return AuditOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var AuditSubscriber = function (_OuterSubscriber) {
    _inherits(AuditSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    function AuditSubscriber(destination, durationSelector) {
        _classCallCheck(this, AuditSubscriber);

        var _this = _possibleConstructorReturn(this, (AuditSubscriber.__proto__ || Object.getPrototypeOf(AuditSubscriber)).call(this, destination));

        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(AuditSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.value = value;
            this.hasValue = true;
            if (!this.throttled) {
                var /** @type {?} */duration = (0, _tryCatch.tryCatch)(this.durationSelector)(value);
                if (duration === _errorObject.errorObject) {
                    this.destination.error(_errorObject.errorObject.e);
                } else {
                    this.add(this.throttled = (0, _subscribeToResult.subscribeToResult)(this, duration));
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'clearThrottle',
        value: function clearThrottle() {
            var value = this.value,
                hasValue = this.hasValue,
                throttled = this.throttled;

            if (throttled) {
                this.remove(throttled);
                this.throttled = null;
                throttled.unsubscribe();
            }
            if (hasValue) {
                this.value = null;
                this.hasValue = false;
                this.destination.next(value);
            }
        }
        /**
         * @param {?} outerValue
         * @param {?} innerValue
         * @param {?} outerIndex
         * @param {?} innerIndex
         * @return {?}
         */

    }, {
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
            this.clearThrottle();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            this.clearThrottle();
        }
    }]);

    return AuditSubscriber;
}(_OuterSubscriber2.OuterSubscriber);

function AuditSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditSubscriber.prototype.value;
    /** @type {?} */
    AuditSubscriber.prototype.hasValue;
    /** @type {?} */
    AuditSubscriber.prototype.throttled;
}