<template>
      <div>
            <el-row type="flex" id="content" justify="center">
              <el-col  :xs="24" :sm="20" :md="16" :lg="14">
                  <el-popover ref="comment" placement="bottom-start" width="400">
                     <div v-loading="commentloading" element-loading-text="加载中" style="height: 120px">
                                 
                     </div>
                  </el-popover>
                <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px; font-size: 1.3rem;">{{title}}</span>
                  <el-tag type="primary" class="type-tag">{{type}}</el-tag>
                  <div class="options">
                     <el-tag type="gray" slot="reference">评论 <i class="el-icon-menu"></i></el-tag>
                  </div>
                </div>
                <div >
                  <el-table :data="contentData" style="width: 100%">
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
    data () {
      return {
          type: '党费帖',
          title: '来自洪铭辉',
          contentData: [
               {
                  time: '2016-12-12',
                  howmuch: '￥15'
               }
           ],
           commentloading: true
      };
  },
  methods: {
      open() {
        this.$message('这是一条消息提示');
      }
    }
}
</script>
<style lang="less" >
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
      margin-right:6px;
    }
</style>