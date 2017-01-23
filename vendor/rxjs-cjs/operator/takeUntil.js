'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.takeUntil = takeUntil;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeLast}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * Observable until such time as `notifier` emits its first value.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}

var TakeUntilOperator = function () {
    /**
     * @param {?} notifier
     */
    function TakeUntilOperator(notifier) {
        _classCallCheck(this, TakeUntilOperator);

        this.notifier = notifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(TakeUntilOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
        }
    }]);

    return TakeUntilOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TakeUntilSubscriber = function (_OuterSubscriber) {
    _inherits(TakeUntilSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} notifier
     */
    function TakeUntilSubscriber(destination, notifier) {
        _classCallCheck(this, TakeUntilSubscriber);

        var _this = _possibleConstructorReturn(this, (TakeUntilSubscriber.__proto__ || Object.getPrototypeOf(TakeUntilSubscriber)).call(this, destination));

        _this.notifier = notifier;
        _this.add((0, _subscribeToResult.subscribeToResult)(_this, notifier));
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


    _createClass(TakeUntilSubscriber, [{
        key: 'notifyNext',
        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete() {
            // noop
        }
    }]);

    return TakeUntilSubscriber;
}(_OuterSubscriber2.OuterSubscriber);