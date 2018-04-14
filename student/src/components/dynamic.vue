<template>
  <div ref="dynamic">
    <header-index :is_course="false">
    </header-index>
    <el-tabs @touchstart.native.stopdefault="dragStart"
             @touchmove.native.stopdefault="dragMove"
             @touchend.native.default="dragStop"
             :value="tabValue">
      <el-tab-pane v-for="item in tabHeaders" :key="item.id">
        <span @click="tabClick(item)" slot="label">
          <a>{{item.label}}</a>
        </span>
      </el-tab-pane>
    </el-tabs>
    <list_news v-if="essays.length!==0" :typeName="typeName" :recommends="essays">
    </list_news>
    <p v-else style="text-align: center;font-size:large;">没有新动态</p>
    <!--下面的这个区块是为了占位-->
    <div style="height: 120px;"></div>
  </div>
</template>

<script>
  import listNews from './listNews';
  import filter from './filter';
  import headerIndex from './headerIndex';
  import axios from '../axios/index';
  import userMessage from '../store/index';

  export default {
    name: 'dynamic',
    components: {
      list_news: listNews,
      'el-filter': filter,
      'header-index': headerIndex
    },
    data () {
      return {
        typeName: '资讯',
        essays: [],
        tabValue: '小学',
        filterType: '',
        tabHeaders: [
          {
            type: 'normal',
            name: 'total',
            label: '最新',
            data: {}
          },
          {
            type: 'stage',
            name: '幼儿',
            label: '幼儿',
            data: {
              stage: {
                name: '幼儿'
              }
            }
          },
          {
            type: 'stage',
            name: '小学',
            label: '小学',
            data: {
              stage: {
                name: '小学'
              }
            }
          },
          {
            type: 'stage',
            name: '初中',
            label: '初中',
            data: {
              stage: {
                name: '初中'
              }
            }
          },
          {
            type: 'stage',
            name: '初中',
            label: '高中',
            data: {
              stage: {
                name: '高中'
              }
            }
          },
          {
            type: 'stage',
            name: '大学',
            label: '大学',
            data: {
              stage: {
                name: '大学'
              }
            }
          },
          {
            type: 'subject',
            name: '留学',
            label: '留学',
            data: {
              subject: {
                name: '留学'
              }
            }
          },
          {
            type: 'subject',
            name: '职业技能',
            label: '职业技能',
            data: {
              subject: {
                name: '职业技能'
              }
            }
          },
          {
            type: 'subject',
            name: '讲座活动',
            label: '讲座活动',
            data: {
              subject: {
                name: '讲座活动'
              }
            }
          },
          {
            type: 'subject',
            name: '文艺',
            label: '文艺',
            data: {
              subject: {
                name: '文艺'
              }
            }
          },
          {
            type: 'subject',
            name: '体育',
            label: '体育',
            data: {
              subject: {
                name: '体育'
              }
            }
          }
        ],
        startX: 0,
        offsetLeft: 0,
        length: 0,
        page: 1, // 用来标记页数，默认返回的是第一页
        totalPage: 1, // 分页的总页数，由请求后端返回数据
        target: document.createElement('IMG'),
        height: '600px'
      }
    },
    created () {
      this.tabValue = this.$router.currentRoute.params.value;
      this.filterType = this.$router.currentRoute.params.value;
      if (!userMessage.state.dynamic.essays) {
        let type = this.$router.currentRoute.params.type;
        let value = this.$router.currentRoute.params.value;
        let content = {}; // 储存表单提交的内容
        switch (type) {
          case 'normal': // 没有指定的筛选项
            break;
          case 'stage' || 'subject':  // 对阶段的筛选或对科目的筛选类型
            content[type] = {};
            content[type].name = value;
            break;
        }
        axios({
          url: '/api/essay/filtered_essays/',
          method: 'post',
          data: content
        })
          .then(function (response) {
            if (response) {
              for (let item of response.essays) {
                item.is_course = false;
              }
              userMessage.commit('commitEssays', response);
              this.essays = response.essays;
              this.totalPage = response.total_pages;
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      } else {
        this.essays = userMessage.state.dynamic.essays;
        this.totalPage = userMessage.state.dynamic.total_pages;
        this.page = userMessage.state.dynamic.page;
      }
    },
    mounted () {
      window.addEventListener('scroll', this.scrollHandle)
    },
    watch: {
      '$route' (to, from) {
        if (this.$router.currentRoute.params.type === 'normal' && this.filterType !== 'total') {
          let data = {};
          data.type = 'total';
          data.data = {};
          this.tabClick(data);
        }
      }
    },
    methods: {
      // 用于自己实现菜单栏的拖动， 开始拖动的函数
      dragStart (event) {
        let node = event.target;
        while (node && node.className !== 'el-tabs__nav') {
          node = node.parentNode;
        }
        if (node) {
          this.startX = event.changedTouches[0].clientX;
          this.target = node;
        }
      },
      // 用于自己实现菜单栏的拖动， 拖动过程的函数
      dragMove (event) {
        const ScreenWidth = window.innerWidth - 50;   // 这个是当前屏幕的宽度
        const AnimationOffset = 50;   // 这个偏移是为了产生拖到尽头，依然可以继续拖动，但是放开后会恢复原位的效果
        let X = event.changedTouches[0].clientX + this.offsetLeft - this.startX;
        if (X <= AnimationOffset && X > ScreenWidth - this.target.clientWidth - AnimationOffset) {
          this.target.style = 'position:relative;left:' + X.toString() + 'px;';
        }
      },
      // 用于自己实现菜单栏的拖动， 停止拖动的函数
      dragStop (event) {
        const ScreenWidth = window.innerWidth - 50;
        let X = event.changedTouches[0].clientX + this.offsetLeft - this.startX;
        if (X > 0) {
          this.offsetLeft = 0;
        } else if (X < ScreenWidth - this.target.clientWidth) {
          this.offsetLeft = ScreenWidth - this.target.clientWidth;
        } else {
          this.offsetLeft = X;
        }
        this.target.style = 'position:relative;left:' + this.offsetLeft.toString() + 'px;';
      },
      tabClick (data) {
        // data 包括 type, data两个成员, 其中的data是筛选的值
        axios({
          url: '/api/essay/filtered_essays/',
          method: 'post',
          data: data.data
        })
          .then(function (response) {
            if (response) {
              for (let essay of response.essays) {
                essay.is_course = false;
              }
              this.page = 1;
              this.essays = response.essays;
              this.totalPage = response.total_pages;
              this.filterType = data.data[data.type] === undefined ? 'total' : data.data[data.type].name;
              var newPath = '/dynamic/' + data.type + '/' + (data.data[data.type] === undefined ? 'total' : data.data[data.type].name);
              this.$router.push({path: newPath});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 处理滚轮滚动实现按需加载的回调函数
      scrollHandle () {
        let node = this.$refs.dynamic;
        let left = node.scrollHeight - document.documentElement.offsetHeight - window.scrollY;
        if (left <= 15) {
          // 这里的判断用来 防止算时间内的重复请求
          if (this.length !== node.scrollHeight) {
            this.page++;
            this.length = node.scrollHeight;
            let type = this.$router.currentRoute.params.type;
            let value = this.$router.currentRoute.params.value;
            let content = {}; // 储存表单提交的内容
            content.page = this.page;
            switch (type) {
              case 'normal': // 没有指定的筛选项
                break;
              case 'stage' || 'subject':  // 对阶段的筛选或对科目的筛选类型
                content[type] = {};
                content[type].name = value;
                break;
            }
            if (this.page > this.totalPage) {
              return;
            }
            axios({
              method: 'post',
              url: '/api/essay/filtered_essays/',
              data: content
            })
              .then(function (response) {
                if (response) {
                  this.totalPage = response.total_pages;
                  if (response.essays.length !== 0) {
                    for (let item of response.essays) {
                      if (this.essays.indexOf(item) === -1) {
                        this.essays.push(item);
                      }
                    }
                    response.essays = this.essays;
                    userMessage.commit('commitEssays', response);
                  } else {
                    this.$message({
                      type: 'info',
                      message: '没有更多了',
                      duration: 1500
                    })
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
</style>
