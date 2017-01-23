'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrame = undefined;

var _AnimationFrameAction = require('./AnimationFrameAction');

var _AnimationFrameScheduler = require('./AnimationFrameScheduler');

var /** @type {?} */animationFrame = exports.animationFrame = new _AnimationFrameScheduler.AnimationFrameScheduler(_AnimationFrameAction.AnimationFrameAction);