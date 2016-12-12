let jwt = require ('jwt-simple');
const studentDao = require ('../dao/studentDao');
const teacherDao = require ('../dao/teacherDao');

module.exports = async function (req, res, next) {
    let token = (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers[ 'x-access-token' ];
    // token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTQ4MjEzNjM1MjIyNn0.mXt6sLdzNAxhoqxPSCKmpOvb22COMbjZNthdcIg-Gwg";
    // token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjMsImV4cCI6MTQ4MjE1MDc5MDM2MX0.r3N-4t1_EShSO48rtDOgFavTLahoJWoAYaWkJPIxIvU";
    if (token) {
        try {
            let decoded = jwt.decode (token, "maple5233");
            // handle token here
            if (decoded.exp <= Date.now ()) {
                res.end ('Access token has expired', 400);
            }
            // 访问数据库取出用户信息
            await studentDao.getStudentByToken (decoded.iss, req);
            await teacherDao.getTeacherByToken (decoded.iss, req);
            next();
            // 注意：这里的req可能存在回调问题
        } catch (err) {
            res.status (401).json ({
                code: '-1',
                msg: err
            })
        }
    } else {
        res.status (401).json ({
            code: '-1',
            msg: '未登录!'
        })
    }
};