'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Set = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.minimalSetImpl = minimalSetImpl;

var _root = require('./root');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @return {?}
 */
function minimalSetImpl() {
    // THIS IS NOT a full impl of Set, this is just the minimum
    // bits of functionality we need for this library.
    return function () {
        function MinimalSet() {
            _classCallCheck(this, MinimalSet);

            this._values = [];
        }
        /**
         * @param {?} value
         * @return {?}
         */


        _createClass(MinimalSet, [{
            key: 'add',
            value: function add(value) {
                if (!this.has(value)) {
                    this._values.push(value);
                }
            }
            /**
             * @param {?} value
             * @return {?}
             */

        }, {
            key: 'has',
            value: function has(value) {
                return this._values.indexOf(value) !== -1;
            }
            /**
             * @return {?}
             */

        }, {
            key: 'clear',

            /**
             * @return {?}
             */
            value: function clear() {
                this._values.length = 0;
            }
        }, {
            key: 'size',
            get: function get() {
                return this._values.length;
            }
        }]);

        return MinimalSet;
    }();
}
var /** @type {?} */Set = exports.Set = _root.root.Set || minimalSetImpl();