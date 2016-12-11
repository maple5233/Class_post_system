<template>
    <div>
        <el-menu theme="dark" default-active="1" mode="horizontal">
            <div id="logo"></div>
            <div id="sel-menu">
                <router-link to="/"><el-menu-item index="1" id="menu-item">首页</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="2" id="menu-item">班会帖</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="3" id="menu-item">班费帖</el-menu-item></router-link>
                <router-link to="/"><el-menu-item index="4" id="menu-item">评优帖</el-menu-item></router-link>
                <router-link to="/test"><el-menu-item index="5" id="menu-item">考勤帖</el-menu-item></router-link>
                <el-submenu index="6" id="menu-item">
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
<style  lang="less">
    @menu-height: 80px;

    #sel-menu{
        float: right;
        margin-right: 9%;
    }
    a > #menu-item:hover {
        border-bottom: 5px solid #20a0ff;
    }
    #menu-item, #menu-item > .el-submenu__title{
        height: @menu-height;
        line-height: @menu-height;
    }
</style>