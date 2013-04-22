/**
 * Get users listing.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')

/**
 * Find user by id
 */
exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

exports.login = function (req, res) {
	res.render('users/login', {
		title: 'Login'
	})
}

exports.signup = function (req, res) {
	res.render('users/signup', {
		title: 'Signup',
		user: new User()
	})
}

/**
 * Login user / Session
 */
exports.session = function (req, res) {
  res.redirect('/')
}

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout()
  res.redirect('/login')
}

/**
 * Create user
 */
exports.create = function (req, res, next) {
	var user = new User(req.body)
	user.provider = 'local'
	user.save(function (err) {
		if (err) {
			return res.render('users/signup', { title: '注册', errors: err.errors, user: user })
		}
		console.log('user:' + user)
		req.login(user, function (err) {
			if (err) return next(err)
			return res.redirect('/')
		})
	})
}

/**
 *  Show profile
 */
exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}
