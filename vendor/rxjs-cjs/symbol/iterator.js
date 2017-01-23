'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$iterator = undefined;
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;

var _root = require('../util/root');

/**
 * @param {?} root
 * @return {?}
 */
function symbolIteratorPonyfill(root) {
    var /** @type {?} */_Symbol = root.Symbol;
    if (typeof _Symbol === 'function') {
        if (!_Symbol.iterator) {
            _Symbol.iterator = _Symbol('iterator polyfill');
        }
        return _Symbol.iterator;
    } else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var _Set = root.Set;

        if (_Set && typeof new _Set()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var _Map = root.Map;
        // required for compatability with es6-shim

        if (_Map) {
            var /** @type {?} */keys = Object.getOwnPropertyNames(_Map.prototype);
            for (var /** @type {?} */i = 0; i < keys.length; ++i) {
                var /** @type {?} */key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && _Map.prototype[key] === _Map.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
var /** @type {?} */$$iterator = exports.$$iterator = symbolIteratorPonyfill(_root.root);