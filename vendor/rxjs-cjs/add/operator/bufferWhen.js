'use strict';

var _Observable = require('../../Observable');

var _bufferWhen = require('../../operator/bufferWhen');

_Observable.Observable.prototype.bufferWhen = _bufferWhen.bufferWhen;