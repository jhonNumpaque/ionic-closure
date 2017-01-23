'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishReplay = publishReplay;

var _ReplaySubject = require('../ReplaySubject');

var _multicast = require('./multicast');

/**
 * @owner Observable
 * @this {?}
 * @param {?=} bufferSize
 * @param {?=} windowTime
 * @param {?=} scheduler
 * @return {?}
 */
function publishReplay() {
  var bufferSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.POSITIVE_INFINITY;
  var windowTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.POSITIVE_INFINITY;
  var scheduler = arguments[2];

  return _multicast.multicast.call(this, new _ReplaySubject.ReplaySubject(bufferSize, windowTime, scheduler));
}