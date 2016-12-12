import Vue from 'vue'
import store from '../store.js'

export default {
    getpost(url, cid, page) {
            return axios.get('/' + url, {
                    params: {
                        type: 'post_id',
                        classId: cid,
                        page: page
                    }
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        post(url, postitem) {
            return axios.post('/' + url, postitem)
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // XXX1A   发帖人id不存在
                        // XXX1B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deletepost(url, postId) {
            return axios.delete('/' + url, {
                    postId: postId
                })
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // XXX3A   帖子id不存在
                        // XXX3B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getAnswer(postKind, postId) {
            return axios.get('/answers', {
                    params: {
                        postKind: postKind,
                        postId: postId
                    }
                })
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // XXX3A   帖子id不存在
                        // XXX3B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        postAnswer(studentId, postKind, postId, content) {
            return axios.post('/answers', {
                    studentId: studentId,
                    postKind: postKind,
                    postId: postId,
                    content: content
                })
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // 7002A    发帖人id不存在
                        // 7002B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteAnswer(answerId) {
            return axios.delete('/answers', {
                    answerId: answerId
                })
                .then(function(response) {
                    console.log(response);
                    if (response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // 7003A    回复帖id不存在
                        // 7003B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
}
