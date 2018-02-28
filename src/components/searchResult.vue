<template>
  <div>
    <header-index :is_course="is_course">
    </header-index>
    <list-news v-if="(is_course?recommends.courses:recommends.essays).length!==0" :type-name="typeName"
               :recommends="is_course?recommends.courses:recommends.essays">
    </list-news>
    <p v-else style="text-align: center;font-size:large;">没有搜索到相关内容，换个关键词试试呗？</p>
  </div>
</template>

<script>
  import listNews from './listNews';
  import headerIndex from './headerIndex';
  import userMessage from '../store/index';

  export default {
    name: 'search-result',
    components: {
      'header-index': headerIndex,
      'list-news': listNews
    },
    data () {
      return {
        typeName: '搜索结果',
        recommends: userMessage.state.searchResult,
        is_course: userMessage.state.is_course
      }
    },
    watch: {
      '$route' (from, to) {
        this.recommends = userMessage.state.searchResult;
        this.is_course = userMessage.state.is_course;
      }
    }
  }
</script>

<style scoped>

</style>
