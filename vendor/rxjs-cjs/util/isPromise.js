'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = isPromise;
/**
 * @param {?} value
 * @return {?}
 */
function isPromise(value) {
  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}