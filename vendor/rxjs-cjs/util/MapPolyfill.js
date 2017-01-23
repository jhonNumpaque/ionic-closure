"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapPolyfill = exports.MapPolyfill = function () {
    function MapPolyfill() {
        _classCallCheck(this, MapPolyfill);

        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    /**
     * @param {?} key
     * @return {?}
     */


    _createClass(MapPolyfill, [{
        key: "get",
        value: function get(key) {
            var /** @type {?} */i = this._keys.indexOf(key);
            return i === -1 ? undefined : this._values[i];
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */

    }, {
        key: "set",
        value: function set(key, value) {
            var /** @type {?} */i = this._keys.indexOf(key);
            if (i === -1) {
                this._keys.push(key);
                this._values.push(value);
                this.size++;
            } else {
                this._values[i] = value;
            }
            return this;
        }
        /**
         * @param {?} key
         * @return {?}
         */

    }, {
        key: "delete",
        value: function _delete(key) {
            var /** @type {?} */i = this._keys.indexOf(key);
            if (i === -1) {
                return false;
            }
            this._values.splice(i, 1);
            this._keys.splice(i, 1);
            this.size--;
            return true;
        }
        /**
         * @return {?}
         */

    }, {
        key: "clear",
        value: function clear() {
            this._keys.length = 0;
            this._values.length = 0;
            this.size = 0;
        }
        /**
         * @param {?} cb
         * @param {?} thisArg
         * @return {?}
         */

    }, {
        key: "forEach",
        value: function forEach(cb, thisArg) {
            for (var /** @type {?} */i = 0; i < this.size; i++) {
                cb.call(thisArg, this._values[i], this._keys[i]);
            }
        }
    }]);

    return MapPolyfill;
}();

function MapPolyfill_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolyfill.prototype.size;
    /** @type {?} */
    MapPolyfill.prototype._values;
    /** @type {?} */
    MapPolyfill.prototype._keys;
}