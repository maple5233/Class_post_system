const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./feeSql');
const jsonWrite = require ('./utils/writeJson');

let pool = mysql.createPool($conf.mysql);

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
            let param = req.body || req.query || req.params;
			// 建立连接，向表中插入值
			//INSERT INTO party_fee_posts (postId, studentId, time, howmuch, isDeleted) VALUES (null,?,?,?,0)
			connection.query($sql.insert, [param.studentId, param.time, param.howmuch], function(err, result) {
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


//http://localhost:3000/api/fee?studentId=1&time=2016-12-12&howmuch=12
//http://localhost:3000/api/fee?postId=1
//http://localhost:3000/api/fee?classId=1&page=0&type=postId