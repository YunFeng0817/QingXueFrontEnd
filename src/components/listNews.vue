<template>
  <div>
    <a style="font-size: larger">{{typeName}}</a>
    <el-row>
      <el-col class="card"
              :span="22"
              v-for="(item,key) in recommends" :key="key">
        <el-card class="float" :body-style="{ padding: '0 10px' }" @click.native="clickAction(item.id)">
          <el-tag v-if="item.is_course" size="mini">{{item.stage+item.grade}}</el-tag>
          <el-tag v-if="item.is_course" size="mini">{{item.subject}}</el-tag>
          <el-tag v-if="item.is_course" size="mini">{{item.degree}}</el-tag>
          <div class="courses">
            <img :src="item.cover" class="image">
            <div style="padding: 2%;width:100%;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <span v-if="!item.is_course" style="float:right;">作者：{{item.author}}</span>
                <p v-if="!item.is_course">{{item.brief_description}}</p>
                <span v-if="item.is_course">
                  好评率：
                  <el-rate
                    v-model="item.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </span>
                <span v-if="item.is_course">
                  全额费用：{{item.total_price}} 元
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import news from './news';
  import axios from '../axios/index';
  import userMessage from '../store/index';

  export default {
    name: 'list-news',
    components: {
      news: news
    },
    props: {
      typeName: {
        type: String
      },
      recommends: {
        type: Array
      }
    },
    data () {
      return {}
    },
    methods: {
      // 由于使用了css3动画，去掉了此处的js动画
      // floatUp (event) {
      //   let node = event.target;
      //   while (node && node.className !== 'el-card') {
      //     node = node.parentNode;
      //   }
      //   if (node) {
      //     // node.style = 'position:relative;bottom:5px;box-shadow:2px 2px 15px 5px #d0d0d0;transition:5s 5s bottom ease-in;'
      //     node.style = 'animation:3s float;'
      //   }
      // },
      // floatDown (event) {
      //   let node = event.target;
      //   while (node && node.className !== 'el-card') {
      //     node = node.parentNode;
      //   }
      //   if (node) {
      //     node.style = 'position:default;'
      //   }
      // },
      clickAction (id) {
        if (this.recommends[0].is_course) {
          axios({
            url: '/api/course/' + id + '/',
            method: 'get'
          })
            .then(function (response) {
              if (response) {
                userMessage.commit('commitCourse', response);
                this.$router.push({path: '/detail/course/' + id});
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        } else {
          this.$router.push({path: '/article/' + id});
        }
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .courses {
    display: flex;
    align-items: center;
  }

  .bottom {
    width: 100%;
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 40%;
    height: 30%;
    max-width: 390px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .card {
    max-width: 400px;

    margin: 2% 4% 1% 4%;
  }

  div.float:hover {
    animation-name: float;
    animation-delay: 10ms;
    animation-duration: 250ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    cursor: pointer;
  }

</style>
