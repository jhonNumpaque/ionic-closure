'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when duetime elapses.

\@see {\@link timeout}

\@class TimeoutError
 */
var TimeoutError = exports.TimeoutError = function (_Error) {
    _inherits(TimeoutError, _Error);

    function TimeoutError() {
        var _this;

        _classCallCheck(this, TimeoutError);

        var err = (_this = _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'Timeout has occurred')), _this);
        _this.name = err.name = 'TimeoutError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return TimeoutError;
}(Error);