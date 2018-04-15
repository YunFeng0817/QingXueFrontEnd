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
          :placeholder="is_course?'输入课程单关键词':'输入资讯关键字'"
          @select="handleSelect"
          clearable="true"
        >
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-button @click="searchLink" style="background-color: #67E6D1;border: none;" icon="el-icon-search">
    </el-button>
  </div>
</template>

<script>
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
          this.$router.push({
            path: '/search/' + (this.is_course ? 'main/' : 'dynamic/') + '-1/-1/-1/',
            query: {key: this.searchContent}
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

    background-color: #67E6D1;
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
