'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Immediate = exports.ImmediateDefinition = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


var _root = require('./root');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImmediateDefinition = exports.ImmediateDefinition = function () {
    /**
     * @param {?} root
     */
    function ImmediateDefinition(root) {
        _classCallCheck(this, ImmediateDefinition);

        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        } else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            } else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            } else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            } else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            } else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            var ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    /**
     * @param {?} o
     * @return {?}
     */


    _createClass(ImmediateDefinition, [{
        key: 'identify',
        value: function identify(o) {
            return this.root.Object.prototype.toString.call(o);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'canUseProcessNextTick',
        value: function canUseProcessNextTick() {
            return this.identify(this.root.process) === '[object process]';
        }
        /**
         * @return {?}
         */

    }, {
        key: 'canUseMessageChannel',
        value: function canUseMessageChannel() {
            return Boolean(this.root.MessageChannel);
        }
        /**
         * @return {?}
         */

    }, {
        key: 'canUseReadyStateChange',
        value: function canUseReadyStateChange() {
            var /** @type {?} */document = this.root.document;
            return Boolean(document && 'onreadystatechange' in document.createElement('script'));
        }
        /**
         * @return {?}
         */

    }, {
        key: 'canUsePostMessage',
        value: function canUsePostMessage() {
            var /** @type {?} */root = this.root;
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `root.postMessage` means something completely different and can't be used for this purpose.
            if (root.postMessage && !root.importScripts) {
                var /** @type {?} */postMessageIsAsynchronous = true;
                var /** @type {?} */oldOnMessage = root.onmessage;
                root.onmessage = function () {
                    postMessageIsAsynchronous = false;
                };
                root.postMessage('', '*');
                root.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
            return false;
        }
        /**
         * @param {?} handler
         * @param {...?} args
         * @return {?}
         */

    }, {
        key: 'partiallyApplied',
        value: function partiallyApplied(handler) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var /** @type {?} */fn = function result() {
                var handler = result.handler,
                    args = result.args;

                if (typeof handler === 'function') {
                    handler.apply(undefined, args);
                } else {
                    new Function('' + handler)();
                }
            };
            fn.handler = handler;
            fn.args = args;
            return fn;
        }
        /**
         * @param {?} args
         * @return {?}
         */

    }, {
        key: 'addFromSetImmediateArguments',
        value: function addFromSetImmediateArguments(args) {
            this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
            return this.nextHandle++;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createProcessNextTickSetImmediate',
        value: function createProcessNextTickSetImmediate() {
            var /** @type {?} */fn = function setImmediate() {
                var instance = setImmediate.instance;

                var /** @type {?} */handle = instance.addFromSetImmediateArguments(arguments);
                instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
                return handle;
            };
            fn.instance = this;
            return fn;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createPostMessageSetImmediate',
        value: function createPostMessageSetImmediate() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
            var /** @type {?} */root = this.root;
            var /** @type {?} */messagePrefix = 'setImmediate$' + root.Math.random() + '$';
            var /** @type {?} */onGlobalMessage = function globalMessageHandler(event) {
                var /** @type {?} */instance = globalMessageHandler.instance;
                if (event.source === root && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
                    instance.runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };
            onGlobalMessage.instance = this;
            root.addEventListener('message', onGlobalMessage, false);
            var /** @type {?} */fn = function setImmediate() {
                var messagePrefix = setImmediate.messagePrefix,
                    instance = setImmediate.instance;

                var /** @type {?} */handle = instance.addFromSetImmediateArguments(arguments);
                instance.root.postMessage(messagePrefix + handle, '*');
                return handle;
            };
            fn.instance = this;
            fn.messagePrefix = messagePrefix;
            return fn;
        }
        /**
         * @param {?} handle
         * @return {?}
         */

    }, {
        key: 'runIfPresent',
        value: function runIfPresent(handle) {
            // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
            // So if we're currently running a task, we'll need to delay this invocation.
            if (this.currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // 'too much recursion' error.
                this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
            } else {
                var /** @type {?} */task = this.tasksByHandle[handle];
                if (task) {
                    this.currentlyRunningATask = true;
                    try {
                        task();
                    } finally {
                        this.clearImmediate(handle);
                        this.currentlyRunningATask = false;
                    }
                }
            }
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createMessageChannelSetImmediate',
        value: function createMessageChannelSetImmediate() {
            var _this = this;

            var /** @type {?} */channel = new this.root.MessageChannel();
            channel.port1.onmessage = function (event) {
                var /** @type {?} */handle = event.data;
                _this.runIfPresent(handle);
            };
            var /** @type {?} */fn = function setImmediate() {
                var channel = setImmediate.channel,
                    instance = setImmediate.instance;

                var /** @type {?} */handle = instance.addFromSetImmediateArguments(arguments);
                channel.port2.postMessage(handle);
                return handle;
            };
            fn.channel = channel;
            fn.instance = this;
            return fn;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createReadyStateChangeSetImmediate',
        value: function createReadyStateChangeSetImmediate() {
            var /** @type {?} */fn = function setImmediate() {
                var /** @type {?} */instance = setImmediate.instance;
                var /** @type {?} */root = instance.root;
                var /** @type {?} */doc = root.document;
                var /** @type {?} */html = doc.documentElement;
                var /** @type {?} */handle = instance.addFromSetImmediateArguments(arguments);
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var /** @type {?} */script = doc.createElement('script');
                script.onreadystatechange = function () {
                    instance.runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
                return handle;
            };
            fn.instance = this;
            return fn;
        }
        /**
         * @return {?}
         */

    }, {
        key: 'createSetTimeoutSetImmediate',
        value: function createSetTimeoutSetImmediate() {
            var /** @type {?} */fn = function setImmediate() {
                var /** @type {?} */instance = setImmediate.instance;
                var /** @type {?} */handle = instance.addFromSetImmediateArguments(arguments);
                instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
                return handle;
            };
            fn.instance = this;
            return fn;
        }
    }]);

    return ImmediateDefinition;
}();

function ImmediateDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    ImmediateDefinition.prototype.setImmediate;
    /** @type {?} */
    ImmediateDefinition.prototype.clearImmediate;
    /** @type {?} */
    ImmediateDefinition.prototype.tasksByHandle;
    /** @type {?} */
    ImmediateDefinition.prototype.nextHandle;
    /** @type {?} */
    ImmediateDefinition.prototype.currentlyRunningATask;
}
var /** @type {?} */Immediate = exports.Immediate = new ImmediateDefinition(_root.root);