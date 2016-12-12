"use strict";

const mysql = require ('mysql');
const $conf = require ('../config');
const $sql = require ('./studentSql');
const jsonWrite = require ('./utils/writeJson');
const jwt = require ('jwt-simple');
const moment = require ('moment');

let pool = mysql.createPool ($conf.mysql);

module.exports = {
    getList: function (req, res) { // 获取学生列表
        pool.getConnection (function (err, connection) {
            let param = req.query || req.params;
            let startPage = param.page * 20;
            let endPage = (param.page + 1) * 20;
            let $querySql, $value, students = {};
            if (param.teacherId == 0) {
                $querySql = $sql.getListByAdmin;
                $value = [ param.type, startPage, endPage ];
            } else {
                $querySql = $sql.getList;
                $value = [ param.teacherId, param.type, startPage, endPage ];
            }
            $querySql = mysql.format ($querySql, $value);
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    console.log ("findStudent:" + result);
                    if (result == "") {
                        _result = {
                            code: '1005A',
                            data: {
                                students: result
                            },
                            msg: '老师工号不存在'
                        }
                    } else {
                        _result = {
                            code: '0',
                            data: {
                                students: result
                            },
                            msg: '查找成功'
                        }
                    }
                    jsonWrite (res, _result);
                    connection.release ();
                } else {
                    _result = {
                        code: '1005B',
                        msg: '未知错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    },
    register: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            let param = req.query || req.body || req.params;
            let classId = param.classId;
            let studentName = param.studentName;
            let studentPass = param.studentPass;
            let $querySql = $sql.register;
            let $value = [ studentName, studentPass, classId ];
            $querySql = mysql.format ($querySql, $value);
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    if (result == "") {
                        _result = {
                            code: '1001A',
                            data: {
                                students: result
                            },
                            msg: '班级号不存在'
                        }
                    } else {
                        _result = {
                            code: '0',
                            data: {
                                studentId: result.insertId
                            },
                            msg: '查找成功'
                        }
                    }
                    jsonWrite (res, _result);
                    connection.release ();
                } else {
                    _result = {
                        code: '1001B',
                        msg: '未知错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    },
    tryLogin: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            let param = req.query || req.body || req.params;
            let studentId = param.studentId;
            let studentPass = param.studentPass;
            let $querySql = $sql.tryLogin;
            let $value = [ studentId ];
            let ClassNameSql = $sql.getClassNameByClassId;
            $querySql = mysql.format ($querySql, $value);
            let className, teacherId;
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    if (result.length === 0) {
                        _result = {
                            code: '1002A',
                            data: {
                                result: result
                            },
                            msg: '学号不存在'
                        }
                        jsonWrite (res, _result);
                        connection.release ();
                    } else {
                        result = result[ 0 ];
                        if (studentPass != result.studentPass) {
                            _result = {
                                code: '1002B',
                                data: {},
                                msg: '密码不对'
                            };
                            jsonWrite (res, _result);
                            connection.release ();
                        } else {
                            ClassNameSql = mysql.format (ClassNameSql, result.classId);
                            connection.query (ClassNameSql, function (err, __result) {
                                if (err) {
                                    _result = {
                                        code: '1002C',
                                        msg: '未知错误'
                                    };
                                }
                                if (__result.length === 0) {
                                    _result = {
                                        code: '1002C',
                                        msg: '没这个班级'
                                    };
                                }
                                className = __result[ 0 ].className;
                                teacherId = __result[ 0 ].teacherId;
                                // 用户登录后根据id生成token
                                let expires = moment ().add (7, 'days').valueOf ();
                                let token = jwt.encode ({
                                    iss: result.studentId,
                                    exp: expires
                                }, 'maple5233');
                                // 发回客户端
                                _result = {
                                    code: '0',
                                    data: {
                                        studentId: result.studentId,
                                        studentName: result.studentName,
                                        studentRank: result.studentRank,
                                        classId: result.classId,
                                        className: className,
                                        teacherId: teacherId
                                    },
                                    token: token,
                                    msg: '查找成功'
                                };
                                jsonWrite (res, _result);
                                connection.release ();
                            });
                        }
                    }
                } else {
                    _result = {
                        code: '1002C',
                        msg: '未知错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    },
    getStudentByToken: function (id, req) {
        pool.getConnection (function (err, connection) {
            let $querySql = $sql.getStudentById;
            let $value = [ id ];
            $querySql = mysql.format ($querySql, $value);
            let student;
            connection.query ($querySql, function (err, result) {
                if (err) {
                    console.log (err);
                    return null;
                } else {
                    if (result == "") {
                        console.log ("找不到这个学生");
                        return null;
                    }
                    result = result[ 0 ];
                    req.query.student = result;
                }
            });
        });
    },
    updatePass: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            let param = req.query || req.body || req.params;
            let studentId = param.studentId;
            let studentPass = param.studentPass;
            let $querySql = $sql.updatePass;
            let $value = [ studentPass, studentId ];
            $querySql = mysql.format ($querySql, $value);
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    if(result.affectedRows >= 1 ){
                        _result = {
                            code : '0'
                        }
                    }
                    jsonWrite (res, _result);
                    connection.release ();
                } else {
                    _result = {
                        code: '-1',
                        msg: '数据库错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    }
};

//http://localhost:3000/api/students?teacherId=1&type=studentId&page=0