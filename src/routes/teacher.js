const teacherDao = require ('../dao/teacherDao');
let teacher = {};

teacher.$routers = [
    { // 老师注册
        method: 'get',
        path: '/teachers',
        router: (req, res, next) => {
            teacherDao.add (req, res, next);
        }
    }
];

module.exports = teacher;
