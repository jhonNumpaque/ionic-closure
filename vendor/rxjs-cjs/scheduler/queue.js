'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queue = undefined;

var _QueueAction = require('./QueueAction');

var _QueueScheduler = require('./QueueScheduler');

var /** @type {?} */queue = exports.queue = new _QueueScheduler.QueueScheduler(_QueueAction.QueueAction);