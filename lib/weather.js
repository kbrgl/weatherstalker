'use strict';
const request = require('request');

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
            if(error) reject(`Failed to fetch weather: ${error.message}`);
            resolve(body);
        });
    });
};

let distill = function (res) {
    return {
        temperature: res.main.temp,
        description: res.weather[0].description,
        humidity: res.main.humidity,
        visibility: res.visibility,
        pressure: res.main.pressure,
        wind: {
            speed: res.wind.speed,
            direction: res.wind.deg
        },
        clouds: res.clouds.all,
        name: res.name
    }
};

module.exports = {get: get, distill: distill};
