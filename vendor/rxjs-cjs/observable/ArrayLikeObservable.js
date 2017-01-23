'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArrayLikeObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _ScalarObservable = require('./ScalarObservable');

var _EmptyObservable = require('./EmptyObservable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ArrayLikeObservable = exports.ArrayLikeObservable = function (_Observable) {
    _inherits(ArrayLikeObservable, _Observable);

    /**
     * @param {?} arrayLike
     * @param {?=} scheduler
     */
    function ArrayLikeObservable(arrayLike, scheduler) {
        _classCallCheck(this, ArrayLikeObservable);

        var _this = _possibleConstructorReturn(this, (ArrayLikeObservable.__proto__ || Object.getPrototypeOf(ArrayLikeObservable)).call(this));

        _this.arrayLike = arrayLike;
        _this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            _this._isScalar = true;
            _this.value = arrayLike[0];
        }
        return _this;
    }
    /**
     * @param {?} arrayLike
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(ArrayLikeObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */index = 0;
            var arrayLike = this.arrayLike,
                scheduler = this.scheduler;

            var /** @type {?} */length = arrayLike.length;
            if (scheduler) {
                return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                    arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
                });
            } else {
                for (var /** @type {?} */i = 0; i < length && !subscriber.closed; i++) {
                    subscriber.next(arrayLike[i]);
                }
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(arrayLike, scheduler) {
            var /** @type {?} */length = arrayLike.length;
            if (length === 0) {
                return new _EmptyObservable.EmptyObservable();
            } else if (length === 1) {
                return new _ScalarObservable.ScalarObservable( /** @type {?} */arrayLike[0], scheduler);
            } else {
                return new ArrayLikeObservable(arrayLike, scheduler);
            }
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var arrayLike = state.arrayLike,
                index = state.index,
                length = state.length,
                subscriber = state.subscriber;

            if (subscriber.closed) {
                return;
            }
            if (index >= length) {
                subscriber.complete();
                return;
            }
            subscriber.next(arrayLike[index]);
            state.index = index + 1;
            this.schedule(state);
        }
    }]);

    return ArrayLikeObservable;
}(_Observable2.Observable);

function ArrayLikeObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayLikeObservable.prototype.value;
}