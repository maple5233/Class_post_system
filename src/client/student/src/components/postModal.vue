<template>
    <div>
        <el-button type="primary" icon="plus" @click="openModal()" class="float-button"></el-button>
        <el-dialog title="发帖" v-model="modalVisible">
            <div class="holder">
                <el-tabs type="card">
                    <el-tab-pane label="班会帖">
                        <el-form :model="classForm">
                            <div class="block">
                                <el-date-picker v-model="classForm.time" type="datetime" placeholder="班会时间">
                                </el-date-picker>
                            </div>
                            <el-form-item label="">
                                <el-input v-model="classForm.place" auto-complete="off" placeholder="班会地点"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="classForm.numPeople" auto-complete="off" placeholder="应到人数"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="classForm.numShow" auto-complete="off" placeholder="实到人数"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="classForm.title" auto-complete="off" placeholder="班会主题"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="classForm.title" auto-complete="off" placeholder="同意名单（学号，以，分隔）"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="党费帖">
                        <el-form :model="feeForm">
                            <div class="block">
                                <el-date-picker v-model="feeForm.time" type="datetime" placeholder="截止日期">
                                </el-date-picker>
                            </div>
                            <el-form-item label="">
                                <el-input v-model="feeForm.howmuch" auto-complete="off" placeholder="金额"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="feeForm.list" auto-complete="off" placeholder="缴费名单（学号，以，分隔）"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="评优帖">
                        <el-form :model="goodForm">
                            <el-form-item label="">
                                <el-input v-model="goodForm.good_student" auto-complete="off" placeholder="评优获得者"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="goodForm.title" auto-complete="off" placeholder="头衔"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="goodForm.howmuch" auto-complete="off" placeholder="奖金数额"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="考勤帖">
                        <el-form :model="checkForm">
                            <el-form-item label="">
                                <el-input v-model="checkForm.bad_student" auto-complete="off" placeholder="缺勤人"></el-input>
                            </el-form-item>
                            <div class="block">
                                <el-date-picker v-model="checkForm.time" type="datetime" placeholder="缺勤日期">
                                </el-date-picker>
                            </div>
                            <el-form-item label="">
                                <el-input v-model="checkForm.course_name" auto-complete="off" placeholder="缺勤课程"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal()">取 消</el-button>
                <el-button type="primary" @click="closeModal()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {
                classForm: {
                    time: '',
                    place: '',
                    numPeople: '',
                    numShow: '',
                    title: '',
                    list: ''
                },
                feeForm: {
                    time: '',
                    howmuch: '',
                    list: ''
                },
                goodForm: {
                    good_student: '',
                    title: '',
                    howmuch: ''
                },
                checkForm: {
                    bad_student: '',
                    time: '',
                    course_name: ''

                },
                modalVisible: false
            }
        },
        methods: {
            openModal: function() {
                this.modalVisible = true;
            },
            closeModal: function() {
                this.modalVisible = false;
            }
        }
}
</script>
<style scoped>
.float-button {
    position: fixed;
    right: 50px;
    bottom: 60px;
    width: 60px;
    height: 60px;
    border-radius: 100px;
    z-index: 2000;
}

.el-form-item {
    width: 85%;
    margin: 1rem auto;
}

.el-dialog__title {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
}

.holder {
    width: 85%;
    margin: 0 auto;
}

.holder .el-tabs {
    display: block;
    width: 80%;
    margin: 0 auto;
}

.el-input {
    display: block;
}

.holder .el-tabs .el-form-item {
    width: 100%;
}
</style>
