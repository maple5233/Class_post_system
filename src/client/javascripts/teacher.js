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
        31 // 班长 11111
    ];
    return rank[role];
};

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
        31  // 班长 11111
    ];
    for (var i = _rank.length - 1; i >= 0; i--) {
        if (_rank[i] <= rank) {
            return i;
        }
    }
};
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
          _teacherPass: null,
          teacherName: ''
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
        logined: false,              // 是否登录
        roleMod: true,              // 编辑角色模式
        students : [],
        token: null
    },
    methods: {
        /**
         * 登录   
         * @return {Boolean} [登录是否成功]
         */
        tryLogin : function () {
            this.$refs.teacher.validate((valid) => {
                if (valid) {
                    axios.put('/api/teachers/login',{
                      teacherId: this.teacher.teacherId,
                      teacherPass: this.teacher.teacherPass
                    }).then((res)=>{
                        let result = res.data;
                        let success = result.code === '0';
                        if (!success) {
                          this.$message.error(result.msg);
                          return;
                        }
                        this.teacher.teacherName = result.data.teacherName
                        this.$message(this.teacher.teacherName + '您好，您已经登录成功');
                        this.token = result.token;
                        axios.get('/api/students',{
                          params: {
                            teacherId: this.teacher.teacherId,
                            type: 'studentId',
                            page: 0,
                            access_token: this.token
                          }
                        }, {
                          headers: {
                            Authorization: 'Bearer ' + this.token
                          }
                        }).then((res)=>{
                          let result = res.data;
                          this.students = result.data.students
                          for (let i = this.students.length - 1; i >= 0; i--) {
                            this.students[i].role = rankToRole(this.students[i].studentRank);
                            this.students[i].rolePowers = rankToPower(this.students[i].studentRank);
                            this.students[i].powers = roleToPower(this.students[i].role)
                          }
                          this.logined = true
                          return true
                        })
                    })
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

          axios.put('/api/students/role',{
            studentId :  student.studentId,// 学生的id
            studentRank : roleToRank(role),  // 要授予的职位的默认权限值
            access_token: this.token
          }, {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res)=>{
            let result = res.data;
            let success = result.code === '0';
            if (!success) {
              this.$message.error('error')
            } else {
              student.role = role;
              student.studentRank = roleToRank(role);
              student.powers = rankToPower(student.studentRank);
              student.rolePowers = student.powers
              this.roleMod = false
              this.roleMod = true
            }
          }) 
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

          axios.put('/api/students/role',{
            studentId :  student.studentId,// 学生的id
            studentRank : student.studentRank,
            access_token: this.token
          },{
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then((res)=>{
            let result = res.data;
            let success = result.code === '0';
            if (!success) {
              this.$message.error('error')
            } else {
              student.rolePowers = roleToPower(student.role);
              this.roleMod = true;
              this.roleMod = false;
            }
          })
        },
        /**
         * 切换编辑模式
         */
        changeMod: function () {
          this.roleMod = event.target._value === '授予学生职位'
        }
    }
})