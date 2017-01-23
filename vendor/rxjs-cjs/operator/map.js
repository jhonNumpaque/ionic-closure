'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.map = map;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {\@link mapTo}
 * @see {\@link pluck}
 *
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * `project` function.
 * Observable transformed by the given `project` function.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} thisArg
 * @return {?}
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}

var MapOperator = exports.MapOperator = function () {
    /**
     * @param {?} project
     * @param {?} thisArg
     */
    function MapOperator(project, thisArg) {
        _classCallCheck(this, MapOperator);

        this.project = project;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(MapOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        }
    }]);

    return MapOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var MapSubscriber = function (_Subscriber) {
    _inherits(MapSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} thisArg
     */
    function MapSubscriber(destination, project, thisArg) {
        _classCallCheck(this, MapSubscriber);

        var _this = _possibleConstructorReturn(this, (MapSubscriber.__proto__ || Object.getPrototypeOf(MapSubscriber)).call(this, destination));

        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(MapSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */result = void 0;
            try {
                result = this.project.call(this.thisArg, value, this.count++);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        }
    }]);

    return MapSubscriber;
}(_Subscriber2.Subscriber);

function MapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MapSubscriber.prototype.count;
    /** @type {?} */
    MapSubscriber.prototype.thisArg;
}