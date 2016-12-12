const studentDao = require ('../dao/studentDao');
let student = {};

student.$routers = [
    { // 获取学生列表
        method: 'get',
        path: '/students',
        router: (req, res) => {
            console.log ('students')
            studentDao.getList (req, res);
        }
    },
    {
        method: 'get',
        path: '/students/register',
        router: (req, res, next) => {
            console.log ('/students/register');
            res.json ({
                a: 1
            })
        }
    }
];

module.exports = student;