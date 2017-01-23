'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishLast = publishLast;

var _AsyncSubject = require('../AsyncSubject');

var _multicast = require('./multicast');

/**
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function publishLast() {
  return _multicast.multicast.call(this, new _AsyncSubject.AsyncSubject());
}