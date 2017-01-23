'use strict';

var _Observable = require('../../Observable');

var _distinctUntilChanged = require('../../operator/distinctUntilChanged');

_Observable.Observable.prototype.distinctUntilChanged = _distinctUntilChanged.distinctUntilChanged;