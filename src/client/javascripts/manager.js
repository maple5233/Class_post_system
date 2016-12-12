'use strict';

let vm = new Vue ({
    el: '#whole',
    data: {
        logined: true,
        teacherMod: false,
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
        rules2: {
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
            ]
        },
        teachers: [],
        students: [],
        form: {
          name: '',
          pass: '',
          id: ''
        },
        index: 0,
        row: null,
        formLabelWidth:'120px',
        editing: false,
        adding: false,
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsImV4cCI6MTQ4MjE4MDY1OTkxMH0.hvlUGZJEpzr8MerlB7JMSSpLRkNPppDBOMlvqVA1dCY'
    },
    mounted() {
        this.pullPeople();
    },
    methods: {
        /**
         * 后台拉数据
         */
        pullPeople: function () {
            let result,success;
            axios.get('/api/students',{
                params:{
                    type:'studentId',
                    teacherId: 0,
                    page: 0,
                    access_token: this.token
                }
            }).then((response)=>{
                result = response.data;
                success = result.code === '0';
                if (!success) {
                    this.$message(result.code);
                    return;
                }
                this.students = result.data.students;
            }).catch((error) => {
                this.$message.error(error);
                return;
            });
            axios.get('/api/teachers',{
                params:{
                    access_token: this.token
                }
            }).then(res=>{
                result = res.data;
                success = result.code === '0';
                if (!success) {
                    this.$message(result.code);
                    return;
                }
                this.teachers = result.data;
            }).catch((error) => {
                this.$message.error(error);
                return;
            });
        },
        /**
         * 切换编辑模式
         */
        changeMod: function () {
            this.teacherMod = this.modelSelected !== '管理学生账号'
        },
        /**
         * 登录   
         * @return {Boolean} [登录是否成功]
         */
        tryLogin : function () {
            this.$refs.manager.validate((valid) => {
                if (valid && this.manager.password === 'maple5233') {
                    this.logined = true
                    this.$message('登录成功');
                    return true
                } else {
                    this.$message.error('您的输入有误或者密码错误');
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
            this.editing = true;
            this.adding = false;
            this.resetForm();
        },
        /**
         * 删除某个老师或者学生
         * @param  {Number} index 索引
         * @param  {Object} row   老师或者学生对象
         */
        handleDelete: function(index, row) {
            let name = this.teacherMod ? row.teacherName : row.studentName;
            let arr = this.teacherMod ? this.teachers : this.students;
            console.log(row)
            this.$confirm('此操作将删除' + name + '，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                arr.splice(index,1);
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
         * 
         */
        submitForm: function(){
            /**
             * 因为这个表单是动态渲染的所以无法适配rules
             * 自己做验证
             */
            let name = this.form.name;
            let pass = this.form.pass;
            if (name == null || pass == null) {
                this.$message.error('输入有误!');
                return;
            }
            let goodName = 0<name.length && name.length<12;
            let goodPass = 6<pass.length && pass.length<12;
            if (!goodName || !goodPass) {
                this.$message.error('输入有误!');
                return;
            }
            if (!this.adding) {
                // 编辑某个老师或者学生
                if (this.teacherMod) {
                    axios.put('/api/teachers/pass',{
                        teacherId : this.teachers[this.index].teacherId,
                        teacherPass : this.form.pass,
                        access_token: this.token
                    }).then((res)=>{
                        let result = res.data;
                        let success = result.code === '0';
                        if (!success) {
                            this.$message('error')
                            return
                        }
                        this.$message('修改成功')
                        this.teachers[this.index].teacherName = this.form.name
                        this.teachers[this.index].teacherPass = this.form.pass
                    })
                } else {
                    let that = this;
                    axios.put('/api/students/pass',{
                        studentId : that.students[that.index].studentId,
                        studentPass : that.form.pass,
                        access_token: this.token
                    }).then((res)=>{
                        let result = res.data;
                        console.log(result)
                        let success = result.code === '0';
                        if (!success) {
                            this.$message(result.msg)
                            return
                        }
                        this.students[this.index].studentName = this.form.name
                        this.students[this.index].studentPass = this.form.pass
                        this.$message('修改成功')
                    })
                }
            } else {
                if (this.teacherMod) {
                    axios.post('/api/teachers/register',{
                        teacherName : this.form.name,
                        teacherPass : this.form.pass,
                        access_token: this.token,
                    }).then((res)=>{
                        let result = res.data;
                        let success = result.code === '0';
                        if (!success) {
                            this.$message('error')
                            return
                        }
                        this.$message('增加成功')
                        this.teachers.push({
                            teacherId: result.teacherId,
                            teacherName: this.form.name,
                            teacherPass: this.form.pass
                        });
                    });
                } else {
                    /* ajax */
                    this.students.push({
                        studentId: Math.floor(Math.random()*100),
                        studentName: this.form.name,
                        studentPass: this.form.pass
                    });
                }
            }
            this.editing = false
            this.adding = false
        },
        /**
         * 关闭编辑框
         */
        closeFromBox: function () {
            this.editing = false;
        },
        /**
         * 打开弹出框并设置增加标志
         */
        handleAdd: function () {
            this.editing = true;
            this.adding = true;
            this.resetForm();
        },
        resetForm: function () {
            /* 由于form只在弹出框渲染
            this.$refs.form.resetFields() 无法访问到form */
            this.form = {
                name: null,
                pass: null
            }
        }
    }
})