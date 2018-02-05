<template>
  <div id="main">
    <header-index>
    </header-index>
    <slider :showImages="showImages">
    </slider>
    <ul v-if="is_main">
      <icon v-for='item in items' v-bind:category_tag="item" :key="item.id">
      </icon>
    </ul>
    <el-carousel :interval="5000" arrow="never" height="35px" indicator-position="none">
      <el-carousel-item class="head-line" v-for="item in showMessages" v-bind:key="item.id">
        <div class="head-line">
          <router-link :to="item.link">{{item.message}}</router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-filter v-if="!is_main" @filterOn="getFilter">
    </el-filter>
    <list_news :typeName="typeName" :recommends="recommends">
    </list_news>
    <!--下面的这个区块是为了占位-->
    <div style="height: 120px;"></div>
  </div>
</template>

<script>
  import icon from './icon';
  import listNews from './listNews';
  import filter from './filter';
  import headerIndex from './headerIndex';
  import slider from './slider';
  import axios from '../axios/index';
  import userMessage from '../store/index';

  export default {
    name: 'Main',
    components: {
      'el-filter': filter,
      icon: icon,
      list_news: listNews,
      'header-index': headerIndex,
      slider: slider
    },
    mounted () {
      console.log(this.$router.currentRoute.path);
      if (userMessage.state.listCourses.length === 0 && (this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main')) {
        axios({
          method: 'get',
          url: '/course/brief_list/'
        })
          .then(function (response) {
            if (response) {
              for (let item of response.courses) {
                item.is_course = true;
              }
              this.recommends = response.courses;
              userMessage.commit('commitList', response.courses);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.recommends = userMessage.state.listCourses;
      }
    },
    data () {
      return {
        typeName: '课程推荐',
        is_main: this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main',
        items: [
          {message: '幼儿', iconType: 'am-success am-icon-child'},
          {message: '小学', iconType: 'am-primary am-icon-female'},
          {message: '初中', iconType: 'am-warning am-icon-male'},
          {message: '高中', iconType: 'am-success am-icon-fort-awesome'},
          {message: '大学', iconType: 'am-danger am-icon-graduation-cap'},
          {message: '留学', iconType: 'am-warning am-icon-institution'},
          {message: '职业技能', iconType: 'am-danger am-icon-signal'},
          {message: '讲座活动', iconType: 'am-primary am-icon-rocket'},
          {message: '文艺', iconType: 'am-warning am-icon-paint-brush'},
          {message: '体育', iconType: 'am-primary am-icon-bicycle'}
        ],
        showImages: [
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-4.jpg',
            link: ''
          }
        ],
        showMessages: [
          {
            message: '王**老板黄鹤带着小姨子跑路啦!!!',
            link: '/dynamic'
          },
          {
            message: '原价200元的皮包现在通通20块',
            link: '/dynamic'
          }
        ],
        recommends: []
      }
    },
    watch: {
      '$route' (to, from) {
        this.is_main = this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main';
      }
    },
    methods: {
      getFilter (event) {
        console.log(event);
        this.recommends = event;
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: center;

    padding: 0;
    margin: 3% 0;
  }

  .head-line {
    display: table;
    /*background-color: #66b1ff;*/
    /*opacity: 0.8;*/
  }

  .head-line div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border: 1px solid rgba(195, 195, 195, 0.7);
  }

  a {
    display: block;
    font-size: medium;
    color: black;
  }
</style>
