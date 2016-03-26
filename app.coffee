require('coffee-script').register()
koa = require('koa')
router = require('koa-router')()
serve = require('koa-static')
views = require('co-views')
app = koa()
bodyParser = require('koa-bodyparser')
logger = require('koa-logger')

config = require('./config')
weather = require('./lib/weather.coffee')

render = views('views/', {
    map: {
        html: 'mustache'
    }
})

app.use(serve('public/'))
app.use(bodyParser())
app.use(logger()) if config.environment == 'development'

router.get '/', ->
    @body = yield render('index.mustache')

router.post '/', ->
    if not this.request.body.location
        this.status = 400
    else
        res = yield weather.get(this.request.body.location, config.API_KEY, 'metric')
        weather_object = weather.distill(res)
        if @request.accepts('json', 'html') == 'json'
            @body = yield weather_object
        else
            @body = yield render('weather.mustache', weather_object)

app.use(router.routes())

if not module.parent
    app.listen config.port, ->
        console.log("Koa listening on port #{config.port}")

module.exports = app
