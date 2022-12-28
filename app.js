const express = require('express');
const app = express();
const session = require('express-session');
const cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
const filestore = require("session-file-store")(session);
const {check,validationResult} = require('express-validator');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieparser());

app.use(
    session({
      name: "session-1",
      secret: "thisIsOurSecret",
      saveUninitialized: false,
      resave: false,
      store: new filestore(),
    })
  );

const login = require('./router/login_load');
const default_page = require('./router/load404');
const login_check = require('./router/login_check');
const home = require('./router/home');
const logout = require('./router/logout');

app.set('view engine','ejs');
app.use(express.static('public'));
app.listen(3000,()=>console.log('connected to server'));
app.use(function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  });

app.get('/',login);
app.post('/login',login_check);
app.get('/home',home);
app.post('/logout',logout);
app.use(default_page);