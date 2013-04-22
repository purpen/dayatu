
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

/**
 * User Schema
 * 自增ID生成器
 */

var IdGeneratorSchema = new Schema({
  modelname: {type: String},
  currentid: {type: Number, default: 1}
})

/**
 * Statics
 */

IdGeneratorSchema.statics = {
	/**
	 * 获取一个自增ID的方法
	 */
	genNewID: function(modelname, callback) {
		this.findOne({modelname: modelname}, function(err, doc){
			if (doc) {
				doc.currentid += 1
			} else {
				doc = new IdGenerator()
				doc.modelname = modelname
			}
			doc.save(function(err){
				if (err) {
					throw err('IdGenerator.getNewID.save() error')
				} else {
					callback(parseInt(doc.currentid.toString()))
				}
			})
		})
	}
	
}

/* 
 *
 * 调用getNewID()的方法
 * idg.getNewID('URL', function(newid) {
 *	console.log(newid)
 * })
 *
 */

module.exports = IdGenerator = mongoose.model('IdGenerator', IdGeneratorSchema)