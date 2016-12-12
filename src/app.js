const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require("babel-core/register");
const config = require('./config');
const app = express();
let meeting = require('./routes/meeting');
let fee = require('./routes/fee');
let goodStudent = require('./routes/goodStudent');
let checkIn = require('./routes/checkin');
let answers = require('./routes/answers')
let student = require('./routes/student');
let teacher = require('./routes/teacher');
let login = require('./routes/login');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client')));

// 引入jwt模块
let jwt = require('jwt-simple');
// 设置密钥
app.set('jwtTokenSecret', 'maple5233');

// 登录不用经过jwt
[ login ].forEach (item => {
    item.$routers.forEach (router => {
        app[ router.method ] ('/api' + router.path, router.router);
    })
});

// jwt验证路由
let jwtAuth = require('./routes/jwtAuth');

// 拦截restful请求
// app.all('/api/*', [bodyParser(), jwtAuth]);


//  restful路由
[ meeting, fee, goodStudent, checkIn, student, teacher ].forEach (item => {
    item.$routers.forEach (router => {
        app[ router.method ] ('/api' + router.path, router.router);
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      status:0
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({status:0,message:err.message});
});

module.exports = app;
