<template>
  <div id="main" ref="main">
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
      window.addEventListener('scroll', this.scrollHandle);
    },
    data () {
      return {
        typeName: '课程推荐',
        is_main: this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main',
        items: [
          {
            message: '幼儿',
            iconType: 'am-success am-icon-child',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '幼儿'
              ]
            }
          },
          {
            message: '小学',
            iconType: 'am-primary am-icon-female',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '小学'
              ]
            }
          },
          {
            message: '初中',
            iconType: 'am-warning am-icon-male',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '初中'
              ]
            }
          },
          {
            message: '高中',
            iconType: 'am-success am-icon-fort-awesome',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '高中'
              ]
            }
          },
          {
            message: '大学',
            iconType: 'am-danger am-icon-graduation-cap',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '大学'
              ]
            }
          },
          {
            message: '留学',
            iconType: 'am-warning am-icon-institution',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '留学'
              ]
            }
          },
          {
            message: '职业技能',
            iconType: 'am-danger am-icon-signal',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '职业技能'
              ]
            }
          },
          {
            message: '讲座活动',
            iconType: 'am-primary am-icon-rocket',
            url: ' /api/common/page_contents/',
            data: {
              stage: [
                '讲座活动'
              ]
            }
          },
          {
            message: '文艺',
            iconType: 'am-warning am-icon-paint-brush',
            url: ' /api/common/page_contents/',
            data: {
              subject: [
                '文艺'
              ]
            }
          },
          {
            message: '体育',
            iconType: 'am-primary am-icon-bicycle',
            url: ' /api/common/page_contents/',
            data: {
              subject: [
                '体育'
              ]
            }
          }
        ],
        showImages: [],
        showMessages: [],
        recommends: [],
        length: 0,
        page: 1  // 用来标记页数，默认返回的是第一页
      }
    },
    watch: {
      '$route' (to, from) {
        this.page = 1;
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
        this.$router.push({path: '/article/' + id});
      },
      scrollHandle () {
        let node = this.$refs.main;
        /**
         * 屏幕滚动的总结
         * window.scrollY是滚轮移动的距离
         * document.documentElement.offsetHeight是屏幕可视区域的高度
         * element.scrollHeight是元素的本身高度
         */
        let left = node.scrollHeight - window.scrollY - document.documentElement.offsetHeight;
        let url = '/api/course/filtered_list/';
        let stages = [];
        let grades = [];
        let subjects = [];
        let degrees = [];
        if (this.$router.currentRoute.path !== '/' && this.$router.currentRoute.path !== '/main') {
          if (this.$router.currentRoute.params.stages !== '0') {
            stages.push(this.$router.currentRoute.params.stages);
          }
          if (this.$router.currentRoute.params.grades !== '0') {
            grades.push(this.$router.currentRoute.params.grades);
          }
          if (this.$router.currentRoute.params.subjects !== '0') {
            subjects.push(this.$router.currentRoute.params.subjects);
          }
          if (this.$router.currentRoute.params.degrees !== '0') {
            degrees.push(this.$router.currentRoute.params.degrees);
          }
        }
        if (left <= 15) {
          // 这里的判断用来 防止算时间内的重复请求
          if (this.length !== node.scrollHeight) {
            this.page++; // 页数增加一页
            this.length = node.scrollHeight;
            axios({
              method: 'post',
              url: url,
              data: {
                page: this.page,
                stage: stages,
                grade: grades,
                subject: subjects,
                degree: degrees
              }
            })
              .then(function (response) {
                if (response) {
                  if (response.courses.length === 0) {
                    this.$message({
                      type: 'info',
                      message: '没有更多了',
                      duration: 1000
                    })
                  } else {
                    for (let item of response.courses) {
                      item.is_course = true;
                      this.recommends.push(item);
                    }
                  }
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          }
        }
      }
    },
    // 当该组件销毁，应当取消对屏幕滚动事件的监听
    destroyed () {
      window.removeEventListener('scroll', this.scrollHandle);
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
