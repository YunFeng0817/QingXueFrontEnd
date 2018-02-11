<template>
  <div>
    <back-button>
    </back-button>
    <am-article>
      <am-article-header :title="title" :meta="author" style="text-align: center">
      </am-article-header>
      <am-article-body>
        <am-article-lead v-html="introduction">
        </am-article-lead>
        <div v-html="content">
        </div>
      </am-article-body>
    </am-article>
    <div class="like">
      <a class="icon">
        <i class="am-icon-thumbs-up"></i>
      </a>
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
  import userMessage from '../store/index';
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
        title: userMessage.state.essay.essay.title,
        author: userMessage.state.essay.author,
        introduction: userMessage.state.essay.essay.brief_description,
        content: userMessage.state.essay.essay.content
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .like {
    float: right;
  }

  i {
    font-size: x-large;
  }
</style>
