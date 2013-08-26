/**
 * Module dependencies.
 */
var env = process.env.NODE_ENV || 'development'
 , config = require('../../config/settings')[env]

/**
 * All wallpaper
 */
exports.all = function(req, res){
	var id=req.param('id'),category=null, perPage=15, page=req.param('page')>0 ? req.param('page') : 1
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
			// 组合数据格式
			var stuff_list = []
			for(var k=0;k<stuffs.length;k++){
				var stuff = {}
				stuff['id'] = stuffs[k].id
				stuff['title'] = stuffs[k].title
				stuff['image'] = config.domain+'/srcfile/'+stuffs[k].asset_id
				stuff['created_at'] = stuffs[k].created_at
				stuff['view_count'] = stuffs[k].view_count
				
				stuff_list.push(stuff)
			}
			res.json({
				stuffs: stuff_list,
				page: page,
				pages: Math.ceil(count / perPage),
				category: category
			})
		})
	})
	
}

/**
 * Category List
 */
exports.categories = function(req, res){
	res.json({
		categories: Categories
	})
}

/**
 * Archive list
 */
exports.archive = function(req, res){
	
}

/**
 * Top list
 */
exports.top = function(req, res){
	
}

/**
 * Liked list 
 */
exports.like = function(req, res){
	
}
