'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNumeric = isNumeric;

var _isArray = require('../util/isArray');

/**
 * @param {?} val
 * @return {?}
 */
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !(0, _isArray.isArray)(val) && val - parseFloat(val) + 1 >= 0;
}
;