const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./countSql');
const jsonWrite = require ('./utils/writeJson');

let pool = mysql.createPool($conf.mysql);

module.exports = {
    find: function(req, res, next){
    	pool.getConnection(function(err, connection){
    		let param = req.query || req.params;
            let _result ={};
            connection.query($sql.getPay, [param.studentId], function(err, result){
            	if(result) {
            		console.log("find:"+result);
            		if(result==""){
            			_result = {
            				code: '0',
            				data: {
            					howMuch:0
            				}
            			}
            		}else{
            			_result = {
            				code: '0',
            				data: {
            					howMuch:result[0]['sum(howmuch)']
            				}
            			}
            		}
            		connection.query($sql.getUnPay, [param.studentId], function(err, result){
            			if(result =="" || result ==undefined){
            				_result.data.howMuchRemain = 0;
            			}else{
            				_result.data.howMuchRemain = result[0]['sum(howmuch)'];

            			}
            			connection.query($sql.getAbsence, [param.studentId], function(err, result){
            				console.dir(result);
            				if(result =="" || result ==undefined){
            					_result.data.daysNotSign = [];
            					_result.data.numOfDayNotSign = 0;
            				}else{
            					_result.data.daysNotSign = result;
            					_result.data.numOfDayNotSign = result.length;
            				}
            				jsonWrite(res, _result);
            		        connection.release();
            			});
            		});
            	}else{
            		_result = {
            			code: '8002B',
            			msg: '学生id不存在'
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}
            });
    	});
    },
    findAllClass: function(req, res, next){
    	pool.getConnection(function(err, connection){
    		let param = req.query || req.params;
            connection.query($sql.getClass, function(err, result){
            	if(result) {
            		console.log("findPost:"+result);
            		if(result==""){
            			_result = {
            				code: '9001A',
            				msg: '班级不存在'
            			}
            		}else{
            			_result = {
            				code: '0',
            				data: {
            					classes:result
            				}            			}
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}else{
            		_result = {
            				code: '9001A',
            				msg: '未知错误'
            		}
            		jsonWrite(res, _result);
            		connection.release();
            	}
            });
    	});
    }
    
};


//http://localhost:3000/api/posts/info?studentId=1