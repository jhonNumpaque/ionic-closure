'use strict';

var _Observable = require('../../Observable');

var _windowWhen = require('../../operator/windowWhen');

_Observable.Observable.prototype.windowWhen = _windowWhen.windowWhen;