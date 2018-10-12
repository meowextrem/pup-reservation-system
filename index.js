var express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const pwd = require('passwordjs')

const user = require('./models/user')


var app = express();
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');
app.set('port',(process.env.PORT|| 3000));
app.use('/assets', express.static('assets'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
app.use(cookieParser('secret'));
app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
            maxAge: 10800000 }
}))
app.use(flash());


app.use(passport.initialize()); 
app.use(passport.session());

passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
},
function(username, password, done) {
  user.getByEmail(username, function(user) {  	
    if (!user) { 
      console.log('no user exists')
      return done(null, false) 
    }
    // bcrypt.compare(password, user.password).then(function(status) {
    //   if (status == false) { 
    //     console.log('incorrect password')
    //     return done(null, false) 
    //   }
    //   console.log('logged in')
    //   return done(null, user)
    // });
    pwd.compare('!@#$%^&*()!@#$%^&*()'+password,user.password,'md5').then(function(status) {
      if (status == false) { 
        console.log('incorrect password')
        return done(null, false) 
      }
      console.log('logged in')
      return done(null, user)
    });
 });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.user_id);
});

passport.deserializeUser(function(user_id, cb) {
  user.getById(user_id, function (user) {
    cb(null, user);
  });
});





const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')


app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/account', accountRouter)
app.use('/user', userRouter)


app.use(function(req, res, next) {
	res.send('Error 404')
})

app.listen(app.get('port'), function() {
	console.log('Server started at port' + app.get('port'))
})