'use strict';

var _Observable = require('../../Observable');

var _debounce = require('../../operator/debounce');

_Observable.Observable.prototype.debounce = _debounce.debounce;