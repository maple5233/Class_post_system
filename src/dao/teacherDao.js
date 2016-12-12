// 实现与MySQL交互
let mysql = require ('mysql');
let $conf = require ('../config');
let $sql = require ('./teacherSql');
let jsonWrite = require ('./utils/writeJson');

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
    }
};