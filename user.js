var express = require('express');
var session = require('express-session');
var mustache = require('mustache-express');
const bodyParser = require ('body-parser');

var app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('/'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitalized: true

}));
//**middleware -
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  req.session.users = {
    admin: "password"

  };

//**callback
next();

});

app.get('/', function(req, res, next) {
  if (req.session.username) {
    res.send('Hello' + req.session.username)
  } else {
    res.render('user')

  }
})

//**boolean expression
app.post('/login', function(req, res, next) {
console.log(req.body.username);
  if (req.session.users[req.body.username] === req.body.password) {
    req.session.username = req.body.username;

  }
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('validation')


})
