<template>
  <div id="main">
    <back-button v-if="!is_main">
    </back-button>
    <header-index :is_course="true">
    </header-index>
    <slider :showImages="showImages">
    </slider>
    <icon v-if="is_main" v-bind:category_tag="items" :row="5">
    </icon>
    <el-carousel :interval="4000" arrow="never" height="35px" indicator-position="none">
      <el-carousel-item class="head-line" v-for="item in showMessages" v-bind:key="item.id">
        <div class="head-line" @click.stop="getEssay(item.id)">
          <a>{{item.title}}</a>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-filter v-if="!is_main" @filterOn="getFilter">
    </el-filter>
    <list_news v-if="recommends.length!==0" :typeName="typeName" :recommends="recommends">
    </list_news>
    <p v-else style="text-align: center;font-size:large;">没有符合条件的课程</p>
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
  import BackButton from './backButton';

  export default {
    name: 'Main',
    components: {
      BackButton,
      'el-filter': filter,
      icon: icon,
      list_news: listNews,
      'header-index': headerIndex,
      slider: slider
    },
    mounted () {
      if (userMessage.state.main.courses === undefined && (this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main')) {
        axios({
          method: 'get',
          url: '/api/common/page_contents/'
        })
          .then(function (response) {
            if (response) {
              for (let item of response.courses) {
                item.is_course = true;
              }
              this.recommends = response.courses;
              this.showMessages = response.essays;
              this.showImages = response.banners;
              userMessage.commit('commitList', response);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      } else if (this.$router.currentRoute.path !== '/' && this.$router.currentRoute.path !== '/main') {
        this.recommends = userMessage.state.firstClass.courses;
        this.showMessages = userMessage.state.firstClass.essays;
        this.showImages = userMessage.state.firstClass.banners;
      } else {
        this.showMessages = userMessage.state.main.essays;
        this.showImages = userMessage.state.main.banners;
        this.recommends = userMessage.state.main.courses;
      }
    },
    data () {
      return {
        typeName: '课程推荐',
        is_main: this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main',
        items: [
          {
            message: '幼儿',
            iconType: 'am-success am-icon-child',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '幼儿'
              ]
            }
          },
          {
            message: '小学',
            iconType: 'am-primary am-icon-female',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '小学'
              ]
            }
          },
          {
            message: '初中',
            iconType: 'am-warning am-icon-male',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '初中'
              ]
            }
          },
          {
            message: '高中',
            iconType: 'am-success am-icon-fort-awesome',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '高中'
              ]
            }
          },
          {
            message: '大学',
            iconType: 'am-danger am-icon-graduation-cap',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '大学'
              ]
            }
          },
          {
            message: '留学',
            iconType: 'am-warning am-icon-institution',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '留学'
              ]
            }
          },
          {
            message: '职业技能',
            iconType: 'am-danger am-icon-signal',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '职业技能'
              ]
            }
          },
          {
            message: '讲座活动',
            iconType: 'am-primary am-icon-rocket',
            url: ' /common/page_contents/',
            data: {
              stages: [
                '讲座活动'
              ]
            }
          },
          {
            message: '文艺',
            iconType: 'am-warning am-icon-paint-brush',
            url: ' /common/page_contents/',
            data: {
              subjects: [
                '文艺'
              ]
            }
          },
          {
            message: '体育',
            iconType: 'am-primary am-icon-bicycle',
            url: ' /common/page_contents/',
            data: {
              subjects: [
                '体育'
              ]
            }
          }
        ],
        showImages: [],
        showMessages: [],
        recommends: []
      }
    },
    watch: {
      '$route' (to, from) {
        this.is_main = this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main';
        if (this.is_main) {
          this.showMessages = userMessage.state.main.essays;
          this.showImages = userMessage.state.main.banners;
          this.recommends = userMessage.state.main.courses;
        } else {
          this.showImages = userMessage.state.firstClass.banners;
          this.showMessages = userMessage.state.firstClass.essays;
          this.recommends = userMessage.state.firstClass.courses;
        }
      }
    },
    methods: {
      getFilter (event) {
        for (let item of event) {
          item.is_course = true;
        }
        this.recommends = event;
      },
      getEssay (id) {
        axios({
          url: '/api/essay/' + id + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitEssay', response);
              this.$router.push({path: '/article'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
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
