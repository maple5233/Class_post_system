<template>
    <div>
        <post-modal></post-modal>
        <el-row v-for="postItem in postItems" type="flex" id="content" justify="center">
            <el-col :xs="24" :sm="20" :md="16" :lg="14">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px; font-size: 1.3rem;">{{ postItem.title }}</span>
                        <el-tag type="primary" class="type-tag">{{ postItem.type }}</el-tag>
                        <div class="options">
                            <el-tag type="gray">删除 <i class="el-icon-delete"></i></el-tag>
                            <el-popover placement="bottom-start" width="400">
                                <el-tag type="gray" slot="reference">评论 <i class="el-icon-menu"></i></el-tag>
                                <div v-loading="postItem.commentloading" element-loading-text="加载中" style="min-height: 120px">
                                    <el-card id="comment-card" v-for="commentItem in postItem.commentItems" class="box-card">
                                        <div slot="header">
                                            <span class="comment-author">{{ commentItem.author }}</span>
                                            <div class="options">
                                                <el-tag type="gray">删除 <i class="el-icon-delete"></i></el-tag>
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
export default {
    data() {
            return {
                postItems: []
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
        methods: {
            reload: function() {
                this.postItems = [];
                var url = location.href;
                var type = url.substring(url.lastIndexOf('/') + 1, url.length);
                this.loadData(type);
            },
            loadData: function(type) {
                switch (type) {
                    case 'meeting':
                        this.postItems = [{
                            post_id: "1",
                            type: '班会帖',
                            title: '来自尹剑飞',
                            contentData: [{
                                time: '2016-12-12',
                                place: '教学楼 A211',
                                num_people: '40',
                                num_show: '34',
                                title: '来学习Node！'
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
                                author: 'Littlesqx',
                                content: '23333333333'
                            }, {
                                author: 'Hjy',
                                content: '6666666666666'
                            }],
                            commentloading: false
                        }];
                        break;
                    case 'fee':
                        this.postItems = [{
                            post_id: "1",
                            type: '党费帖',
                            title: '来自巫永健',
                            contentData: [{
                                time: '2016-12-12',
                                howmuch: '￥15'
                            }],
                            tableDatas: [{
                                prop: 'time',
                                label: ' 时间'
                            }, {
                                prop: 'howmuch',
                                label: '金额'
                            }],
                            commentItems: [{
                                author: 'Littlesqx',
                                content: '23333333333'
                            }, {
                                author: 'Hjy',
                                content: '6666666666666'
                            }],
                            commentloading: false
                        }];
                        break;
                    case 'goodStudent':
                        this.postItems = [{
                            post_id: "1",
                            type: '评优帖',
                            title: '来自何鸿杰',
                            contentData: [{
                                good_student: '洪狗辉',
                                title: '三好孩子',
                                howmuch: '1毛钱'
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
                            commentItems: [{
                                author: 'Littlesqx',
                                content: '23333333333'
                            }, {
                                author: 'Hjy',
                                content: '6666666666666'
                            }],
                            commentloading: false
                        }];
                        break;
                    case 'checkIn':
                        this.postItems = [{
                            post_id: "1",
                            type: '考勤帖',
                            title: '来自黄晓壁',
                            contentData: [{
                                bad_student: '洪狗辉',
                                time: '2016-12-12',
                                course_name: '基于web编程',
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
                            commentItems: [{
                                author: 'Littlesqx',
                                content: '23333333333'
                            }, {
                                author: 'Hjy',
                                content: '6666666666666'
                            }],
                            commentloading: false
                        }, {
                            post_id: "2",
                            type: '考勤帖',
                            title: '来自黄晓壁',
                            contentData: [{
                                bad_student: '洪狗辉',
                                time: '2016-12-12',
                                course_name: '基于web编程',
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
                            commentItems: [{
                                author: 'Littlesqx',
                                content: '23333333333'
                            }, {
                                author: 'Hjy',
                                content: '6666666666666'
                            }],
                            commentloading: false
                        }, ];
                        break;
                }
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
