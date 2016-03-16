'use strict';
const assert = require('chai').assert;
const config = require('../config');
const app = require('../');
const supertest = require('supertest');
const sinon = require('sinon');
const weather = require('../lib/weather');

let request = supertest.agent(app.listen());

describe('app.js', () => {
	describe('GET \'/\'', () => {
		it('returns an HTML document', (done) => {
			request
				.get('/')
				.expect(200)
				.expect(/.*/, done);
		});
	});

	describe('POST \'/\'', () => {
		beforeEach(() => {
			sinon.stub(weather, 'get', function () {
				return {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":281.5,"pressure":1030,"humidity":70,"temp_min":279.15,"temp_max":280.5},"visibility":10000,"wind":{"speed":6.2,"deg":60},"clouds":{"all":75},"dt":1458125455,"sys":{"type":1,"id":5091,"message":0.0117,"country":"GB","sunrise":1458108630,"sunset":1458151693},"id":2643743,"name":"London","cod":200};
			});
		});

		afterEach(() => {
			weather.get.restore();
		});

		it('returns JSON', (done) => {
			request
				.post('/')
				.send({location: 'New Delhi'})
				.end((err, res) => {
					assert.typeOf(res.body, 'object', 'is an object');
					done(err, res);
				});
		});

		it('returns a JSON object with the correct properties', (done) => {
			request
				.post('/')
				.send({location: 'New Delhi'})
				.end((err, res) => {
					if (err) done(err, res);
					assert.property(res.body, 'temperature');
					assert.property(res.body.temperature, 'current');
					assert.property(res.body.temperature, 'minimum');
					assert.property(res.body.temperature, 'maximum');
					assert.property(res.body, 'description');
					assert.property(res.body, 'humidity');
					assert.property(res.body, 'visibility');
					assert.property(res.body, 'pressure');
					assert.property(res.body, 'wind');
					assert.property(res.body.wind, 'speed');
					assert.property(res.body.wind, 'direction');
					assert.property(res.body, 'clouds');
					assert.property(res.body, 'name');
					done(err, res);
				});
		});
	});
});

// TODO: write tests for test weather.js
