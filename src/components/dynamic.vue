<template>
  <div>
    <div>
      <el-filter id="filter">
      </el-filter>
    </div>
    <list_news @click.native="essay_link" :typeName="typeName">
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
        typeName: '分类的名字'
      }
    },
    method: {
      essay_link () {
        this.$router.push({path: 'article'});
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">

</style>
