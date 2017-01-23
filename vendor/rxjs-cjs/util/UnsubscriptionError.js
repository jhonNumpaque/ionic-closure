'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {\@link Subscription}.
 */
var UnsubscriptionError = exports.UnsubscriptionError = function (_Error) {
    _inherits(UnsubscriptionError, _Error);

    /**
     * @param {?} errors
     */
    function UnsubscriptionError(errors) {
        _classCallCheck(this, UnsubscriptionError);

        var _this = _possibleConstructorReturn(this, (UnsubscriptionError.__proto__ || Object.getPrototypeOf(UnsubscriptionError)).call(this));

        _this.errors = errors;
        var err = Error.call(_this, errors ? errors.length + ' errors occurred during unsubscription:\n  ' + errors.map(function (err, i) {
            return i + 1 + ') ' + err.toString();
        }).join('\n  ') : '');
        _this.name = err.name = 'UnsubscriptionError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return UnsubscriptionError;
}(Error);