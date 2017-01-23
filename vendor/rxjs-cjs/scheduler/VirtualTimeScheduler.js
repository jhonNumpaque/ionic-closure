'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualAction = exports.VirtualTimeScheduler = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AsyncAction2 = require('./AsyncAction');

var _AsyncScheduler2 = require('./AsyncScheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualTimeScheduler = exports.VirtualTimeScheduler = function (_AsyncScheduler) {
    _inherits(VirtualTimeScheduler, _AsyncScheduler);

    /**
     * @param {?=} SchedulerAction
     * @param {?=} maxFrames
     */
    function VirtualTimeScheduler() {
        var SchedulerAction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VirtualAction;
        var maxFrames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, VirtualTimeScheduler);

        var _this = _possibleConstructorReturn(this, (VirtualTimeScheduler.__proto__ || Object.getPrototypeOf(VirtualTimeScheduler)).call(this, SchedulerAction, function () {
            return _this.frame;
        }));

        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    /**
     * Prompt the Scheduler to execute all of its queued actions, therefore
     * clearing its queue.
     * @return {?}
     */


    _createClass(VirtualTimeScheduler, [{
        key: 'flush',
        value: function flush() {
            var actions = this.actions,
                maxFrames = this.maxFrames;

            var /** @type {?} */error = void 0,
                /** @type {?} */action = void 0;
            while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            }
            if (error) {
                while (action = actions.shift()) {
                    action.unsubscribe();
                }
                throw error;
            }
        }
    }]);

    return VirtualTimeScheduler;
}(_AsyncScheduler2.AsyncScheduler);

VirtualTimeScheduler.frameTimeFactor = 10;
function VirtualTimeScheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualTimeScheduler.prototype.frameTimeFactor;
    /** @type {?} */
    VirtualTimeScheduler.prototype.frame;
    /** @type {?} */
    VirtualTimeScheduler.prototype.index;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var VirtualAction = exports.VirtualAction = function (_AsyncAction) {
    _inherits(VirtualAction, _AsyncAction);

    /**
     * @param {?} scheduler
     * @param {?} work
     * @param {?=} index
     */
    function VirtualAction(scheduler, work) {
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : scheduler.index += 1;

        _classCallCheck(this, VirtualAction);

        var _this2 = _possibleConstructorReturn(this, (VirtualAction.__proto__ || Object.getPrototypeOf(VirtualAction)).call(this, scheduler, work));

        _this2.scheduler = scheduler;
        _this2.work = work;
        _this2.index = index;
        _this2.index = scheduler.index = index;
        return _this2;
    }
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */


    _createClass(VirtualAction, [{
        key: 'schedule',
        value: function schedule(state) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return !this.id ? _get(VirtualAction.prototype.__proto__ || Object.getPrototypeOf(VirtualAction.prototype), 'schedule', this).call(this, state, delay) :
            // If an action is rescheduled, we save allocations by mutating its state,
            // pushing it to the end of the scheduler queue, and recycling the action.
            // But since the VirtualTimeScheduler is used for testing, VirtualActions
            // must be immutable so they can be inspected later.
            this.add(new VirtualAction(this.scheduler, this.work)).schedule(state, delay);
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

            this.delay = scheduler.frame + delay;
            var actions = scheduler.actions;

            actions.push(this);
            actions.sort(VirtualAction.sortActions);
            return true;
        }
        /**
         * @param {?} scheduler
         * @param {?=} id
         * @param {?=} delay
         * @return {?}
         */

    }, {
        key: 'recycleAsyncId',
        value: function recycleAsyncId(scheduler, id) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            return undefined;
        }
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */

    }], [{
        key: 'sortActions',
        value: function sortActions(a, b) {
            if (a.delay === b.delay) {
                if (a.index === b.index) {
                    return 0;
                } else if (a.index > b.index) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (a.delay > b.delay) {
                return 1;
            } else {
                return -1;
            }
        }
    }]);

    return VirtualAction;
}(_AsyncAction2.AsyncAction);