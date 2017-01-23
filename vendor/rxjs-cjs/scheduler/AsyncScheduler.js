'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncScheduler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scheduler2 = require('../Scheduler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncScheduler = exports.AsyncScheduler = function (_Scheduler) {
    _inherits(AsyncScheduler, _Scheduler);

    function AsyncScheduler() {
        _classCallCheck(this, AsyncScheduler);

        var _this = _possibleConstructorReturn(this, (AsyncScheduler.__proto__ || Object.getPrototypeOf(AsyncScheduler)).apply(this, arguments));

        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    /**
     * @param {?} action
     * @return {?}
     */


    _createClass(AsyncScheduler, [{
        key: 'flush',
        value: function flush(action) {
            var actions = this.actions;

            if (this.active) {
                actions.push(action);
                return;
            }
            var /** @type {?} */error = void 0;
            this.active = true;
            do {
                if (error = action.execute(action.state, action.delay)) {
                    break;
                }
            } while (action = actions.shift()); // exhaust the scheduler queue
            this.active = false;
            if (error) {
                while (action = actions.shift()) {
                    action.unsubscribe();
                }
                throw error;
            }
        }
    }]);

    return AsyncScheduler;
}(_Scheduler2.Scheduler);

function AsyncScheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncScheduler.prototype.actions;
    /**
     * A flag to indicate whether the Scheduler is currently executing a batch of
     * queued actions.
     * @type {?}
     */
    AsyncScheduler.prototype.active;
    /**
     * An internal ID used to track the latest asynchronous task such as those
     * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
     * others.
     * @type {?}
     */
    AsyncScheduler.prototype.scheduled;
}