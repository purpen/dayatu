module.exports = {
    development: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		error_log: './error.log',
		access_log: './access.log',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
  }
  , production: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		error_log: '/var/log/error.log',
		access_log: '/var/log/access.log',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
   }
   , test: {

   }
}