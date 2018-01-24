<template>
  <div>
    <el-row>
      <button @click="back" class="back"><i class="el-icon-back"></i></button>
      <el-col class="card" :span="24">
        <div :body-style="{ padding: '0px'}">
          <img :src="course.photoLink" class="image">
          <div>
            <span class="title">{{course.title}}</span>
            <div class="bottom clearfix">
              <el-tabs type="border-card">
                <el-tab-pane label="简介">
                  <span class="time">开课时间</span>
                  <time class="time">{{course.startTime}}</time>
                  <p>
                    <span class="time">每课时 : {{course.perSession}} 分钟</span>
                    <time class="time"></time>
                  </p>
                  <p>
                    <span class="time">学生评分</span>
                    <el-rate
                      v-model="course.rate"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </p>
                  <p>
                    <span class="time"><am-icon type="rmb"></am-icon>订金</span>
                    <span class="time">{{course.price}}</span>
                  </p>
                  <p>
                    <span class="time"><am-icon type="circle-o"></am-icon>全额</span>
                    <span class="time">{{course.price}}</span>
                  </p>
                  <p>
                    {{course.introduction}}
                  </p>
                </el-tab-pane>
                <el-tab-pane label="详情">
                  <p>
                    {{course.detail}}
                  </p>
                </el-tab-pane>
                <el-tab-pane label="评价">
                  <am-comment-list>
                    <am-comment v-for="item in course.comments" :key="item.id">
                      <am-comment-avatar :src="item.avatar"></am-comment-avatar>
                      <am-comment-content>
                        <am-comment-header>
                          <am-comment-header-meta>
                            <am-comment-author>{{item.userName}}</am-comment-author>
                          </am-comment-header-meta>
                          <am-comment-header-actions>
                            <el-badge :value="200" :max="99" class="item">
                              <a class="icon">
                                <am-icon type="thumbs-up"></am-icon>
                              </a>
                            </el-badge>
                            <span>&nbsp&nbsp&nbsp&nbsp</span>
                            <a class="icon">
                              <am-icon type="thumbs-down"></am-icon>
                            </a>
                          </am-comment-header-actions>
                        </am-comment-header>
                        <am-comment-body>
                          <p>{{item.text}}</p>
                        </am-comment-body>
                      </am-comment-content>
                    </am-comment>
                  </am-comment-list>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="footer">
      <a class="message"><am-icon type="university"></am-icon>进入机构</a>
      <a class="message"><am-icon type="commenting-o"></am-icon>咨询</a>
      <a class="message"><am-icon type="heart-o"></am-icon>收藏课程</a>
      <a class="book">立即预约</a>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'course',
    data () {
      return {
        course: {
          photoLink: 'http://s.amazeui.org/media/i/demos/bing-4.jpg ',
          title: '前端从入门到放弃，只需1天!!!',
          startTime: '2017.08.17',
          perSession: 120,
          rate: 4,
          price: 50,
          introduction: '太极英语“大道至简”全项班，听说读写一课搞定，让你“高分又高能”！还包邮赠送课程配套大礼包！',
          detail: '那时候刚好下着雨，柏油路面湿冷冷的，还闪烁着青、黄、红颜色的灯火。我们就在骑楼下躲雨，看绿色的邮筒孤独地站在街的对面。我白色风衣的大口袋里有一封要寄给南部的母亲的信。樱子说她可以撑伞过去帮我寄信。我默默点头。',
          comments: [
            {
              userName: '金坷垃',
              avatar: 'http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96',
              stars: 2,
              text: '那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？'
            },
            {
              userName: '金坷垃',
              avatar: 'http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/96/h/96',
              stars: 2,
              text: '那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？'
            }
          ]
        }
      }
    },
    methods: {
      back () {
        this.$router.back();
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  time.time {
    font-size: medium;
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

  span.title {
    font-size: 25px;
  }

  span.time {
    font-size: medium;
  }

  .icon {
    font-size: large;
  }

  p {
    font-size: large;
    line-height: 25px;
  }

  .back {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 5px;
    background-color: rgba(255, 255, 255, 0.6);
    border: 0;
    border-radius: 50%;
  }

  .back:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .back i {
    color: black;
  }

  .footer {
    width:100%;
    position:fixed;
    bottom:5%;
    display: flex;

    background-color: #f5f7fa;
  }

  .footer a {
    /*width:100%;*/
    /*height:30px;*/
    font-size: larger;
    color: black;
    padding: 2% 2%;
    border: 1px solid #bcbcbc;
  }
</style>
