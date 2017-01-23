'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.repeat = repeat;

var _Subscriber2 = require('../Subscriber');

var _EmptyObservable = require('../observable/EmptyObservable');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
 * on a particular Scheduler.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * an empty Observable.
 * count times.
 * @owner Observable
 * @this {?}
 * @param {?=} count
 * @return {?}
 */
function repeat() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    if (count === 0) {
        return new _EmptyObservable.EmptyObservable();
    } else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    } else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}

var RepeatOperator = function () {
    /**
     * @param {?} count
     * @param {?} source
     */
    function RepeatOperator(count, source) {
        _classCallCheck(this, RepeatOperator);

        this.count = count;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(RepeatOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
        }
    }]);

    return RepeatOperator;
}();
/**
 * We need this JSDoc comment for affecting ESDoc.
 */


var RepeatSubscriber = function (_Subscriber) {
    _inherits(RepeatSubscriber, _Subscriber);

    /**
     * @param {?} destination
     * @param {?} count
     * @param {?} source
     */
    function RepeatSubscriber(destination, count, source) {
        _classCallCheck(this, RepeatSubscriber);

        var _this = _possibleConstructorReturn(this, (RepeatSubscriber.__proto__ || Object.getPrototypeOf(RepeatSubscriber)).call(this, destination));

        _this.count = count;
        _this.source = source;
        return _this;
    }
    /**
     * @return {?}
     */


    _createClass(RepeatSubscriber, [{
        key: 'complete',
        value: function complete() {
            if (!this.isStopped) {
                var source = this.source,
                    count = this.count;

                if (count === 0) {
                    return _get(RepeatSubscriber.prototype.__proto__ || Object.getPrototypeOf(RepeatSubscriber.prototype), 'complete', this).call(this);
                } else if (count > -1) {
                    this.count = count - 1;
                }
                this.unsubscribe();
                this.isStopped = false;
                this.closed = false;
                source.subscribe(this);
            }
        }
    }]);

    return RepeatSubscriber;
}(_Subscriber2.Subscriber);