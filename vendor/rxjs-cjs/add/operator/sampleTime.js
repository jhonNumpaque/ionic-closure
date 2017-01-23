'use strict';

var _Observable = require('../../Observable');

var _sampleTime = require('../../operator/sampleTime');

_Observable.Observable.prototype.sampleTime = _sampleTime.sampleTime;