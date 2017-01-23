'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAll = zipAll;

var _zip = require('./zip');

/**
 * @owner Observable
 * @this {?}
 * @param {?=} project
 * @return {?}
 */
function zipAll(project) {
  return this.lift(new _zip.ZipOperator(project));
}