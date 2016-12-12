<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal">
            <div id="logo"><span><i class="el-icon-time"></i> Learn time</span></div>
            <div id="sel-menu" :show="isAuth">
                <router-link to="/meeting">
                    <el-menu-item index="1" id="menu-item">班会帖</el-menu-item>
                </router-link>
                <router-link to="/fee">
                    <el-menu-item index="2" id="menu-item">党费帖</el-menu-item>
                </router-link>
                <router-link to="/goodStudent">
                    <el-menu-item index="3" id="menu-item">评优帖</el-menu-item>
                </router-link>
                <router-link to="/checkIn">
                    <el-menu-item index="4" id="menu-item">考勤帖</el-menu-item>
                </router-link>
                <el-submenu index="5" id="menu-item">
                    <template slot="title">洪狗辉</template>
                    <el-menu-item index="5-1">退出系统</el-menu-item>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
            return {
                isAuth: true
            }
        },
        methods: {

        }
}
</script>
<style lang="less">
@menu-height: 80px;
#sel-menu {
    float: right;
    margin-right: 9%;
}

a > #menu-item:hover {
    border-bottom: 5px solid #20a0ff;
}

#menu-item,
#menu-item > .el-submenu__title {
    height: @menu-height;
    line-height: @menu-height;
}

#logo {
    float: left;
    height: 80px;
    margin-left: 9%;
}

#logo > span {
    line-height: 80px;
    font-size: 2.5rem;
    color: #E5E9F2;
    font-weight: 800;
}
</style>
