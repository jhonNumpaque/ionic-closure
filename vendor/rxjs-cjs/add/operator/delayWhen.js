'use strict';

var _Observable = require('../../Observable');

var _delayWhen = require('../../operator/delayWhen');

_Observable.Observable.prototype.delayWhen = _delayWhen.delayWhen;