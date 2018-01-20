<template>
  <div id="main">
    <!--playDelay 是自动播放的延迟时间-->
    <am-slider id="slider">
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-4.jpg"/></am-slider-item>
    </am-slider>
    <ul>
      <icon v-for='item in items' v-bind:category_tag="item"></icon>
    </ul>
    <list_news></list_news>
  </div>
</template>

<script>
  import icon from './icon'
  import listNews from './listNews'

  export default {
    name: 'Main',
    components: {
      icon: icon,
      list_news:listNews
    },
    data () {
      return {
        items: [
          {message: '小学', iconType: 'am-primary am-icon-child'},
          {message: '初中', iconType: 'am-warning am-icon-male'},
          {message: '高中', iconType: 'am-success am-icon-fort-awesome'},
          {message: '大学', iconType: 'am-danger am-icon-graduation-cap'},
          {message: '考研', iconType: 'am-warning am-icon-institution'},
          {message: '四级', iconType: 'am-danger am-icon-signal'},
          {message: '六级', iconType: 'am-primary am-icon-rocket'},
          {message: '艺术', iconType: 'am-warning am-icon-paint-brush'}
        ]
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #slider {
    max-height: 200px;
  }
  ul{
    display: flex;
    flex-wrap:wrap;
    align-content: center;

    padding: 0;
    margin: 0;
  }
</style>
