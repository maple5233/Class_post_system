<template>
    <div>
        <el-form :model="userForm" :rules="rules" ref="userForm">
            <el-card class="box-card" id="content">
                <el-tabs :active-name="activeName">
                    <el-tab-pane label="登录" name="login">
                        <el-row type="flex">
                            <el-col :span="24" justify="center">
                                <el-form-item label="" prop="studentId">
                                    <el-input placeholder="请输入学号" v-model="userForm.studentId"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="studentPass">
                                    <el-input placeholder="请输入密码" type="password" v-model="userForm.studentPass"></el-input>
                                </el-form-item>
                                <el-button type="primary">登 录</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <el-row type="flex">
                            <el-col :span="24" justify="center">
                                <el-form-item label="" prop="rstudentName">
                                    <el-input placeholder="请输入学号" v-model="userForm.rstudentName"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="rstudentPass">
                                    <el-input placeholder="请输入密码" type="password" v-model="userForm.rstudentPass"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="rrstudentPass">
                                    <el-input placeholder="再输入密码" type="password" v-model="userForm.rrstudentPass"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="rstudentClass">
                                    <el-select v-model="userForm.rstudentClass" placeholder="请选择班级">
                                        <el-option label="一班" value="1"></el-option>
                                        <el-option label="二班" value="2"></el-option>
                                        <el-option label="三班" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary">注 册</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
            return {
                title: 'login',
                activeName: 'login',
                classops: [{
                    lable: 'class1',
                    value: '1班'
                }, {
                    lable: 'class2',
                    value: '2班'
                }, {
                    lable: 'class3',
                    value: '3班'
                }],
                userForm: {
                    studentId: '',
                    studentPass: '',
                    rstudentName: '',
                    rstudentPass: '',
                    rrstudentPass: '',
                    rstudentClass: ''
                },
                rules: {
                    studentId: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'blur'
                    }],
                    studentPass: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'blur'
                    }],
                    rstudentName: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'blur'
                    }],
                    rstudentPass: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'blur'
                    }, {
                        min: 8,
                        max: 20,
                        message: '长度在 8 到 20 个字符',
                        trigger: 'blur'
                    }],
                    rrstudentPass: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'blur'
                    }, {
                        min: 8,
                        max: 20,
                        message: '长度在 8 到 20 个字符',
                        trigger: 'blur'
                    }],
                    rstudentClass: [{
                        required: true,
                        message: '不能留空',
                        trigger: 'change'
                    }, ]
                }
            };
        },
        methods: {

        }
}
</script>
<style lang="less" scoped>
@center-margin: 0 auto;
#content {
    max-width: 450px;
    margin: 4rem auto;
    padding-bottom: 3.5rem;
    padding-top: 2rem;
}

#content .el-tabs {
    width: 80%;
    margin: @center-margin;
    display: block;
}

#content .el-input {
    margin: @center-margin;
}

#content .el-button {
    width: 100%;
    height: 38px;
}

.el-form-item {
    margin-bottom: 5px;
}
</style>
