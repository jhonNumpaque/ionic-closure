'use strict';

var _Observable = require('../../Observable');

var _retryWhen = require('../../operator/retryWhen');

_Observable.Observable.prototype.retryWhen = _retryWhen.retryWhen;