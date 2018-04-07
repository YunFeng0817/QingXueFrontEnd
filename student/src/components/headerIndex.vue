<template>
  <div>
    <a>
      <i style="font-size:medium;"></i>
    </a>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-autocomplete
          class="inline-input"
          v-model="searchContent"
          :fetch-suggestions="querySearch"
          placeholder="输入想要搜索的课程或资讯"
          @select="handleSelect"
          clearable="true"
        >
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-button @click="searchLink" style="background-color: #8DE9E8;border: none;" icon="el-icon-search">
    </el-button>
  </div>
</template>

<script>
  import axios from '../axios/index';
  import userMessage from '../store/index';

  export default {
    name: 'header-index',
    props: {
      is_course: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        searchContent: ''
      }
    },
    methods: {
      querySearch (queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll () {
        return [
          {'value': '高中'},
          {'value': '高中三年级'},
          {'value': '初中四年级'},
          {'value': '小学六年级'}
        ];
      },
      handleSelect (item) {
        // console.log(item);
      },
      // 编程式导航 点击按钮使得url变化
      searchLink () {
        /*
        * 此处排除搜索内容是空和空白字符串的情况
        * */
        let result = this.searchContent;
        for (let i = 0; i < this.searchContent.length; i++) {
          result = result.replace(' ', '');
        }

        if (result) {
          let url = this.is_course ? '/api/course/search_list/keyword=' : '/api/essay/search/?keyword=';
          axios({
            method: 'get',
            url: url + this.searchContent
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
                this.$router.push({path: 'search', query: {key: this.searchContent}});
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    mounted () {
      this.restaurants = this.loadAll();
    }

  }
</script>

<style scoped type="text/css" rel="stylesheet">
  div {
    width: 100%;
    height: 100%;
    line-height: 50px;

    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    background-color: #8DE9E8;
  }

  div a {
    flex: 20%;

    text-align: center;
    color: white;
    font-size: 25px;
  }

  div.demo-autocomplete {
    flex: 1 90%;
  }

  div button {
    flex: 0 1 5%;
  }

</style>
