'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FindValueSubscriber = exports.FindValueOperator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.find = find;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Emits only the first value emitted by the source Observable that meets some
 * condition.
 *
 * <span class="informal">Finds the first value that passes some test and emits
 * that.</span>
 *
 * <img src="./img/find.png" width="100%">
 *
 * `find` searches for the first item in the source Observable that matches the
 * specified condition embodied by the `predicate`, and returns the first
 * occurrence in the source. Unlike {\@link first}, the `predicate` is required
 * in `find`, and does not emit an error if a valid value is not found.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link filter}
 * @see {\@link first}
 * @see {\@link findIndex}
 * @see {\@link take}
 *
 * A function called with each item to test for condition matching.
 * in the `predicate` function.
 * condition.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
}

var FindValueOperator = exports.FindValueOperator = function () {
    /**
     * @param {?} predicate
     * @param {?} source
     * @param {?} yieldIndex
     * @param {?=} thisArg
     */
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        _classCallCheck(this, FindValueOperator);

        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */


    _createClass(FindValueOperator, [{
        key: 'call',
        value: function call(observer, source) {
            return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
        }
    }]);

    return FindValueOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var FindValueSubscriber = exports.FindValueSubscriber = function (_Subscriber) {
    _inherits(FindValueSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} source
     * @param {?} yieldIndex
     * @param {?=} thisArg
     */
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        _classCallCheck(this, FindValueSubscriber);

        var _this = _possibleConstructorReturn(this, (FindValueSubscriber.__proto__ || Object.getPrototypeOf(FindValueSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(FindValueSubscriber, [{
        key: 'notifyComplete',
        value: function notifyComplete(value) {
            var /** @type {?} */destination = this.destination;
            destination.next(value);
            destination.complete();
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            var predicate = this.predicate,
                thisArg = this.thisArg;

            var /** @type {?} */index = this.index++;
            try {
                var /** @type {?} */result = predicate.call(thisArg || this, value, index, this.source);
                if (result) {
                    this.notifyComplete(this.yieldIndex ? index : value);
                }
            } catch (err) {
                this.destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.notifyComplete(this.yieldIndex ? -1 : undefined);
        }
    }]);

    return FindValueSubscriber;
}(_Subscriber2.Subscriber);

function FindValueSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FindValueSubscriber.prototype.index;
}