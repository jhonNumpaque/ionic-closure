'use strict';

var _Observable = require('../../Observable');

var _audit = require('../../operator/audit');

_Observable.Observable.prototype.audit = _audit.audit;