'use strict';

var _Observable = require('../../Observable');

var _let = require('../../operator/let');

_Observable.Observable.prototype.let = _let.letProto;
_Observable.Observable.prototype.letBind = _let.letProto;