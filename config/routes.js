
/*
 *  All rountes of the site. 
 */
var mongoose = require('mongoose')
  , async = require('async')

module.exports = function (app, passport, auth) {
	// home routes
	var home = require('../app/controllers/home')
	app.get('/', home.index)
	app.get('/iphone', home.iphone)
	app.get('/ipad', home.ipad)
	app.get('/top50', home.top50)
	app.get('/category/:id', home.category)
	
	
	// user routes
	var users = require('../app/controllers/users')
	app.get('/login', users.login)
	app.get('/signup', users.signup)
	app.post('/signup', users.create)
	app.get('/logout', users.logout)
	app.post('/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.', failureFlash: true}), users.session)
	app.get('/users/:user_id', users.show)
	
	app.param('user_id', users.user)
	
	// stuff routes
	var stuffs = require('../app/controllers/stuffs')
	app.get('/stuffs/:stuff_id', stuffs.show)
	app.get('/upload', stuffs.upload)
	app.post('/upload', stuffs.save)
	
	app.param('stuff_id', stuffs.stuff)
	
	// asset routes
	var assets = require('../app/controllers/assets')
	app.get('/thumb/:file_id', assets.thumb)
	app.get('/srcfile/:asset_id', assets.srcfile)
	
	// search routes
	var search = require('../app/controllers/search')
	app.get('/tag/:tag', search.tag)
	
	// tools routes
	var wptools = require('../app/controllers/wptools')
	app.get('/wptools', wptools.index)
	app.post('/wptools/uploads', wptools.upload)
	app.post('/wptools/wpcrop', wptools.wpcrop)
	app.get('/wptools/wpshow/:wp_file', wptools.wpshow)
	
}