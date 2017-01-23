'use strict';

var _Observable = require('../../Observable');

var _share = require('../../operator/share');

_Observable.Observable.prototype.share = _share.share;