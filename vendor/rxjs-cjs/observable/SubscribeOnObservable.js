'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubscribeOnObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

var _asap = require('../scheduler/asap');

var _isNumeric = require('../util/isNumeric');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var SubscribeOnObservable = exports.SubscribeOnObservable = function (_Observable) {
    _inherits(SubscribeOnObservable, _Observable);

    /**
     * @param {?} source
     * @param {?=} delayTime
     * @param {?=} scheduler
     */
    function SubscribeOnObservable(source) {
        var delayTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _asap.asap;

        _classCallCheck(this, SubscribeOnObservable);

        var _this = _possibleConstructorReturn(this, (SubscribeOnObservable.__proto__ || Object.getPrototypeOf(SubscribeOnObservable)).call(this));

        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!(0, _isNumeric.isNumeric)(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = _asap.asap;
        }
        return _this;
    }
    /**
     * @param {?} source
     * @param {?=} delay
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(SubscribeOnObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */delay = this.delayTime;
            var /** @type {?} */source = this.source;
            var /** @type {?} */scheduler = this.scheduler;
            return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
                source: source, subscriber: subscriber
            });
        }
    }], [{
        key: 'create',
        value: function create(source) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var scheduler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _asap.asap;

            return new SubscribeOnObservable(source, delay, scheduler);
        }
        /**
         * @this {?}
         * @param {?} arg
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(arg) {
            var source = arg.source,
                subscriber = arg.subscriber;

            return this.add(source.subscribe(subscriber));
        }
    }]);

    return SubscribeOnObservable;
}(_Observable2.Observable);