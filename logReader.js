/*jslint node:true*/
'use strict';

var mongojs = require('mongojs');
var db = mongojs('weatherBalloonDB', ['sourceData']);
var watch = require('watch');
var moment = require('moment');
var fs = require('fs');
var byline = require('byline');
var helpers = require('./helpers').helpers;
var folder = 'data';

var commit = function(json) {
    db.sourceData.insert(json, function (err, docs) {
        console.log("DB Insert Completed");
    });
};

var data2json = function(data) {    
    var json = {
        timestamp: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.exec(data)[0],
        location: /\d+,\d+/.exec(data)[0],
        temperature: /\|(\d+)\|/.exec(data)[1],
        observatory: /[A-Z]{2}/.exec(data)[0]
    };
    
    commit(json);
};

var onChange = function(f, curr, prev) {
    if (/data\/balloon_\d+\.txt/.exec(f) == null)
        return;
        
    var file = byline(fs.createReadStream(f));
    file.on('data', data2json);
};

var onCreate = function(f, stat) {
    // Handle new files
};

var onRemove = function(f, stat) {
    // Handle removed files
}

watch.createMonitor('./data', function(monitor) {
    console.log('watching directory');
    
    monitor.on("created", onCreate);
    monitor.on("changed", onChange);
    monitor.on("removed", onRemove);
});

watch.unwatchTree('./data');

