'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PairsObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('../Observable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatch(state) {
    var obj = state.obj,
        keys = state.keys,
        length = state.length,
        index = state.index,
        subscriber = state.subscriber;

    if (index === length) {
        subscriber.complete();
        return;
    }
    var /** @type {?} */key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
}
/**
 * We need this JSDoc comment for affecting ESDoc.
\@extends {Ignored}
\@hide true
 */

var PairsObservable = exports.PairsObservable = function (_Observable) {
    _inherits(PairsObservable, _Observable);

    /**
     * @param {?} obj
     * @param {?=} scheduler
     */
    function PairsObservable(obj, scheduler) {
        _classCallCheck(this, PairsObservable);

        var _this = _possibleConstructorReturn(this, (PairsObservable.__proto__ || Object.getPrototypeOf(PairsObservable)).call(this));

        _this.obj = obj;
        _this.scheduler = scheduler;
        _this.keys = Object.keys(obj);
        return _this;
    }
    /**
     * Convert an object into an observable sequence of [key, value] pairs
    using an optional Scheduler to enumerate the object.
    
    \@example <caption>Converts a javascript object to an Observable</caption>
    var obj = {
      foo: 42,
      bar: 56,
      baz: 78
    };
    
    var source = Rx.Observable.pairs(obj);
    
    var subscription = source.subscribe(
      function (x) {
        console.log('Next: %s', x);
      },
      function (err) {
        console.log('Error: %s', err);
      },
      function () {
        console.log('Completed');
      });
    
    \@param {Object} obj The object to inspect and turn into an
    Observable sequence.
    \@param {Scheduler} [scheduler] An optional Scheduler to run the
    enumeration of the input sequence on.
    \@returns {(Observable<Array<string | T>>)} An observable sequence of
    [key, value] pairs from the object.
     * @param {?} obj
     * @param {?=} scheduler
     * @return {?}
     */


    _createClass(PairsObservable, [{
        key: '_subscribe',

        /**
         * @param {?} subscriber
         * @return {?}
         */
        value: function _subscribe(subscriber) {
            var keys = this.keys,
                scheduler = this.scheduler;

            var /** @type {?} */length = keys.length;
            if (scheduler) {
                return scheduler.schedule(dispatch, 0, {
                    obj: this.obj, keys: keys, length: length, index: 0, subscriber: subscriber
                });
            } else {
                for (var /** @type {?} */idx = 0; idx < length; idx++) {
                    var /** @type {?} */key = keys[idx];
                    subscriber.next([key, this.obj[key]]);
                }
                subscriber.complete();
            }
        }
    }], [{
        key: 'create',
        value: function create(obj, scheduler) {
            return new PairsObservable(obj, scheduler);
        }
    }]);

    return PairsObservable;
}(_Observable2.Observable);

function PairsObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    PairsObservable.prototype.keys;
}