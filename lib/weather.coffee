request = require('request')
a2d = require('angle-to-direction')

get = (location, appid, units) ->
  new Promise (resolve, reject) ->
    reject("unknown units: #{units}") if units not in ['imperial', 'metric', undefined]

    location = encodeURIComponent(location)

    reject('Invalid argument count') if arguments.length < 2 or arguments.length > 3

    request {
      url: "http://api.openweathermap.org/data/2.5/weather?q=#{location}&appid=#{appid}&units=#{units}"
      json: true
    }, (error, response, body) ->
      reject("Failed to fetch weather: #{error.message}") if error
      if units
        if units == 'imperial'
          body.units = 'F'
        else
          body.units = 'C'
      else
        body.units = 'K'
      resolve(body)

distill = (res) ->
  {
    temperature: res.main.temp,
    description: res.weather[0].description
    humidity: res.main.humidity
    visibility: res.visibility
    pressure: res.main.pressure
    wind: {
      speed: res.wind.speed
      direction: a2d.degree(res.wind.deg).toLowerCase()
    },
    clouds: res.clouds.all,
    name: res.name,
    units: res.units
  }

module.exports = { get: get, distill: distill }
