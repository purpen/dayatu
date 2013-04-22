
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , ObjectID = mongoose.mongo.BSONPure.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/settings')[env]
  , fs = require('fs')

/**
 * Show the asset file of the Gridfs
 */
exports.thumb = function(req, res){
	var db = mongoose.createConnection(config.db).db
	var file_id = req.param('file_id')
	console.log("Show file [%s].", file_id)
	GridStore.read(db, ObjectID.fromString(file_id), function(err, fileData) {
		if (err) {
			console.log(err)
			// 异常出错，显示默认图
			fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg');
		}
		db.close()
		
		res.contentType("image/jpeg")
		res.send(fileData)
	})
}

/**
 * Show the original file of the asset
 */
exports.srcfile = function(req, res){
	var db = mongoose.createConnection(config.db).db
	var asset_id = req.param('asset_id')
	Asset.load(asset_id, function(err, asset){
		if (err || !asset) {
			console.log(err)
			// 异常出错，显示默认图
			fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg')
			
			res.contentType("image/jpeg")
			res.send(fileData)
		}else{
			var file_id = asset.original_file
			GridStore.read(db, ObjectID.fromString(file_id), function(err, fileData) {
				if (err) {
					console.log(err)
					// 异常出错，显示默认图
					fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg')
				}
				db.close()

				res.contentType("image/jpeg")
				res.send(fileData)
			})
		}
	})
}