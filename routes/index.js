var express= require('express')
var router = express.Router()
const _ = require('lodash')

const user = require('../models/user')

/// redirection
router.get('/', function(req, res, next) {
  res.redirect('/login')
})

router.get('/asd', function(req, res, next) {
  res.render('./admin/user_tb_view')
})


router.get('/register', function(req, res, next) {
	res.render('./register', {
		layout: 'main',
		title: 'Register',
		css: '/assets/css/register.css',
    success: req.flash('registerSuccess'),
    error: req.flash('registerError')
	})
})


router.post('/register', function(req, res, next) {


  if (req.body.password1 === req.body.password2){
    user.registerUser(req.body, function(data){
      console.log(data)
      if (data.command === 'INSERT') {
        req.flash('registerSuccess', 'Registration successful!')
        res.redirect('/register')
      } else if (data.name === 'error'){
        if (data.code === '23505') {
          console.log(data.constraint)
          if (data.constraint == 'users_student_number_key') {
            req.flash('registerError', 'That student number is already registered.')
          } else if (data.constraint == 'users_email_key') {
            req.flash('registerError', 'That email is already in used.')
          }
        }
        res.redirect('/register')
      }
    })
  } else {
    req.flash('registerError', `Password doesn't match.`)
    res.redirect('/register')
  }
})



router.get('/search', function(req, res, next) {
  console.log(req.query)
  if (req.query.query === '') {
    console.log('no result')
    res.render('./user/home', {
      layout: 'main',
      css: '/assets/css/main_search.css',
      login: req.isAuthenticated(),
      query: req.query.query,
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      fromTime: req.query.fromTime,
      toTime: req.query.toTime,
      type: req.query.type,
      available: req.query.available,
      rows: req.query.rows,
      page: req.query.page
    })
  } else {
    res.render('./user/home', {
      layout: 'main',
      css: '/assets/css/main_search.css',
      login: req.isAuthenticated(),
      query: req.query.query,
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      fromTime: req.query.fromTime,
      toTime: req.query.toTime,
      type: req.query.type,
      available: req.query.available,
      rows: req.query.rows,
      page: req.query.page
    })
  }
})


router.post('/item', function(req, res, next) {
  console.log(req.body)
  //query

  res.render('./item_view',{
    layout: 'main',
    title: 'Item',
    css: '/assets/css/item.css'
  })
})



module.exports = router