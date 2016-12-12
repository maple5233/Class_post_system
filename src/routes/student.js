const studentDao = require('../dao/studentDao');
let student = {};

student.$routers = [
	{
		method:'post',
		path: '/students/register',
		routers: (req,res,next) => {
			console.log('/students/register');
		}
	},
    { // 获取学生列表
        method: 'get',
        path: '/students',
        router: (req, res) => {
            studentDao.getList(req, res);
        }
    }
];

module.exports = student;