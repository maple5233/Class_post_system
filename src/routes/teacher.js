"use strict";

const teacherDao = require ('../dao/teacherDao');
let teacher = {};

teacher.$routers = [
    { // 老师注册
        method: 'post',
        path: '/teachers',
        router: (req, res, next) => {
            teacherDao.add (req, res, next);
        }
    },
    {
        method: 'get',
        path: '/teachers/pass',
        router: (req, res, next)=> {
            console.log ("use strict");
            teacherDao.updatePass (req, res, next);
        }
    }
];

module.exports = teacher;
