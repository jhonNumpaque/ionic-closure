"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var /** @type {?} */empty = exports.empty = {
  closed: true,
  /**
   * @param {?} value
   * @return {?}
   */
  next: function next(value) {},

  /**
   * @param {?} err
   * @return {?}
   */
  error: function error(err) {
    throw err;
  },

  /**
   * @return {?}
   */
  complete: function complete() {}
};