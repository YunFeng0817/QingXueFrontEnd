<template>
  <div ref="dynamic">
    <header-index :is_course="false">
    </header-index>
    <el-tabs @touchstart.native.stopdefault="dragStart"
             @touchmove.native.stopdefault="dragMove" @touchend.native.default="dragStop">
      <el-tab-pane v-for="item in tabHeaders" :key="item.id">
        <span @click="tabClick(item.data)" slot="label">
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
        typeName: '最新动态',
        essays: [],
        tabHeaders: [
          {
            label: '我的关注',
            data: {
              stage: [
                '我的关注'
              ]
            }
          },
          {
            label: '幼儿',
            data: {
              stage: [
                '幼儿'
              ]
            }
          },
          {
            label: '小学',
            data: {
              stage: [
                '小学'
              ]
            }
          },
          {
            label: '初中',
            data: {
              stage: [
                '初中'
              ]
            }
          },
          {
            label: '高中',
            data: {
              stage: [
                '高中'
              ]
            }
          },
          {
            label: '大学',
            data: {
              stage: [
                '大学'
              ]
            }
          },
          {
            label: '留学',
            data: {
              stage: [
                '留学'
              ]
            }
          },
          {
            label: '职业技能',
            data: {
              stage: [
                '职业技能'
              ]
            }
          },
          {
            label: '讲座活动',
            data: {
              stage: [
                '讲座活动'
              ]
            }
          },
          {
            label: '文艺',
            data: {
              state: [
                '文艺'
              ]
            }
          },
          {
            label: '体育',
            data: {
              stage: [
                '体育'
              ]
            }
          }
        ],
        startX: 0,
        offsetLeft: 0,
        length: 0,
        page: 1, // 用来标记页数，默认返回的是第一页
        stage: '',
        target: document.createElement('IMG')
      }
    },
    created () {
      if (userMessage.state.essays.length === 0) {
        axios({
          url: '/api/essay/filtered_essays/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              for (let item of response.essays) {
                item.is_course = false;
              }
              userMessage.commit('commitEssays', response.essays);
              this.essays = response.essays;
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      } else {
        this.essays = userMessage.state.essays;
      }
    },
    mounted () {
      window.addEventListener('scroll', this.scrollHandle)
    },
    methods: {
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
      dragMove (event) {
        const ScreenWidth = window.innerWidth - 50;   // 这个是当前屏幕的宽度
        const AnimationOffset = 50;   // 这个偏移是为了产生拖到尽头，依然可以继续拖动，但是放开后会恢复原位的效果
        let X = event.changedTouches[0].clientX + this.offsetLeft - this.startX;
        if (X <= AnimationOffset && X > ScreenWidth - this.target.clientWidth - AnimationOffset) {
          this.target.style = 'position:relative;left:' + X.toString() + 'px;';
        }
      },
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
        this.stage = data;
        axios({
          url: '/api/essay/filtered_essays/',
          method: 'post',
          data: data
        })
          .then(function (response) {
            if (response) {
              for (let essay of response.essays) {
                essay.is_course = false;
              }
              this.page = 1;
              this.essays = response.essays;
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
            let stages = [];
            if (this.stage) {
              stages.push(this.stage.stages[0]);
            }
            axios({
              method: 'post',
              url: '/api/essay/filtered_essays/',
              data: {
                stage: stages,
                page: this.page
              }
            })
              .then(function (response) {
                if (response) {
                  if (response.essays.length !== 0) {
                    for (let item of response.essays) {
                      this.essays.push(item);
                    }
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
