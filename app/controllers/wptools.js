
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectID = mongoose.mongo.BSONPure.ObjectID
  , async = require('async')
  , _ = require('underscore')
  , util = require('../../lib/middlewares/util')
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/settings')[env]
  , fs = require('fs')
  , mime = require('mime')
  , gm = require('gm')
  , dateFormat = require('dateformat')
  , scale_width = 580

/**
 * Show search list
 */
exports.index = function(req, res){
	res.render('wptools/index', {
		title: 'Customize Wallpaper',
		menu: 'wptools',
	})
}


/**
 * Upload the asset
 */
exports.upload = function(req, res){
	console.log(req.files)
	var db = mongoose.createConnection(config.db).db
	var cb = function(err){
		console.log(err)
	}
	var file = req.files.qqfile, file_id = new ObjectID()
	// Create a new file
	var gs = new GridStore(db, file_id, 'w')
	console.log('start to open file.')
	gs.open(function(err, gs){
		if (err) return cb(err)
		var file_data = fs.readFileSync(file.path)
		var org_file = file
		var asset_info = {
			'filename': file.name,
			'mine_type': file.type,
			'bytes': file.size
		}
		console.log('read file ok.')
		gm(file.path).identify(function (err, data) {
		  	if (err) return cb(err)
			
			asset_info['width'] = data.size.width
			asset_info['height'] = data.size.height
			console.log('start to write file.')
			// Write the file to GridFS
			gs.write(file_data, function(err, gs) {
				if (err) return cb(err)
				// Flush to the GridFS
				gs.close(function(err, gs) {
					if (err) return cb(err)

					asset_info['original_file'] = file_id
					console.log(asset_info)
					// Save asset info
					var asset = new Asset(asset_info)
					asset.save(function(err){
						if (err) return cb(err)
						asset_info['id'] = asset.id
						asset_info['success'] = true
						res.json(asset_info)
					})
				})
			})
		})
	})
}


/**
 * Create the wallpaper
 */
exports.wpcrop = function(req, res){
	var x1 = req.param('x1'), y1 = req.param('y1'), w =  req.param('w'), h =  req.param('h')
	var wp_width = req.param('wp_width'), wp_height = req.param('wp_height')
	var asset_id = req.param('wp_id')
	
	var db = mongoose.createConnection(config.db).db
	var res_msg = {}
	Asset.load(asset_id, function(err, asset){
		if (!err && asset) {
			var file_id = asset.original_file
			GridStore.read(db, ObjectID.fromString(file_id), function(err, fileData) {
				if (err) {
					console.warn(err)
					res_msg['is_error'] = true
					res_msg['error_msg'] = 'Read file failed: '+ err
					res.json(res_msg)
				}else{
					db.close()
					
					console.log('start to crop file!')
					var file_ary = asset.filename.split('.')
					var wp_filename = 'wp_'+wp_width+'x'+wp_height+'_'+dateFormat(new Date(), 'yyyymmddHHMMss')+'.'+file_ary[file_ary.length-1]
					// 裁切壁纸
					gm(fileData, asset.filename)
						.resize(scale_width, 100000)
						.crop(w, h, x1, y1)
						.quality(100)
						.resize(wp_width, wp_height)
						.write(config.root + '/public/wallpaper/' + wp_filename, function(err){
							if (!err) {
								res_msg['wp_file'] = wp_filename
								res_msg['error_msg'] = 'Crop the wallpaper ok!'
								res_msg['is_error'] = false
						  	}else{
								res_msg['error_msg'] = 'Crop file failed: '+ err
						  	}
							console.log('crop file ok!')
							console.log(res_msg)
							res.send(res_msg)
						})
				}
			})
		}else{
			console.log('load file failed.')
			res_msg['is_error'] = true
			res_msg['error_msg'] = 'Load file failed: '+ err
			res.json(res_msg)
		}
	})
}

/**
 * Show the wallpaper
 */
exports.wpshow = function(req, res){
	var wp_file = req.param('wp_file')
	res.render('wptools/wpshow', {
		title: 'Customize Wallpaper',
		wp_file: '/wallpaper/'+ wp_file,
		menu: 'wptools',
	})
}