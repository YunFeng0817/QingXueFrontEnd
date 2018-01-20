<template>
  <div data-am-widget="list_news" class="am-list-news am-list-news-default">
    <!--列表标题-->
    <div class="am-list-news-hd am-cf">
      <!--带更多链接-->
      <a href="###" class="">
        <h2 style="margin: 0;">{{typeName}}</h2>
      </a>
    </div>

    <div class="am-list-news-bd">
      <ul class="am-list">
        <!--缩略图在标题左边-->
        <div data-am-scrollspy="{animation: 'fade', delay: 100}">
          <div data-am-scrollspy="{animation: 'fade', delay: 200}" class="scroll">
            <news v-for="item in recommends" v-bind:show="item"></news>
          </div>
        </div>
      </ul>
    </div>
    <a><span class="am-list-news-more am-fr">更多 &raquo;</span></a>
  </div>
</template>

<script>
  import news from './news'

  export default {
    name: 'list-news',
    components: {
      news: news
    },
    props:{
      typeName:{
        type:String,
      }
    },
    data() {
      return {
        recommends: [
          {
            id: 1,
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            link: '',
            name: '老干妈',
            introduction: '真好吃！！！！！！！！！！！'
          },
          {
            id: 2,
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
            link: '',
            name: '鸡公煲',
            introduction: '超级香！！！！！！！！！！！！'
          }
        ],
      }
    }
  }
</script>

<style scoped>

</style>
