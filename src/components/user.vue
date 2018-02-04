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
    <el-collapse accordion id="user-collapse-body">
      <el-collapse-item class="user-panel-header" style="font-size: larger" v-for="item in panelList" :key="item.id">
        <template slot="title">
          <i :class="item.icon" style="font-size: 18px;">{{item.label}}</i>
        </template>
        <el-card v-for="o in 2" :key="o" class="box-card">
          <div slot="header" class="clearfix">
            <span>名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            {{'内容 ' + o }}
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
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
          },
          {
            label: ' 分享',
            icon: ' am-icon-share-square-o'
          }
        ]
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
    padding: 10px;
    font-weight: bold;
    color: white;
  }

  a {
    font-size: larger;
    padding: 20px;
    color: #0e90d2;
  }

  a:active {
    color: #49b5ed;
  }

  #user-collapse-body {
    line-height: 100px;
  }

  .user-panel-header {
    font-size: 20px !important;
  }

</style>
