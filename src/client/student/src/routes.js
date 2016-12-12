import App from './App.vue'
import notFound from './components/notFound.vue'
import loginLayout from './components/loginLayout.vue'
import postLayout from './components/postLayout.vue'
import viewContainer from './components/viewContainer.vue'

export default [{
    path: '/',
    name: 'home',
    redirect: 'meeting',
    component: viewContainer,
    meta: {
        requiresAuth: false,
    },
    children: [{
        path: 'login',
        name: 'login',
        component: loginLayout,
        meta: {
            requiresAuth: false,
        },
    }, {
        path: 'meeting',
        name: 'meeting',
        component: postLayout,
        meta: {
            requiresAuth: false,
        },
    }, {
        path: 'fee',
        name: 'fee',
        component: postLayout,
        meta: {
            requiresAuth: false,
        },
    }, {
        path: 'goodStudent',
        name: 'goodStudent',
        component: postLayout,
        meta: {
            requiresAuth: false,
        },
    }, {
        path: 'checkIn',
        name: 'checkIn',
        component: postLayout,
        meta: {
            requiresAuth: false,
        },
    }]
}, {
    path: '*',
    name: '404',
    component: notFound,
    meta: {
        title: '404 not Found',
        requiresAuth: false,
    },
}, ]
