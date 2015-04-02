/*jslint node:true*/
'use strict';
const MAX = 100; //20000000; //Can be more but my Macbook Air has limited storage.
var log = require('single-line-log').stdout;
var moment = require('moment');
var fs = require('fs');
var fse = require('fs-extra');
var helpers = require('./helpers');

var max = process.argv.slice(2).shift() || MAX;

var file = (function() {
    var folder = 'data';
    var filename = 'balloon_' + moment.utc() + '.txt';
    var fullpath = folder + '/' + filename;
    var file = fse.createOutputStream(fullpath); 
    return file;
})();

file.once('drain', function() {
    console.log('Writting again...');
    write();
});

var write = function(i) {
    if (i === undefined)
        i = 0;
    
    if (i >= max) {
        log.clear();
        return;
    }
    
    var doWrite = (function() {
        var item = helpers.logData();
        return file.write(item + '\n', 'utf8', function() {
            log("Writing: " + i.toLocaleString() + " lines\n");
        });
    })(i);
    
    //To avoid hitting the stack limit, use this technique below.
    setImmediate(function() {
        write(++i);
    });
};

write();

