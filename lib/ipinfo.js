'use strict';
const http = require('http');

module.exports = function (ip) {
	return new Promise(function(resolve, reject) {
		ip = encodeURIComponent(ip);

		http.get(`http://ipinfo.io/${ip}`, (res) => {
			resolve(res);
		}).on('error', (err) => {
			reject(`Failed to fetch location from ipinfo.io: ${e.message}`);
		});
	});
};
