import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from './views/Login.vue'
// import NotFound from './views/NotFound.vue'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

// router.beforeEach((to, from, next) => {
//   if( !to.meta.public){
//     next({path:'/login'})
//   }else{
//     next();
//   }
// })

export default router