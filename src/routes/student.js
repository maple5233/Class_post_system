"use strict";

const studentDao = require ('../dao/studentDao');
let student = {};

student.$routers = [
    { // 获取学生列表
        method: 'get',
        path: '/students',
        router: (req, res) => {
            console.log ('students');
            studentDao.getList (req, res);
        }
    },
    {
        method: 'post',
        path: '/students/register',
        router: (req, res, next) => {
            studentDao.register (req, res, next);
        }
    },
    {
        method: 'post',
        path: '/students/login',
        router: (req, res, next) => {
            studentDao.tryLogin (req, res, next);
        }
    },
    {
        method: 'post',
        path: '/students/pass',
        router: (req, res, next) => {
            studentDao.updatePass (req, res, next);
        }
    },
    {
        method: 'put',
        path: '/students/role',
        router: (req, res, next) => {
            studentDao.updateRank (req, res, next);
        }
    },
    {
        method: 'put',
        path: '/students/right',
        router: (req, res, next) => {
            studentDao.updateRank (req, res, next);
        }
    }
];

module.exports = student;