'use strict';

const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('co-views');
const app = koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

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
		let weather_object = weather.distill(res);
		if (this.request.accepts('json', 'html') == 'json') {
			this.body = yield weather_object;
		} else {
			this.body = yield render('weather.mustache', weather_object);
		}
	}
});

app.use(router.routes());

if(!module.parent) {
	app.listen(config.port, function () {
		console.log(`Koa listening on port ${config.port}`);
	});
}

module.exports = app;
