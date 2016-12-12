const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./answersSql');
const jsonWrite = require ('./utils/writeJson');

let pool = mysql.createPool($conf.mysql);


module.exports = {
	add: function (req, res) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			//let param = req.query || req.params;
			let param = req.body || req.query || req.params;
			// 建立连接，向表中插入值
			//INSERT INTO answers (answerId, studentId, postKind, postId, content, time, isDeleted) VALUES (null,?,?,?,?,?,0)
			connection.query($sql.insert, [param.studentId, param.postKind, param.postId, param.content, param.time], function(err, result) {
				if(result) {
					console.log("insertAnswer:"+result);
					_result = {
						code: '0',
						data:{
							answerId:result.insertId,
						}
					};    
				}
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, _result);
				// 释放连接 
				connection.release();
			});
		});
	},
    find: function(req, res){
    	pool.getConnection(function(err, connection){
    		let param = req.query || req.params;
            connection.query($sql.findAll, [param.postKind, param.postId], function(err, result){
            	if(result) {
            		console.log("findPost:"+result);
            		if(result==""){
            			_result = {
            				code: '7001A',
            				msg: '帖子id不存在'
            			}
            		}else{
            			_result = {
            				code: '0',
            				data: {
            					answers:result
            				}
            			}
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}
            });
    	});
    },
    delete: function(req, res){
    	pool.getConnection(function(err, connection){
    		//let param = req.query || req.params;
    		let param = req.body || req.query || req.params;
            connection.query($sql.delete, [param.answerId], function(err, result){
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
                        code: '7003A',
                        msg: '帖子id不存在'
                    }
                    jsonWrite(res, _result);
                    connection.release();
                }

            });
    	});
    }
};


//http://localhost:3000/api/answers?studentId=1&postKind=1&postId=1&content=有趣&time=2016-12-12
//http://localhost:3000/api/answers?postId=1
//http://localhost:3000/api/answers?classId=1&page=0&type=postId