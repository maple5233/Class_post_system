import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import store from './store.js'

Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
