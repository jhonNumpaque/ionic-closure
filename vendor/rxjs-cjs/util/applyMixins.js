"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyMixins = applyMixins;
/**
 * @param {?} derivedCtor
 * @param {?} baseCtors
 * @return {?}
 */
function applyMixins(derivedCtor, baseCtors) {
    for (var /** @type {?} */i = 0, /** @type {?} */len = baseCtors.length; i < len; i++) {
        var /** @type {?} */baseCtor = baseCtors[i];
        var /** @type {?} */propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (var /** @type {?} */j = 0, /** @type {?} */len2 = propertyKeys.length; j < len2; j++) {
            var /** @type {?} */name = propertyKeys[j];
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        }
    }
}