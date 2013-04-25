
/**
 * Main application entry file.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/settings')[env]
  , auth = require('./lib/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// access/error logs
// console.log(config.access_log)
var access_log = fs.createWriteStream(config.access_log, {flags: 'a'})
  , error_log = fs.createWriteStream(config.error_log, {flags: 'a'})

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
	require(models_path + '/' + file);
})

// Bootstrap passport config
require('./config/passport')(passport, config)

var app = express()
// express settings
require('./config/express')(app, config, passport, access_log, error_log)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
if (!module.parent) {
	app.listen(port)
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
}
// expose app
exports = module.exports = app