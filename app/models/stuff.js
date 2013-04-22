
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectID = mongoose.mongo.BSONPure.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/settings')[env]
  , fs = require('fs')
  , mime = require('mime')
  , async = require('async')
  , _ = require('underscore')
  , gm = require('gm')

/**
 * Getters
 */

var getTags = function (tags) {
	return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
	return tags.split(',')
}

/**
 * Stuff Schema
 */

var StuffSchema = new Schema({
	title: {type:String, default:'', trim:true},
	body: {type:String, default:'', trim: true},
	user: {type: Schema.ObjectId, ref: 'User'},
	asset_id: {type: Schema.ObjectId, ref: 'Asset'},
	Comments: [{
		body: {type:String, default:''},
		user: {type:Schema.ObjectId, ref: 'User'},
		create_at: {type: Date, default: Date.now} 
	}],
	category_id: [],
	type_id: {type:Number, default: 1},
	tags: {type:[], get:getTags, set:setTags},
	state: {type:Number, default: 1},
	view_count: {type:Number, default: 1},
	create_at: {type: Date, default: Date.now} 
})

/**
 * Validations
 */

StuffSchema.path('title').validate(function (title) {
	return title.length > 0
}, '标题不能为空')

StuffSchema.path('body').validate(function (body) {
	return body.length > 0
}, '内容不能为空')

/**
 * Methods
 */

StuffSchema.methods = {
	uploadAndSave: function (files, cb) {
		var self = this
		var db = mongoose.createConnection(config.db).db
		async.each(files, function(file, cb){
			var file_id = new ObjectID()
			// Create a new file
			var gs = new GridStore(db, file_id, 'w')
			gs.open(function(err, gs){
				if (err) return cb(err)
				var file_data = fs.readFileSync(file.path)
				var org_file = file
				var asset_info = {
					'filename': file.name,
					'mine_type': file.type,
					'bytes': file.size
				}
				
				gm(file.path).identify(function (err, data) {
				  	if (err) return cb(err)
					
					asset_info['width'] = data.size.width
					asset_info['height'] = data.size.height

					// Write the file to GridFS
					gs.write(file_data, function(err, gs) {
						if (err) return cb(err)
						// Flush to the GridFS
						gs.close(function(err, gs) {
							if (err) return cb(err)

							asset_info['original_file'] = file_id
							// Save asset info
							var asset = new Asset(asset_info)
							asset.save(function(err){
								if (err) return cb(err)
								
								// Save article info
								self.asset_id = asset.id
								self.save(cb)
							})
						})
					})

				})
			})
		}, function(err) {
			if (err) return cb(err)
			return cb()
		})
	}
}

/**
 * Statics
 */

StuffSchema.statics = {
	/**
	 * Find article by id
	 *
	 * @param {ObjectId} id
	 * @param {Function} cb
	 * @api public
	 */
	load: function (id, cb) {
		this.findOne({ _id: id})
		  .populate('user', 'name')
		  .exec(cb)
	},
	
	list: function(options, cb) {
		var criteria = options.criteria || {}
		var sortby = options.sortby || {'create_at': -1}

	    this.find(criteria)
	      .sort(sortby) // sort by date
	      .limit(options.perPage)
	      .skip(options.perPage * options.page)
	      .exec(cb)
	},
	
	inc_visits: function(id) {
		console.log("stuff[%s] inc view_count. ", id)
		this.update({_id: id}, {$inc:{'view_count': 1}}).exec()
	}
}

module.exports = Stuff = mongoose.model('Stuff', StuffSchema)
