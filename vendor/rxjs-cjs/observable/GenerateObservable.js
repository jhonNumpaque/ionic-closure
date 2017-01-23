'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenerateObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _isScheduler = require('../util/isScheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var /** @type {?} */selfSelector = function selfSelector(value) {
    return value;
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var GenerateObservable = exports.GenerateObservable = function (_Observable) {
    _inherits(GenerateObservable, _Observable);

    /**
     * @param {?} initialState
     * @param {?} condition
     * @param {?} iterate
     * @param {?} resultSelector
     * @param {?=} scheduler
     */
    function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
        _classCallCheck(this, GenerateObservable);

        var _this = _possibleConstructorReturn(this, (GenerateObservable.__proto__ || Object.getPrototypeOf(GenerateObservable)).call(this));

        _this.initialState = initialState;
        _this.condition = condition;
        _this.iterate = iterate;
        _this.resultSelector = resultSelector;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * @param {?} initialStateOrOptions
     * @param {?=} condition
     * @param {?=} iterate
     * @param {?=} resultSelectorOrObservable
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(GenerateObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */state = this.initialState;
            if (this.scheduler) {
                return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                    subscriber: subscriber,
                    iterate: this.iterate,
                    condition: this.condition,
                    resultSelector: this.resultSelector,
                    state: state
                });
            }
            var condition = this.condition,
                resultSelector = this.resultSelector,
                iterate = this.iterate;

            do {
                if (condition) {
                    var /** @type {?} */conditionResult = void 0;
                    try {
                        conditionResult = condition(state);
                    } catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (!conditionResult) {
                        subscriber.complete();
                        break;
                    }
                }
                var /** @type {?} */value = void 0;
                try {
                    value = resultSelector(state);
                } catch (err) {
                    subscriber.error(err);
                    return;
                }
                subscriber.next(value);
                if (subscriber.closed) {
                    break;
                }
                try {
                    state = iterate(state);
                } catch (err) {
                    subscriber.error(err);
                    return;
                }
            } while (true);
        }
        /**
         * @param {?} state
         * @return {?}
         */

    }], [{
        key: 'create',
        value: function create(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
            if (arguments.length == 1) {
                return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
            }
            if (resultSelectorOrObservable === undefined || (0, _isScheduler.isScheduler)(resultSelectorOrObservable)) {
                return new GenerateObservable( /** @type {?} */initialStateOrOptions, condition, iterate, selfSelector, /** @type {?} */resultSelectorOrObservable);
            }
            return new GenerateObservable( /** @type {?} */initialStateOrOptions, condition, iterate, /** @type {?} */resultSelectorOrObservable, /** @type {?} */scheduler);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(state) {
            var subscriber = state.subscriber,
                condition = state.condition;

            if (subscriber.closed) {
                return;
            }
            if (state.needIterate) {
                try {
                    state.state = state.iterate(state.state);
                } catch (err) {
                    subscriber.error(err);
                    return;
                }
            } else {
                state.needIterate = true;
            }
            if (condition) {
                var /** @type {?} */conditionResult = void 0;
                try {
                    conditionResult = condition(state.state);
                } catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    return;
                }
                if (subscriber.closed) {
                    return;
                }
            }
            var /** @type {?} */value = void 0;
            try {
                value = state.resultSelector(state.state);
            } catch (err) {
                subscriber.error(err);
                return;
            }
            if (subscriber.closed) {
                return;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                return;
            }
            return this.schedule(state);
        }
    }]);

    return GenerateObservable;
}(_Observable2.Observable);