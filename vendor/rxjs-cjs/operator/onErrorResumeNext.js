'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onErrorResumeNext = onErrorResumeNext;
exports.onErrorResumeNextStatic = onErrorResumeNextStatic;

var _FromObservable = require('../observable/FromObservable');

var _isArray = require('../util/isArray');

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @this {?}
 * @param {...?} nextSources
 * @return {?}
 */
function onErrorResumeNext() {
    for (var _len = arguments.length, nextSources = Array(_len), _key = 0; _key < _len; _key++) {
        nextSources[_key] = arguments[_key];
    }

    if (nextSources.length === 1 && (0, _isArray.isArray)(nextSources[0])) {
        nextSources = nextSources[0];
    }
    return this.lift(new OnErrorResumeNextOperator(nextSources));
}
/**
 * @param {...?} nextSources
 * @return {?}
 */
function onErrorResumeNextStatic() {
    for (var _len2 = arguments.length, nextSources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextSources[_key2] = arguments[_key2];
    }

    var /** @type {?} */source = null;
    if (nextSources.length === 1 && (0, _isArray.isArray)(nextSources[0])) {
        nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return new _FromObservable.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}

var OnErrorResumeNextOperator = function () {
    /**
     * @param {?} nextSources
     */
    function OnErrorResumeNextOperator(nextSources) {
        _classCallCheck(this, OnErrorResumeNextOperator);

        this.nextSources = nextSources;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(OnErrorResumeNextOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
        }
    }]);

    return OnErrorResumeNextOperator;
}();

var OnErrorResumeNextSubscriber = function (_OuterSubscriber) {
    _inherits(OnErrorResumeNextSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} nextSources
     */
    function OnErrorResumeNextSubscriber(destination, nextSources) {
        _classCallCheck(this, OnErrorResumeNextSubscriber);

        var _this = _possibleConstructorReturn(this, (OnErrorResumeNextSubscriber.__proto__ || Object.getPrototypeOf(OnErrorResumeNextSubscriber)).call(this, destination));

        _this.destination = destination;
        _this.nextSources = nextSources;
        return _this;
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */


    _createClass(OnErrorResumeNextSubscriber, [{
        key: 'notifyError',
        value: function notifyError(error, innerSub) {
            this.subscribeToNextSource();
        }
        /**
         * @param {?} innerSub
         * @return {?}
         */

    }, {
        key: 'notifyComplete',
        value: function notifyComplete(innerSub) {
            this.subscribeToNextSource();
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            this.subscribeToNextSource();
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            this.subscribeToNextSource();
        }
        /**
         * @return {?}
         */

    }, {
        key: 'subscribeToNextSource',
        value: function subscribeToNextSource() {
            var /** @type {?} */next = this.nextSources.shift();
            if (next) {
                this.add((0, _subscribeToResult.subscribeToResult)(this, next));
            } else {
                this.destination.complete();
            }
        }
    }]);

    return OnErrorResumeNextSubscriber;
}(_OuterSubscriber2.OuterSubscriber);