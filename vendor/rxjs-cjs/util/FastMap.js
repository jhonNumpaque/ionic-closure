"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FastMap = exports.FastMap = function () {
    function FastMap() {
        _classCallCheck(this, FastMap);

        this.values = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */


    _createClass(FastMap, [{
        key: "delete",
        value: function _delete(key) {
            this.values[key] = null;
            return true;
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */

    }, {
        key: "set",
        value: function set(key, value) {
            this.values[key] = value;
            return this;
        }
        /**
         * @param {?} key
         * @return {?}
         */

    }, {
        key: "get",
        value: function get(key) {
            return this.values[key];
        }
        /**
         * @param {?} cb
         * @param {?=} thisArg
         * @return {?}
         */

    }, {
        key: "forEach",
        value: function forEach(cb, thisArg) {
            var /** @type {?} */values = this.values;
            for (var /** @type {?} */key in values) {
                if (values.hasOwnProperty(key) && values[key] !== null) {
                    cb.call(thisArg, values[key], key);
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: "clear",
        value: function clear() {
            this.values = {};
        }
    }]);

    return FastMap;
}();

function FastMap_tsickle_Closure_declarations() {
    /** @type {?} */
    FastMap.prototype.values;
}