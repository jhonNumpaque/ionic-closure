'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$$observable = undefined;
exports.getSymbolObservable = getSymbolObservable;

var _root = require('../util/root');

/**
 * @param {?} context
 * @return {?}
 */
function getSymbolObservable(context) {
    var /** @type {?} */$$observable = void 0;
    var /** @type {?} */_Symbol = context.Symbol;
    if (typeof _Symbol === 'function') {
        if (_Symbol.observable) {
            $$observable = _Symbol.observable;
        } else {
            $$observable = _Symbol('observable');
            _Symbol.observable = $$observable;
        }
    } else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var /** @type {?} */$$observable = exports.$$observable = getSymbolObservable(_root.root);