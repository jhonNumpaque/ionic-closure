'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tryCatch = tryCatch;

var _errorObject = require('./errorObject');

var /** @type {?} */tryCatchTarget = void 0;
/**
 * @this {?}
 * @return {?}
 */
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        _errorObject.errorObject.e = e;
        return _errorObject.errorObject;
    }
}
/**
 * @param {?} fn
 * @return {?}
 */
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
;