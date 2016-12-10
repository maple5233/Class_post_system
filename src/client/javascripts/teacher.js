'use strict';

var vm = new Vue ({
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
        }
    },
    methods: {
        onSubmit : function () {
            this.$refs.teacher.validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        reset: function() {
            this.$refs.teacher.resetFields();
        }
    }
})