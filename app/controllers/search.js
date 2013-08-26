
/**
 * Module dependencies.
 */
var util = require('../../lib/middlewares/util')

/**
 * Show search list
 */
exports.search = function(req, res){
	
}

/**
 * Show tag list
 */
exports.tag = function(req, res){
	var tag = req.param('tag')
	console.log("search tag[%s] list", tag)
	var page = req.param('page') > 0 ? req.param('page') : 1
	var perPage = 5
	var options = {
		criteria: {'tags':tag},
		perPage: perPage,
	    page: page
	}
	
	Stuff.list(options, function(err, stuffs){
		if (err) return res.render('500')
		Stuff.count(options.criteria).exec(function(err, count){
			res.render('stuffs/search', {
				stuffs: stuffs,
				page: page,
				pages: count / perPage,
				category: null
			})
		})
	})
}