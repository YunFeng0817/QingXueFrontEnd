<template>
  <list-news :type-name="typeName">
  </list-news>
</template>

<script>
  import listNews from './listNews'

  export default {
    name: 'search-result',
    components: {
      'list-news': listNews
    },
    data () {
      return {
        typeName: '搜索结果'
      }
    }
  }
</script>

<style scoped>

</style>
