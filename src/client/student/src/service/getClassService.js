import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    getClass() {
        return axios.get('/api/classInfo')
            .then(function(response) {
                console.log(response);
                if (response.body.code == '0') {
                    // do something
                    store.dis
                } else {
                    // code     msg
                    // 9001A   班级不存在
                    // 9002B   未知错误
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
