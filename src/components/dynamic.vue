<template>
  <div>
    <div class="filter">
      <label>选出你关注的内容</label>
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
  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .filter label{
    margin: 3%;
  }
</style>
