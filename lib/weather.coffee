request = require('request')

get = (location, appid, units) ->
  new Promise (resolve, reject) ->
    location = encodeURIComponent(location)

    reject('Invalid argument count') if arguments.length < 2 or arguments.length > 3

    request {
      url: "http://api.openweathermap.org/data/2.5/weather?q=#{location}&appid=#{appid}&units=#{units}"
      json: true
    }, (error, response, body) ->
      reject("Failed to fetch weather: #{error.message}") if error
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
      direction: res.wind.deg
    },
    clouds: res.clouds.all,
    name: res.name
  }

module.exports = { get: get, distill: distill }
