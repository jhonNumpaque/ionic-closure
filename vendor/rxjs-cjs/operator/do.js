'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._do = _do;

var _Subscriber2 = require('../Subscriber');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {\@link map}
 * @see {\@link subscribe}
 *
 * callback for `next`.
 * specified Observer or callback(s) for each item.
 * @owner Observable
 * @this {?}
 * @param {?=} nextOrObserver
 * @param {?=} error
 * @param {?=} complete
 * @return {?}
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}

var DoOperator = function () {
    /**
     * @param {?=} nextOrObserver
     * @param {?=} error
     * @param {?=} complete
     */
    function DoOperator(nextOrObserver, error, complete) {
        _classCallCheck(this, DoOperator);

        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(DoOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
        }
    }]);

    return DoOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var DoSubscriber = function (_Subscriber) {
    _inherits(DoSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?=} nextOrObserver
     * @param {?=} error
     * @param {?=} complete
     */
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _classCallCheck(this, DoSubscriber);

        var _this = _possibleConstructorReturn(this, (DoSubscriber.__proto__ || Object.getPrototypeOf(DoSubscriber)).call(this, destination));

        var safeSubscriber = new _Subscriber2.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        _this.add(safeSubscriber);
        _this.safeSubscriber = safeSubscriber;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    _createClass(DoSubscriber, [{
        key: '_next',
        value: function _next(value) {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.next(value);
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.next(value);
            }
        }
        /**
         * @param {?} err
         * @return {?}
         */

    }, {
        key: '_error',
        value: function _error(err) {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.error(err);
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.error(err);
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: '_complete',
        value: function _complete() {
            var safeSubscriber = this.safeSubscriber;

            safeSubscriber.complete();
            if (safeSubscriber.syncErrorThrown) {
                this.destination.error(safeSubscriber.syncErrorValue);
            } else {
                this.destination.complete();
            }
        }
    }]);

    return DoSubscriber;
}(_Subscriber2.Subscriber);

function DoSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DoSubscriber.prototype.safeSubscriber;
}