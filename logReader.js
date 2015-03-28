/*jslint node:true*/
'use strict';

var moment = require('moment');
var fs = require('fs');
var mkdirp = require('mkdirp');
var helpers = require('./helpers').helpers;
var folder = 'data';
var filename = 'balloon_' + moment.utc() + '.txt'; //.format('YYYY-MM-DD[T]hh:mm:ss:ms');
var fullpath = folder + '/' + filename;




console.log("waiting...");