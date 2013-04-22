var util = require('../../lib/middlewares/util')

/**
 * Get home page.
 */

exports.index = function (req, res) {
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 5
	var options = {
		perPage: perPage,
	    page: page
	}
	
	Stuff.list(options, function(err, stuffs){
		if (err) return res.render('500')
		Stuff.count().exec(function(err, count){
			res.render('index', {
				stuffs: stuffs,
				menu: 'home',
				page: page,
				pages: count / perPage,
				category: null
			})
		})
	})
}

/**
 * Get category list.
 */
exports.category = function (req, res) {
	var id=req.param('id'),category=null, perPage=5, page=req.param('page')>0 ? req.param('page') : 0
	for(var i=0;i<Categories.length;i++){
		//console.log("request_id:%d,id:%d,index:%d.",id,Categories[i].id,i)
		if (Categories[i].id == parseInt(id)) category = Categories[i]
	}
	if(category){
		var options = {
			perPage: perPage,
		    page: page,
			criteria: {'category_id': id}
		}
		//console.log(options)
		Stuff.list(options, function(err, stuffs){
			if (err) return res.render(500)
			Stuff.count(options.criteria).exec(function(err, count){
				res.render('category_list', {
					title: util.ucwords(category.name) + ' iPhone Wallpapers',
					stuffs: stuffs,
					menu: null,
					page: page,
					pages: Math.ceil(count / perPage),
					category: category
				})
			})
		})
	}else{
		res.render(404)
	}
}

/**
 * Get iphone list.
 */
exports.iphone = function (req, res) {
	var id=req.param('id'),category=null, perPage=5, page=req.param('page')>0 ? req.param('page') : 0
	for(var i=0;i<Categories.length;i++){
		if (Categories[i].id == parseInt(id)) category = Categories[i]
	}
	if(!category){
		var options = {
			perPage: perPage,
		    page: page,
			criteria: {'type_id': 1}
		}
	}else{
		var options = {
			perPage: perPage,
		    page: page,
			criteria: {'category_id': id, 'type_id': 1}
		}
	}
	//console.log(options)
	Stuff.list(options, function(err, stuffs){
		if (err) return res.render(500)
		Stuff.count(options.criteria).exec(function(err, count){
			res.render('iphone_list', {
				title: 'iPhone Wallpapers',
				stuffs: stuffs,
				menu: 'iphone',
				page: page,
				pages: Math.ceil(count / perPage),
				category: category
			})
		})
	})
}


/**
 * Get ipad list.
 */
exports.ipad = function (req, res) {
	var id=req.param('id'),category=null, perPage=5, page=req.param('page')>0 ? req.param('page') : 0
	for(var i=0;i<Categories.length;i++){
		if (Categories[i].id == parseInt(id)) category = Categories[i]
	}
	if(!category){
		var options = {
			perPage: perPage,
		    page: page,
			criteria: {'type_id': 2}
		}
	}else{
		var options = {
			perPage: perPage,
		    page: page,
			criteria: {'category_id': id, 'type_id': 2}
		}
	}
	//console.log(options)
	Stuff.list(options, function(err, stuffs){
		if (err) return res.render(500)
		Stuff.count(options.criteria).exec(function(err, count){
			res.render('ipad_list', {
				title: 'iPad Wallpapers',
				stuffs: stuffs,
				menu: 'ipad',
				page: page,
				pages: Math.ceil(count / perPage),
				category: category
			})
		})
	})
}


/**
 * Get ipad list.
 */
exports.top50 = function (req, res) {
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 5
	var options = {
		perPage: perPage,
	    page: page,
		sortby: {'view_count': -1}
	}
	
	Stuff.list(options, function(err, stuffs){
		if (err) return res.render('500')
		Stuff.count().exec(function(err, count){
			res.render('top50_list', {
				title: 'Top50 Wallpapers',
				stuffs: stuffs,
				menu: 'top50',
				page: page,
				pages: count / perPage,
				category: null
			})
		})
	})
}

