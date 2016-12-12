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
let student = require('./routes/student');
let teacher = require('./routes/teacher');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client')));

// 引入jwt模块
let jwt = require('jwt-simple');
// 设置密钥
app.set('jwtTokenSecret', 'maple5233');

// 用户登录后根据id生成token
// let expires = moment().add('days', 7).valueOf();
// let token = jwt.encode({
//   iss: user.id,
//   exp: expires
// }, app.get('jwtTokenSecret'));
// 发回客户端
// res.json({
//   token : token,
//   user: user.toJSON()
// });
// 

// jwt验证路由
// var jwtAuth = require('./routes/jwtAuth');

// 拦截restful请求
// app.all('/api/*', [express.bodyParser(), jwtAuth]);


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
