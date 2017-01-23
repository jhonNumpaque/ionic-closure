'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {\@link Subject}
 * @see {\@link BehaviorSubject}
 *
 */
var ObjectUnsubscribedError = exports.ObjectUnsubscribedError = function (_Error) {
    _inherits(ObjectUnsubscribedError, _Error);

    function ObjectUnsubscribedError() {
        var _this;

        _classCallCheck(this, ObjectUnsubscribedError);

        var err = (_this = _possibleConstructorReturn(this, (ObjectUnsubscribedError.__proto__ || Object.getPrototypeOf(ObjectUnsubscribedError)).call(this, 'object unsubscribed')), _this);
        _this.name = err.name = 'ObjectUnsubscribedError';
        _this.stack = err.stack;
        _this.message = err.message;
        return _this;
    }

    return ObjectUnsubscribedError;
}(Error);