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
    <el-carousel :interval="5000" arrow="never" height="35px" indicator-position="none">
      <el-carousel-item class="head-line" v-for="item in showMessages" v-bind:key="item.id">
        <div class="head-line">
          <router-link :to="item.link">{{item.message}}</router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
    <list_news :typeName="typeName">
    </list_news>
    <br/><br/><br/>
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

  .head-line{
    display: table;
    /*background-color: #66b1ff;*/
    /*opacity: 0.8;*/
  }

  .head-line div{
    display: table-cell;
    vertical-align:middle;
    text-align:center;
    border: 1px solid rgba(195,195,195,0.7) ;
  }

  a{
    display: block;
    font-size:medium;
    color:black;
  }
</style>
