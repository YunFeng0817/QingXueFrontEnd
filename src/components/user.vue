<template>
  <div>
    <div id="user-header">
      <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                :src="avatar===null?'http://s.amazeui.org/media/i/demos/bing-4.jpg':avatar"/>
      <p><span class="user-message">{{userName}}</span>欢迎光临</p>
      <p><a @click="modifyMessage">修改信息</a><a style="padding: 0" @click="modifyPass">修改密码</a><a @click="logout">退出登录</a>
      </p>
      <p><span style="padding: 0 5px;font-size: larger;">性别：</span><span class="am-btn icon" :class="getGender"
                                                                         style="font-size: large;padding:0 30px 0 0;"></span>
        <span class="user-message">年级：</span><span class="user-message">{{stage+grade}}</span>
      </p>
    </div>
    <el-collapse accordion class="user-collapse-body" @change="handleChange">
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="1">
        <template slot="title">
          <i class="am-icon-clock-o operation-item">&nbsp&nbsp我的预约</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" v-for="item in favourites" :key="item.id" class="box-card">
          <el-tag size="mini">{{item.course.stage+item.course.grade}}</el-tag>
          <el-tag size="mini">{{item.course.subject}}</el-tag>
          <el-tag size="mini">{{item.course.degree}}</el-tag>
          <div class="courses">
            <img :src="item.course.cover" class="image">
            <div style="padding: 2%;">
              <span>{{item.course.title}}</span>
              <div class="bottom clearfix">
                <span>
                  好评率：
                  <el-rate
                    v-model="item.course.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </span>
                <span>
                  全额费用：{{item.course.total_price}} 元
                </span>
              </div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="2">
        <template slot="title">
          <i class="am-icon-comments-o operation-item">&nbsp&nbsp我的评论</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" class="box-card"
                 @click.native="coursesClick(item.course.id)" v-for="(item,id) in comments" :key="item.id">
          <div style="padding: 2%;">
            <div class="bottom clearfix">
              <label>
                课程名称：
              </label>
              <h2 style="margin: 3% 0">{{item.course.title}}</h2>
              <label>
                评分：
              </label>
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <label>评论内容</label>
              <p v-html="item.text">
              </p>
              <label>
                评论时间
              </label>
              <time>
                {{item.add_time.split('T')[0]}}
              </time>
              <div style="display: flex;align-items: center; font-size: larger; position:relative;left:25%;">
                <p style="margin: 0 5%;">tips:点击查看课程详情</p>
                <el-button type="danger" size="mini"
                           @click.stop="deleteComments(item.id,id)">
                  <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
                  删除评论
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="3">
        <template slot="title">
          <i class="am-icon-comments-o operation-item">&nbsp&nbsp我的收藏</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" v-for="(item,id) in favourites" :key="item.id" class="box-card"
                 @click.native="coursesClick(item.course.id)">
          <el-tag size="mini">{{item.course.stage+item.course.grade}}</el-tag>
          <el-tag size="mini">{{item.course.subject}}</el-tag>
          <el-tag size="mini">{{item.course.degree}}</el-tag>
          <div class="courses">
            <img :src="item.course.cover" class="image">
            <div style="padding: 2%;">
              <span>{{item.course.title}}</span>
              <div class="bottom clearfix">
                <span>
                  好评率：
                  <el-rate
                    v-model="item.course.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </span>
                <span>
                  全额费用：{{item.course.total_price}} 元
                </span>
              </div>
            </div>
            <el-button type="danger" size="mini"
                       style="padding: 1% 1%; position: absolute;right:2%;"
                       @click.stop="deleteFavourites(item.id,id)">
              <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
              删除收藏
            </el-button>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="4">
        <template slot="title">
          <i class="am-icon-comments-o operation-item">&nbsp&nbsp我的关注</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" v-for="(item,id) in followings" :key="item.id" class="box-card"
                 @click.native="institutionClick(item.educator.id)">
          <div class="courses">
            <img :src="item.educator.head_photo" class="image">
            <div style="padding: 2%;">
              <label>
                  名称：{{item.educator.name}}
              </label>
              <div class="bottom clearfix">
                <label>评论内容</label>
                <p v-text="item.introduction">
                <p>
                  <label class="time">联系方式 : </label>
                  <a :href="'tel:'+item.contact">{{item.contact}}</a>
                </p>
              </div>
            </div>
            <el-button type="danger" size="mini"
                       style="padding: 1% 1%; position: absolute;right:2%;"
                       @click.stop="deleteFollowings(item.id,id)">
              <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
              删除收藏
            </el-button>
          </div>
        </el-card>
      </el-collapse-item>
      <div class="user-list" @click="openShare">
        <span class="am-icon-share-square-o operation-item">&nbsp&nbsp分享</span>
      </div>
    </el-collapse>
    <!--下面的这个区块是为了占位-->
    <div style="height: 150px;"></div>
  </div>
</template>

<script>
  import userMessage from '../store/index'
  import axios from '../axios/index'
  import image from 'amaze-vue/src/components/image/src/image'

  export default {
    name: 'user',
    components: {
      'am-image': image
    },
    data () {
      return {
        avatar: userMessage.state.head_photo,
        userName: userMessage.state.name,
        gender: userMessage.state.gender,
        stage: userMessage.state.stage,
        grade: userMessage.state.grade,
        panelList: [
          {
            label: ' 我的预约',
            icon: ' am-icon-clock-o'
          },
          {
            label: ' 通知',
            icon: ' am-icon-comments-o'
          },
          {
            label: ' 我的收藏',
            icon: ' am-icon-heart-o'
          },
          {
            label: ' 客户服务',
            icon: ' el-icon-question'
          },
          {
            label: ' 关于我们',
            icon: ' header-icon el-icon-info'
          },
          {
            label: ' 鸣谢',
            icon: ' am-icon-at'
          }
        ],
        favourites: [],
        comments: [],
        followings: []
      }
    },
    computed: {
      // 把性别转换成对应的图标
      getGender: function () {
        if (this.gender === 'male') {
          return 'am-icon-mars'
        } else {
          return 'am-icon-venus'
        }
      }
    },
    methods: {
      logout () {
        axios({
          method: 'get',
          url: '/student/logout/'
        }).then(function () {
          userMessage.commit('delete_message');
          this.$router.replace({path: '/main'});
        }.bind(this)).catch(function (error) {
          console.log(error);
        });
      },
      modifyMessage () {
        if (userMessage.state.has_login) {
          this.$router.push({path: '/message'});
        }
      },
      modifyPass () {
        if (userMessage.state.has_login) {
          this.$router.push({path: '/modify/pass'});
        }
      },
      openShare () {
        this.$share();
      },
      // 处理点击折叠菜单事件
      handleChange (val) {
        switch (val) {
          case 1:
            break;
          case 2:
            if (this.comments.length === 0) {
              axios({
                method: 'get',
                url: '/student_operation/comment_to_courses/'
              })
                .then(function (response) {
                  if (response) {
                    this.comments = response.comment_to_courses;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
            }
            break;
          case 3:
            if (this.favourites.length === 0) {
              axios({
                method: 'get',
                url: '/student_operation/favourites/'
              })
                .then(function (response) {
                  if (response) {
                    this.favourites = response.favourites;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
            }
            break;
          case 4:
            if (this.followings.length === 0) {
              axios({
                method: 'get',
                url: '/student_operation/followings/'
              })
                .then(function (response) {
                  if (response) {
                    this.followings = response.followings;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
            }
            break;
          default:
        }
      },
      // 处理点击进入课程详情的操作
      coursesClick (id) {
        axios({
          url: '/course/' + id + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitCourse', response);
              this.$router.push({path: '/course'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 处理点击进机构的情况
      institutionClick (id) {
        axios({
          url: '/educator/' + id + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitInstitution', response);
              this.$router.push({path: '/institution'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 处理删除喜欢课程
      deleteFavourites (favouriteId, index) {
        axios({
          url: '/student_operation/favourites/',
          method: 'delete',
          data: {
            favourite_id: favouriteId
          }
        })
          .then(function (response) {
            if (response) {
              this.favourites.splice(index, 1);// 删除index处的喜欢课程
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 删除对课程的评论
      deleteComments (commentId, index) {
        axios({
          url: '/student_operation/comment_to_courses/',
          method: 'delete',
          data: {
            comment_to_course_id: commentId
          }
        })
          .then(function (response) {
            if (response) {
              this.comments.splice(index, 1);// 删除index处的喜欢课程
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 删除对这个机构的关注
      deleteFollowings (itemId, index) {
        axios({
          url: '/student_operation/followings/',
          method: 'delete',
          data: {
            following_id: itemId
          }
        })
          .then(function (response) {
            if (response) {
              this.followings.splice(index, 1);// 删除index处的喜欢课程
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #user-header {
    height: 100%;
    width: 100%;
    color: white;
    background: #8d8c9e; /* Old browsers */
    /*background: -moz-linear-gradient(top,  #8d8c9e 0%, #f2c9c7 100%); !* FF3.6+ *!*/
    /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #96dbff), color-stop(100%, #d4effd)); !* Chrome,Safari4+ *!*/
    /*background: -webkit-linear-gradient(top,  #4927bc 0%,#b25fd3 100%); !* Chrome10+,Safari5.1+ *!*/
    /*background: -o-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* Opera 11.10+ *!*/
    /*background: -ms-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* IE10+ *!*/
    /*background: linear-gradient(to bottom,  #8d8c9e 0%,#f2c9c7 100%); !* W3C *!*/
    /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8d8c9e', endColorstr='#f2c9c7',GradientType=0 ); !* IE6-9 *!*/
    background: linear-gradient(to right, #68eace, #4ca2ef); /* 标准的语法（必须放在最后） */
    overflow: hidden
  }

  #avatar {
    float: left;

    width: 100px;
    height: 100px;
  }

  span.user-message {
    font-size: medium;
    padding: 1%;
    font-weight: bold;
    color: white;
  }

  a {
    font-size: larger;
    padding: 18px;
    color: #0e90d2;
  }

  a:active {
    color: #49b5ed;
  }

  .user-collapse-body {
    line-height: 100px;
  }

  .user-panel-header {
    font-size: 20px !important;
  }

  .user-list {
    line-height: 48px;
    background: white;
  }

  .user-list span {
    font-size: large;
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

  .courses {
    display: flex;
    align-items: center;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .operation-item {
    font-size: 18px;
    padding: 0 4%;
  }
</style>
