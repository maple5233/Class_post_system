import App from './App.vue'
import notFound from './components/notFound.vue'
import loginLayout from './components/loginLayout.vue'
import postLayout from './components/postLayout.vue'

export default [{
    path: '/',
    name: 'home',
    redirect: 'meeting',
    meta: {
        requiresAuth: true,
    },
}, {
    path: '/login',
    name: 'login',
    component: loginLayout,
    meta: {
        requiresAuth: false,
    },
}, {
    path: '/meeting',
    name: 'meeting',
    component: postLayout,
    meta: {
        requiresAuth: true,
    },
}, {
    path: '/fee',
    name: 'fee',
    component: postLayout,
    meta: {
        requiresAuth: true,
    },
}, {
    path: '/goodStudent',
    name: 'goodStudent',
    component: postLayout,
    meta: {
        requiresAuth: true,
    },
}, {
    path: '/checkIn',
    name: 'checkIn',
    component: postLayout,
    meta: {
        requiresAuth: true,
    },
}
}]
