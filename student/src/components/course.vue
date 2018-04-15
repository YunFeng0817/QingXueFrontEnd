<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header" v-if="path==='course'">课程详情</span>
      <span class="order-header" v-else>机构详情</span>
      <i :class="favourited?'am-icon-heart':'am-icon-heart-o'"
         style="position: relative;left:25%; color: red;" @click="favourite">
        <span style="color : white;" v-if="path==='course'">收藏</span>
        <span style="color : white;" v-else>关注</span>
      </i>
    </div>

    <div :body-style="{ padding: '0px'}">
      <slider :show-images="showImages" v-if="showImages.length!==0">
      </slider>
      <div>
        <div class="title">{{title}}</div>
        <div class="bottom clearfix">
          <el-tabs type="border-card" ref="tab" @tab-click="handleClick">
            <el-tab-pane label="简介">
              <div v-if="path==='course'">
                <p v-for="item in time_spans" :key="item.id">
                  <span class="key">开课时间：</span>
                  <span class="value">{{item.start_time}}</span>
                  <span class="key">结课时间：</span>
                  <span class="value">{{item.end_time}}</span>
                </p>
                <p v-if="available_time">
                  <span class="key">上课时间： </span>
                  <span class="value">{{available_time}}</span>
                </p>
                <p v-if="perSession">
                  <span class="key">每课时 : </span>
                  <span class="value">{{perSession}} 小时</span>
                </p>
                <p v-if="sessions">
                  <span class="key">课时数 :</span>
                  <span class="value">{{sessions}} 节</span>
                </p>
                <p v-if="course_status">
                  <span class="key">剩余名额 : </span>
                  <span class="value">{{course_status}}</span>
                </p>
                <p v-for="item in contact" :key="item.id">
                  <span class="key" v-if="item.contact_type==='qq'">qq : <a>{{item.contact_detail}}</a></span>
                  <span class="key" v-else-if="item.contact_type==='wechat'">微信 : <a>{{item.contact_detail}}</a></span>
                  <span class="key" v-else-if="item.contact_type==='email'">邮箱 : <a>{{item.contact_detail}}</a></span>
                </p>
                <p>
                  <span class="key">学生评分</span>
                  <el-rate
                    v-model="stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </p>
                <p>
                  <span class="key">订金：</span>
                  <span class="value"><i class="am-icon-rmb"></i>{{deposit}}</span>
                </p>
                <p>
                  <span class="key">价格：</span>
                  <span class="value"><i class="am-icon-rmb"></i>{{price*discount}}</span>
                  <span class="value" style="text-decoration: line-through" v-if="discount!==1"><i
                    class="am-icon-rmb"></i>{{price}}</span>
                  <span class="value" style="color:#67e6d1;" v-if="discount!==1">{{'-'+((1-discount)*100).toFixed(2)+'%'}}</span>
                </p>
                <p v-if="introduction">
                  <span class="key">简要介绍: </span>
                  <br/>
                  <span class="value">{{introduction}}</span>
                </p>
                <p v-if="note">
                  <span class="key">课程备注: </span>
                  <br/>
                  <span class="value">{{note}}</span>
                </p>
                <p v-if="address">
                  <span class="key" v-if="address.area">机构地址 :  </span>
                  <span class="value">{{address.area}}</span>
                </p>
                <p v-if="address">
                  <span class="key" v-if="address.detail">地址详情 :  </span>
                  <span class="value">{{address.detail}}</span>
                </p>
              </div>
              <div v-else>
                <div class="educator">
                  <am-image class="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                            :src="head_photo===''?'http://s.amazeui.org/media/i/demos/bing-4.jpg':head_photo"/>
                  <div>
                    <p v-if="gender"><span class="teacher">性别：</span> {{gender==='male'?'男':'女'}}</p>
                    <p v-if="gender"><span class="teacher">学历：</span><span>{{edu_background}}</span></p>
                  </div>
                </div>
                <div class="teacher" v-if="introduction!==''">
                  {{introduction}}
                </div>
                <p v-for="item in contact" :key="item.id">
                  <span class="key" v-if="item.contact_type==='qq'">qq : <a>{{item.contact_detail}}</a></span>
                  <span class="key" v-else-if="item.contact_type==='wechat'">微信 : <a>{{item.contact_detail}}</a></span>
                  <span class="key" v-else-if="item.contact_type==='email'">邮箱 : <a>{{item.contact_detail}}</a></span>
                  <span class="key" v-else>电话 : <a
                    :href="'tel:'+item.contact_detail">{{item.contact_detail}}</a></span>
                </p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="详情" v-if="path==='course'">
              <p class="article" v-html="detail">
              </p>
              <p v-if="detail===''">暂时没有课程详情</p>
            </el-tab-pane>
            <el-tab-pane label="教师" v-if="path==='course'">
              <div v-for="item in teachers">
                <div class="educator">
                  <am-image class="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                            :src="item.photo===''?'http://s.amazeui.org/media/i/demos/bing-4.jpg':item.photo"/>
                  <div>
                    <p>
                      <el-tag class="teacher">{{item.name}}</el-tag>
                    </p>
                    <p><span class="teacher">性别：</span> {{item.gender==='male'?'男':'女'}}</p>
                    <p><span class="teacher">学历：</span><span>{{item.edu_background}}</span></p>
                  </div>
                </div>
                <div class="teacher">
                  {{item.description}}
                </div>
              </div>
              <p v-if="teachers.length===0">没有教师的详情</p>
            </el-tab-pane>
            <!--下面的百度地图去掉注释就可以正常使用了-->
            <el-tab-pane label="地址" v-if="address.longitude">
              <baidu-map class="map" ak="Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m"
                         :center="{lng: address.longitude, lat: address.latitude}"
                         :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT">
                </bm-navigation>
                <bm-marker :position="{lng: address.longitude, lat: address.latitude}" :dragging="false">
                  <bm-label content="这里是上课地点"
                            :offset="{width: -35, height: 30}"/>
                </bm-marker>
              </baidu-map>
            </el-tab-pane>
            <el-tab-pane label="评价" v-if="path==='course'">
              <am-comment-list>
                <am-comment v-for="item in comments" :key="item.id">
                  <am-comment-avatar :src="item.student.head_photo">
                  </am-comment-avatar>
                  <am-comment-content>
                    <am-comment-header>
                      <am-comment-header-meta>
                        <am-comment-author>{{item.student.name}}</am-comment-author>
                      </am-comment-header-meta>
                      <am-comment-header-actions>
                        <el-rate
                          v-model="item.stars"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}"
                          style="position: relative;top:25%;">
                        </el-rate>
                      </am-comment-header-actions>
                    </am-comment-header>
                    <am-comment-body>
                      <p v-html="item.text">
                      </p>
                      <time style="position: absolute;right:5%;">
                        {{'评论时间：'+item.add_time}}
                      </time>
                    </am-comment-body>
                  </am-comment-content>
                </am-comment>
              </am-comment-list>
              <p v-if="comments.length===0">暂时没有评论</p>
            </el-tab-pane>
            <el-tab-pane label="课程" v-if="path==='institution'">
              <list-news v-if="courses.length!==0" :recommends="courses">
              </list-news>
              <p v-else>没有合适的课程</p>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <div class="footer" v-if="path==='course'">
      <a class="message" @click="intoInstitution(institutionID)">
        <i class="am-icon-university"></i>
        进入机构</a>
      <a class="message" :href="'tel:'+contactPhone">
        <i class="am-icon-commenting-o"></i>
        咨询</a>
      <a class="message" @click="share">
        <i class="am-icon-share-square-o"></i>
        分享课程</a>
      <a id="book" @click="order">立即预约</a>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 150px;"></div>
    <input style="position:fixed; bottom:-10px;" ref="input" type="text" id="copy"
           :value="'https://qingxue.xyz'+$router.currentRoute.fullPath"/>
  </div>
</template>

<script>
  import axios from '../axios/index'
  import userMessage from '../store/index'
  import BackButton from './backButton'
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import bmMarker from 'vue-baidu-map/components/overlays/Marker'
  import bmLabel from 'vue-baidu-map/components/overlays/Label'
  import Navigation from 'vue-baidu-map/components/controls/Navigation'
  import image from 'amaze-vue/src/components/image/src/image'
  import slider from './slider'
  import listNews from './listNews'
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
      'list-news': listNews,
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
        deposit: 0, // 用户实际需要支付的金额
        total_hours_person: '',  // 总课时长
        course_status: '', // 课程紧张程度
        note: '', // 课程备注
        sessions: 0, // 课时数量
        available_time: '', // 每次上课时间
        address: '',
        favourited: false,
        title: '',
        time_spans: [], // 学期开始和结束的时间
        perSession: '', // 每课时的长度
        stars: 5, // 评分
        price: 0, // 总价
        discount: 1, // 折扣
        introduction: '', // 简介
        detail: '', // 课程详情
        comments: [], // 课程评论
        teachers: [], // 课程的教师
        showImages: [], // 课程的轮播图
        institutionID: '', // 机构的id
        gender: '', // 家教的性别
        edu_background: '', // 家教的学历
        head_photo: '', // 家教的头像
        contact: [], // 家教的联系方式
        path: this.$router.currentRoute.params.type,
        offsetTop: 0,
        cloneNode: document.createElement('img'),
        courses: [] // 这个课程是存储在机构或教师页面需要展示的其拥有的课程
      }
    },
    created () {
      this.init();
    },
    watch: {
      '$route' (to, from) {
        this.path = this.$router.currentRoute.params.type;
        this.init();
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handler);
      this.offsetTop = this.$refs.tab.$el.firstChild.offsetTop;
    },
    computed: {
      contactPhone: function () {
        for (let item of this.contact) {
          if (item.contact_type) {
            return item.contact_detail;
          }
        }
      }
    },
    methods: {
      // 这个函数用于处理直接url访问的请求数据，由别的url跳转进来不请求数据的情况
      // 由于这个组件是 课程和机构共用， 所以要对类别进行判断
      init () {
        if (this.path === 'course') {
          // 下面的if分支处理非跳转，直接访问的情况
          if (JSON.stringify(userMessage.state.courseDetail) === '{}') {
            axios({
              url: '/api/course/' + this.$router.currentRoute.params.id + '/',
              method: 'get'
            })
              .then(function (response) {
                if (response) {
                  userMessage.commit('commitCourse', response);
                  this.deposit = response.deposit;
                  this.total_hours_person = response.total_hours_person;
                  this.course_status = response.course_status;
                  this.note = response.note;
                  this.sessions = response.sessions;
                  this.available_time = response.available_time;
                  this.address = response.address;
                  this.favourited = response.favourited;
                  this.title = response.title;
                  this.time_spans = response.time_spans;
                  this.perSession = response.session_hours;
                  this.stars = response.stars;
                  this.price = response.total_price;
                  this.discount = response.discount;
                  this.introduction = response.brief_description;
                  this.detail = response.detail;
                  this.teachers = response.teachers;
                  this.showImages = response.banners;
                  this.institutionID = response.master;
                  this.contact = response.contacts;
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
          } else {
            this.deposit = userMessage.state.courseDetail.deposit;
            this.total_hours_person = userMessage.state.courseDetail.total_hours_person;
            this.course_status = userMessage.state.courseDetail.course_status;
            this.note = userMessage.state.courseDetail.note;
            this.sessions = userMessage.state.courseDetail.sessions;
            this.available_time = userMessage.state.courseDetail.available_time;
            this.address = userMessage.state.courseDetail.address;
            this.favourited = userMessage.state.courseDetail.favourited;
            this.title = userMessage.state.courseDetail.title;
            this.time_spans = userMessage.state.courseDetail.time_spans;
            this.perSession = userMessage.state.courseDetail.session_hours;
            this.stars = userMessage.state.courseDetail.stars;
            this.price = userMessage.state.courseDetail.total_price;
            this.discount = userMessage.state.courseDetail.discount;
            this.introduction = userMessage.state.courseDetail.brief_description;
            this.detail = userMessage.state.courseDetail.detail;
            this.teachers = userMessage.state.courseDetail.teachers;
            this.showImages = userMessage.state.courseDetail.banners;
            this.institutionID = userMessage.state.courseDetail.master;
            this.contact = userMessage.state.courseDetail.contacts;
          }
        } else if (this.path === 'institution') {
          // 下面的if分支处理非跳转，直接访问的情况
          if (JSON.stringify(userMessage.state.institution) === '{}') {
            axios({
              url: '/api/educator/' + this.$router.currentRoute.params.id + '/',
              method: 'get'
            })
              .then(function (response) {
                if (response) {
                  userMessage.commit('commitInstitution', response);
                  // 机构的地址可能为空
                  if (response.basic_info.addresses.length !== 0) {
                    this.address = response.basic_info.addresses;
                  }
                  this.favourited = response.followed;
                  this.title = response.basic_info.name;
                  this.introduction = response.basic_info.introduction;
                  this.showImages = response.basic_info.banners;
                  this.head_photo = response.basic_info.head_photo;
                  this.contact = response.basic_info.contacts;
                  this.gender = response.gender;
                  this.edu_background = response.edu_background;
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
          } else {
            // 机构的地址可能为空
            if (userMessage.state.institution.basic_info.addresses.length !== 0) {
              this.address = userMessage.state.institution.basic_info.addresses[0];
            }
            this.favourited = userMessage.state.institution.followed;
            this.title = userMessage.state.institution.basic_info.name;
            this.introduction = userMessage.state.institution.basic_info.introduction;
            this.showImages = userMessage.state.institution.basic_info.banners;
            this.head_photo = userMessage.state.institution.basic_info.head_photo;
            this.contact = userMessage.state.institution.basic_info.contacts;
            this.gender = userMessage.state.institution.gender;
            this.edu_background = userMessage.state.institution.edu_background;
          }
        }
      },
      // 处理进入预定页面
      order () {
        this.$router.push({path: userMessage.state.has_login ? '/order' : '/login'});
      },
      // 处理进入机构主页
      intoInstitution (institutionID) {
        axios({
          url: '/api/educator/' + institutionID + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitInstitution', response);
              this.$router.push({path: '/detail/institution/' + institutionID});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 这是对屏幕滚动事件的监听处理函数
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
      },
      // 负责处理分享课程
      share () {
        // 注释中的 this.$share();是原来的分享组件，可以使用
        // this.$share();
        try {
          // 执行复制
          this.$refs.input.select();
          document.execCommand('copy');
          this.$message({
            message: '已将网址复制到剪切板，您可以打开app复制连接',
            type: 'success',
            duration: 2000
          });
        } catch (err) {
          alert('您的浏览器不支持自动复制，请您手动复制网址');
        }
      },
      // 处理收藏课程的动作
      favourite () {
        if (userMessage.state.has_login) {
          let postData = {};
          postData.course_id = this.$router.currentRoute.params.id;
          if (userMessage.state.institution.basic_info) {
            postData.educator_id = userMessage.state.institution.basic_info.id;
          }
          if (!this.favourited) {
            axios({
              method: 'post',
              headers: {
                'X-CSRFToken': document.cookie.split(';')[0].split('=')[1]
              },
              url: '/api/student_operation/' + (this.path === 'course' ? 'favourites/' : 'followings/'),
              data: postData
            })
              .then(function (response) {
                if (response) {
                  this.favourited = true;
                  this.$message({
                    message: '收藏成功',
                    type: 'success',
                    duration: 1000
                  });
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          } else {
            this.$message({
              message: '您已收藏过该课程',
              type: 'info',
              duration: 1000
            });
          }
        } else {
          this.$router.push({path: '/login'});
        }
      },
      // 请求课程评论的信息
      handleClick (tab, event) {
        switch (event.target.innerHTML) {
          case '评价':
            if (this.comments.length === 0) {
              axios({
                method: 'get',
                url: '/api/course/' + this.$router.currentRoute.params.id + '/get_comments/'
              })
                .then(function (response) {
                  if (response) {
                    this.comments = response.comment_to_courses;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                })
            }
            break;
          // 处理在机构页面请求该机构的全部课程
          case '课程':
            if (this.courses.length === 0) {
              axios({
                method: 'post',
                url: '/api/course/filtered_courses/',
                data: {
                  educator_id: this.$router.currentRoute.params.id,
                  page: -1
                }
              })
                .then(function (response) {
                  if (response) {
                    for (let item of response.courses) {
                      item.is_course = true;
                    }
                    this.courses = response.courses;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                })
            }
            break;
          default:
        }
      }
    },
    // 当该组件销毁，应当取消对屏幕滚动事件的监听
    destroyed () {
      window.removeEventListener('scroll', this.handler);
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .key {
    font-size: medium;
    font-weight: bolder;
  }

  .value {
    font-size: medium;
    font-weight: normal;
    color: #777;
  }

  .bottom {
    margin: 8px 0;
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

  .title {
    text-align: center;
    font-size: 25px;
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
    color: white;
    background-color: #e62739;
    opacity: 0.9;
    padding: 2% 2%;
    border-left: 0;
    border-right: 0;
    border-radius: 5px;
  }

  .footer a#book:active {
    background-color: #dce2eb;
  }

  span.teacher {
    margin: 0 0 0 5%;
    font-size: medium;
  }

  .avatar {
    width: 120px;
    height: 120px;
    max-width: 50%;
    max-height: 50%;
  }

  div.teacher {
    line-height: 2em;
    text-indent: 20px;
    letter-spacing: 2px;
    font-size: larger;
    border-radius: 10px;
    background-color: #eee;
    /*position: relative;*/
    /*top: 30%;*/
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

  span.order-header {
    position: relative;
    left: 8%;
  }

  .educator {
    display: flex;
    align-content: center;
    align-items: center;
  }

  .educator div {
    flex: 1 2 85%;
  }

  .article {
    font-size: medium;
    line-height: 2em;
    padding: 0 4%;
  }
</style>
