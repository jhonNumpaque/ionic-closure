'use strict';

var _Observable = require('../../Observable');

var _auditTime = require('../../operator/auditTime');

_Observable.Observable.prototype.auditTime = _auditTime.auditTime;