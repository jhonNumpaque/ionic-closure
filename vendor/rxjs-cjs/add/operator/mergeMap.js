'use strict';

var _Observable = require('../../Observable');

var _mergeMap = require('../../operator/mergeMap');

_Observable.Observable.prototype.mergeMap = _mergeMap.mergeMap;
_Observable.Observable.prototype.flatMap = _mergeMap.mergeMap;