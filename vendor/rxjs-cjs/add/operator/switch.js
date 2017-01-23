'use strict';

var _Observable = require('../../Observable');

var _switch2 = require('../../operator/switch');

_Observable.Observable.prototype.switch = _switch2._switch;
_Observable.Observable.prototype._switch = _switch2._switch;