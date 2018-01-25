<template>
  <div id="main">
    <el-carousel :interval="3000" arrow="always" height="200px">
      <el-carousel-item v-for="item in showImages" v-bind:key="item.id">
        <img :src="item.src"/>
      </el-carousel-item>
    </el-carousel>
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
    <el-filter v-if="!is_main">
    </el-filter>
    <list_news :typeName="typeName" :recommends="recommends">
    </list_news>
    <br/><br/><br/>
  </div>
</template>

<script>
  import icon from './icon'
  import listNews from './listNews'
  import filter from './filter';

  export default {
    name: 'Main',
    components: {
      'el-filter': filter,
      icon: icon,
      list_news: listNews
    },
    data () {
      return {
        typeName: '课程推荐',
        is_main: true,
        items: [
          {message: '小学', iconType: 'am-primary am-icon-child'},
          {message: '初中', iconType: 'am-warning am-icon-male'},
          {message: '高中', iconType: 'am-success am-icon-fort-awesome'},
          {message: '大学', iconType: 'am-danger am-icon-graduation-cap'},
          {message: '考研', iconType: 'am-warning am-icon-institution'},
          {message: '四级', iconType: 'am-danger am-icon-signal'},
          {message: '六级', iconType: 'am-primary am-icon-rocket'},
          {message: '艺术', iconType: 'am-warning am-icon-paint-brush'}
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
        recommends: [
          {
            is_course: true,
            grade: '初中',
            subject: '计算机',
            difficulty: '变态难',
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            link: 'course',
            name: '老干妈',
            introduction: '真好吃！！！！！！！！！！！'
          },
          {
            is_course: true,
            grade: '高中',
            subject: '数学',
            difficulty: '有点难',
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-4.jpg',
            link: 'course',
            name: '鸡公煲',
            introduction: '真好吃！！！！！！！！！！！'
          }
        ]
      }
    },
    watch: {
      '$route' (to, from) {
        this.is_main = this.$router.currentRoute.path === '/main'
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  img {
    height: 200px;
    width: 100%;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: center;

    padding: 0;
    margin: 0;
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
