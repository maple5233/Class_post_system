<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal">
            <div id="logo"></div>
            <div id="sel-menu">
                <router-link to="/"><el-menu-item index="1">首页</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="2">班会帖</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="3">班费帖</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="4">评优帖</el-menu-item></router-link>
                <router-link to="/test"><el-menu-item index="5">考勤帖</el-menu-item></router-link>
                <el-submenu index="6">
                    <template slot="title">洪狗辉</template>
                    <el-menu-item index="6-1">退出系统</el-menu-item>
                </el-submenu>
            </div>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data () {
      return {

      }
  },
  methods: {

  }
}
</script>
<style >
    #sel-menu{
        float: right;
        margin-right: 9%;
    }
    #sel-menu > a .el-menu-item:hover, #sel-menu > a .el-submenu.is-active .el-submenu__title, #sel-menu > a .el-submenu:hover .el-submenu__title {
        border-bottom: 5px solid #20a0ff;
    }
</style>