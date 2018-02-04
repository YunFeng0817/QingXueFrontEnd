<template>
  <div>
    <el-row>
      <back-button>
      </back-button>
      <div class="order-header">
        <span class="order-header">课程详情</span>
        <i v-if="path==='/institution'" class="am-icon-heart-o"
           style="position: relative;left:30%;"></i>
      </div>
      <el-col class="card" :span="24">
        <div :body-style="{ padding: '0px'}">
          <slider :show-images="showImages">
          </slider>
          <div>
            <span class="title">{{course.title}}</span>
            <div class="bottom clearfix">
              <el-tabs type="border-card">
                <el-tab-pane label="简介">
                  <div v-if="path==='/course'">
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
                      <span class="time"><i class="am-icon-rmb"></i>订金</span>
                      <span class="time">{{course.price}}</span>
                    </p>
                    <p>
                      <span class="time"><i class="am-icon-circle-o"></i>全额</span>
                      <span class="time">{{course.price}}</span>
                    </p>
                    <p>
                      {{course.introduction}}
                    </p>
                  </div>
                  <div v-else>
                    <span class="time">成立时间</span>
                    <time class="time">{{course.startTime}}</time>
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
                      机构简介：
                    </p>
                    <p>
                      {{course.introduction}}
                    </p>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="详情">
                  <p>
                    {{course.detail}}
                  </p>
                </el-tab-pane>
                <el-tab-pane label="教师">
                  <div>
                    <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                              :src="course.avatar===''?'http://s.amazeui.org/media/i/demos/bing-4.jpg':course.avatar"/>
                    <p>
                      <el-tag class="teacher">我的名字</el-tag>
                    </p>
                    <p><span class="teacher">性别：</span> 男</p>
                    <p><span class="teacher">学历：</span><span>研究生</span></p>
                  </div>
                  <div class="teacher">
                    特斯特特斯特特色特斯特特色特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉
                    特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉
                    特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉特斯拉
                    特斯拉特斯拉特斯拉特斯拉特斯拉
                  </div>
                </el-tab-pane>
                <el-tab-pane label="地址">
                  <baidu-map class="map" ak="Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m" :center="{lng: 116.404, lat: 39.915}"
                             :zoom="15">
                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT">
                    </bm-navigation>
                    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="false">
                      <bm-label content="这里是上课地点" :labelStyle="{color: 'red', fontSize : 'medium'}"
                                :offset="{width: -35, height: 30}"/>
                    </bm-marker>
                  </baidu-map>
                </el-tab-pane>
                <el-tab-pane label="评价">
                  <am-comment-list>
                    <am-comment v-for="item in course.comments" :key="item.id">
                      <am-comment-avatar :src="item.avatar">
                      </am-comment-avatar>
                      <am-comment-content>
                        <am-comment-header>
                          <am-comment-header-meta>
                            <am-comment-author>{{item.userName}}</am-comment-author>
                          </am-comment-header-meta>
                          <am-comment-header-actions>
                            <el-badge :value="200" :max="99" class="item">
                              <a class="icon">
                                <i class="am-icon-thumbs-up"></i>
                              </a>
                            </el-badge>
                            <span>&nbsp&nbsp&nbsp&nbsp</span>
                            <a class="icon">
                              <i class="am-icon-thumbs-down"></i>
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
    <div class="footer" v-if="path==='/course'">
      <a class="message" @click="intoInstitution">
        <i class="am-icon-university"></i>
        进入机构</a>
      <a class="message">
        <i class="am-icon-commenting-o"></i>
        咨询</a>
      <a class="message">
        <i class="am-icon-heart-o"></i>
        收藏课程</a>
      <a id="book" @click="order">立即预约</a>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 150px;"></div>
  </div>
</template>

<script>
  import userMessage from '../store/index'
  import backButtom from './backButton'
  import BaiduMap from 'vue-baidu-map/components/Map/Map'
  import bmMarker from 'vue-baidu-map/components/overlays/Marker'
  import bmLabel from 'vue-baidu-map/components/overlays/Label'
  import Navigation from 'vue-baidu-map/components/controls/Navigation'
  import image from 'amaze-vue/src/components/image/src/image'
  import slider from './slider'
  import {
    Comment,
    CommentAuthor,
    CommentBody,
    CommentAvatar,
    CommentContent,
    CommentHeader,
    CommentList,
    CommentHeaderActions,
    CommentHeaderMeta
  } from 'amaze-vue/src/components/comment/index'

  export default {
    name: 'course',
    components: {
      'slider': slider,
      'back-button': backButtom,
      'baidu-map': BaiduMap,
      'bm-marker': bmMarker,
      'bm-label': bmLabel,
      'bm-navigation': Navigation,
      'am-image': image,
      AmComment: Comment,
      AmCommentAuthor: CommentAuthor,
      AmCommentBody: CommentBody,
      AmCommentAvatar: CommentAvatar,
      AmCommentContent: CommentContent,
      AmCommentHeader: CommentHeader,
      AmCommentList: CommentList,
      AmCommentHeaderActions: CommentHeaderActions,
      AmCommentHeaderMeta: CommentHeaderMeta
    },
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
          avatar: '',
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
        },
        showImages: [
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-1.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-2.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-3.jpg',
            link: ''
          },
          {
            src: 'http://s.amazeui.org/media/i/demos/bing-4.jpg',
            link: ''
          }
        ],
        path: this.$router.currentRoute.path
      }
    },
    watch: {
      '$route' (to, from) {
        this.path = this.$router.currentRoute.path;
      }
    },
    methods: {
      order () {
        this.$router.push({path: userMessage.state.has_login ? '/order' : '/login'});
      },
      intoInstitution () {
        this.$router.push({path: '/institution'});
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

  .footer {
    /*max-height: 40px;*/
    width: 100%;
    position: fixed;
    bottom: 8%;
    display: flex;
    align-items: center;

    background-color: #f5f7fa;
  }

  .footer a {
    /*max-height: 40px;*/
    /*width:100%;*/
    /*height:30px;*/
    display: block;
    text-align: center;
    font-size: medium;
    color: #909399;
    padding: 2% 2%;
    border-top: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
    border-left: 0;
    border-right: 0;
  }

  .footer a.message {
    flex-grow: 3;
  }

  .footer a#book {
    /*使得最后一个按钮占据剩余的全部空间*/
    flex-grow: 1;
    color: #CC3333;
  }

  .footer a#book:active {
    background-color: #dce2eb;
  }

  span.teacher {
    margin: 0 0 0 5%;
    font-size: medium;
  }

  #avatar {
    float: left;

    width: 120px;
    height: 120px;
    max-width: 50%;
    max-height: 50%;
  }

  div.teacher {
    padding: 5%;
    line-height: 2em;
    text-indent: 20px;
    letter-spacing: 2px;
    font-size: larger;
    border-radius: 10px;
    background-color: #eee;
  }

  .map {
    width: 100%;
    height: 350px;
  }

  div.order-header {
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;

    background: linear-gradient(to right, #68eace, #4ca2ef);
  }

  .order-header {
    font-size: larger;
    color: #eee;
  }
</style>
