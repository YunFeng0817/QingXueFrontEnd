<template>
  <div>
    <el-tabs @tab-click="handleClick">
      <el-tab-pane>
        <span slot="label">
          <a>小学</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>小学</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>初中</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a to="">高中</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>大学</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>考研</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>四级</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>六级</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>艺术</a>
        </span>
      </el-tab-pane>
    </el-tabs>
    <list_news :typeName="typeName" :recommends="essays">
    </list_news>
  </div>
</template>

<script>
  import listNews from './listNews'
  import filter from './filter'

  export default {
    name: 'dynamic',
    components: {
      list_news: listNews,
      'el-filter': filter
    },
    data () {
      return {
        typeName: '分类的名字',
        essays: [
          {
            is_course: false,
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            link: 'article',
            name: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...',
            introduction: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...'
          }
        ]
      }
    },
    methods: {
      handleClick (tab, event) {
        this.$router.push({path: 'get', query: {category: tab.$slots.label[0].elm.firstChild.innerHTML}})
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">

</style>
