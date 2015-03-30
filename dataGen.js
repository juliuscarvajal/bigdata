/*jslint node:true*/
'use strict';

const MAX = 10000000;
var log = require('single-line-log').stdout;
var moment = require('moment');
var fs = require('fs');
var fse = require('fs-extra');
var helpers = require('./helpers');

console.log("Begin Parsing >>");

var markTime = function(msg) {
    console.log(msg + ' : ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createFile = function() {
    var folder = 'data';
    var filename = 'balloon_' + moment.utc() + '.txt';
    var fullpath = folder + '/' + filename;
    var file = fse.createOutputStream(fullpath); //fs.createWriteStream(fullpath);    
    return file;
}

var file = createFile();
var write = function(i) {
    if (i === undefined)
        i = 0;
    
    if (i >= MAX)
        return;
    /*
    if (getRandomInt(1, 10) % 4 === 0) {
        file.end(); //the previous batch is done.
        file = createFile(); //create a new file for the reader to process.
    } 
    */
    
    var doWrite = (function() {
        var item = helpers.logData(helpers.helpers);
        return file.write(item + '\n', 'utf8', function() {
            log("Write: " + i.toLocaleString());
        });
    })();
        
    setImmediate(function() {
        write(++i);
    });
};

file.once('drain', function() {
    log.clear();
    log('\nWritting again...');
    log.clear();
    write();
});

write();
