/**
 * Created by hongjiyao_2014150120 on 16-12-12.
 */

let jsonWrite = function (res, ret) {
    if (typeof ret === undefined) {
        res.status (500).json ({
            code: 'error',
            msg: '操作失败'
        });
    } else {
        res.status (200).json (ret);
    }
};

module.exports = jsonWrite;
