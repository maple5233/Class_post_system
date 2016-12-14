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
                                <el-button type="primary" @click="login()">登 录</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <el-row type="flex">
                            <el-col :span="24" justify="center">
                                <el-form-item label="" prop="rstudentName">
                                    <el-input placeholder="请输入姓名" v-model="userForm.rstudentName"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="rstudentPass">
                                    <el-input placeholder="请输入密码" type="password" v-model="userForm.rstudentPass"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="rrstudentPass">
                                    <el-input placeholder="再输入密码" type="password" v-model="userForm.rrstudentPass"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="">
                                    <el-select v-model="userForm.rstudentClass" placeholder="请选择班级">
                                        <el-option v-for="classop in classops" :label="classop.className" :value="classop.classId"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" @click="register()">注 册</el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-form>
    </div>
</template>
<script>
import getClassService from '../service/getClassService'
import authService from '../service/authService'
import store from '../store'
/**
 * 权限等级转角色等级
 * @param  {Number} rank 权限等级
 * @return {Number}      角色等级
 */
let rankToRole = (rank) => {
    let _rank = [
        0, // 普通学生
        2, // 课代表 00010
        6, // 学习委员 00110
        14, // 团支书 01110
        31 // 班长 11111
    ];
    for (let i = _rank.length - 1; i >= 0; i--) {
        if (_rank[i] <= rank) {
            return i;
        }
    }
}
export default {
    data() {
            return {
                title: 'login',
                activeName: 'login',
                classops: [],
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
                    }]
                }
            };
        },
        mounted() {
            getClassService.getClass().then((response) => {
                    if (response.data.code == '0') {
                        this.classops = response.data.data.classes;
                    } else {
                        // code     msg
                        // 9001A   班级不存在
                        // 9002B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        methods: {
            iNotify(title, content) {
                this.$notify({
                    title: title,
                    message: content
                });
            },
            register() {
                if (this.userForm.rstudentPass != this.userForm.rrstudentPass) {
                    this.iNotify('错误', '两次密码输入的不一样！请重新输入！');
                    this.userForm.rstudentPass = '';
                    this.userForm.rrstudentPass = '';
                    comment.test();
                    return;
                }
                var user = {
                    studentName: this.userForm.rstudentName,
                    studentPass: this.userForm.rstudentPass,
                    classId: this.userForm.rstudentClass
                };
                authService.register(user).then((response) => {
                        if (response.data.code == '0') {
                            this.iNotify('注册成功', '请记住你的学号：' + response.data.data.studentId);
                        } else {
                            // code     msg
                            // 9001A   班级不存在
                            // 9002B   未知错误
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            login() {
                var auth = {
                    studentId: this.userForm.studentId,
                    studentPass: this.userForm.studentPass,
                };
                authService.login(auth).then((response) => {
                        if (response.data.code == '0') {
                            this.iNotify('登录成功', '欢迎回来！');
                            var studentRole = rankToRole(response.data.data.studentRank);
                            var realauth = {
                                token: response.data.token,
                                classId: response.data.data.classId,
                                className: response.data.data.className,
                                studentId: response.data.data.studentId,
                                studentName: response.data.data.studentName,
                                studentRole: studentRole,
                                teacherId: response.data.data.teacherId
                            };
                            store.dispatch('saveAuth', realauth);
                            this.$router.push('/meeting');
                        } else {
                            // code     msg
                            // 9001A   班级不存在
                            // 9002B   未知错误
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
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
</style>
