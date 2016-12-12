import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    login(auth) {
            return axios.post('/api/students/login', {
                    studentName: auth.studentId,
                    studentPass: auth.studentPass
                })
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                        store.dispatch('saveAuth', response.body.data);
                    } else {
                        // code     msg
                        // 1002A 学号不存在
                        // 1002B   密码不正确
                        // 1002C   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        register(auth) {
            return axios.post('/api/students/register', {
                    studentName: auth.studentName,
                    studentPass: auth.studentPass,
                    classId: auth.classId
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        signout() {
            return store.dispatch('clearAuth');
        }
}
