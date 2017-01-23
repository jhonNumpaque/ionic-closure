'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports._catch = _catch;

var _OuterSubscriber2 = require('../OuterSubscriber');

var _subscribeToResult = require('../util/subscribeToResult');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 *  catch `selector` function.
 * @owner Observable
 * @this {?}
 * @param {?} selector
 * @return {?}
 */
function _catch(selector) {
    var /** @type {?} */operator = new CatchOperator(selector);
    var /** @type {?} */caught = this.lift(operator);
    return operator.caught = caught;
}

var CatchOperator = function () {
    /**
     * @param {?} selector
     */
    function CatchOperator(selector) {
        _classCallCheck(this, CatchOperator);

        this.selector = selector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */


    _createClass(CatchOperator, [{
        key: 'call',
        value: function call(subscriber, source) {
            return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
        }
    }]);

    return CatchOperator;
}();

function CatchOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    CatchOperator.prototype.caught;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */

var CatchSubscriber = function (_OuterSubscriber) {
    _inherits(CatchSubscriber, _OuterSubscriber);

    /**
     * @param {?} destination
     * @param {?} selector
     * @param {?} caught
     */
    function CatchSubscriber(destination, selector, caught) {
        _classCallCheck(this, CatchSubscriber);

        var _this = _possibleConstructorReturn(this, (CatchSubscriber.__proto__ || Object.getPrototypeOf(CatchSubscriber)).call(this, destination));

        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    /**
     * @param {?} err
     * @return {?}
     */


    _createClass(CatchSubscriber, [{
        key: 'error',
        value: function error(err) {
            if (!this.isStopped) {
                var /** @type {?} */result = void 0;
                try {
                    result = this.selector(err, this.caught);
                } catch (err) {
                    this.destination.error(err);
                    return;
                }
                this.unsubscribe();
                this.destination.remove(this);
                (0, _subscribeToResult.subscribeToResult)(this, result);
            }
        }
    }]);

    return CatchSubscriber;
}(_OuterSubscriber2.OuterSubscriber);