<template>
    <div>
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
                                    <el-tabs v-for="commentItem in postItem.commentItems" type="border-card" class="comment-item">
                                        <el-tab-pane :label="commentItem.author">{{ commentItem.content }}</el-tab-pane>
                                    </el-tabs>
                                    <el-pagination small layout="prev, pager, next" :total="50">
                                    </el-pagination>
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
                            <el-table-column prop="howmuch" label="金额">
                            </el-table-column>
                            <el-table-column prop="time" label="截止日期">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script scoped>
export default {
    data() {
            return {
                postItems: [{
                    post_id: "1",
                    type: '党费帖',
                    title: '来自洪铭辉',
                    contentData: [{
                        time: '2016-12-12',
                        howmuch: '￥15'
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
                    type: '党费帖',
                    title: '来自洪铭辉',
                    contentData: [{
                        time: '2016-12-12',
                        howmuch: '￥15'
                    }],
                    commentItems: [{
                        author: 'Littlesqx',
                        content: '23333333333'
                    }, {
                        author: 'Hjy',
                        content: '6666666666666'
                    }, {
                        author: 'Hjy',
                        content: '6666666666666'
                    }],
                    commentloading: false
                }, {
                    post_id: "3",
                    type: '党费帖',
                    title: '来自洪铭辉',
                    contentData: [{
                        time: '2016-12-12',
                        howmuch: '￥15'
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
                    post_id: "3",
                    type: '党费帖',
                    title: '来自洪铭辉',
                    contentData: [{
                        time: '2016-12-12',
                        howmuch: '￥15'
                    }],
                    commentItems: [{
                        author: 'Littlesqx',
                        content: '23333333333'
                    }, {
                        author: 'Hjy',
                        content: '6666666666666'
                    }],
                    commentloading: false
                }]
            };
        },
        methods: {

        }
}
</script>
<style lang="less">
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
</style>
