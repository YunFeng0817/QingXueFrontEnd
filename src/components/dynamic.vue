<template>
  <div>
    <list_news :typeName="typeName"></list_news>
  </div>
</template>

<script>
  import listNews from './listNews'
  export default {
    name:'dynamic',
    components:{
      list_news: listNews
    },
    data () {
      return {
        typeName:'分类的名字'
      }
    }
  }
</script>

<style scoped>

</style>
