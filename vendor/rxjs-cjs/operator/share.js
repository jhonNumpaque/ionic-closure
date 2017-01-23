'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.share = share;

var _multicast = require('./multicast');

var _Subject = require('../Subject');

/**
 * @return {?}
 */
function shareSubjectFactory() {
  return new _Subject.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .publish().refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @owner Observable
 * @this {?}
 * @return {?}
 */
function share() {
  return _multicast.multicast.call(this, shareSubjectFactory).refCount();
}
;