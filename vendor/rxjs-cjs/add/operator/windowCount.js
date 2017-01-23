'use strict';

var _Observable = require('../../Observable');

var _windowCount = require('../../operator/windowCount');

_Observable.Observable.prototype.windowCount = _windowCount.windowCount;