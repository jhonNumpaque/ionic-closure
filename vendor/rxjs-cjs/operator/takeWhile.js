'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.takeWhile = takeWhile;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeLast}
 * @see {\@link takeUntil}
 * @see {\@link skip}
 *
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @return {?}
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}

var TakeWhileOperator = function () {
    /**
     * @param {?} predicate
     */
    function TakeWhileOperator(predicate) {
        _classCallCheck(this, TakeWhileOperator);

        this.predicate = predicate;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(TakeWhileOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
        }
    }]);

    return TakeWhileOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var TakeWhileSubscriber = function (_Subscriber) {
    _inherits(TakeWhileSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} predicate
     */
    function TakeWhileSubscriber(destination, predicate) {
        _classCallCheck(this, TakeWhileSubscriber);

        var _this = _possibleConstructorReturn(this, (TakeWhileSubscriber.__proto__ || Object.getPrototypeOf(TakeWhileSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(TakeWhileSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */destination = this.destination;
            var /** @type {?} */result = void 0;
            try {
                result = this.predicate(value, this.index++);
            } catch (err) {
                destination.error(err);
                return;
            }
            this.nextOrComplete(value, result);
        }
        /**
         * @param {?} value
         * @param {?} predicateResult
         * @return {?}
         */

    }, {
        key: 'nextOrComplete',
        value: function nextOrComplete(value, predicateResult) {
            var /** @type {?} */destination = this.destination;
            if (Boolean(predicateResult)) {
                destination.next(value);
            } else {
                destination.complete();
            }
        }
    }]);

    return TakeWhileSubscriber;
}(_Subscriber2.Subscriber);

function TakeWhileSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeWhileSubscriber.prototype.index;
}