'use strict';

var _Observable = require('../../Observable');

var _retry = require('../../operator/retry');

_Observable.Observable.prototype.retry = _retry.retry;