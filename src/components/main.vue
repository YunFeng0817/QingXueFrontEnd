<template>
  <div>
    <!--playDelay 是自动播放的延迟时间-->
    <am-slider id="slider">
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg"/></am-slider-item>
      <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-4.jpg"/></am-slider-item>
    </am-slider>
    <icon v-for='item in items' v-bind:category_tag="item" v-key="item.id"></icon>
  </div>
</template>

<script>
  import icon from './icon'
  import Vue from 'vue'

  export default {
    name: 'Main',
    components: {
      icon: icon
    }
  }
  /* eslint-disable no-new */
  new Vue({
    el: 'icon',
    data: {
      items: [
        {message: '小学', class: 'am-primary am-icon-child'},
        {message: '初中', class: 'am-warning am-icon-male'},
        {message: '高中', class: 'am-success am-icon-fort-awesome'},
        {message: '大学', class: 'am-danger am-icon-graduation-cap'},
        {message: '考研', class: 'am-warning am-icon-institution'},
        {message: '四级', class: 'am-danger am-icon-signal'},
        {message: '六级', class: 'am-primary am-icon-rocket'},
        {message: '艺术', class: 'am-warning am-icon-paint-brush'}
      ]
    }
  });
</script>

<style scoped type="text/css" rel="stylesheet">
  #slider {
    max-height: 200px;
  }
</style>
