
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , _ = require('underscore')

/**
 * Get stuff info.
 */
exports.stuff = function(req, res, next, stuff_id) {
	Stuff.load(stuff_id, function(err, stuff) {
	    if (err) return next(err)
	    if (!stuff) return next(new Error('Failed to load stuff ' + stuff_id))
	    req.stuff = stuff
	    next()
	})
}

/**
 * Show the wallpaper.
 */
exports.show = function(req, res) {
	Stuff.inc_visits(req.stuff.id)
	res.render('stuffs/show', {
		title: 'iPhone Wallpaper',
		stuff: req.stuff,
		category: null
	})
}

/**
 * upload page.
 */
exports.upload = function(req, res) {
	var stuff = new Stuff()
	res.render('stuffs/upload', {
		title: 'Upload Wallpaper',
		stuff: stuff
	})
}

/**
 * Upload image to save.
 */
exports.save = function(req, res) {
	console.log(req.body)
	var stuff = new Stuff(req.body)
	stuff.uploadAndSave(req.files.image, function(err){
		if(err){
			console.log(err)
			res.render('stuffs/upload', {
				stuff: stuff,
				errors: err.errors
			})
		}else{
			res.redirect('/stuffs/'+stuff.id)
		}
	})
}