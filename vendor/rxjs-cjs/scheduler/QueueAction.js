'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueueAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AsyncAction2 = require('./AsyncAction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var QueueAction = exports.QueueAction = function (_AsyncAction) {
    _inherits(QueueAction, _AsyncAction);

    /**
     * @param {?} scheduler
     * @param {?} work
     */
    function QueueAction(scheduler, work) {
        _classCallCheck(this, QueueAction);

        var _this = _possibleConstructorReturn(this, (QueueAction.__proto__ || Object.getPrototypeOf(QueueAction)).call(this, scheduler, work));

        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */


    _createClass(QueueAction, [{
        key: 'schedule',
        value: function schedule(state) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (delay > 0) {
                return _get(QueueAction.prototype.__proto__ || Object.getPrototypeOf(QueueAction.prototype), 'schedule', this).call(this, state, delay);
            }
            this.delay = delay;
            this.state = state;
            this.scheduler.flush(this);
            return this;
        }
        /**
         * @param {?} state
         * @param {?} delay
         * @return {?}
         */

    }, {
        key: 'execute',
        value: function execute(state, delay) {
            return delay > 0 || this.closed ? _get(QueueAction.prototype.__proto__ || Object.getPrototypeOf(QueueAction.prototype), 'execute', this).call(this, state, delay) : this._execute(state, delay);
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

            // If delay exists and is greater than 0, or if the delay is null (the
            // action wasn't rescheduled) but was originally scheduled as an async
            // action, then recycle as an async action.
            if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
                return _get(QueueAction.prototype.__proto__ || Object.getPrototypeOf(QueueAction.prototype), 'requestAsyncId', this).call(this, scheduler, id, delay);
            }
            // Otherwise flush the scheduler starting with this action.
            return scheduler.flush(this);
        }
    }]);

    return QueueAction;
}(_AsyncAction2.AsyncAction);