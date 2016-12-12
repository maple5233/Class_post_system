const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./answersSql');
const jsonWrite = require ('./utils/writeJson');

let pool = mysql.createPool($conf.mysql);

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


module.exports = {
	add: function (req, res) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			//let param = req.query || req.params;
			let param = req.body || req.query || req.params;
            let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
			// 建立连接，向表中插入值
			//INSERT INTO answers (answerId, studentId, postKind, postId, content, time, isDeleted) VALUES (null,?,?,?,?,?,0)
			connection.query($sql.insert, [param.studentId, param.postKind, param.postId, param.content, time], function(err, result) {
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
            	}else{
                    _result = {
                            code: '7001B',
                            msg: '未知错误'
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


//http://localhost:3000/api/answers?postKind=1&postId =1