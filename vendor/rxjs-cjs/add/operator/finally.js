'use strict';

var _Observable = require('../../Observable');

var _finally2 = require('../../operator/finally');

_Observable.Observable.prototype.finally = _finally2._finally;
_Observable.Observable.prototype._finally = _finally2._finally;