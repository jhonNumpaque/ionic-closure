'use strict';

var _Observable = require('../../Observable');

var _subscribeOn = require('../../operator/subscribeOn');

_Observable.Observable.prototype.subscribeOn = _subscribeOn.subscribeOn;