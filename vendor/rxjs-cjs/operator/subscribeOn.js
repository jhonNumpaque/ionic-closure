'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.subscribeOn = subscribeOn;

var _SubscribeOnObservable = require('../observable/SubscribeOnObservable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * .
 * @owner Observable
 * @this {?}
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
function subscribeOn(scheduler) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return this.lift(new SubscribeOnOperator(scheduler, delay));
}

var SubscribeOnOperator = function () {
    /**
     * @param {?} scheduler
     * @param {?} delay
     */
    function SubscribeOnOperator(scheduler, delay) {
        _classCallCheck(this, SubscribeOnOperator);

        this.scheduler = scheduler;
        this.delay = delay;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(SubscribeOnOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return new _SubscribeOnObservable.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
        }
    }]);

    return SubscribeOnOperator;
}();