/*jslint node:true*/
'use strict';
var log = require('single-line-log').stdout;
var mongojs = require('mongojs');
var db = mongojs('weatherBalloonDB', ['sourceData']);
var watch = require('watch');
var moment = require('moment');
var fs = require('fs');
var fse = require('fs-extra');
//var es = require('event-stream');
var readline = require('readline');
var stream = require('stream');
//var byline = require('byline');
var helpers = require('./helpers').helpers;
var folder = './data';

var i = 0;
var commit = function(json) {
    db.sourceData.insert(json, function(err, docs) {
        if (err) {
            console.log(err);
            throw (err);
        }

        console.log((i++).toLocaleString() + ' -- DB Insert Completed ' + JSON.stringify(json));
    });
};

var data2json = function(data) {
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.exec(data) === null) {
        console.log(data + ' not valid......');
        return;
    }

    var json = {
        timestamp: /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.exec(data)[0],
        location: /\d+,\d+/.exec(data)[0],
        temperature: Number(/\|(\d+)\|/.exec(data)[1]),
        observatory: /[A-Z]{2}/.exec(data)[0]
    };
    commit(json);
};

var onChange = function(f) {
    var instream = fs.createReadStream(f);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);

    rl.on('line', function(line) {
        data2json(line);
    });

    rl.on('close', function() {
        console.log('Read entirefile.')
        fs.unlink(f, function(err) {
            console.log(f + ' deleted.');
        });
    });
}

fse.ensureDir(folder, function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
});

fs.readdir(folder, function(err, files) {
    console.log('reading directory');
    var files = files.filter(function(item) {
        return /^balloon_\d+\.txt$/.test(item);
    });

    files = files.map(function(item) {
        return folder + '/' + item;
    });

    if (err) {
        console.log(err);
        throw err;
    }

    files.forEach(onChange);
});

