'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * We need this JSDoc comment for affecting ESDoc.
 */
var ErrorObservable = exports.ErrorObservable = function (_Observable) {
    _inherits(ErrorObservable, _Observable);

    /**
     * @param {?} error
     * @param {?=} scheduler
     */
    function ErrorObservable(error, scheduler) {
        _classCallCheck(this, ErrorObservable);

        var _this = _possibleConstructorReturn(this, (ErrorObservable.__proto__ || Object.getPrototypeOf(ErrorObservable)).call(this));

        _this.error = error;
        _this.scheduler = scheduler;
        return _this;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * <img src="./img/throw.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {\@link mergeMap}.
     *
     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x === 13 ?
     *     Rx.Observable.throw('Thirteens are bad') :
     *     Rx.Observable.of('a', 'b', 'c')
     * );
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link create}
     * @see {\@link empty}
     * @see {\@link never}
     * @see {\@link of}
     *
     * the emission of the error notification.
     * using the given error argument.
     * @owner Observable
     * @param {?} error
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(ErrorObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var /** @type {?} */error = this.error;
            var /** @type {?} */scheduler = this.scheduler;
            if (scheduler) {
                return scheduler.schedule(ErrorObservable.dispatch, 0, {
                    error: error, subscriber: subscriber
                });
            } else {
                subscriber.error(error);
            }
        }
    }], [{
        key: 'create',
        value: function create(error, scheduler) {
            return new ErrorObservable(error, scheduler);
        }
        /**
         * @param {?} arg
         * @return {?}
         */

    }, {
        key: 'dispatch',
        value: function dispatch(arg) {
            var error = arg.error,
                subscriber = arg.subscriber;

            subscriber.error(error);
        }
    }]);

    return ErrorObservable;
}(_Observable2.Observable);