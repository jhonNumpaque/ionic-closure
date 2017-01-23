'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {\@link first}
 * @see {\@link last}
 * @see {\@link single}
 *
 */
var EmptyError = exports.EmptyError = function (_Error) {
    _inherits(EmptyError, _Error);

    function EmptyError() {
        var _this;

        _classCallCheck(this, EmptyError);

        var err = (_this = _possibleConstructorReturn(this, (EmptyError.__proto__ || Object.getPrototypeOf(EmptyError)).call(this, 'no elements in sequence')), _this);
        _this.name = err.name = 'EmptyError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return EmptyError;
}(Error);