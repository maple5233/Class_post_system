"use strict";

const teacherDao = require ('../dao/teacherDao');
let teacher = {};

teacher.$routers = [
    { // 老师注册
        method: 'post',
        path: '/teachers/register',
        router: (req, res, next) => {
            teacherDao.add (req, res, next);
        }
    },
    {
        method: 'put',
        path: '/teachers/pass',
        router: (req, res, next)=> {
            teacherDao.updatePass (req, res, next);
        }
    },
    {
        method: 'get',
        path: '/teachers',
        router: (req, res, next)=> {
            teacherDao.getAll (req, res, next);
        }
    }
];

module.exports = teacher;
