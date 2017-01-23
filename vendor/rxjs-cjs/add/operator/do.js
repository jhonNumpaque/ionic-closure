'use strict';

var _Observable = require('../../Observable');

var _do2 = require('../../operator/do');

_Observable.Observable.prototype.do = _do2._do;
_Observable.Observable.prototype._do = _do2._do;