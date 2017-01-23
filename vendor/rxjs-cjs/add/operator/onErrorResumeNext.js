'use strict';

var _Observable = require('../../Observable');

var _onErrorResumeNext = require('../../operator/onErrorResumeNext');

_Observable.Observable.prototype.onErrorResumeNext = _onErrorResumeNext.onErrorResumeNext;