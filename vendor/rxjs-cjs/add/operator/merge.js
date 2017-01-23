'use strict';

var _Observable = require('../../Observable');

var _merge = require('../../operator/merge');

_Observable.Observable.prototype.merge = _merge.merge;