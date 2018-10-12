var express= require('express')
var router = express.Router()




router.use(function(req, res, next) {
  if (req.isAuthenticated()){
    next()
  } else {
    res.redirect('/login')
  }
})





module.exports = router