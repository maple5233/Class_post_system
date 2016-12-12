import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    // 获取帖子
    getpost(url, cid, page) {
            return axios.get('/api/' + url, {
                    params: {
                        type: 'post_id',
                        classId: cid,
                        page: page
                    }
                })
                .then(function(response) {
                    console.log(response);
                    f(response.body.code == '0') {
                        // do something
                    } else {
                        // code     msg
                        // XXX2A   班级id不存在
                        // XXX2B   未知错误
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // 发布帖子
        post(url, postitem) {
            return axios.post('/api/' + url, postitem)
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
        // 删除帖子
        deletepost(url, postId) {
            return axios.delete('/api/' + url, {
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
        // 获取帖子评论
        getAnswer(postKind, postId) {
            return axios.get('/api/answers', {
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
        // 发表评论
        postAnswer(studentId, postKind, postId, content) {
            return axios.post('/api/answers', {
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
        // 删除回复
        deleteAnswer(answerId) {
            return axios.delete('/api/answers', {
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
