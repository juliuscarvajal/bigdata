/*jslint node:true*/
'use strict';

var db = mongojs('weatherBalloonDB', ['sourceData']);

var minTemperature = function() {
    db.sourceData.aggregate(
        [   
            $group: {
                observatory: "$observatory",
                temperature: { $min: "$temperature" )
            }
        ]
    );
};

var maxTemperature = function() {
};

var meanTemperature = function() {
};

var observations = function(observatory) {
};

var totalDistance = function() {
};

var output = function(unit) {
    //Produce a normalized output of the data, where given desired units for temperature and distance, an output file is produced containing all observations with the specified output units.
    
    //Observatory	Temperature	Distance
    //AU	celsius	km
    //US	fahrenheit	miles
    //FR	kelvin	m
    //All Others	kelvin
};

