'use strict';

var _Observable = require('../../Observable');

var _concatMap = require('../../operator/concatMap');

_Observable.Observable.prototype.concatMap = _concatMap.concatMap;