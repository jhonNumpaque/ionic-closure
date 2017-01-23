'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assign = undefined;
exports.assignImpl = assignImpl;
exports.getAssign = getAssign;

var _root = require('./root');

/**
 * @param {?} target
 * @param {...?} sources
 * @return {?}
 */
function assignImpl(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    var /** @type {?} */len = sources.length;
    for (var /** @type {?} */i = 0; i < len; i++) {
        var /** @type {?} */source = sources[i];
        for (var /** @type {?} */k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k];
            }
        }
    }
    return target;
}
;
/**
 * @param {?} root
 * @return {?}
 */
function getAssign(root) {
    return root.Object.assign || assignImpl;
}
var /** @type {?} */assign = exports.assign = getAssign(_root.root);