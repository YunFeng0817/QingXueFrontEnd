<template>
  <div>
    <div id="user-header">
      <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                :src="avatar===null?'http://s.amazeui.org/media/i/demos/bing-4.jpg':avatar"/>
      <div style="flex:10 2 75%;">
        <p>你好,&nbsp;&nbsp;<span class="user-message" style="font-weight: bolder;font-size: large;">{{userName}}</span>
        </p>
        <p class="flex">
          <a style="flex: 1 1 33%;" @click="modifyMessage">修改信息</a>
          <a style="flex: 1 1 33%;" @click="modifyPass">修改密码</a>
          <a style="flex: 1 1 33%;" @click="logout">退出登录</a>
        </p>
        <p class="flex">
          <span style="flex:3 5 35%;">
            <span style="font-size: larger;font-weight: bolder;">性别：</span>
            <span
              :class="getGender"
              style="font-size: large;"></span>
          </span>
          <span style="flex:3 1 65%;">
            <span class="user-message" v-if="stage" style="font-weight: bolder;">年级:</span>
            <span
              class="user-message"
              v-if="stage">{{stage.name}}</span>
          </span>
        </p>
      </div>
    </div>
    <el-collapse accordion class="user-collapse-body" @change="handleChange">
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="1">
        <template slot="title">
          <i class="am-icon-clock-o operation-item">&nbsp&nbsp我的预约</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" class="box-card" v-for="(item,id) in orders" :key="item.id"
                 @click.native="orderClick(item.order_sn)">
          <div style="padding: 2%;">
            <div class="bottom clearfix">
              <p>
                <label>
                  课程名称：
                </label>
                <a style="font-size: larger;padding:0;"
                   @click.stop="coursesClick(item.course.id)">{{item.course.title}}</a>
              </p>
              <p>
                <label>
                  订单金额
                </label>
                <span style="font-size: larger">
                {{item.total_amount}}元
              </span>
              </p>
              <p>
                <label>
                  订单状态
                </label>
                <span style="font-size: larger">
                  {{trade_status(item.trade_status)}}
                </span>
              </p>
            </div>
            <div style="float:right;position:relative;bottom:12px;">
              <el-button type="danger" size="mini"
                         @click.stop="deleteOrder(item.order_sn,id,item.trade_status)">
                <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
                删除订单
              </el-button>
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
              <p>
                <label>
                  课程名称：
                </label>
                <span style="margin: 3% 0;font-size: larger">{{item.course.title}}</span>
              </p>
              <p>
                <label>
                  评分：
                </label>
                <span>
                  <el-rate
                    v-model="item.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    style="display: inline-block"
                    score-template="{value}">
                </el-rate>
                </span>
              </p>
              <label>评论内容</label>
              <p v-html="item.text">
              </p>
              <label>
                评论时间
              </label>
              <time>
                {{item.add_time}}
              </time>
              <div style="display: flex;align-items: center; font-size: larger; position:relative;left:25%;">
                <p style="margin: 0 5%;">tips:点击查看课程详情</p>
                <el-button size="mini" style="margin: 0 5% 0 0"
                           @click.stop="orderClick(item.order_sn)">
                  <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
                  订单详情
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="3">
        <template slot="title">
          <i class="am-icon-heart-o operation-item">&nbsp&nbsp课程收藏</i>
        </template>
        <el-card :body-style="{ padding: '0 10px' }" v-for="(item,id) in favourites" :key="item.id" class="box-card"
                 @click.native="coursesClick(item.course.id)">
          <el-tag size="mini">{{item.course.stage}}</el-tag>
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
                       style="padding: 1% 1%; position: relative;"
                       @click.stop="deleteFavourites(item.id,id)">
              <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
              取消收藏
            </el-button>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item class="user-panel-header" style="font-size: larger" :name="4">
        <template slot="title">
          <i class="am-icon-check-square-o operation-item">&nbsp&nbsp我的关注</i>
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
                <label>简介</label>
                <p v-text="item.educator.introduction">
                <p>
                  <label class="time">联系方式 : </label>
                  <a style="padding:0;" :href="'tel:'+item.educator.contact"
                     @click.stop="">{{item.educator.contact}}</a>
                </p>
              </div>
            </div>
            <el-button type="danger" size="mini"
                       style="padding: 1% 1%; position: relative;left:10%;"
                       @click.stop="deleteFollowings(item.id,id)">
              <!--此处的stop是阻止事件冒泡，即组织付标签的点击事件被触发-->
              取消收藏
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
    <input style="position:fixed; bottom:-10px;" ref="input" type="text" id="copy"
           :value="'https://qingxue.xyz/'"/>
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
        avatar: null,
        userName: '',
        gender: '',
        stage: '',
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
        followings: [],
        orders: []
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
    created () {
      if (userMessage.state.name === '' || !userMessage.state.has_login) {
        axios({
          method: 'get',
          url: '/api/student/login/'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('user_message', response);
              this.avatar = userMessage.state.head_photo;
              this.userName = userMessage.state.name;
              this.gender = userMessage.state.gender;
              this.stage = userMessage.state.stage;
            } else {
              userMessage.commit('delete_message');
              this.$router.replace({path: '/login'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.avatar = userMessage.state.head_photo;
        this.userName = userMessage.state.name;
        this.gender = userMessage.state.gender;
        this.stage = userMessage.state.stage;
      }
    },
    methods: {
      logout () {
        axios({
          method: 'get',
          url: '/api/student/logout/'
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
      openShare (e) {
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
      // 处理点击折叠菜单事件
      handleChange (val) {
        switch (val) {
          case 1:
            if (this.orders.length === 0) {
              axios({
                method: 'get',
                url: '/api/order/get_order_list/'
              })
                .then(function (response) {
                  if (response) {
                    this.orders = response.orders;
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
            }
            break;
          case 2:
            if (this.comments.length === 0) {
              axios({
                method: 'get',
                url: '/api/student_operation/comment_to_courses/'
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
                url: '/api/student_operation/favourites/'
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
                url: '/api/student_operation/followings/'
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
      },
      // 处理点击进入订单详情的操作
      orderClick (id) {
        axios({
          url: '/api/order/course_orders/?order_sn=' + id,
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitOrderResult', response);
              this.$router.push({path: '/order/result/'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 处理点击进机构的情况
      institutionClick (id) {
        axios({
          url: '/api/educator/' + id + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitInstitution', response);
              this.$router.push({path: '/detail/institution/' + id});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      // 处理删除喜欢课程
      deleteFavourites (favouriteId, index) {
        axios({
          url: '/api/student_operation/favourites/',
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
      // 删除对这个机构的关注
      deleteFollowings (itemId, index) {
        axios({
          url: '/api/student_operation/followings/',
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
      },
      // 处理删除订单的操作
      // 传入参数中tradeStatus用于判断当前订单是否是还未开课的订单
      deleteOrder (orderId, index, tradeStatus) {
        if (tradeStatus !== 'TRADE_SUCCESS') {
          axios({
            url: '/api/order/course_orders/?order_sn=' + orderId,
            method: 'delete'
          })
            .then(function (response) {
              if (response) {
                this.orders.splice(index, 1);// 删除index处的喜欢课程
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
        } else {
          this.$message({
            message: '还未开课的订单不能删除',
            type: 'error',
            duration: 3000
          });
        }
      },
      trade_status (tradeStatus) {
        switch (tradeStatus) {
          case 'TRADE_SUCCESS':
            return '支付成功';
          case 'TRADE_FINISHED' :
            return '交易完成';
          case 'WAIT_BUYER_PAY':
            return '交易待支付';
          case 'TRADE_CLOSED':
            return '交易关闭';
          case 'TRADE_REFUNDED':
            return '已退款';
          default:
            return '交易情况未知';
        }
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #user-header {
    height: 100%;
    width: 100%;
    color: white;
    /*background: #8d8c9e; !* Old browsers *!*/
    /*background: -moz-linear-gradient(top,  #8d8c9e 0%, #f2c9c7 100%); !* FF3.6+ *!*/
    /*background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #96dbff), color-stop(100%, #d4effd)); !* Chrome,Safari4+ *!*/
    /*background: -webkit-linear-gradient(top,  #4927bc 0%,#b25fd3 100%); !* Chrome10+,Safari5.1+ *!*/
    /*background: -o-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* Opera 11.10+ *!*/
    /*background: -ms-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* IE10+ *!*/
    /*background: linear-gradient(to bottom,  #8d8c9e 0%,#f2c9c7 100%); !* W3C *!*/
    /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8d8c9e', endColorstr='#f2c9c7',GradientType=0 ); !* IE6-9 *!*/
    /*background: linear-gradient(to right, #68eace, #4ca2ef); !* 标准的语法（必须放在最后） *!*/
    background-color: #67e6d1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
  }

  #avatar {
    width: 100px;
    height: 100px;

    position: relative;
    margin: 15px 2% 0 2%;
    flex: 1 10 10%;
  }

  span.user-message {
    font-size: larger;
    color: white;
  }

  a {
    font-size: larger;
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

  p.flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
