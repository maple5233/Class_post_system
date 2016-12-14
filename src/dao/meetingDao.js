const mysql = require('mysql');
const $conf = require('../config');
const $sql = require('./meetingSql');
const jsonWrite = require('./utils/writeJson');

let pool = mysql.createPool($conf.mysql);

module.exports = {
    add: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            let param = req.body || req.query || req.params;
            //let param = req.query || req.params;
            let list = param.list,
                _result;
            // 建立连接，向表中插入值
            // (postId, studentId, time, place, numPeople, numShow, title, isDeleted) VALUES (null,?,?,?,?,?,?,0)',
            connection.query($sql.insert, [param.studentId, param.time, param.place, param.numPeople, param.numShow, param.title], function(err, result) {
                if (result) {
                    console.log("insertPost:" + result);
                    _result = {
                        code: '0',
                        data: {
                            postId: result.insertId,
                        },
                        msg: '增加成功'
                    };
                    //插入同意信息关系表
                    list.forEach(item => {
                        //INSERT INTO agree_infos (agreeInfoId, studentId, postId, agreeInfo) VALUES(null, ?,?,?)
                        connection.query($sql.insertAgree, [item.studentId, result.insertId, item.agreeInfo], function(err, ret) {
                            console.dir(ret);
                        });
                    });

                }
                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, _result);
                // 释放连接 
                connection.release();
            });
        });
    },
    find: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            console.log("find");
            let param = req.query || req.params;
            let startPage = param.page * 20,
                endPage = (param.page + 1) * 20;
            let _result, agreeId, disagreeId;
            connection.query($sql.findAll, [param.classId, param.type, startPage, endPage], function(err, result) {
                if (result) {
                    console.log("findPost:" + result);
                    if (result == "") {
                        _result = {
                            code: '3002A',
                            msg: '班级id不存在'
                        }
                        jsonWrite(res, _result);
                        connection.release();
                    } else {
                        let postRes = result;
                        for (let i = 0; i < postRes.length; i++) {
                            connection.query($sql.findAgree, [postRes[i].postId], function(err, ret) {
                                if (ret == undefined || ret == "") {
                                    agreeId = [];
                                } else {
                                    agreeId = ret
                                }
                                postRes[i].agreeId = agreeId;
                                if (i == postRes.length - 1) {
                                    _result = {
                                        code: '0',
                                        data: {
                                            posts: postRes
                                        }
                                    }
                                    jsonWrite(res, _result);
                                    connection.release();
                                }
                            });
                        }
                    }

                } else {
                    _result = {
                        code: '3002B',
                        msg: '未知错误'
                    }
                    jsonWrite(res, _result);
                    connection.release();
                }
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            //let param = req.query || req.params;
            let param = req.body;
            connection.query($sql.delete, [param.postId], function(err, result) {
                if (result.affectedRows) {
                    console.log("deletePost:" + result.affectedRows);
                    _result = {
                        code: '0',
                        msg: '删除成功'
                    }
                    jsonWrite(res, _result);
                    connection.release();
                } else {
                    console.log("deletePost:" + result.affectedRows);
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


//http://localhost:3000/api/meeting?studentId=1&time=2016-12-01 00:00:01& place=南区&numPeople=40&numShow=30&title=班会
//http://localhost:3000/api/meeting?postId=1
//http://localhost:3000/api/meeting?classId=1&page=0&type=postId
