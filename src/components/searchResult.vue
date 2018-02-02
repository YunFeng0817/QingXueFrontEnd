<template>
  <div>
    <header-index>
    </header-index>
    <list-news :type-name="typeName">
    </list-news>
  </div>
</template>

<script>
  import listNews from './listNews';
  import headerIndex from './headerIndex';

  export default {
    name: 'search-result',
    components: {
      'header-index': headerIndex,
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
