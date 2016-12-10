'use strict';

/**
 * 获取2的乘方
 * @param  {Number} power 多少次方
 * @return {Number}       2^power
 */
let getPowerTwo = (power) => {
    let result = 1;
    while (power--) {
        result *= 2;
    }
    return result;
}
/**
 * 角色等级转权限等级
 * @param  {Number} role 角色等级
 * @return {Number}      权限等级
 */
let roleToRank = (role) => {
    let rank = [
        0,  // 普通学生
        2,  // 课代表 00010
        6,  // 学习委员 00110
        14, // 团支书 01110
        31, // 班长 11111
    ];
    return rank[role];
}

/**
 * 权限等级转角色等级
 * @param  {Number} rank 权限等级
 * @return {Number}      角色等级
 */
let rankToRole = (rank) => {
    let _rank = [
        0,  // 普通学生
        2,  // 课代表 00010
        6,  // 学习委员 00110
        14, // 团支书 01110
        31, // 班长 11111
    ];
    for (var i = _rank.length - 1; i >= 0; i--) {
        if (_rank[i] <= rank) {
            return i;
        }
    }
}

let vm = new Vue ({
    el: '#whole',
    data: {
        modelSelected : '',      // 被选中的编辑模式
        teacher: {
          teacherId: null,
          teacherPass: null,
          _teacherPass: null
        },
        rules: {
          teacherId: [
            { required: true, message: '请输入工号', trigger: 'blur' }
          ],
          teacherPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        },
        logined: true,              // 是否登录
        roleMod: true,              // 编辑角色模式
        students : [{
            studentId: 0,           // 学号
            studentName: '洪继耀',  // 姓名
            studentRank: 31,        // 权限等级
            role: 4                 // 角色等级(通过studentRank计算得到)
        }]
    },
    methods: {
        /**
         * 登录   
         * @return {Boolean} [登录是否成功]
         */
        tryLogin : function () {
            this.$refs.teacher.validate((valid) => {
                if (valid) {
                    this.logined = true
                    return true
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /**
         * 重置登录表单 
         */
        reset: function() {
            this.$refs.teacher.resetFields();
        },
        /**
         * 改变学生的角色
         * @param  {Number} index     学生数组索引号
         * @param  {Number} role      角色等级
         * @param  {Number} studentId 学号
         */
        changeStudentRole : function (index,role) {
            let student = this.students[index]
            student.role = role;
            student.studentRank = roleToRank(role);
            console.log(student.studentRank);
            /**
             * 根据学生id更新后台数据
             */
        }
    }
})