'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.mapTo = mapTo;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {\@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {\@link map}
 *
 * the source Observable emits something.
 * @owner Observable
 * @this {?}
 * @param {?} value
 * @return {?}
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}

var MapToOperator = function () {
    /**
     * @param {?} value
     */
    function MapToOperator(value) {
        _classCallCheck(this, MapToOperator);

        this.value = value;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(MapToOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new MapToSubscriber(subscriber, this.value));
        }
    }]);

    return MapToOperator;
}();

function MapToOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    MapToOperator.prototype.value;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var MapToSubscriber = function (_Subscriber) {
    _inherits(MapToSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} value
     */
    function MapToSubscriber(destination, value) {
        _classCallCheck(this, MapToSubscriber);

        var _this = _possibleConstructorReturn(this, (MapToSubscriber.__proto__ || Object.getPrototypeOf(MapToSubscriber)).call(this, destination));

        _this.value = value;
        return _this;
    }
    /**
     * @param {?} x
     * @return {?}
     */


    _createClass(MapToSubscriber, [{
        key: '_next',
        value: function _next(x) {
            this.destination.next(this.value);
        }
    }]);

    return MapToSubscriber;
}(_Subscriber2.Subscriber);

function MapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MapToSubscriber.prototype.value;
}