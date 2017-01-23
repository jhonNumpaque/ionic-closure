'use strict';

var _Observable = require('../../Observable');

var _catch2 = require('../../operator/catch');

_Observable.Observable.prototype.catch = _catch2._catch;
_Observable.Observable.prototype._catch = _catch2._catch;