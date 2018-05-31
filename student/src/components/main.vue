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
    <el-filter v-if="!is_main">
    </el-filter>
    <div class="wrap">
      <list_news v-if="recommends.length!==0" :typeName="typeName" :recommends="recommends">
      </list_news>
      <p v-else style="text-align: center;font-size:large;">没有符合条件的课程</p>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 250px;" v-if="recommends.length<=3"></div>
    <footer class="footer">
      <p>© 2018 哈尔滨青学信息技术有限公司</p>
      <a href="http://www.miitbeian.gov.cn/" target="备案号查询">黑ICP备18002231号</a>
      <div style="width:300px;margin:0 auto; padding:20px 0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=23011002000125"
           style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="../../static/policeIcon.png" style="float:left;"/>
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">黑公网安备
            23011002000125号</p></a>
      </div>
    </footer>
    <!--下面的这个区块是为了占位-->
    <div style="height: 90px;"></div>
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
      this.init();
      window.addEventListener('scroll', this.scrollHandle);
    },
    data () {
      return {
        typeName: '课程推荐',
        is_main: this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main',
        items: [
          // {
          //   type: 'stage',
          //   message: '幼儿',
          //   iconType: 'am-success am-icon-child',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     stage: {
          //       name: '幼儿'
          //     }
          //   }
          // },
          // {
          //   type: 'stage',
          //   message: '小学',
          //   iconType: 'am-primary am-icon-female',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     stage: {
          //       name: '小学'
          //     }
          //   }
          // },
          // {
          //   type: 'stage',
          //   message: '初中',
          //   iconType: 'am-warning am-icon-male',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     stage: {
          //       name: '初中'
          //     }
          //   }
          // },
          // {
          //   type: 'stage',
          //   message: '高中',
          //   iconType: 'am-success am-icon-fort-awesome',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     stage: {
          //       name: '高中'
          //     }
          //   }
          // },
          // {
          //   type: 'stage',
          //   message: '大学',
          //   iconType: 'am-danger am-icon-graduation-cap',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     stage: {
          //       name: '大学'
          //     }
          //   }
          // },
          // {
          //   type: 'subject',
          //   message: '留学',
          //   iconType: 'am-warning am-icon-institution',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     subject: {
          //       name: '留学'
          //     }
          //   }
          // },
          // {
          //   type: 'subject',
          //   message: '职业技能',
          //   iconType: 'am-danger am-icon-signal',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     subject: {
          //       name: '职业技能'
          //     }
          //   }
          // },
          // {
          //   type: 'subject',
          //   message: '讲座活动',
          //   iconType: 'am-primary am-icon-rocket',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     subject: {
          //       name: '讲座活动'
          //     }
          //   }
          // },
          // {
          //   type: 'subject',
          //   message: '文艺',
          //   iconType: 'am-warning am-icon-paint-brush',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     subject: {
          //       name: '文艺'
          //     }
          //   }
          // },
          // {
          //   type: 'subject',
          //   message: '体育',
          //   iconType: 'am-primary am-icon-bicycle',
          //   url: ' /api/common/page_contents/',
          //   data: {
          //     subject: {
          //       name: '体育'
          //     }
          //   }
          // }
          {
            type: 'stage',
            message: '幼儿',
            iconType: 'children',
            url: ' /api/common/page_contents/',
            data: {
              stage: {
                name: '幼儿'
              }
            }
          },
          {
            type: 'stage',
            message: '小学',
            iconType: 'primary',
            url: ' /api/common/page_contents/',
            data: {
              stage: {
                name: '小学'
              }
            }
          },
          {
            type: 'stage',
            message: '初中',
            iconType: 'junior',
            url: ' /api/common/page_contents/',
            data: {
              stage: {
                name: '初中'
              }
            }
          },
          {
            type: 'stage',
            message: '高中',
            iconType: 'senior',
            url: ' /api/common/page_contents/',
            data: {
              stage: {
                name: '高中'
              }
            }
          },
          {
            type: 'stage',
            message: '大学',
            iconType: 'college',
            url: ' /api/common/page_contents/',
            data: {
              stage: {
                name: '大学'
              }
            }
          },
          {
            type: 'subject',
            message: '留学',
            iconType: 'abroad',
            url: ' /api/common/page_contents/',
            data: {
              subject: {
                name: '留学'
              }
            }
          },
          {
            type: 'subject',
            message: '专业技能',
            iconType: 'professional',
            url: ' /api/common/page_contents/',
            data: {
              subject: {
                name: '职业技能'
              }
            }
          },
          {
            type: 'subject',
            message: '文艺',
            iconType: 'art',
            url: ' /api/common/page_contents/',
            data: {
              subject: {
                name: '文艺'
              }
            }
          },
          {
            type: 'subject',
            message: '体育',
            iconType: 'PE',
            url: ' /api/common/page_contents/',
            data: {
              subject: {
                name: '体育'
              }
            }
          },
          {
            type: 'subject',
            message: '讲座活动',
            iconType: 'activity',
            url: ' /api/common/page_contents/',
            data: {
              subject: {
                name: '讲座活动'
              }
            }
          }
        ],
        showImages: [],
        showMessages: [],
        recommends: [],
        length: 0,
        page: 1, // 用来标记页数，默认返回的是第一页
        totalPage: 2,  // 用来标记总页数
        height: '300px'
      }
    },
    watch: {
      '$route' (to, from) {
        this.page = 1;
        this.is_main = this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main';
        this.init();
      }
    },
    methods: {
      /**
       * 这个函数负责在页面初始化和路由信息发生变化时，根据各种情况，获取数据的来源
       */
      init () {
        // 判断 router 是 '/' 或 '/main' , 而且是没有数据存储的情况，就请求主页数据
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
          // 这个判断是 在 '/' 或 '/main' ，且已经有数据的情况，就直接赋值
        } else if (this.$router.currentRoute.path === '/' || this.$router.currentRoute.path === '/main') {
          this.recommends = userMessage.state.main.courses;
          this.showMessages = userMessage.state.main.essays;
          this.showImages = userMessage.state.main.banners;
          // 这个判断是在 router path 是 一级分类页面，而且已经有数据存储的情况
        } else if (userMessage.state.firstClass.courses !== undefined && this.$router.currentRoute.params.area === '-1' && this.$router.currentRoute.params.stage === '-1' && this.$router.currentRoute.params.subject === '-1') {
          this.recommends = userMessage.state.firstClass.courses;
          this.showMessages = userMessage.state.firstClass.essays;
          this.showImages = userMessage.state.firstClass.banners;
          // 这个判断是在 router path 是 一级分类页面，而且没有数据存储的情况
        } else if (this.$router.currentRoute.params.area === '-1' && this.$router.currentRoute.params.stage === '-1' && this.$router.currentRoute.params.subject === '-1') {
          let type = this.$router.currentRoute.params.type;
          let stage = this.$router.currentRoute.params.stages;
          let firstClass = {};
          firstClass[type] = {name: stage};
          // 请求一级列表页
          axios({
            method: 'post',
            url: '/api/common/page_contents/',
            data: firstClass
          })
            .then(function (response) {
              if (response) {
                for (let course of response.courses) {
                  course.is_course = true;
                }
                userMessage.commit('commitFirst', response);
                this.recommends = response.courses;
                this.showMessages = response.essays;
                this.showImages = response.banners;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        } else {
          let type = this.$router.currentRoute.params.type;
          let stage = this.$router.currentRoute.params.stages;
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
          let firstClass = {};
          firstClass[type] = {name: stage};
          // 请求一级列表页
          axios({
            method: 'post',
            url: '/api/common/page_contents/',
            data: firstClass
          })
            .then(function (response) {
              if (response) {
                for (let course of response.courses) {
                  course.is_course = true;
                }
                userMessage.commit('commitFirst', response);
                this.showMessages = response.essays;
                this.showImages = response.banners;
                // 请求筛选后的课程 ，post的数据是 筛选项的id
                axios({
                  method: 'post',
                  url: '/api/course/filtered_courses/',
                  data: content
                })
                  .then(function (response) {
                    if (response) {
                      for (let course of response.courses) {
                        course.is_course = true;
                      }
                      this.recommends = response.courses;
                    }
                  }.bind(this))
                  .catch(function (error) {
                    console.log(error);
                  })
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      getEssay (id) {
        this.$router.push({path: '/article/' + id});
      },
      // 用来处理分页操作的函数，同时也是监听屏幕滚动的回调函数
      scrollHandle () {
        let node = this.$refs.main;
        /**
         * 屏幕滚动的总结
         * window.scrollY是滚轮移动的距离
         * document.documentElement.offsetHeight是屏幕可视区域的高度
         * element.scrollHeight是元素的本身高度
         */
        let left = node.scrollHeight - window.scrollY - document.documentElement.offsetHeight;
        let postData = {};
        if (left <= 15) {
          // 这里的判断用来 防止算时间内的重复请求
          if (this.length !== node.scrollHeight) {
            this.page++; // 页数增加一页
            this.length = node.scrollHeight;
            if (this.page > this.totalPage) {
              return;
            }
            // 接下在根据 router path 动态确定postData的内容
            postData.page = this.page;
            if (!this.is_main) {
              let type = this.$router.currentRoute.params.type;
              let stage = this.$router.currentRoute.params.stages;
              let id = [];
              id.push(parseInt(this.$router.currentRoute.params.area));
              id.push(parseInt(this.$router.currentRoute.params.stage));
              id.push(parseInt(this.$router.currentRoute.params.subject));
              // 接下来的几个判断是 判断 router path是否包含了筛选项的信息，-1是没有筛选项，非负数的数字是相应筛选项的id
              if (id[0] !== -1) {
                postData.area = {};
                postData.area.id = id[0];
              }
              if (id[1] !== -1) {
                postData.stage = {};
                postData.stage.id = id[1];
              }
              if (id[2] !== -1) {
                postData.subject = {};
                postData.subject.id = id[2];
              }
              postData[type] = {name: stage};
            }
            axios({
              method: 'post',
              url: '/api/course/filtered_courses/',
              data: postData
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
                    this.totalPage = response.total_pages;
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
    /*display: block;*/
    /*font-size: medium;*/
    /*color: black;*/
  }

  footer {
    text-align: center;
    margin-top: -30px;
  }

  .wrap {
    min-height: 100%;
  }
</style>
