'use strict';

var _Observable = require('../../Observable');

var _race = require('../../operator/race');

_Observable.Observable.prototype.race = _race.race;