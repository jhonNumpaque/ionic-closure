'use strict';

var _Observable = require('../../Observable');

var _toPromise = require('../../operator/toPromise');

_Observable.Observable.prototype.toPromise = _toPromise.toPromise;