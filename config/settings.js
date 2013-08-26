module.exports = {
    development: {
		domain: 'http://www.dayatu.com',
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		error_log: './dayatu_error.log',
		access_log: './dayatu_access.log',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
  }
  , production: {
		domain: 'http://www.dayatu.com',
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: '大牙兔'
		},
		db: 'mongodb://localhost/dayatu',
		error_log: '/var/log/dayatu_error.log',
		access_log: '/var/log/dayatu_access.log',
		facebook: {
			clientID: "APP_ID"
			, clientSecret: "APP_SECRET"
			, callbackURL: "http://localhost:3000/auth/facebook/callback"
		}
   }
   , test: {

   }
}