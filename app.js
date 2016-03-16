'use strict';

const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('co-views');
const app = koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

// contains port and API key configuration
const config = require('./config');
const weather = require('./lib/weather');

const render = views('views/', {
	map: {
		html: 'mustache'
	}
});

app.use(serve('public/'));
app.use(bodyParser());
app.use(logger());

router.get('/', function *() {
    this.body = yield render('index.mustache');
});

router.post('/', function *() {
	if (!this.request.body.location) {
		this.status = 400;
	} else {
		let res = yield weather.get(this.request.body.location, config.API_KEY);
		this.body = yield {
			temperature:
				{
					current: res.main.temp,
					minimum: res.main.temp_min,
					maximum: res.main.temp_max
				},
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
		};
	}
});

app.use(router.routes());

if(!module.parent) {
	app.listen(config.port, function () {
		console.log(`Koa listening on port ${config.port}`);
	});
}

module.exports = app;
