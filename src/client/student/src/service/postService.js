import Vue from 'vue'
import store from '../store.js'
import axios from 'axios'

export default {
    // 获取帖子
    getpost(url, param, token) {
            return axios.get('/api/' + url, {
                params: param,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        },
        // 发布帖子
        post(url, postitem, token) {
            return axios.post('/api/' + url, postitem, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        },
        // 删除帖子
        deletepost(url, postId, token) {
            return axios.delete('/api/' + url, {
                postId: postId,
                access_token: token
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        },
        // 获取帖子评论
        getAnswer(postKind, postId, token) {
            return axios.get('/api/answers', {
                params: {
                    postKind: postKind,
                    postId: postId,
                    access_token: token
                }
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        },
        // 发表评论
        postAnswer(studentId, postKind, postId, content, token) {
            return axios.post('/api/answers', {
                studentId: studentId,
                postKind: postKind,
                postId: postId,
                content: content,
                access_token: token
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        },
        // 删除回复
        deleteAnswer(answerId, token) {
            return axios.delete('/api/answers', {
                answerId: answerId,
                access_token: token
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
}
