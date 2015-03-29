/*jslint node:true*/
'use strict';

var moment = require('moment');
var fs = require('fs');
var helpers = require('./helpers');

console.log("Begin Parsing >>");

var markTime = function(msg) {
    console.log(msg + ' : ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));
};

var bigdata = function* (max) {
    markTime('start creating big array');
    var i = 0;
    while(i < max) {
        var item = helpers.logData(helpers.helpers);
        yield item;
        i++;
    }
    
    markTime('done creating big array');
};

var write = (function() {
    var folder = 'data';
    var filename = 'balloon_' + moment.utc() + '.txt';
    var fullpath = folder + '/' + filename;

    markTime('start');
    
    var file = fs.createWriteStream(fullpath);    
    var data = bigdata(10000000);
    
    for(var d of data) {
        file.write(d + '\n');
    }
    
    markTime('end');
})();
