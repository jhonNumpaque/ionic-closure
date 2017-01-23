'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _root = require('../util/root');

var _Action2 = require('./Action');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var AsyncAction = exports.AsyncAction = function (_Action) {
    _inherits(AsyncAction, _Action);

    /**
     * @param {?} scheduler
     * @param {?} work
     */
    function AsyncAction(scheduler, work) {
        _classCallCheck(this, AsyncAction);

        var _this = _possibleConstructorReturn(this, (AsyncAction.__proto__ || Object.getPrototypeOf(AsyncAction)).call(this, scheduler, work));

        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */


    _createClass(AsyncAction, [{
        key: 'schedule',
        value: function schedule(state) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.closed) {
                return this;
            }
            // Always replace the current state with the new state.
            this.state = state;
            // Set the pending flag indicating that this action has been scheduled, or
            // has recursively rescheduled itself.
            this.pending = true;
            var /** @type {?} */id = this.id;
            var /** @type {?} */scheduler = this.scheduler;
            //
            // Important implementation note:
            //
            // Actions only execute once by default, unless rescheduled from within the
            // scheduled callback. This allows us to implement single and repeat
            // actions via the same code path, without adding API surface area, as well
            // as mimic traditional recursion but across asynchronous boundaries.
            //
            // However, JS runtimes and timers distinguish between intervals achieved by
            // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
            // serial `setTimeout` calls can be individually delayed, which delays
            // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
            // guarantee the interval callback will be invoked more precisely to the
            // interval period, regardless of load.
            //
            // Therefore, we use `setInterval` to schedule single and repeat actions.
            // If the action reschedules itself with the same delay, the interval is not
            // canceled. If the action doesn't reschedule, or reschedules with a
            // different delay, the interval will be canceled after scheduled callback
            // execution.
            //
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            this.delay = delay;
            // If this action has already an async Id, don't request a new one.
            this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
            return this;
        }
        /**
         * @param {?} scheduler
         * @param {?=} id
         * @param {?=} delay
         * @return {?}
         */

    }, {
        key: 'requestAsyncId',
        value: function requestAsyncId(scheduler, id) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return _root.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
        }
        /**
         * @param {?} scheduler
         * @param {?} id
         * @param {?=} delay
         * @return {?}
         */

    }, {
        key: 'recycleAsyncId',
        value: function recycleAsyncId(scheduler, id) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // If this action is rescheduled with the same delay time, don't clear the interval id.
            if (delay !== null && this.delay === delay) {
                return id;
            }
            // Otherwise, if the action's delay time is different from the current delay,
            // clear the interval id
            return _root.root.clearInterval(id) && undefined || undefined;
        }
        /**
         * Immediately executes this action and the `work` it contains.
         * @param {?} state
         * @param {?} delay
         * @return {?}
         */

    }, {
        key: 'execute',
        value: function execute(state, delay) {
            if (this.closed) {
                return new Error('executing a cancelled action');
            }
            this.pending = false;
            var /** @type {?} */error = this._execute(state, delay);
            if (error) {
                return error;
            } else if (this.pending === false && this.id != null) {
                // Dequeue if the action didn't reschedule itself. Don't call
                // unsubscribe(), because the action could reschedule later.
                // For example:
                // ```
                // scheduler.schedule(function doWork(counter) {
                //   /* ... I'm a busy worker bee ... */
                //   var originalAction = this;
                //   /* wait 100ms before rescheduling the action */
                //   setTimeout(function () {
                //     originalAction.schedule(counter + 1);
                //   }, 100);
                // }, 1000);
                // ```
                this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
        }
        /**
         * @param {?} state
         * @param {?} delay
         * @return {?}
         */

    }, {
        key: '_execute',
        value: function _execute(state, delay) {
            var /** @type {?} */errored = false;
            var /** @type {?} */errorValue = undefined;
            try {
                this.work(state);
            } catch (e) {
                errored = true;
                errorValue = !!e && e || new Error(e);
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_unsubscribe',
        value: function _unsubscribe() {
            var /** @type {?} */id = this.id;
            var /** @type {?} */scheduler = this.scheduler;
            var /** @type {?} */actions = scheduler.actions;
            var /** @type {?} */index = actions.indexOf(this);
            this.work = null;
            this.delay = null;
            this.state = null;
            this.pending = false;
            this.scheduler = null;
            if (index !== -1) {
                actions.splice(index, 1);
            }
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
        }
    }]);

    return AsyncAction;
}(_Action2.Action);

function AsyncAction_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncAction.prototype.id;
    /** @type {?} */
    AsyncAction.prototype.state;
    /** @type {?} */
    AsyncAction.prototype.delay;
    /** @type {?} */
    AsyncAction.prototype.pending;
}