/*jslint node:true*/
'use strict';

var moment = require('moment');

var observatories = ['AU', 'US', 'FR', 'OT'];
var wholeRandom = function() {
    return Math.floor(Math.random() * 100);
};

exports.helpers = {
    timestamp: function() {
        var start = new Date(1900, 0, 1),
            end = new Date(),
            date = moment(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.format('YYYY-MM-DD[T]hh:mm');
    },
    location: function() {
        return wholeRandom() + ',' + wholeRandom();
    },
    temperature: function() {
        return wholeRandom();
    },
    observatory: function() {
        var index = Math.floor(Math.random() * observatories.length);
        return observatories[index];
    }
};

exports.logData = function(data) {
    var log = [];
    var d = (data === null) ? helpers :  data;
    Object.keys(d).forEach(function(key) {
        log.push(d[key]());
    });
    return log.join('|');
};