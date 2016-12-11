'use strict';

let vm = new Vue ({
    el: '#whole',
    data: {
        logined: false,
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
        }
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
        }
    }
})