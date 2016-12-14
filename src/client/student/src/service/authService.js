import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
        login(auth) {
            return axios.put('/api/students/login', auth);
        },
        register(auth) {
            return axios.post('/api/students/register', auth);
        },
        signout() {
            return store.dispatch('clearAuth');
        }
}
