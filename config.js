/*
 * Acts as a wrapper around config.json
 */
module.exports = {
    port: process.env.PORT || 4000,
    API_KEY: process.env.API_KEY || require('./config.json').API_KEY,
    environment: process.env.environment || 'development'
}
