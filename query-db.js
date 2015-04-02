/*jslint node:true*/
'use strict';
var mongojs = require('mongojs');
var db = mongojs('weatherBalloonDB', ['sourceData']);

var minTemperature = function() {
    db.sourceData.aggregate({
        $group: {
            _id: "$observatory",
            minTemperature: {
                $min: "$temperature"
            }
        }
    });
};

var maxTemperature = function() {
    db.sourceData.aggregate({
        $group: {
            _id: "$observatory",
            temperature: {
                $max: "$temperature"
            }
        }
    });
};

var meanTemperature = function() {
    db.sourceData.aggregate({
        $group: {
            _id: "$observatory",
            temperature: {
                $avg: "$temperature"
            }
        }
    });
};

var observations = function(observatory) {
};

var totalDistance = function() {
};

var output = function(unit) {
    //TODO: Produce a normalized output of the data, where given desired units for temperature and distance, an output file is produced containing all observations with the specified output units.

    //Observatory	Temperature	Distance
    //AU	celsius	km
    //US	fahrenheit	miles
    //FR	kelvin	m
    //All Others	kelvin
};
