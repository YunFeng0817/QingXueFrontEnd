<template>
  <div>
    <header-index :is_course="false">
    </header-index>
    <el-tabs @tab-click="handleClick" @touchstart.native.stopdefault="dragStart"
             @touchmove.native.stopdefault="dragMove" @touchend.native.default="dragStop">
      <el-tab-pane v-for="item in tabHeaders" :key="item.id">
        <span slot="label">
          <a>{{item}}</a>
        </span>
      </el-tab-pane>
    </el-tabs>
    <list_news :typeName="typeName" :recommends="essays">
    </list_news>
  </div>
</template>

<script>
  import listNews from './listNews';
  import filter from './filter';
  import headerIndex from './headerIndex';

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
        essays: [
          {
            is_course: false,
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            link: 'article',
            name: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...',
            introduction: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...'
          }
        ],
        tabHeaders: [
          '我的关注',
          '幼儿',
          '小学',
          '初中',
          '高中',
          '大学',
          '留学',
          '职业技能',
          '讲座活动',
          '文艺',
          '体育'
        ],
        startX: 0,
        offsetLeft: 0,
        target: document.createElement('IMG')
      }
    },
    methods: {
      handleClick (tab, event) {
        this.$router.push({path: 'get', query: {category: tab.$slots.label[0].elm.firstChild.innerHTML}})
      },
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
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
</style>
