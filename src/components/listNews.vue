<template>
  <div>
    <el-row>
      <el-col class="card" :span="22" v-for="item in recommends" :key="item.id" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="item.photoLink" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <p>{{item.introduction}}</p>
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">更多详情</el-button>
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
        ]
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
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
