/*jslint node:true*/
'use strict';

var moment = require('moment');
var mongojs = require('mongojs');
var db = mongojs('mapReduceDB', ['sourceData']);
var fs = require('fs');
var dummyjson = require('dummy-json');
var helpers = require('./helpers');
var folder = 'data';
var filename = 'balloon_' + moment.utc() + '.txt'; //.format('YYYY-MM-DD[T]hh:mm:ss:ms');
var fullpath = folder + '/' + filename;

console.log("Begin Parsing >>");

var template = fs.readFileSync('schema2.hbs', {
    encoding: 'utf8'
});

var generateDummyData = (function() {
    console.log('start: ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));

    var file = fs.createWriteStream(fullpath);
    var i = 0;
    while(i < 1000) {        
        var data = helpers.logData(helpers.helpers);
        file.write(data + '\n');
        i++;
    }
    console.log('waiting...');
    file.end(function() {
        console.log('done: ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));
    });
})();


//console.log('start: ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));

/*
var file = fs.createWriteStream(fullpath);

file.write(result);

console.log('waiting...');
file.end(function() {
    console.log('done: ' + moment.utc().format('YYYY-MM-DD[T]hh:mm:ss:ms'));
});
*/

//var result = JSON.parse(result); 
//result.forEach(function(item) {
//    console.log(item);
//});

/*
console.log("Begin Database Insert >>");
db.sourceData.remove(function (argument) {
    console.log("DB Cleanup Completd");
});

db.sourceData.insert(JSON.parse(result), function (err, docs) {
    console.log("DB Insert Completed");
});
*/

