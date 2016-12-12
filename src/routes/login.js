"use strict";

const studentDao = require ('../dao/studentDao');
const teacherDao = require ('../dao/teacherDao');
const countDao = require('../dao/countDao');
let login = {};

login.$routers = [
    {
        method: 'put',
        path: '/students/login',
        router: (req, res, next) => {
            studentDao.tryLogin (req, res, next);
        }
    },
    {
        method: 'put',
        path: '/teachers/login',
        router: (req, res, next) => {
            teacherDao.tryLogin (req, res, next);
        }
    },
    {
      method: 'get',
      path: '/classInfo',
      router: (req, res, next) =>{
        countDao.findAllClass(req, res, next);
      }

   }
];

module.exports = login;