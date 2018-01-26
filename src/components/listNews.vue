<template>
  <div>
    <el-row>
      <el-col @mouseover.native="floatUp" @mouseout.native="floatDown" class="card"
              :span="22"
              v-for="(item,key) in recommends" :key="key">
        <el-card :body-style="{ padding: '10px' }" @click.native="clickAction(key)">
          <el-tag v-if="item.is_course" size="mini">{{item.grade}}</el-tag>
          <el-tag v-if="item.is_course" size="mini">{{item.subject}}</el-tag>
          <el-tag v-if="item.is_course" size="mini">{{item.difficulty}}</el-tag>
          <div class="courses">
            <img :src="item.photoLink" class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <p>{{item.introduction}}</p>
                <time class="time">{{ currentDate }}</time>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import news from './news'

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
        type: Array,
        default () {
          return [
            {
              is_course: true,
              grade: '初中',
              subject: '计算机',
              difficulty: '变态难',
              photoLink: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
              link: 'course',
              name: '老干妈',
              introduction: '真好吃！！！！！！！！！！！'
            }
          ]
        }
      }
    },
    data () {
      return {
        currentDate: new Date()
      }
    },
    methods: {
      floatUp (event) {
        let node = event.target;
        while (node && node.className !== 'el-card') {
          node = node.parentNode;
        }
        if (node) {
          node.style = 'position:relative;bottom:5px;box-shadow:2px 2px 15px 5px #d0d0d0'
        }
      },
      floatDown (event) {
        let node = event.target;
        while (node && node.className !== 'el-card') {
          node = node.parentNode;
        }
        if (node) {
          node.style = 'position:default;'
        }
      },
      clickAction (id) {
        this.$router.push({path: this.recommends[id].link});
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .courses {
    display: flex;
    align-items:center;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
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

    margin: 4%;
  }

</style>
