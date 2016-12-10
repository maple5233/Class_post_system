<template>
    <div id="content">
      <el-row type="flex">
        <el-col  :xs="24" :sm="20" :md="16" :lg="14" id="post-col">
          <el-card class="box-card" id="post">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{postItem.title}}</span>
            <el-tag style="float: left;margin-top: 6px;margin-right:6px;" type="primary">{{postItem.type}}</el-tag>
          </div>
          <div >
            <p>{{postItem.content}}</p>
          </div>
        </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
          postItem: {
              type: '收费帖',
              title: '这是帖子标题',
              content: '这是帖子内容'
          }
      }
  },
  methods: {
      
  }
}
</script>
<style >
    #content {
      margin: 2rem;
    }
    #post-col{
      margin: 0 auto;
    }
</style>