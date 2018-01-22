<template>
  <div id="main">
    <el-carousel :interval="3000" arrow="always" height="200px">
      <el-carousel-item v-for="item in showImages" v-bind:key="item.id">
        <img :src="item.src"/>
      </el-carousel-item>
    </el-carousel>
    <ul>
      <icon v-for='item in items' v-bind:category_tag="item" :key="item.id">
      </icon>
    </ul>
    <list_news :typeName="typeName">
    </list_news>
  </div>
</template>

<script>
  import icon from './icon'
  import listNews from './listNews'

  export default {
    name: 'Main',
    components: {
      icon: icon,
      list_news: listNews
    },
    data () {
      return {
        typeName: '课程推荐',
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
        ]
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
</style>
