const studentDao = require('../dao/studentDao');
let student = {};

student.$routers = [
    { // 获取学生列表
        method: 'get',
        path: '/students',
        router: (req, res) => {
            studentDao.getList(req, res);
        }
    }
];

module.exports = student;