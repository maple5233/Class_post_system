const mysql = require ('mysql');
const $conf = require ('../config');
const $sql = require ('./studentSql');
const jsonWrite = require('./utils/writeJson');

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
                        let _result = {
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
                    let _result = {
                        code: '1005B',
                        msg: '未知错误'
                    };
                    jsonWrite (res, _result);
                    connection.release ();
                }
            });
        });
    }
};

//http://localhost:3000/api/students?teacherId=1&type=studentId&page=0