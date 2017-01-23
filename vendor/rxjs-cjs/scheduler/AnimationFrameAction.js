'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimationFrameAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AsyncAction2 = require('./AsyncAction');

var _AnimationFrame = require('../util/AnimationFrame');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var AnimationFrameAction = exports.AnimationFrameAction = function (_AsyncAction) {
    _inherits(AnimationFrameAction, _AsyncAction);

    /**
     * @param {?} scheduler
     * @param {?} work
     */
    function AnimationFrameAction(scheduler, work) {
        _classCallCheck(this, AnimationFrameAction);

        var _this = _possibleConstructorReturn(this, (AnimationFrameAction.__proto__ || Object.getPrototypeOf(AnimationFrameAction)).call(this, scheduler, work));

        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    /**
     * @param {?} scheduler
     * @param {?=} id
     * @param {?=} delay
     * @return {?}
     */


    _createClass(AnimationFrameAction, [{
        key: 'requestAsyncId',
        value: function requestAsyncId(scheduler, id) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // If delay is greater than 0, request as an async action.
            if (delay !== null && delay > 0) {
                return _get(AnimationFrameAction.prototype.__proto__ || Object.getPrototypeOf(AnimationFrameAction.prototype), 'requestAsyncId', this).call(this, scheduler, id, delay);
            }
            // Push the action to the end of the scheduler queue.
            scheduler.actions.push(this);
            // If an animation frame has already been requested, don't request another
            // one. If an animation frame hasn't been requested yet, request one. Return
            // the current animation frame request id.
            return scheduler.scheduled || (scheduler.scheduled = _AnimationFrame.AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
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

            // If delay exists and is greater than 0, or if the delay is null (the
            // action wasn't rescheduled) but was originally scheduled as an async
            // action, then recycle as an async action.
            if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
                return _get(AnimationFrameAction.prototype.__proto__ || Object.getPrototypeOf(AnimationFrameAction.prototype), 'recycleAsyncId', this).call(this, scheduler, id, delay);
            }
            // If the scheduler queue is empty, cancel the requested animation frame and
            // set the scheduled flag to undefined so the next AnimationFrameAction will
            // request its own.
            if (scheduler.actions.length === 0) {
                _AnimationFrame.AnimationFrame.cancelAnimationFrame(id);
                scheduler.scheduled = undefined;
            }
            // Return undefined so the action knows to request a new async id if it's rescheduled.
            return undefined;
        }
    }]);

    return AnimationFrameAction;
}(_AsyncAction2.AsyncAction);