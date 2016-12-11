<template>
  <div id="app">
    <header-menu ></header-menu>
    <div class="container">
        <router-view></router-view>
        <float-button></float-button>
    </div>
  </div>
</template>

<script>
  import headerMenu from './components/headerMenu.vue'
  import floatButton from './components/floatButton.vue'

  export default {
    data () {
      return {

      }
    },
    components: {
      headerMenu,floatButton
    },
    methods: {
      
    }
  }
</script>

<style>
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin: 0;
  }
    .container {
      margin: 0 auto;
      padding: 2rem;
    }
</style>
