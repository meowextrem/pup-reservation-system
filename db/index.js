const { Pool } = require('pg')

const pool = new Pool({
  database: 'd7nlau3oqq3mqk',
  user: 'vwcwwdyzndfuxx',
  password: '600defb4580a491b98cca93047bc965c57e16cdb31dbffa000639223a2cedcb8',
  host: 'ec2-54-225-92-1.compute-1.amazonaws.com',
  port: 5432,
  ssl: true
})

//heroku pg:psql postgresql-tapered-77091 --app pupcoe-reservation-system


pool.connect().then(function() {
	console.log('connected to database')
}).catch(e => {
	if (e) {
		console.log('cannot connect to database')
	}
})

module.exports = {
	query: (text, callback) => {
		return pool.query(text, callback)
	}
}