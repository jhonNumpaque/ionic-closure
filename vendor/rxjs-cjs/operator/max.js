'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.max = max;

var _reduce = require('./reduce');

/**
 * The Max operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
 * and when source Observable completes it emits a single item: the item with the largest number.
 *
 * <img src="./img/max.png" width="100%">
 *
 * items.
 * @owner Observable
 * @this {?}
 * @param {?=} comparer
 * @return {?}
 */
function max(comparer) {
    var /** @type {?} */max = typeof comparer === 'function' ? function (x, y) {
        return comparer(x, y) > 0 ? x : y;
    } : function (x, y) {
        return x > y ? x : y;
    };
    return this.lift(new _reduce.ReduceOperator(max));
}