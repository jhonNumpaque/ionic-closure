'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.async = undefined;

var _AsyncAction = require('./AsyncAction');

var _AsyncScheduler = require('./AsyncScheduler');

var /** @type {?} */async = exports.async = new _AsyncScheduler.AsyncScheduler(_AsyncAction.AsyncAction);