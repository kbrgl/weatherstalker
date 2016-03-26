# weatherstalker [![Build Status](https://travis-ci.org/kbrgl/weatherstalker.svg?branch=master)](https://travis-ci.org/kbrgl/weatherstalker)
A beautiful, simplistic weather app.

## Status
Currently in development. The essential parts of the backend are ready. Frontend is barely functional.
The app is probably neither beautiful nor simple right now.

## Installing dependencies and running
Installing dependencies
```sh
npm install && bower install
```
Running
```sh
# with vanilla node
API_KEY="your OpenWeatherMap API key here" coffee app.coffee


# with nodemon
API_KEY="your OpenWeatherMap API key here" nodemon app.coffee
```