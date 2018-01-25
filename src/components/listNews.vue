<template>
  <div>
    <el-row>
      <el-col @mouseover.native="floatUp" @mouseout.native="floatDown" @click.native="clickAction" class="card"
              :span="22"
              v-for="item in recommends" :key="item.id">
        <el-card :body-style="{ padding: '10px' }">
          <el-tag size="mini">{{item.grade}}</el-tag>
          <el-tag size="mini">{{item.subject}}</el-tag>
          <el-tag size="mini">{{item.difficulty}}</el-tag>
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
      }
    },
    data () {
      return {
        currentDate: new Date(),
        recommends: [
          {
            id: 1,
            grade: '初中',
            subject: '计算机',
            difficulty: '变态难',
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            link: '',
            name: '老干妈',
            introduction: '真好吃！！！！！！！！！！！'
          },
          {
            id: 2,
            grade: '高中',
            subject: '数学',
            difficulty: '有点难',
            photoLink: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
            link: '',
            name: '鸡公煲',
            introduction: '超级香！！！！！！！！！！！！'
          }
        ]
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
      clickAction () {
        this.$router.push({path: 'course'});
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .courses {
    display: flex;
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
