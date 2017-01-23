'use strict';

var _Observable = require('../../Observable');

var _throttle = require('../../operator/throttle');

_Observable.Observable.prototype.throttle = _throttle.throttle;