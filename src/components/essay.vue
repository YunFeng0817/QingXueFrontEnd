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
    <br/>
    <div class="like">
      <p>
        发表时间:
        <time>{{add_time}}</time>
      </p>
    </div>
    <br/>
    <div class="like">
      <a class="icon">
        <i :class="liked?'am-icon-thumbs-up':'am-icon-thumbs-o-up'" @click.stop="like">{{likes_count}}</i>
      </a>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 90px;"></div>
  </div>
</template>

<script>
  import axios from '../axios/index';
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
        title: '',
        author: '',
        introduction: '',
        content: '',
        liked: false,
        likes_count: null,
        add_time: null
      }
    },
    created () {
      axios({
        url: '/api/essay/' + this.$router.currentRoute.params.id + '/',
        method: 'get'
      })
        .then(function (response) {
          if (response) {
            this.title = response.essay.title;
            this.author = response.author;
            this.introduction = response.essay.brief_description;
            this.content = response.essay.content;
            this.liked = response.liked;
            this.likes_count = response.essay.likes_count;
            this.add_time = response.essay.add_time;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
    },
    methods: {
      like () {
        if (userMessage.state.has_login) {
          axios({
            method: 'get',
            headers: {
              'X-CSRFToken': document.cookie.split(';')[0].split('=')[1]
            },
            url: '/api/essay/like/?essay_id=' + this.$router.currentRoute.params.id
          })
            .then(function (response) {
              if (response) {
                this.liked = !this.liked;
                this.likes_count = response.likes_count;
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        } else {
          this.$router.push({path: '/login'});
        }
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .like {
    position: absolute;
    right: 2%;
  }

  i {
    font-size: x-large;
  }
</style>
