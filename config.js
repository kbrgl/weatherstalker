/*
 * Acts as a wrapper around config.json
 */
const config = require('./config.json');
module.exports = {
    port: process.env.PORT || 4000,
    API_KEY: process.env.API_KEY || config.API_KEY
}
