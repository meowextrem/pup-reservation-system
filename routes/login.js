var express= require('express')
var router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs');


router.get('/', function(req, res, next) {
	if (req.isAuthenticated()){
    res.redirect('/account')
  } else {
    res.render('./login', {
      layout: 'main',
      title: 'Login',
      css: '/assets/css/login.css',
      error: req.flash('error')
    })
  }
})


router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Invalid credentials'
}) ,function(req, res, next) {
  res.redirect('/search')
})






module.exports = router