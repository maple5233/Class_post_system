import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    // 统计学生信息
    // data : { 									// 统计数据
    //        howMuch			// 已经交了多少党费
    //        howMuchRemain 		// 还差多少要交
    //        numOfDayNotSign 		// 旷课总数
    //        daysNotSign 			// 旷课情况
    //  }
    getPersonInfo(studentId) {
        return axios.get('/api/posts/info', {
                params: {
                    studentId: studentId
                }
            })
            .then(function(response) {
                console.log(response);
                if (response.body.code == '0') {
                    // do something
                } else {
                    // code     msg
                    // 1004A   学生不存在
                    // 1004B   未知错误
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
