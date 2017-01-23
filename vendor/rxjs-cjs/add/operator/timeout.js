'use strict';

var _Observable = require('../../Observable');

var _timeout = require('../../operator/timeout');

_Observable.Observable.prototype.timeout = _timeout.timeout;