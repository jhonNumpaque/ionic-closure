'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.every = every;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}

var EveryOperator = function () {
    /**
     * @param {?} predicate
     * @param {?=} thisArg
     * @param {?=} source
     */
    function EveryOperator(predicate, thisArg, source) {
        _classCallCheck(this, EveryOperator);

        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(EveryOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
        }
    }]);

    return EveryOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var EverySubscriber = function (_Subscriber) {
    _inherits(EverySubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} thisArg
     * @param {?=} source
     */
    function EverySubscriber(destination, predicate, thisArg, source) {
        _classCallCheck(this, EverySubscriber);

        var _this = _possibleConstructorReturn(this, (EverySubscriber.__proto__ || Object.getPrototypeOf(EverySubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    /**
     * @param {?} everyValueMatch
     * @return {?}
     */


    _createClass(EverySubscriber, [{
        key: 'notifyComplete',
        value: function notifyComplete(everyValueMatch) {
            this.destination.next(everyValueMatch);
            this.destination.complete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */result = false;
            try {
                result = this.predicate.call(this.thisArg, value, this.index++, this.source);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            if (!result) {
                this.notifyComplete(false);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.notifyComplete(true);
        }
    }]);

    return EverySubscriber;
}(_Subscriber2.Subscriber);

function EverySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    EverySubscriber.prototype.index;
}