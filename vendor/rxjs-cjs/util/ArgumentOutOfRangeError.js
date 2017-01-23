'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {\@link elementAt}
 * @see {\@link take}
 * @see {\@link takeLast}
 *
 */
var ArgumentOutOfRangeError = exports.ArgumentOutOfRangeError = function (_Error) {
    _inherits(ArgumentOutOfRangeError, _Error);

    function ArgumentOutOfRangeError() {
        var _this;

        _classCallCheck(this, ArgumentOutOfRangeError);

        var err = (_this = _possibleConstructorReturn(this, (ArgumentOutOfRangeError.__proto__ || Object.getPrototypeOf(ArgumentOutOfRangeError)).call(this, 'argument out of range')), _this);
        _this.name = err.name = 'ArgumentOutOfRangeError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return ArgumentOutOfRangeError;
}(Error);