'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeferObservable = undefined;

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
var DeferObservable = exports.DeferObservable = function (_Observable) {
    _inherits(DeferObservable, _Observable);

    /**
     * @param {?} observableFactory
     */
    function DeferObservable(observableFactory) {
        _classCallCheck(this, DeferObservable);

        var _this = _possibleConstructorReturn(this, (DeferObservable.__proto__ || Object.getPrototypeOf(DeferObservable)).call(this));

        _this.observableFactory = observableFactory;
        return _this;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {\@link create}
     *
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * an invocation of the given Observable factory function.
     * @owner Observable
     * @param {?} observableFactory
     * @return {?}
     */


    _createClass(DeferObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            return new DeferSubscriber(subscriber, this.observableFactory);
        }
    }], [{
        key: 'create',
        value: function create(observableFactory) {
            return new DeferObservable(observableFactory);
        }
    }]);

    return DeferObservable;
}(_Observable2.Observable);

var DeferSubscriber = function (_OuterSubscriber) {
    _inherits(DeferSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} factory
     */
    function DeferSubscriber(destination, factory) {
        _classCallCheck(this, DeferSubscriber);

        var _this2 = _possibleConstructorReturn(this, (DeferSubscriber.__proto__ || Object.getPrototypeOf(DeferSubscriber)).call(this, destination));

        _this2.factory = factory;
        _this2.tryDefer();
        return _this2;
    }
    /**
     * @return {?}
     */


    _createClass(DeferSubscriber, [{
        key: 'tryDefer',
        value: function tryDefer() {
            try {
                this._callFactory();
            } catch (err) {
                this._error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_callFactory',
        value: function _callFactory() {
            var /** @type {?} */result = this.factory();
            if (result) {
                this.add((0, _subscribeToResult.subscribeToResult)(this, result));
            }
        }
    }]);

    return DeferSubscriber;
}(_OuterSubscriber2.OuterSubscriber);