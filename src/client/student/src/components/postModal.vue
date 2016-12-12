<template>
    <div>
        <el-button type="primary" icon="plus" @click="openModal()" class="float-button"></el-button>
        <el-dialog title="发帖" v-model="modalVisible">
            <el-form :model="form">
                <el-form-item label="">
                    <el-select v-model="form.type" placeholder="类型">
                        <el-option label="党费帖" value="shanghai"></el-option>
                        <el-option label="评优帖" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="form.name" auto-complete="off" placeholder="待定"></el-input>
                </el-form-item>
            </el-form>
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
                form: {
                    type: ''
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
</style>
