<template>
  <div id="app">
    <PageHeader/>
    <router-view></router-view>
    <PageFooter/>
  </div>
</template>

<script>
// import Login from './pages/Login.vue'
// import PageHeader from './components/PageHeader.vue'
// import PageFooter from './components/PageFooter.vue'
export default {
  data () {
    return {
      
    }
  },
  components:{
    // Login,PageHeader,PageFooter
  },
  methods: {
    
  }
}
</script>

<style>
*
{
  margin:0;
  padding: 0;
}
 
ul,li
{
  list-style: none;
}
a
{
  text-decoration:none;
}
html
{
  min-height: 100%;
  position: relative;
}
h1,h2,h3,h4{
  font-weight: 300;
}
body
{
  font-family:Microsoft YaHei;
  overflow: auto;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  padding-bottom: 3rem;
  min-height: 100%;
}
*:focus { outline: none; }
.clear{clear:both; height: 0; line-height: 0; font-size: 0}
</style>
