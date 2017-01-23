'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AnimationFrame = exports.RequestAnimationFrameDefinition = undefined;

var _root = require('./root');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestAnimationFrameDefinition =
/**
 * @param {?} root
 */
exports.RequestAnimationFrameDefinition = function RequestAnimationFrameDefinition(root) {
    _classCallCheck(this, RequestAnimationFrameDefinition);

    if (root.requestAnimationFrame) {
        this.cancelAnimationFrame = root.cancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.requestAnimationFrame.bind(root);
    } else if (root.mozRequestAnimationFrame) {
        this.cancelAnimationFrame = root.mozCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.mozRequestAnimationFrame.bind(root);
    } else if (root.webkitRequestAnimationFrame) {
        this.cancelAnimationFrame = root.webkitCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.webkitRequestAnimationFrame.bind(root);
    } else if (root.msRequestAnimationFrame) {
        this.cancelAnimationFrame = root.msCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.msRequestAnimationFrame.bind(root);
    } else if (root.oRequestAnimationFrame) {
        this.cancelAnimationFrame = root.oCancelAnimationFrame.bind(root);
        this.requestAnimationFrame = root.oRequestAnimationFrame.bind(root);
    } else {
        this.cancelAnimationFrame = root.clearTimeout.bind(root);
        this.requestAnimationFrame = function (cb) {
            return root.setTimeout(cb, 1000 / 60);
        };
    }
};

function RequestAnimationFrameDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    RequestAnimationFrameDefinition.prototype.cancelAnimationFrame;
    /** @type {?} */
    RequestAnimationFrameDefinition.prototype.requestAnimationFrame;
}
var /** @type {?} */AnimationFrame = exports.AnimationFrame = new RequestAnimationFrameDefinition(_root.root);