'use strict';

var _Observable = require('../../Observable');

var _debounceTime = require('../../operator/debounceTime');

_Observable.Observable.prototype.debounceTime = _debounceTime.debounceTime;