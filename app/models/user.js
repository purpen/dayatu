
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto');

/**
 * User Schema
 */

var UserSchema = new Schema({
  _id: Number,
  name: String,
  email: String,
  username: String,
  provider: String,
  hashed_password: String,
  salt: String,
  sina: {},
  create_at: {type: Date, default: Date.now}
});

/**
 * Middleware
 */
UserSchema.pre('save', function(next){
	var user = this
	IdGenerator.genNewID('user', function(newid){
		console.log("user new id: " + newid)
		if (newid) {
			user._id = newid
			console.log("new user: " + user._id)
			// 必须的，否则不会保存到mongo
			next()
		}
	})
});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password){
	 this._password = password;
	 this.salt = this.makeSalt(),
	 this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
     return this._password;	
  });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function(password) {
    if (!password) return ''
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};



module.exports = User = mongoose.model('User', UserSchema);
