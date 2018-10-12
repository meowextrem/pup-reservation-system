const { Pool } = require('pg')

const pool = new Pool({
  database: 'ddlnr57c8rlbil',
  user: 'adfrqeeszkptgw',
  password: '4ebe7f68d90c85fa496a3cc1ab40aa105b80cb221c6baa44054f2613a4ab59f0',
  host: 'ec2-23-21-147-71.compute-1.amazonaws.com',
  port: 5432,
  ssl: true
})

//heroku pg:psql postgresql-tapered-54282 --app pup-reservation-system



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