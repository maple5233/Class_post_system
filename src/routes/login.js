"use strict";

const studentDao = require ('../dao/studentDao');
const teacherDao = require ('../dao/teacherDao');
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
        method: 'get',
        path: '/teachers/login',
        router: (req, res, next) => {
            teacherDao.tryLogin (req, res, next);
        }
    }
];

module.exports = login;