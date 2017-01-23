'use strict';

var _Observable = require('../../Observable');

var _windowTime = require('../../operator/windowTime');

_Observable.Observable.prototype.windowTime = _windowTime.windowTime;