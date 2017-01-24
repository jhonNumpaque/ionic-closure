'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Action = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Subscription2 = require('../Subscription');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A unit of work to be executed in a {\@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 */
var Action = exports.Action = function (_Subscription) {
  _inherits(Action, _Subscription);

  /**
   * @param {?} scheduler
   * @param {?} work
   */
  function Action(scheduler, work) {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).call(this));
  }
  /**
   * Schedules this action on its parent Scheduler for execution. May be passed
   * some context object, `state`. May happen at some point in the future,
   * according to the `delay` parameter, if specified.
   * called by the Scheduler.
   * time unit is implicit and defined by the Scheduler.
   * @param {?=} state
   * @param {?=} delay
   * @return {?}
   */


  _createClass(Action, [{
    key: 'schedule',
    value: function schedule(state) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return this;
    }
  }]);

  return Action;
}(_Subscription2.Subscription);