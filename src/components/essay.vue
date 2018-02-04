<template>
  <div>
    <back-button>
    </back-button>
    <am-article>
      <am-article-header title="永远的蝴蝶" meta="陈启佑（台湾）" style="text-align: center">
      </am-article-header>
      <am-article-body>
        <am-article-lead v-html="introduction">
        </am-article-lead>
        <div v-html="content">
        </div>
      </am-article-body>
    </am-article>
    <div class="like">
      <el-badge :value="200" :max="99" class="item">
        <a class="icon">
          <i class="am-icon-thumbs-up"></i>
        </a>
      </el-badge>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      <a>
        <i class="am-icon-thumbs-down"></i>
      </a>
      <span>&nbsp&nbsp&nbsp&nbsp</span>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 90px;"></div>
  </div>
</template>

<script>
  import BackButton from './backButton';
  import {
    Article,
    ArticleHeader,
    ArticleBody,
    ArticleLead
  } from 'amaze-vue/src/components/article/index';

  export default {
    components: {
      BackButton,
      AmArticle: Article,
      AmArticleHeader: ArticleHeader,
      AmArticleBody: ArticleBody,
      AmArticleLead: ArticleLead
    },
    name: 'essay',
    data () {
      return {
        title: '三体',
        author: '刘慈欣',
        introduction: '<p>《三体》是中国大陆作家刘慈欣于2006年5月至12月在《科幻世界》杂志上连载的一部长篇科幻小说，出版后成为中国大陆最畅销的科幻长篇小说之一[1]。2008年，该书的单行本由重庆出版社出版。本书是三体系列（系列原名为：地球往事三部曲）的第一部，该系列的第二部《三体II：黑暗森林》已经于2008年5月出版。2010年11月，第三部《三体III：死神永生》出版发行。 2011年，“地球往事三部曲”在台湾陆续出版。小说的英文版获得美国科幻奇幻作家协会2014年度“星云奖”，并荣获2015年雨果奖最佳小说奖</p>',
        content: '<p>那时候刚好下着雨，柏油路面湿冷冷的，还闪烁着青、黄、红颜色的灯火。我们就在骑楼下躲雨，看绿色的邮筒孤独地站在街的对面。我白色风衣的大口袋里有一封要寄给南部的母亲的信。樱子说她可以撑伞过去帮我寄信。我默默点头。</p>\n' +
        '      <p>“谁叫我们只带来一把小伞哪。”她微笑着说，一面撑起伞，准备过马路帮我寄信。从她伞骨渗下来的小雨点，溅在我的眼镜玻璃上。</p>\n' +
        '      <p>随着一阵拔尖的煞车声，樱子的一生轻轻地飞了起来。缓缓地，飘落在湿冷的街面上，好像一只夜晚的蝴蝶。</p>\n' +
        '      <p>虽然是春天，好像已是秋深了。</p>\n' +
        '      <p>\n' +
        '        她只是过马路去帮我寄信。这简单的行动，却要叫我终身难忘了。我缓缓睁开眼，茫然站在骑楼下，眼里裹着滚烫的泪水。世上所有的车子都停了下来，人潮涌向马路中央。没有人知道那躺在街面的，就是我的，蝴蝶。这时她只离我五公尺，竟是那么遥远。更大的雨点溅在我的眼镜上，溅到我的生命里来。</p>\n' +
        '      <p>为什么呢？只带一把雨伞？</p><img src="http://s.amazeui.org/media/i/demos/bing-4.jpg"/>\n' +
        '      <p>\n' +
        '        然而我又看到樱子穿着白色的风衣，撑着伞，静静地过马路了。她是要帮我寄信的。那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？</p>\n' +
        '      <blockquote>\n' +
        '        <p>是一部好小说</p>\n' +
        '      </blockquote>'
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .like {
    float: right;

  }
</style>
