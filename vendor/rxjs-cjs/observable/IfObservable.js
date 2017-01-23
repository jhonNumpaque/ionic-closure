'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IfObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _subscribeToResult = require('../util/subscribeToResult');

var _OuterSubscriber2 = require('../OuterSubscriber');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var IfObservable = exports.IfObservable = function (_Observable) {
    _inherits(IfObservable, _Observable);

    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    function IfObservable(condition, thenSource, elseSource) {
        _classCallCheck(this, IfObservable);

        var _this = _possibleConstructorReturn(this, (IfObservable.__proto__ || Object.getPrototypeOf(IfObservable)).call(this));

        _this.condition = condition;
        _this.thenSource = thenSource;
        _this.elseSource = elseSource;
        return _this;
    }
    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     * @return {?}
     */


    _createClass(IfObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var condition = this.condition,
                thenSource = this.thenSource,
                elseSource = this.elseSource;

            return new IfSubscriber(subscriber, condition, thenSource, elseSource);
        }
    }], [{
        key: 'create',
        value: function create(condition, thenSource, elseSource) {
            return new IfObservable(condition, thenSource, elseSource);
        }
    }]);

    return IfObservable;
}(_Observable2.Observable);

var IfSubscriber = function (_OuterSubscriber) {
    _inherits(IfSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    function IfSubscriber(destination, condition, thenSource, elseSource) {
        _classCallCheck(this, IfSubscriber);

        var _this2 = _possibleConstructorReturn(this, (IfSubscriber.__proto__ || Object.getPrototypeOf(IfSubscriber)).call(this, destination));

        _this2.condition = condition;
        _this2.thenSource = thenSource;
        _this2.elseSource = elseSource;
        _this2.tryIf();
        return _this2;
    }
    /**
     * @return {?}
     */


    _createClass(IfSubscriber, [{
        key: 'tryIf',
        value: function tryIf() {
            var condition = this.condition,
                thenSource = this.thenSource,
                elseSource = this.elseSource;

            var /** @type {?} */result = void 0;
            try {
                result = condition();
                var /** @type {?} */source = result ? thenSource : elseSource;
                if (source) {
                    this.add((0, _subscribeToResult.subscribeToResult)(this, source));
                } else {
                    this._complete();
                }
            } catch (err) {
                this._error(err);
            }
        }
    }]);

    return IfSubscriber;
}(_OuterSubscriber2.OuterSubscriber);