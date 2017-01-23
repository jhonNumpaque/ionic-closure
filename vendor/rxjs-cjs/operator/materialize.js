'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.materialize = materialize;

var _Subscriber2 = require('../Subscriber');

var _Notification = require('../Notification');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {\@link Notification}
 * objects.
 *
 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
 * {\@link Notification} objects, emitted as `next` on the output Observable.
 * </span>
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * `materialize` returns an Observable that emits a `next` notification for each
 * `next`, `error`, or `complete` emission of the source Observable. When the
 * source Observable emits `complete`, the output Observable will emit `next` as
 * a Notification of type "complete", and then it will emit `complete` as well.
 * When the source Observable emits `error`, the output will emit `next` as a
 * Notification of type "error", and then `complete`.
 *
 * This operator is useful for producing metadata of the source Observable, to
 * be consumed as `next` emissions. Use it in conjunction with
 * {\@link dematerialize}.
 *
 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
 * var upperCase = letters.map(x => x.toUpperCase());
 * var materialized = upperCase.materialize();
 * materialized.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
 * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
 * // - Notification {kind: "E", value: undefined, error: TypeError:
 * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
 * //   [as project] (http://1…, hasValue: false}
 *
 * @see {\@link Notification}
 * @see {\@link dematerialize}
 *
 * {\@link Notification} objects that wrap the original emissions from the source
 * Observable with metadata.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function materialize() {
    return this.lift(new MaterializeOperator());
}

var MaterializeOperator = function () {
    function MaterializeOperator() {
        _classCallCheck(this, MaterializeOperator);
    }

    _createClass(MaterializeOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new MaterializeSubscriber(subscriber));
        }
    }]);

    return MaterializeOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MaterializeSubscriber = function (_Subscriber) {
    _inherits(MaterializeSubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function MaterializeSubscriber(destination) {
        _classCallCheck(this, MaterializeSubscriber);

        return _possibleConstructorReturn(this, (MaterializeSubscriber.__proto__ || Object.getPrototypeOf(MaterializeSubscriber)).call(this, destination));
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(MaterializeSubscriber, [{
        key: '_next',
        value: function _next(value) {
            this.destination.next(_Notification.Notification.createNext(value));
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var /** @type {?} */destination = this.destination;
            destination.next(_Notification.Notification.createError(err));
            destination.complete();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var /** @type {?} */destination = this.destination;
            destination.next(_Notification.Notification.createComplete());
            destination.complete();
        }
    }]);

    return MaterializeSubscriber;
}(_Subscriber2.Subscriber);