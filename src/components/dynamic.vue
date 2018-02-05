<template>
  <div>
    <!--<header-index>-->
    <!--</header-index>-->
    <el-tabs @tab-click="handleClick" @touchstart.native.stopdefault="dragStart"
             @touchmove.native.stopdefault="dragMove" @touchend.native.default="dragStop">
      <el-tab-pane>
        <span slot="label">
          <a>我的动态</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>小学</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>初中</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a to="">高中</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>大学</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>考研</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>四级</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>六级</a>
        </span>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <a>艺术</a>
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
        typeName: '分类的名字',
        essays: [
          {
            is_course: false,
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            link: 'article',
            name: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...',
            introduction: '为何母猪半夜惨叫，为何小区电动车频频失窃，原因竟然是...'
          }
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
        let X = event.changedTouches[0].clientX + this.offsetLeft - this.startX;
        if (X <= 0 && X > -this.target.clientWidth) {
          this.target.style = 'position:relative;left:' + X.toString() + 'px;';
        }
        // this.target.style = 'position:relative;left:10px;z-index:1000;';
        // this.target.style.position = 'absolute';
        // this.target.style.left = (X - this.startX).toString() + 'px;';
        // this.target.style.left = (X - this.startX).toString() + 'px;';
        // console.log(this.target);
      },
      dragStop (event) {
        let X = event.changedTouches[0].clientX + this.offsetLeft - this.startX;
        console.log(X);
        if (X <= 0 && X > -this.target.clientWidth) {
          this.offsetLeft += event.changedTouches[0].clientX - this.startX;
        }
        console.log(this.offsetLeft);
      }
    }
  }
</script>

<style type="text/css" rel="stylesheet">
  div.el-tabs {
    height: 40px;
  }
</style>
