const db = require('../db/index.js')
const bcrypt = require('bcryptjs')



var actions = {
  search: (data, callback) => {
    const query = {
      text: `SELECT * FROM assets_tb
      LEFT JOIN equipments_tb ON equipments_tb.equipment_id = assets_tb.equipment_id
      LEFT JOIN rooms_tb ON rooms_tb.room_id = assets_tb.room_id`
    }
    if (!data.query){
      return callback()
    } else {
      query.text = query.text + ` WHERE equipment_name ILIKE '%${data.query}%' OR room_name ILIKE '%${data.query}%'`
    }
    // console.log(query)
    db.query(query).then(data => {
      // console.log(data.rows)
      callback(data.rows)
    }).catch(e => {
      console.log(e)
      callback(e)
    })
  },
  searchById: (assetId, callback) => {
    const query = {
      text: `SELECT * FROM assets_tb
        LEFT JOIN equipments_tb ON equipments_tb.equipment_id = assets_tb.equipment_id
        LEFT JOIN rooms_tb ON rooms_tb.room_id = assets_tb.room_id
        WHERE assets_id = ${assetId}`,
    }
    console.log(query)
    db.query(query).then(data => {
      console.log(data.rows)
      callback(data.rows[0])
    }).catch(e => {
      console.log(e)
      callback(e)
    })
  }
}




module.exports = actions