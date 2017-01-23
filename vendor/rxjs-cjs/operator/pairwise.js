'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.pairwise = pairwise;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 *
 * consecutive values from the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function pairwise() {
    return this.lift(new PairwiseOperator());
}

var PairwiseOperator = function () {
    function PairwiseOperator() {
        _classCallCheck(this, PairwiseOperator);
    }

    _createClass(PairwiseOperator, [{
        key: 'call',

        /**
         * @param {?} subscriber
         * @param {?} source
         * @return {?}
         */
        value: function call(subscriber, source) {
            return source.subscribe(new PairwiseSubscriber(subscriber));
        }
    }]);

    return PairwiseOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var PairwiseSubscriber = function (_Subscriber) {
    _inherits(PairwiseSubscriber, _Subscriber);

    /**
     * @param {?} destination
     */
    function PairwiseSubscriber(destination) {
        _classCallCheck(this, PairwiseSubscriber);

        var _this = _possibleConstructorReturn(this, (PairwiseSubscriber.__proto__ || Object.getPrototypeOf(PairwiseSubscriber)).call(this, destination));

        _this.hasPrev = false;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(PairwiseSubscriber, [{
        key: '_next',
        value: function _next(value) {
            if (this.hasPrev) {
                this.destination.next([this.prev, value]);
            } else {
                this.hasPrev = true;
            }
            this.prev = value;
        }
    }]);

    return PairwiseSubscriber;
}(_Subscriber2.Subscriber);

function PairwiseSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    PairwiseSubscriber.prototype.prev;
    /** @type {?} */
    PairwiseSubscriber.prototype.hasPrev;
}