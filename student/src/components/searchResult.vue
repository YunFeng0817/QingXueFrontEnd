<template>
  <div>
    <back-button>
    </back-button>
    <header-index :is_course="is_course">
    </header-index>
    <br/>
    <label v-if="recommends.length!==0">筛选搜索结果</label>
    <el-filter v-if="recommends.length!==0">
    </el-filter>
    <br/>
    <list-news v-if="recommends.length!==0" :type-name="typeName"
               :recommends="recommends">
    </list-news>
    <p v-else style="text-align: center;font-size:large;">没有筛选到相关内容<br/>可以点击左上角回退按钮查看之前的内容</p>
    <!--下面的这个区块是为了占位-->
    <div style="height: 120px;"></div>
  </div>
</template>

<script>
  import listNews from './listNews';
  import headerIndex from './headerIndex';
  import ElFilter from './filter';
  import axios from '../axios/index';
  import BackButton from './backButton';

  export default {
    name: 'search-result',
    components: {
      'header-index': headerIndex,
      'list-news': listNews,
      ElFilter,
      BackButton
    },
    data () {
      return {
        typeName: '搜索结果',
        recommends: [],
        is_course: this.$router.currentRoute.params.type === 'main'
      }
    },
    watch: {
      '$route' (from, to) {
        this.is_course = this.$router.currentRoute.params.type === 'main';
        this.searchAction();
      }
    },
    created () {
      this.searchAction();
    },
    methods: {
      /**
       * 执行搜索和筛选的动作 ,放在组件的初始和路由发生变化的地方
       */
      searchAction () {
        let type = this.$router.currentRoute.params.type;
        let postMethod = 'post';
        let url = type === 'main' ? '/api/course/search_list/keyword=' : '/api/essay/search/?keyword=';
        let id = [];
        id.push(parseInt(this.$router.currentRoute.params.area));
        id.push(parseInt(this.$router.currentRoute.params.stage));
        id.push(parseInt(this.$router.currentRoute.params.subject));
        let content = {};
        // 接下来的几个判断是 判断 router path是否包含了筛选项的信息，-1是没有筛选项，非负数的数字是相应筛选项的id
        if (id[0] !== -1) {
          content.area = {};
          content.area.id = id[0];
        }
        if (id[1] !== -1) {
          content.stage = {};
          content.stage.id = id[1];
        }
        if (id[2] !== -1) {
          content.subject = {};
          content.subject.id = id[2];
        }
        if (id[0] === -1 && id[1] === -1 && id[2] === -1) {
          postMethod = 'get';
          content = null;
        }
        axios({
          method: postMethod,
          url: url + this.$router.currentRoute.query.key,
          data: content
        })
          .then(function (response) {
            if (response) {
              if (this.is_course) {
                for (let item of response.courses) {
                  item.is_course = this.is_course;
                }
                this.recommends = response.courses;
              } else {
                for (let item of response.essays) {
                  item.is_course = this.is_course;
                }
                this.recommends = response.essays;
              }
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

</style>
