'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _root = require('./root');

var _MapPolyfill = require('./MapPolyfill');

var /** @type {?} */Map = exports.Map = _root.root.Map || function () {
  return _MapPolyfill.MapPolyfill;
}();