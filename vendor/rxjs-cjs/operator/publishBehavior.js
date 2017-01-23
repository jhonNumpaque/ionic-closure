'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishBehavior = publishBehavior;

var _BehaviorSubject = require('../BehaviorSubject');

var _multicast = require('./multicast');

/**
 * @owner Observable
 * @this {?}
 * @param {?} value
 * @return {?}
 */
function publishBehavior(value) {
  return _multicast.multicast.call(this, new _BehaviorSubject.BehaviorSubject(value));
}