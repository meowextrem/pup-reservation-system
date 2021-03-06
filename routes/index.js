var express= require('express')
var router = express.Router()
const _ = require('lodash')

const user = require('../models/user')

const isLoggedIn = require('../middleware/checkLogin')

const item = require('../models/item')



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


router.use('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/')
})



router.get('/search', isLoggedIn, function(req, res, next) {
  // console.log(req.query)
  if (req.query.assetsId=== '') {
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
    item.search(req.query, function(data) {
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
        page: req.query.page,
        searchData: data
      })
    })
  }
})

router.get('/item', function(req, res, next) {
  res.redirect('/search')
})


router.post('/item', isLoggedIn, function(req, res, next) {
  console.log(req.body.assetId)
  //query
  item.searchById(req.body.assetId, function(data) {
    res.render('./item_view',{
      layout: 'main',
      title: 'Item',
      css: '/assets/css/item.css',
      itemData: data
    })
  })
})



module.exports = router