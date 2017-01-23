'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsingObservable = undefined;

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
var UsingObservable = exports.UsingObservable = function (_Observable) {
    _inherits(UsingObservable, _Observable);

    /**
     * @param {?} resourceFactory
     * @param {?} observableFactory
     */
    function UsingObservable(resourceFactory, observableFactory) {
        _classCallCheck(this, UsingObservable);

        var _this = _possibleConstructorReturn(this, (UsingObservable.__proto__ || Object.getPrototypeOf(UsingObservable)).call(this));

        _this.resourceFactory = resourceFactory;
        _this.observableFactory = observableFactory;
        return _this;
    }
    /**
     * @param {?} resourceFactory
     * @param {?} observableFactory
     * @return {?}
     */


    _createClass(UsingObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var resourceFactory = this.resourceFactory,
                observableFactory = this.observableFactory;

            var /** @type {?} */resource = void 0;
            try {
                resource = resourceFactory();
                return new UsingSubscriber(subscriber, resource, observableFactory);
            } catch (err) {
                subscriber.error(err);
            }
        }
    }], [{
        key: 'create',
        value: function create(resourceFactory, observableFactory) {
            return new UsingObservable(resourceFactory, observableFactory);
        }
    }]);

    return UsingObservable;
}(_Observable2.Observable);

var UsingSubscriber = function (_OuterSubscriber) {
    _inherits(UsingSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} resource
     * @param {?} observableFactory
     */
    function UsingSubscriber(destination, resource, observableFactory) {
        _classCallCheck(this, UsingSubscriber);

        var _this2 = _possibleConstructorReturn(this, (UsingSubscriber.__proto__ || Object.getPrototypeOf(UsingSubscriber)).call(this, destination));

        _this2.resource = resource;
        _this2.observableFactory = observableFactory;
        destination.add(resource);
        _this2.tryUse();
        return _this2;
    }
    /**
     * @return {?}
     */


    _createClass(UsingSubscriber, [{
        key: 'tryUse',
        value: function tryUse() {
            try {
                var /** @type {?} */source = this.observableFactory.call(this, this.resource);
                if (source) {
                    this.add((0, _subscribeToResult.subscribeToResult)(this, source));
                }
            } catch (err) {
                this._error(err);
            }
        }
    }]);

    return UsingSubscriber;
}(_OuterSubscriber2.OuterSubscriber);