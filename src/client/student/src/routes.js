import App from './App.vue'
import notFound from './components/notFound.vue'
import loginLayout from './components/loginLayout.vue'
import postLayout from './components/postLayout.vue'
import viewContainer from './components/viewContainer.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: viewContainer,
    redirect: 'login',
    meta: {
      requiresAuth: false,
    },
    children:[
      {
        path: 'login',
        name: 'login',
        component: loginLayout,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'test',
        name: 'test',
        component: postLayout,
        meta: {
          requiresAuth: false,
        },
      },
    ]
  },
  {
    path: '*',
    name:'404',
    component: notFound,
    meta: {
      title: '404 not Found',
      requiresAuth: false,
    },
  },
]