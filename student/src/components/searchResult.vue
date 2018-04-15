<template>
  <div>
    <header-index :is_course="is_course">
    </header-index>
    <el-filter v-if="(is_course?recommends.courses:recommends.essays).length!==0" @filterOn="getFilter">
    </el-filter>
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
  import ElFilter from './filter';
  import axios from '../axios/index';

  export default {
    name: 'search-result',
    components: {
      'header-index': headerIndex,
      'list-news': listNews,
      ElFilter
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
    },
    created () {
      console.log(this.$router.currentRoute.query.key);
    },
    methods: {
      searchAction () {
        let url = this.is_course ? '/api/course/search_list/keyword=' : '/api/essay/search/?keyword=';
        // let type =
        axios({
          method: 'get',
          url: url + this.$router.currentRoute.query.key
        })
          .then(function (response) {
            if (response) {
              if (this.is_course) {
                for (let item of response.courses) {
                  item.is_course = this.is_course;
                }
              } else {
                for (let item of response.essays) {
                  item.is_course = this.is_course;
                }
              }
              response.is_course = this.is_course;
              userMessage.commit('commitSearch', response);
              this.$router.push({path: '/search', query: {key: this.searchContent}});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      getFilter (event) {
        for (let item of event) {
          item.is_course = true;
        }
        this.recommends = event;
      }
    }
  }
</script>

<style scoped>

</style>
