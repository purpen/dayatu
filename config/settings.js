module.exports = {
    development: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
	}
  , test: {

    }
  , production: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
    }
}