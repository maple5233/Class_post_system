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
/**
 * 权限等级转权限数组
 * @param  {Number} rank 权限等级
 * @return {[String]}    权限数组
 */
let rankToPower = (rank) => {
  let powers = rank.toString(2).split('');
  while (powers.length<5) {
    powers.unshift('0');
  }
  return powers;
}

/**
 * 职位等级转权限数组
 * @param  {Number} rank 角色职位等级
 * @return {[String]}    权限数组
 */
let roleToPower  = (role) => {
  return rankToPower(roleToRank(role));
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
            role: 4,                 // 角色等级(通过studentRank计算得到)
            powers: ['1', '1', '1', '1', '1'], // 实际权限数组（计算得到）
            rolePowers: ['1','1','1','1','1']    // 职位权限数组（计算得到）
        },{
            studentId: 1,           // 学号
            studentName: '徐胜倩',  // 姓名
            studentRank: 14,        // 权限等级
            role: 3,                 // 角色等级(通过studentRank计算得到)
            powers: ['0', '1', '1', '1', '0'], // 实际权限数组（计算得到）
            rolePowers: ['0','1','1','1','0']    // 职位权限数组（计算得到）
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
                    this.$message('登录成功');
                    return true
                } else {
                    this.$message.error('您的输入有误');
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
        changeStudentRole: function (index,role) {
          let student = this.students[index];
          student.role = role;
          student.studentRank = roleToRank(role);
          student.powers = rankToPower(student.studentRank);
          student.rolePowers = student.powers
            /**
             * 根据学生id更新后台数据
             */
        },
        changePower: function (index,power) {

          let student = this.students[index];

          let hasAuthor = (student.powers[power] == 1); // 原本有没有这个权限
          student.powers[power] = hasAuthor ? '0':'1';

          if(!hasAuthor) { // 增加权限
            student.studentRank += getPowerTwo(power);
          } else {                      // 权限缩水
            student.studentRank -= getPowerTwo(power);
          }
          
          student.rolePowers = roleToPower(student.role)
           /**
             * 根据学生id更新后台数据
             */
        },
        /**
         * 切换编辑模式
         */
        changeMod: function () {
          this.roleMod = event.target._value === '授予学生职位'
        }
    }
})