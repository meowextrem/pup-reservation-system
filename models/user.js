const db = require('../db/index.js')
const bcrypt = require('bcryptjs')

var actions = {
  getById: (id,callback) => {
    const query = {
      text: `Select * FROM user_tb 
      WHERE user_id = '${id}'`,
    }
    db.query(query)
    .then(res => callback(res.rows[0]))
    .catch(e => callback(e))
  },
  getByUsername: (username,callback) => {
    const query = {
      text: 'SELECT * FROM user_tb WHERE email = $1 AND user_types = `normal`',
      values: [username]
    }
    db.query(query).then(data => {
      callback(data.rows[0])
    }).catch(e => callback(e))
  },
  getByEmail: (email, callback) => {
    const query = {
      text: `SELECT * FROM user_tb WHERE email = $1 and user_types = 'normal' AND is_active = true`,
      values: [email]
    }
    db.query(query).then(data => {
      // console.log(data)
      callback(data.rows[0])
    }).catch(e => {
      console.log(e)
      callback(e)
    })
  },
  registerUser: (body, callback) => {
    bcrypt.hash(body.password1,5).then(hash => {
      const query = {
        text: `INSERT INTO users (first_name, last_name, email, student_number, year_level, section, contact_number, password, user_type)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        values: [body.firstName, body.lastName, body.email, body.studentNumber, body.year, body.section, body.contactNumber, hash, 'student']
      }

      db.query(query).then(data => {
        callback(data)
      }).catch(e => {
        console.log(e)
        callback(e)
      })
    }).catch(e => {
      console.log(e)
      callback(e)
    })
  }
}

module.exports = actions