'use strict';

var _Observable = require('../../Observable');

var _mergeMapTo = require('../../operator/mergeMapTo');

_Observable.Observable.prototype.flatMapTo = _mergeMapTo.mergeMapTo;
_Observable.Observable.prototype.mergeMapTo = _mergeMapTo.mergeMapTo;