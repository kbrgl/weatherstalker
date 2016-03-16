'use strict';
let request = require('request');

let get = function (location, appid, units) {
	return new Promise(function(resolve, reject) {
		location = encodeURIComponent(location);

		if (arguments.length < 2 || arguments.length > 3) {
			reject('Invalid argument count');
		}

		request({
			url: `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}&units=${units}`,
			json: true
		}, function (error, response, body) {
			if(error) {
				reject('Failed to fetch weather');
			}
			resolve(body);
		});
	});
};

module.exports = {get: get};