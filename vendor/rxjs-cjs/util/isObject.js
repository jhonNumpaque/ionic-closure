'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
/**
 * @param {?} x
 * @return {?}
 */
function isObject(x) {
  return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
}