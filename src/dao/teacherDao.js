// 实现与MySQL交互
let mysql = require ('mysql');
let $conf = require ('../config');
let $sql = require ('./teacherSql');
let jsonWrite = require ('./utils/writeJson');
const jwt = require ('jwt-simple');
const moment = require ('moment');

// 使用连接池，提升性能
let pool = mysql.createPool ($conf.mysql);

module.exports = {
    add: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            var param = req.query || req.body || req.params;
            let _result;
            connection.query ($sql.insert, [ param.teacherName, param.teacherPass ], function (err, result) {
                if (result) {
                    _result = {
                        code: '0',
                        msg: '增加成功'
                    };
                } else {
                    _result = {
                        code: '-1',
                        msg: '数据库错误'
                    }
                }
                jsonWrite (res, _result);
                connection.release ();
            });
        });
    },
    tryLogin: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            let param = req.query || req.body || req.params;
            let teacherId = param.teacherId;
            let teacherPass = param.teacherPass;
            let $querySql = $sql.tryLogin;
            let $value = [ teacherId ];
            $querySql = mysql.format ($querySql, $value);
            let className;
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    if (result.length === 0) {
                        _result = {
                            code: '2001A',
                            data: {
                                result: result
                            },
                            msg: '工号不存在'
                        };
                        jsonWrite (res, _result);
                        connection.release ();
                    } else {
                        result = result[ 0 ];
                        if (teacherPass != result.teacherPass) {
                            _result = {
                                code: '2001B',
                                data: {},
                                msg: '密码不对'
                            };
                            jsonWrite (res, _result);
                            connection.release ();
                        } else {
                            // 用户登录后根据id生成token
                            let expires = moment ().add (7, 'days').valueOf ();
                            let token = jwt.encode ({
                                iss: result.teacherId,
                                exp: expires
                            }, 'maple5233');
                            // 发回客户端
                            _result = {
                                code: '0',
                                data: {
                                    teacherId: result.teacherId,
                                    teacherName: result.teacherName
                                },
                                token: token,
                                msg: '查找成功'
                            };
                            jsonWrite (res, _result);
                            connection.release ();
                        }
                    }
                } else {
                    _result = {
                        code: '2001C',
                        msg: '未知错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    },
    getTeacherByToken: function (id, req) {
        pool.getConnection (function (err, connection) {
            let $querySql = $sql.queryById;
            let $value = [ id ];
            $querySql = mysql.format ($querySql, $value);
            connection.query ($querySql, function (err, result) {
                if (err) {
                    console.log (err);
                    return null;
                } else {
                    if (result == "") {
                        console.log ("不是老师");
                        return null;
                    }
                    result = result[ 0 ];
                    req.query.teacher = result;
                }
            });
        });
    },
    updatePass: function (req, res, next) {
        pool.getConnection (function (err, connection) {
            let param = req.query || req.body || req.params;
            let teacherId = param.teacherId;
            let teacherPass = param.teacherPass;
            let $querySql = $sql.updatePass;
            let $value = [ teacherPass, teacherId ];
            $querySql = mysql.format ($querySql, $value);
            let _result;
            connection.query ($querySql, function (err, result) {
                if (result) {
                    if (result.affectedRows >= 1) {
                        _result = {
                            code: '0'
                        }
                        jsonWrite (res, _result);
                        connection.release ();
                    } else {
                        _result = {
                            code: '-1',
                            msg: '无此工号'
                        };
                        jsonWrite (res, _result);
                        connection.release ();
                    }
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