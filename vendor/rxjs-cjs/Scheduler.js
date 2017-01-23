"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {\@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 */
var Scheduler = exports.Scheduler = function () {
  /**
   * @param {?} SchedulerAction
   * @param {?=} now
   */
  function Scheduler(SchedulerAction) {
    var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Scheduler.now;

    _classCallCheck(this, Scheduler);

    this.SchedulerAction = SchedulerAction;
    this.now = now;
  }
  /**
   * Schedules a function, `work`, for execution. May happen at some point in
   * the future, according to the `delay` parameter, if specified. May be passed
   * some context object, `state`, which will be passed to the `work` function.
   *
   * The given arguments will be processed an stored as an Action object in a
   * queue of actions.
   *
   * task, or some unit of work to be executed by the Scheduler.
   * time unit is implicit and defined by the Scheduler itself.
   * called by the Scheduler.
   * the scheduled work.
   * @param {?} work
   * @param {?=} delay
   * @param {?=} state
   * @return {?}
   */


  _createClass(Scheduler, [{
    key: "schedule",
    value: function schedule(work) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var state = arguments[2];

      return new this.SchedulerAction(this, work).schedule(state, delay);
    }
  }]);

  return Scheduler;
}();

Scheduler.now = Date.now ? Date.now : function () {
  return +new Date();
};
function Scheduler_tsickle_Closure_declarations() {
  /** @type {?} */
  Scheduler.prototype.now;
  /**
   * A getter method that returns a number representing the current time
   * (at the time this function was called) according to the scheduler's own
   * internal clock.
   * have a relation to wall-clock time. May or may not refer to a time unit
   * (e.g. milliseconds).
   * @type {?}
   */
  Scheduler.prototype.now;
}