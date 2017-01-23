'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScalarObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ScalarObservable = exports.ScalarObservable = function (_Observable) {
    _inherits(ScalarObservable, _Observable);

    /**
     * @param {?} value
     * @param {?=} scheduler
     */
    function ScalarObservable(value, scheduler) {
        _classCallCheck(this, ScalarObservable);

        var _this = _possibleConstructorReturn(this, (ScalarObservable.__proto__ || Object.getPrototypeOf(ScalarObservable)).call(this));

        _this.value = value;
        _this.scheduler = scheduler;
        _this._isScalar = true;
        if (scheduler) {
            _this._isScalar = false;
        }
        return _this;
    }
    /**
     * @param {?} value
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(ScalarObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */value = this.value;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(ScalarObservable.dispatch, 0, {
                    done: false, value: value, subscriber: subscriber
                });
            } else {
                subscriber.next(value);
                if (!subscriber.closed) {
                    subscriber.complete();
                }
            }
        }
    }], [{
        key: 'create',
        value: function create(value, scheduler) {
            return new ScalarObservable(value, scheduler);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var done = state.done,
                value = state.value,
                subscriber = state.subscriber;

            if (done) {
                subscriber.complete();
                return;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                return;
            }
            state.done = true;
            this.schedule(state);
        }
    }]);

    return ScalarObservable;
}(_Observable2.Observable);

function ScalarObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ScalarObservable.prototype._isScalar;
}