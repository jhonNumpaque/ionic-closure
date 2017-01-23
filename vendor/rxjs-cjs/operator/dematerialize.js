'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.dematerialize = dematerialize;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Converts an Observable of {\@link Notification} objects into the emissions
 * that they represent.
 *
 * <span class="informal">Unwraps {\@link Notification} objects as actual `next`,
 * `error` and `complete` emissions. The opposite of {\@link materialize}.</span>
 *
 * <img src="./img/dematerialize.png" width="100%">
 *
 * `dematerialize` is assumed to operate an Observable that only emits
 * {\@link Notification} objects as `next` emissions, and does not emit any
 * `error`. Such Observable is the output of a `materialize` operation. Those
 * notifications are then unwrapped using the metadata they contain, and emitted
 * as `next`, `error`, and `complete` on the output Observable.
 *
 * Use this operator in conjunction with {\@link materialize}.
 *
 * var notifA = new Rx.Notification('N', 'A');
 * var notifB = new Rx.Notification('N', 'B');
 * var notifE = new Rx.Notification('E', void 0,
 *   new TypeError('x.toUpperCase is not a function')
 * );
 * var materialized = Rx.Observable.of(notifA, notifB, notifE);
 * var upperCase = materialized.dematerialize();
 * upperCase.subscribe(x => console.log(x), e => console.error(e));
 *
 * // Results in:
 * // A
 * // B
 * // TypeError: x.toUpperCase is not a function
 *
 * @see {\@link Notification}
 * @see {\@link materialize}
 *
 * embedded in Notification objects emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}

var DeMaterializeOperator = function () {
    function DeMaterializeOperator() {
        _classCallCheck(this, DeMaterializeOperator);
    }

    _createClass(DeMaterializeOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new DeMaterializeSubscriber(subscriber));
        }
    }]);

    return DeMaterializeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DeMaterializeSubscriber = function (_Subscriber) {
    _inherits(DeMaterializeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function DeMaterializeSubscriber(destination) {
        _classCallCheck(this, DeMaterializeSubscriber);

        return _possibleConstructorReturn(this, (DeMaterializeSubscriber.__proto__ || Object.getPrototypeOf(DeMaterializeSubscriber)).call(this, destination));
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(DeMaterializeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            value.observe(this.destination);
        }
    }]);

    return DeMaterializeSubscriber;
}(_Subscriber2.Subscriber);