<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header" v-if="path==='/course'">课程详情</span>
      <span class="order-header" v-else>机构详情</span>
      <i v-if="path==='/institution'" class="am-icon-heart-o"
         style="position: relative;left:30%;"></i>
    </div>

    <div :body-style="{ padding: '0px'}">
      <slider :show-images="showImages">
      </slider>
      <div>
        <span class="title">{{title}}</span>
        <div class="bottom clearfix">
          <el-tabs type="border-card" ref="tab">
            <el-tab-pane label="简介">
              <div v-if="path==='/course'">
                <span class="time">开课时间</span>
                <time class="time">{{start_time}}</time>
                <span class="time">结课时间</span>
                <time class="time">{{end_time}}</time>
                <p>
                  <span class="time">每课时 : {{perSession}} 分钟</span>
                  <time class="time"></time>
                </p>
                <p>
                  <span class="time">学生评分</span>
                  <el-rate
                    v-model="stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </p>
                <p>
                  <span class="time"><i class="am-icon-rmb"></i>订金</span>
                  <span class="time">{{price*discount}}</span>
                </p>
                <p>
                  <span class="time"><i class="am-icon-circle-o"></i>全额</span>
                  <span class="time">{{price}}</span>
                </p>
                <p>
                  {{introduction}}
                </p>
              </div>
              <div v-else>
                <span class="time">成立时间</span>
                <time class="time">{{startTime}}</time>
                <p>
                  <span class="time">学生评分</span>
                  <el-rate
                    v-model="stars"
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
                  {{introduction}}
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详情">
              <p>
                {{detail}}
              </p>
            </el-tab-pane>
            <el-tab-pane label="教师">
              <div v-for="item in teachers">
                <div>
                  <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                            :src="item.photo===''?'http://s.amazeui.org/media/i/demos/bing-4.jpg':item.photo"/>
                  <p>
                    <el-tag class="teacher">{{item.name}}</el-tag>
                  </p>
                  <p><span class="teacher">性别：</span> {{item.gender==='male'?'男':'女'}}</p>
                  <p><span class="teacher">学历：</span><span>{{item.edu_background}}</span></p>
                </div>
                <div class="teacher">
                  {{item.description}}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="地址">
              <baidu-map class="map" ak="Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m" :center="{lng: 116.404, lat: 39.915}"
                         :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT">
                </bm-navigation>
                <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="false">
                  <bm-label content="这里是上课地点"
                            :offset="{width: -35, height: 30}"/>
                </bm-marker>
              </baidu-map>
            </el-tab-pane>
            <el-tab-pane label="评价">
              <am-comment-list>
                <am-comment v-for="item in comments" :key="item.id">
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
  import BackButton from './backButton'
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
      'back-button': BackButton,
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
        title: userMessage.state.courseDetail.name,
        start_time: userMessage.state.courseDetail.time_spans[0].start_time,
        end_time: userMessage.state.courseDetail.time_spans[0].end_time,
        perSession: userMessage.state.courseDetail.session_hours,
        rate: userMessage.state.courseDetail.stars,
        price: userMessage.state.courseDetail.total_price,
        discount: userMessage.state.courseDetail.discount,
        introduction: userMessage.state.courseDetail.brief_description,
        detail: userMessage.state.courseDetail.detail,
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
          },
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
        ],
        teachers: userMessage.state.courseDetail.teachers,
        showImages: userMessage.state.courseDetail.banners,
        path: this.$router.currentRoute.path,
        offsetTop: 0,
        cloneNode: document.createElement('img')
      }
    },
    watch: {
      '$route' (to, from) {
        this.path = this.$router.currentRoute.path;
        if (this.path === '/course') {
          this.title = userMessage.state.courseDetail.name;
          this.start_time = userMessage.state.courseDetail.time_spans[0].start_time;
          this.this.end_time = userMessage.state.courseDetail.time_spans[0].end_time;
          this.perSession = userMessage.state.courseDetail.session_hours;
          this.rate = userMessage.state.courseDetail.stars;
          this.price = userMessage.state.courseDetail.total_price;
          this.discount = userMessage.state.courseDetail.discount;
          this.introduction = userMessage.state.courseDetail.brief_description;
          this.detail = userMessage.state.courseDetail.detai;
          this.teachers = userMessage.state.courseDetail.teachers;
          this.showImages = userMessage.state.courseDetail.banners;
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handler);
      this.offsetTop = this.$refs.tab.$el.firstChild.offsetTop;
    },
    methods: {
      order () {
        this.$router.push({path: userMessage.state.has_login ? '/order' : '/login'});
      },
      intoInstitution () {
        this.$router.push({path: '/institution'});
      },
      handler () {
        if (this.offsetTop < window.scrollY) {
          if (this.cloneNode.tagName === 'IMG') {
            this.cloneNode = this.$refs.tab.$el.firstChild.cloneNode(true);
            this.$refs.tab.$el.firstChild.style = 'position:fixed;top:0;z-index:100;';
            this.$refs.tab.$el.insertBefore(this.cloneNode, this.$refs.tab.$el.firstChild);
          }
        } else {
          if (this.cloneNode.tagName !== 'IMG') {
            this.$refs.tab.$el.removeChild(this.cloneNode);
            this.$refs.tab.$el.firstChild.style = 'position:static;';
            this.cloneNode = document.createElement('img');
          }
        }
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handler);
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
    max-width: 450px;
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
