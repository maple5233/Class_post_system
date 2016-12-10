import Vue from 'vue'
// import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import store from './store'
import App from './App.vue'
import router from './router'

Vue.use(VueResource)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store:store,
  render: h => h(App)
})
