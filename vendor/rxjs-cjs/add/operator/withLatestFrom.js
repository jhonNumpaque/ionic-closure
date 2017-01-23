'use strict';

var _Observable = require('../../Observable');

var _withLatestFrom = require('../../operator/withLatestFrom');

_Observable.Observable.prototype.withLatestFrom = _withLatestFrom.withLatestFrom;