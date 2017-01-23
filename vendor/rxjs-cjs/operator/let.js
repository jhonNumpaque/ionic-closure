"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.letProto = letProto;
/**
 * @owner Observable
 * @this {?}
 * @param {?} func
 * @return {?}
 */
function letProto(func) {
  return func(this);
}