<template>
  <div>
    <transition>
      <div class="share-row">
        <h2>分享到</h2>
        <hr/>
        <icon :category_tag="items" :row="3">
        </icon>
      </div>
    </transition>
  </div>
</template>

<script>
  import Icon from './icon';

  export default {
    name: 'share',
    components: {
      Icon
    },
    data () {
      return {
        items: [
          {message: '新浪微博', iconType: 'am-danger am-icon-weibo'},
          {message: 'QQ好友', iconType: 'am-primary am-icon-qq'},
          {message: 'QQ空间', iconType: 'am-warning am-icon-star'},
          {message: '腾讯微博', iconType: 'am-secondary am-icon-tencent-weibo'},
          {message: '微信', iconType: 'am-success am-icon-weixin'},
          {message: '人人网', iconType: 'am-primary am-icon-renren'}
        ]
      }
    }
  }
</script>

<style scoped>
  div.share-row{
    width: 100%;
    padding: 0 5%;
    z-index: 1100;
    text-align: center;
  }
</style>
