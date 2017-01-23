'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asap = undefined;

var _AsapAction = require('./AsapAction');

var _AsapScheduler = require('./AsapScheduler');

var /** @type {?} */asap = exports.asap = new _AsapScheduler.AsapScheduler(_AsapAction.AsapAction);