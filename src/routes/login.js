"use strict";

const studentDao = require ('../dao/studentDao');
let login = {};

login.$routers = [
    {
        method: 'get',
        path: '/students/login',
        router: (req, res, next) => {
            studentDao.tryLogin(req, res, next);
        }
    }
];

module.exports = login;