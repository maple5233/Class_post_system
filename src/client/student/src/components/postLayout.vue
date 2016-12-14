<template>
    <div>
        <post-modal @addPost="add_Post(arguments)"></post-modal>
        <el-row v-for="postItem in postItems" type="flex" id="content" justify="center">
            <el-col :xs="24" :sm="20" :md="16" :lg="14">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px; font-size: 1.3rem;">{{ postItem.title }}</span>
                        <el-tag type="primary" class="type-tag">{{ postItem.type }}</el-tag>
                        <div class="options">
                            <el-tag type="gray" v-if="show">删除 <i class="el-icon-delete"></i></el-tag>
                            <el-popover placement="bottom-start" width="400">
                                <el-tag type="gray" slot="reference">评论 <i class="el-icon-menu"></i></el-tag>
                                <div v-loading="postItem.commentloading" element-loading-text="加载中" style="min-height: 120px">
                                    <el-card id="comment-card" v-for="commentItem in postItem.commentItems" class="box-card">
                                        <div slot="header">
                                            <span class="comment-author">{{ commentItem.author }}</span>
                                            <div class="options">
                                                <el-tag type="gray" v-if="meetingshow">删除 <i class="el-icon-delete"></i></el-tag>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="comment-content">{{ commentItem.content }}</span>
                                            <span class="comment-time">2016-12-12</span>
                                        </div>
                                    </el-card>
                                    <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="textarea" class="comment-area">
                                    </el-input>
                                    <el-button type="primary" size="small">提 交</el-button>
                                    <el-button type="primary" size="small">重 置</el-button>
                                </div>
                            </el-popover>
                        </div>
                    </div>
                    <div>
                        <el-table :data="postItem.contentData" style="width: 100%">
                            <el-table-column v-for="tableData in postItem.tableDatas" :prop="tableData.prop" :label="tableData.label">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import postModal from './postModal.vue'
import postService from '../service/postService'
import store from '../store'
export default {
    data() {
            return {
                meetingshow: false,
                feeshow: false,
                goodshow: false,
                checkshow: false,
                show: false,
                postItems: [],
                page: 0
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.reload();
            })
        },
        components: {
            postModal
        },
        mounted() {
            var role = store.getters.auth.studentRole;
            if (role == 4) {
                this.meetingshow = true;
                this.feeshow = true;
                this.goodshow = true;
                this.checkshow = true;
            } else if (role == 3) {
                this.feeshow = true;
                this.goodshow = true;
                this.checkshow = true;
            } else if (role == 2) {
                this.goodshow = true;
                this.checkshow = true;
            } else if (role == 1) {
                this.checkshow = true;
            }
        },
        methods: {
            reload: function() {
                this.postItems = [];
                this.page = 0;
                var url = location.href;
                var type = url.substring(url.lastIndexOf('/') + 1, url.length);
                this.loadData(type);
            },
            iNotify(title, content) {
                this.$notify({
                    title: title,
                    message: content
                });
            },
            loadData: function(type) {
                var classId = store.getters.auth.classId;
                var token = store.getters.auth.token;
                switch (type) {
                    case 'meeting':
                        this.show = this.meetingshow;
                        var param = {
                            type: 'postId',
                            classId: 2,
                            page: 0,
                            access_token: token
                        };
                        postService.getpost('meeting', param, token).then((response) => {
                                console.log(response.data);
                                if (response.data.code == '0') {
                                    console.log(response.data.data);
                                    response.data.data.posts.forEach((e) => {
                                        var item = {
                                            post_id: e.postId,
                                            type: '班会帖',
                                            title: '来自学号：' + e.studentId,
                                            contentData: [{
                                                time: e.time,
                                                place: e.place,
                                                num_people: e.numPeople,
                                                num_show: e.numShow,
                                                title: e.title
                                            }],
                                            tableDatas: [{
                                                prop: 'time',
                                                label: ' 班会时间'
                                            }, {
                                                prop: 'place',
                                                label: '地点'
                                            }, {
                                                prop: 'num_people',
                                                label: '应到人数'
                                            }, {
                                                prop: 'num_show',
                                                label: '实到人数'
                                            }, {
                                                prop: 'title',
                                                label: '主题'
                                            }],
                                            commentItems: [{
                                                author: '',
                                                content: ''
                                            }],
                                            commentloading: false
                                        };
                                        this.postItems.push(item);
                                    });
                                } else {
                                    // code     msg
                                    // XXX2A   班级id不存在
                                    // XXX2B   未知错误
                                    this.iNotify('失败', response.data.msg);
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        break;
                    case 'fee':
                        this.show = this.feeshow;
                        var param = {
                            type: 'post_id',
                            classId: classId,
                            page: this.page,
                            access_token: token
                        };
                        postService.getpost('fee', param, token).then((response) => {
                                console.log(response.data);
                                if (response.data.code == '0') {
                                    console.log(response.data.data);
                                    response.data.data.posts.forEach((e) => {
                                        var item = {
                                            post_id: e.postId,
                                            type: '党费帖',
                                            title: '来自学号：' + e.studentId,
                                            contentData: [{
                                                time: e.time,
                                                howmuch: e.howmuch
                                            }],
                                            tableDatas: [{
                                                prop: 'time',
                                                label: ' 时间'
                                            }, {
                                                prop: 'howmuch',
                                                label: '金额'
                                            }],
                                            commentItems: [],
                                            commentloading: false
                                        };
                                        this.postItems.push(item);
                                    });
                                } else {
                                    // code     msg
                                    // XXX2A   班级id不存在
                                    // XXX2B   未知错误
                                    this.iNotify('失败', response.data.msg);
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        break;
                    case 'goodStudent':
                        this.show = this.goodshow;
                        var param = {
                            type: 'post_id',
                            classId: classId,
                            page: this.page,
                            access_token: token
                        };
                        postService.getpost('goodStudent', param, token).then((response) => {
                                console.log(response.data);
                                if (response.data.code == '0') {
                                    response.data.data.posts.forEach((e) => {
                                        var item = {
                                            post_id: e.postId,
                                            type: '评优帖',
                                            title: '来自学号：' + e.studentId,
                                            contentData: [{
                                                good_student: e.goodStudent,
                                                title: e.title,
                                                howmuch: e.howmuch
                                            }],
                                            tableDatas: [{
                                                prop: 'good_student',
                                                label: '获奖人'
                                            }, {
                                                prop: 'title',
                                                label: '头衔'
                                            }, {
                                                prop: 'howmuch',
                                                label: '奖金数额'
                                            }],
                                            commentItems: [],
                                            commentloading: false
                                        };
                                        this.postItems.push(item);
                                    });
                                } else {
                                    // code     msg
                                    // 4002A   班级id不存在
                                    // 4002A   未知错误
                                    if (response.data.code == '4002A') {
                                        this.iNotify('失败', '你的班级还没有发过评优帖！');
                                    }
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        break;
                    case 'checkIn':
                        this.show = this.checkshow;
                        var param = {
                            type: 'post_id',
                            classId: classId,
                            page: this.page,
                            access_token: token
                        };
                        postService.getpost('checkIn', param, token).then((response) => {
                                console.log(response.data);
                                if (response.data.code == '0') {
                                    response.data.data.posts.forEach((e) => {
                                        var item = {
                                            post_id: e.postId,
                                            type: '考勤帖',
                                            title: '来自学号：' + e.studentId,
                                            contentData: [{
                                                bad_student: e.badStudent,
                                                time: e.time,
                                                course_name: e.courseName,
                                            }],
                                            tableDatas: [{
                                                prop: 'bad_student',
                                                label: ' 缺勤人'
                                            }, {
                                                prop: 'time',
                                                label: '缺勤日期'
                                            }, {
                                                prop: 'course_name',
                                                label: '缺勤课程'
                                            }],
                                            commentItems: [],
                                            commentloading: false
                                        };
                                        this.postItems.push(item);
                                    });
                                } else {
                                    // code     msg
                                    // XXX2A   班级id不存在
                                    // XXX2B   未知错误
                                    this.iNotify('失败', response.data.msg);
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        break;
                }
            },
            add_Post: function(goodStudent) {
                goodStudent = goodStudent["0"];
                this.postItems.push({
                    post_id: 1,
                    type: '评优帖',
                    title: '来自学号：' + goodStudent.good_student,
                    contentData: [{
                        good_student: goodStudent.good_student,
                        title: goodStudent.title,
                        howmuch: goodStudent.howmuch
                    }],
                    tableDatas: [{
                        prop: 'good_student',
                        label: '获奖人'
                    }, {
                        prop: 'title',
                        label: '头衔'
                    }, {
                        prop: 'howmuch',
                        label: '奖金数额'
                    }],
                    commentItems: [],
                    commentloading: false
                });
            }
        }
}
</script>
<style lang="less" scoped>
@main-margin: 2rem auto;
#content {
    margin: @main-margin;
    width: 100%;
}

.options {
    float: right;
}

.options .el-tag {
    cursor: pointer;
    margin-left: 2px;
}

.type-tag {
    float: left;
    margin-top: 6px;
    margin-right: 6px;
}

.comment-item {
    width: 100%;
    margin-bottom: 0.5rem;
}

.el-tabs__content {
    word-wrap: break-word; //英文换行
    white-space: pre-wrap; //中文换行
}

.el-tabs--border-card .el-tabs__header {
    background-color: rgba(239, 242, 247, 0.15);
}

.comment-area {
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.el-pagination {
    text-align: right;
    margin-top: 0.5rem;
}

#comment-card {
    margin-bottom: 10px;
}

.comment-author {
    line-height: 28px;
    font-size: 1.3rem;
}

.comment-content {
    display: block;
    line-height: 2.3rem;
    font-size: 1.2rem;
}

.comment-time {
    color: #475669;
}
</style>
