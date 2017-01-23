'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.single = single;

var _Subscriber2 = require('../Subscriber');

var _EmptyError = require('../util/EmptyError');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
 *
 * <img src="./img/single.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * the predicate.
 * .
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @return {?}
 */
function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
}

var SingleOperator = function () {
    /**
     * @param {?=} predicate
     * @param {?=} source
     */
    function SingleOperator(predicate, source) {
        _classCallCheck(this, SingleOperator);

        this.predicate = predicate;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SingleOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
        }
    }]);

    return SingleOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var SingleSubscriber = function (_Subscriber) {
    _inherits(SingleSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} source
     */
    function SingleSubscriber(destination, predicate, source) {
        _classCallCheck(this, SingleSubscriber);

        var _this = _possibleConstructorReturn(this, (SingleSubscriber.__proto__ || Object.getPrototypeOf(SingleSubscriber)).call(this, destination));

        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(SingleSubscriber, [{
        key: 'applySingleValue',
        value: function applySingleValue(value) {
            if (this.seenValue) {
                this.destination.error('Sequence contains more than one element');
            } else {
                this.seenValue = true;
                this.singleValue = value;
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: '_next',
        value: function _next(value) {
            var /** @type {?} */predicate = this.predicate;
            this.index++;
            if (predicate) {
                this.tryNext(value);
            } else {
                this.applySingleValue(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */

    }, {
        key: 'tryNext',
        value: function tryNext(value) {
            try {
                var /** @type {?} */result = this.predicate(value, this.index, this.source);
                if (result) {
                    this.applySingleValue(value);
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
            var /** @type {?} */destination = this.destination;
            if (this.index > 0) {
                destination.next(this.seenValue ? this.singleValue : undefined);
                destination.complete();
            } else {
                destination.error(new _EmptyError.EmptyError());
            }
        }
    }]);

    return SingleSubscriber;
}(_Subscriber2.Subscriber);

function SingleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SingleSubscriber.prototype.seenValue;
    /** @type {?} */
    SingleSubscriber.prototype.singleValue;
    /** @type {?} */
    SingleSubscriber.prototype.index;
}