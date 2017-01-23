'use strict';

var _Observable = require('../../Observable');

var _repeatWhen = require('../../operator/repeatWhen');

_Observable.Observable.prototype.repeatWhen = _repeatWhen.repeatWhen;