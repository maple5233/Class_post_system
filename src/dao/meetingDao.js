const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./meetingSql');
const $wJosn = require('./utils/writeJson');

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
			let param = req.query || req.params;
			// 建立连接，向表中插入值
			// (postId, studentId, time, place, numPeople, numShow, title, isDeleted) VALUES (null,?,?,?,?,?,?,0)',
			connection.query($sql.insert, [param.studentId, param.time, param.place, param.numPeople,param.numShow,param.title], function(err, result) {
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
    		console.log("find");
    		let param = req.query || req.params;
    		let startPage = param.page*20;
    		let endPage = (param.page + 1)*20;
            connection.query($sql.findAll, [param.classId, param.type, startPage, endPage], function(err, result){
            	if(result) {
            		console.log("findPost:"+result);
            		if(result==""){
            			_result = {
            				code: '3002A',
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
    		let param = req.query || req.params;
            connection.query($sql.delete, [param.postId], function(err, result){
            	if(result) {
            		console.log("deletePost:"+result);
            		_result = {
            			code: '0',
            			msg: '删除成功'
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}

            });
    	});
    }
};


//http://localhost:3000/api/meeting?studentId=1&time=2016-12-01 00:00:01& place=南区&numPeople=40&numShow=30&title=班会
//http://localhost:3000/api/meeting?postId=1