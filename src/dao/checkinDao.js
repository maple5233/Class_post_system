const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./checkinSql');

let pool = mysql.createPool($conf.mysql);

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
			//let param = req.query || req.params;
			let param = req.body || req.query || req.params;
			// 建立连接，向表中插入值
			//INSERT INTO check_in_posts (postId, studentId, badStudent, time, courseName, isDeleted) VALUES (null,?,?,?,?,0)',
			connection.query($sql.insert, [param.studentId, param.badStudent, param.time, param.courseName], function(err, result) {
				if(result) {
					console.log("insertPost:"+result);
					_result = {
						code: '0',
						data:{
							postId:result.insertId,
						},
						msg:'增加成功'
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, _result);
				// 释放连接 
				connection.release();
			});
		});
	},
    find: function(req, res, next){
    	pool.getConnection(function(err, connection){
    		let param = req.query || req.params;
    		let startPage = param.page*20;
    		let endPage = (param.page + 1)*20;
            connection.query($sql.findAll, [param.classId, param.type, startPage, endPage], function(err, result){
            	if(result) {
            		console.log("findPost:"+result);
            		if(result==""){
            			_result = {
            				code: '4002A',
            				msg: '班级id不存在'
            			}
            		}else{
            			_result = {
            				code: '0',
            				data: {
            					posts:result
            				},
            				msg: '查找成功'
            			}
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}
            });
    	});
    },
    delete: function(req, res, next){
    	pool.getConnection(function(err, connection){
    		//let param = req.query || req.params;
    		let param = req.body || req.query || req.params;
            connection.query($sql.delete, [param.postId], function(err, result){
            	if(result.affectedRows) {
            		console.log("deletePost:"+result.affectedRows);
            		_result = {
            			code: '0',
            			msg: '删除成功'
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}else{
                    console.log("deletePost:"+result.affectedRows);
                    _result = {
                        code: '4003A',
                        msg: '帖子id不存在'
                    }
                    jsonWrite(res, _result);
                    connection.release();
                }

            });
    	});
    }
};


//http://localhost:3000/api/checkIn?studentId=1&badStudent=1&courseName=软件工程&time=2016:12:12
//http://localhost:3000/api/checkIn?postId=1
//http://localhost:3000/api/checkIn?classId=1&page=0&type=postId