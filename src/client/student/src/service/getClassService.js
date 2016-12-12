import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    getClass() {
        return axios.get('/api/classInfo');
    }
}
