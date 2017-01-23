'use strict';

var _Observable = require('../../Observable');

var _distinctUntilKeyChanged = require('../../operator/distinctUntilKeyChanged');

_Observable.Observable.prototype.distinctUntilKeyChanged = _distinctUntilKeyChanged.distinctUntilKeyChanged;