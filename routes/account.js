var express= require('express')
var router = express.Router()



router.get('/', function(req, res, next) {
	res.render('./user/home', {
		layout: 'main',
		login: true,
		css: '/assets/css/main_search.css'
	})
})

router.get('/cataloc/search', function(req, res, next) {
	
})




module.exports = router