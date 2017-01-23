"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = isDate;
/**
 * @param {?} value
 * @return {?}
 */
function isDate(value) {
  return value instanceof Date && !isNaN(+value);
}