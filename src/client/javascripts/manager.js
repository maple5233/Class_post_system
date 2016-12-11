'use strict';

let vm = new Vue ({
    el: '#whole',
    data: {
        logined: true,
        teacherMod: true,
        manager: {
            password: ''
        },
        modelSelected: '',
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        },
        teachers: [{
            teacherName: '尹剑飞',
            teacherId: 0,
            teacherPass: '123456'
        },{
            teacherName: '王毅',
            teacherId: 1,
            teacherPass: '123456'
        }],
        form: {
          name: '',
          pass: '',
          id: ''
        },
        index: 0,
        row: null,
        formLabelWidth:'120px',
        editing: false
    },
    methods: {
        /**
         * 切换编辑模式
         */
        changeMod: function () {
            this.teacherMod = this.modelSelected === '管理学生账号'
        },
        /**
         * 登录   
         * @return {Boolean} [登录是否成功]
         */
        tryLogin : function () {
            this.$refs.manager.validate((valid) => {
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
            this.$refs.manager.resetFields();
        },
        /**
         * 弹出编辑某个老师或者学生的框
         * @param  {Number} index 索引
         * @param  {Object} row   老师或者学生对象
         */
        handleEdit: function (index, row) {
            this.index = index;
            this.row = row;
            this.editing = true
        },
        /**
         * 删除某个老师或者学生
         * @param  {Number} index 索引
         * @param  {Object} row   老师或者学生对象
         */
        handleDelete: function(index, row) {
            let name = this.teacherMod ? row.teacherName : row.studentName;
            let arr = this.teacherMod ? this.teachers : this.students;
            this.$confirm('此操作将永久删除' + name + '，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                arr.splice(index,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        /**
         * 编辑某个老师或者学生
         */
        editSomeone: function(){
            if (this.teacherMod) {
                this.teachers[this.index].teacherName = this.form.name
                this.teachers[this.index].teacherPass = this.form.pass
                this.editing = false
            }
        },
        /**
         * 关闭编辑框
         */
        closeFromBox: function () {
            this.editing = false
        }
    }
})