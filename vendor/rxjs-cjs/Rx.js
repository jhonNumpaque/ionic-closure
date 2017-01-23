'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Symbol = exports.Scheduler = exports.AjaxTimeoutError = exports.AjaxError = exports.AjaxResponse = exports.VirtualTimeScheduler = exports.TestScheduler = exports.Timestamp = exports.TimeInterval = exports.UnsubscriptionError = exports.TimeoutError = exports.ObjectUnsubscribedError = exports.ArgumentOutOfRangeError = exports.EmptyError = exports.Notification = exports.ConnectableObservable = exports.BehaviorSubject = exports.ReplaySubject = exports.AsyncSubject = exports.Subscriber = exports.Subscription = exports.Observable = exports.AnonymousSubject = exports.Subject = undefined;

var _Subject = require('./Subject');

Object.defineProperty(exports, 'Subject', {
  enumerable: true,
  get: function get() {
    return _Subject.Subject;
  }
});
Object.defineProperty(exports, 'AnonymousSubject', {
  enumerable: true,
  get: function get() {
    return _Subject.AnonymousSubject;
  }
});

var _Observable = require('./Observable');

Object.defineProperty(exports, 'Observable', {
  enumerable: true,
  get: function get() {
    return _Observable.Observable;
  }
});

var _Subscription = require('./Subscription');

Object.defineProperty(exports, 'Subscription', {
  enumerable: true,
  get: function get() {
    return _Subscription.Subscription;
  }
});

var _Subscriber = require('./Subscriber');

Object.defineProperty(exports, 'Subscriber', {
  enumerable: true,
  get: function get() {
    return _Subscriber.Subscriber;
  }
});

var _AsyncSubject = require('./AsyncSubject');

Object.defineProperty(exports, 'AsyncSubject', {
  enumerable: true,
  get: function get() {
    return _AsyncSubject.AsyncSubject;
  }
});

var _ReplaySubject = require('./ReplaySubject');

Object.defineProperty(exports, 'ReplaySubject', {
  enumerable: true,
  get: function get() {
    return _ReplaySubject.ReplaySubject;
  }
});

var _BehaviorSubject = require('./BehaviorSubject');

Object.defineProperty(exports, 'BehaviorSubject', {
  enumerable: true,
  get: function get() {
    return _BehaviorSubject.BehaviorSubject;
  }
});

var _ConnectableObservable = require('./observable/ConnectableObservable');

Object.defineProperty(exports, 'ConnectableObservable', {
  enumerable: true,
  get: function get() {
    return _ConnectableObservable.ConnectableObservable;
  }
});

var _Notification = require('./Notification');

Object.defineProperty(exports, 'Notification', {
  enumerable: true,
  get: function get() {
    return _Notification.Notification;
  }
});

var _EmptyError = require('./util/EmptyError');

Object.defineProperty(exports, 'EmptyError', {
  enumerable: true,
  get: function get() {
    return _EmptyError.EmptyError;
  }
});

var _ArgumentOutOfRangeError = require('./util/ArgumentOutOfRangeError');

Object.defineProperty(exports, 'ArgumentOutOfRangeError', {
  enumerable: true,
  get: function get() {
    return _ArgumentOutOfRangeError.ArgumentOutOfRangeError;
  }
});

var _ObjectUnsubscribedError = require('./util/ObjectUnsubscribedError');

Object.defineProperty(exports, 'ObjectUnsubscribedError', {
  enumerable: true,
  get: function get() {
    return _ObjectUnsubscribedError.ObjectUnsubscribedError;
  }
});

var _TimeoutError = require('./util/TimeoutError');

Object.defineProperty(exports, 'TimeoutError', {
  enumerable: true,
  get: function get() {
    return _TimeoutError.TimeoutError;
  }
});

var _UnsubscriptionError = require('./util/UnsubscriptionError');

Object.defineProperty(exports, 'UnsubscriptionError', {
  enumerable: true,
  get: function get() {
    return _UnsubscriptionError.UnsubscriptionError;
  }
});

var _timeInterval = require('./operator/timeInterval');

Object.defineProperty(exports, 'TimeInterval', {
  enumerable: true,
  get: function get() {
    return _timeInterval.TimeInterval;
  }
});

var _timestamp = require('./operator/timestamp');

Object.defineProperty(exports, 'Timestamp', {
  enumerable: true,
  get: function get() {
    return _timestamp.Timestamp;
  }
});

var _TestScheduler = require('./testing/TestScheduler');

Object.defineProperty(exports, 'TestScheduler', {
  enumerable: true,
  get: function get() {
    return _TestScheduler.TestScheduler;
  }
});

var _VirtualTimeScheduler = require('./scheduler/VirtualTimeScheduler');

Object.defineProperty(exports, 'VirtualTimeScheduler', {
  enumerable: true,
  get: function get() {
    return _VirtualTimeScheduler.VirtualTimeScheduler;
  }
});

var _AjaxObservable = require('./observable/dom/AjaxObservable');

Object.defineProperty(exports, 'AjaxResponse', {
  enumerable: true,
  get: function get() {
    return _AjaxObservable.AjaxResponse;
  }
});
Object.defineProperty(exports, 'AjaxError', {
  enumerable: true,
  get: function get() {
    return _AjaxObservable.AjaxError;
  }
});
Object.defineProperty(exports, 'AjaxTimeoutError', {
  enumerable: true,
  get: function get() {
    return _AjaxObservable.AjaxTimeoutError;
  }
});

require('./add/observable/bindCallback');

require('./add/observable/bindNodeCallback');

require('./add/observable/combineLatest');

require('./add/observable/concat');

require('./add/observable/defer');

require('./add/observable/empty');

require('./add/observable/forkJoin');

require('./add/observable/from');

require('./add/observable/fromEvent');

require('./add/observable/fromEventPattern');

require('./add/observable/fromPromise');

require('./add/observable/generate');

require('./add/observable/if');

require('./add/observable/interval');

require('./add/observable/merge');

require('./add/observable/race');

require('./add/observable/never');

require('./add/observable/of');

require('./add/observable/onErrorResumeNext');

require('./add/observable/pairs');

require('./add/observable/range');

require('./add/observable/using');

require('./add/observable/throw');

require('./add/observable/timer');

require('./add/observable/zip');

require('./add/observable/dom/ajax');

require('./add/observable/dom/webSocket');

require('./add/operator/buffer');

require('./add/operator/bufferCount');

require('./add/operator/bufferTime');

require('./add/operator/bufferToggle');

require('./add/operator/bufferWhen');

require('./add/operator/catch');

require('./add/operator/combineAll');

require('./add/operator/combineLatest');

require('./add/operator/concat');

require('./add/operator/concatAll');

require('./add/operator/concatMap');

require('./add/operator/concatMapTo');

require('./add/operator/count');

require('./add/operator/dematerialize');

require('./add/operator/debounce');

require('./add/operator/debounceTime');

require('./add/operator/defaultIfEmpty');

require('./add/operator/delay');

require('./add/operator/delayWhen');

require('./add/operator/distinct');

require('./add/operator/distinctUntilChanged');

require('./add/operator/distinctUntilKeyChanged');

require('./add/operator/do');

require('./add/operator/exhaust');

require('./add/operator/exhaustMap');

require('./add/operator/expand');

require('./add/operator/elementAt');

require('./add/operator/filter');

require('./add/operator/finally');

require('./add/operator/find');

require('./add/operator/findIndex');

require('./add/operator/first');

require('./add/operator/groupBy');

require('./add/operator/ignoreElements');

require('./add/operator/isEmpty');

require('./add/operator/audit');

require('./add/operator/auditTime');

require('./add/operator/last');

require('./add/operator/let');

require('./add/operator/every');

require('./add/operator/map');

require('./add/operator/mapTo');

require('./add/operator/materialize');

require('./add/operator/max');

require('./add/operator/merge');

require('./add/operator/mergeAll');

require('./add/operator/mergeMap');

require('./add/operator/mergeMapTo');

require('./add/operator/mergeScan');

require('./add/operator/min');

require('./add/operator/multicast');

require('./add/operator/observeOn');

require('./add/operator/onErrorResumeNext');

require('./add/operator/pairwise');

require('./add/operator/partition');

require('./add/operator/pluck');

require('./add/operator/publish');

require('./add/operator/publishBehavior');

require('./add/operator/publishReplay');

require('./add/operator/publishLast');

require('./add/operator/race');

require('./add/operator/reduce');

require('./add/operator/repeat');

require('./add/operator/repeatWhen');

require('./add/operator/retry');

require('./add/operator/retryWhen');

require('./add/operator/sample');

require('./add/operator/sampleTime');

require('./add/operator/scan');

require('./add/operator/sequenceEqual');

require('./add/operator/share');

require('./add/operator/single');

require('./add/operator/skip');

require('./add/operator/skipUntil');

require('./add/operator/skipWhile');

require('./add/operator/startWith');

require('./add/operator/subscribeOn');

require('./add/operator/switch');

require('./add/operator/switchMap');

require('./add/operator/switchMapTo');

require('./add/operator/take');

require('./add/operator/takeLast');

require('./add/operator/takeUntil');

require('./add/operator/takeWhile');

require('./add/operator/throttle');

require('./add/operator/throttleTime');

require('./add/operator/timeInterval');

require('./add/operator/timeout');

require('./add/operator/timeoutWith');

require('./add/operator/timestamp');

require('./add/operator/toArray');

require('./add/operator/toPromise');

require('./add/operator/window');

require('./add/operator/windowCount');

require('./add/operator/windowTime');

require('./add/operator/windowToggle');

require('./add/operator/windowWhen');

require('./add/operator/withLatestFrom');

require('./add/operator/zip');

require('./add/operator/zipAll');

var _asap = require('./scheduler/asap');

var _async = require('./scheduler/async');

var _queue = require('./scheduler/queue');

var _animationFrame = require('./scheduler/animationFrame');

var _rxSubscriber = require('./symbol/rxSubscriber');

var _iterator = require('./symbol/iterator');

var _observable = require('./symbol/observable');

/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which uses the
 * fastest transport mechanism available, either Node.js' `process.nextTick()`
 * or Web Worker MessageChannel or setTimeout or others. Use this for
 * asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 * @property {Scheduler} animationFrame Schedules work with `requestAnimationFrame`.
 * Use this for synchronizing with the platform's painting
 */
var /** @type {?} */Scheduler = {
  asap: _asap.asap,
  queue: _queue.queue,
  animationFrame: _animationFrame.animationFrame,
  async: _async.async
};
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
var /** @type {?} */_Symbol = {
  rxSubscriber: _rxSubscriber.$$rxSubscriber,
  observable: _observable.$$observable,
  iterator: _iterator.$$iterator
};
exports.Scheduler = Scheduler;
exports.Symbol = _Symbol;