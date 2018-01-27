<template>
  <div>
    <a>
      <i class="el-icon-location-outline"></i>
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
    <el-button @click="searchLink" type="primary" icon="el-icon-search">
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'header-index',
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
          {'value': '三全鲜食（北新泾店）", "address": "长宁区新渔路144号'},
          {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'},
          {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'}
        ];
      },
      handleSelect (item) {
        console.log(item);
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
          this.$router.push({path: 'search', query: {key: this.searchContent}});
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

    background-color: #66b1ff;
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
