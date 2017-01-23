'use strict';

var _Observable = require('../../Observable');

var _switchMap = require('../../operator/switchMap');

_Observable.Observable.prototype.switchMap = _switchMap.switchMap;