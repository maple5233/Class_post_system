// 实现与MySQL交互
let mysql = require('mysql');
let $conf = require('../config');
let $sql = require('./teacher');

// 使用连接池，提升性能
let pool  = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封装
let jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.status (500).json ({
			code:'error',
			msg: '操作失败'
		});
	} else {
		res.status (200).json (ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
			// 建立连接，向表中插入值
			// 'INSERT INTO teachers(teacherId, teacherName, teacherPass) VALUES(null,?,?)'
			connection.query($sql.insert, [param.teacherName, param.teacherPass], function(err, result) {
				if(result) {
					result = {
						code: '0',
						msg:'增加成功'
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
				// 释放连接 
				connection.release();
			});
		});
	}
};