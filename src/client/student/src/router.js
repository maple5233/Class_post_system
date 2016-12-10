import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from './pages/Login.vue'
// import NotFound from './pages/NotFound.vue'
// import routes from './routes.js'
// import store from './store.js'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if( !to.meta.public ){
    next({path:'/login'})
  }else{
    next();
  }
})

export default router