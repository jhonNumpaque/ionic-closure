'use strict';

var _Observable = require('../../Observable');

var _multicast = require('../../operator/multicast');

_Observable.Observable.prototype.multicast = _multicast.multicast;