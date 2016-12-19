import { root } from '../util/root';
/**
 * @param {?} root
 * @return {?}
 */
export function symbolIteratorPonyfill(root) {
    const /** @type {?} */ Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        const { Set } = root;
        if (Set && typeof new Set()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        const { Map } = root;
        // required for compatability with es6-shim
        if (Map) {
            let /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
                let /** @type {?} */ key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
export const /** @type {?} */ $$iterator = symbolIteratorPonyfill(root);
