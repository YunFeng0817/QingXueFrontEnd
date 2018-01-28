<template>
  <div id="login-block">
    <el-row>
      <el-col :span="22" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div class="login-index">
            <div @click="tab_active=true" id="sign-in" :class="getClassA"><span>登录</span></div>
            <div @click="tab_active=false" id="sign-up" :class="getClassB"><span>注册</span></div>
          </div>
          <div v-if="tab_active" style="padding: 14px; text-align: center">
            <div class="login-row">
              <label for="login-name" class="login-label">账号</label>
              <el-input
                placeholder="请输入你的账号"
                v-model="username"
                clearable
                class="login-input"
                id="login-name">
              </el-input>
            </div>
            <div class="login-row">
              <label for="login-password" class="login-label">密码</label>
              <el-input
                placeholder="密码"
                v-model="password"
                clearable
                class="login-input"
                id="login-password"
                type="password">
              </el-input>
            </div>
            <div class="login-row">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
              <a class="el-icon-question">忘记密码</a>
            </div>
            <el-button class="button" type="primary" @click="loginSubmit">登录</el-button>
            <p>其他登录方式</p>
            <div>
              <a class="am-icon-btn am-success am-icon-weixin"></a>
              <a class="am-icon-btn am-primary am-icon-qq"></a>
              <a class="am-icon-btn am-warning am-icon-weibo"></a>
            </div>
          </div>
          <div v-if="!tab_active" style="padding: 14px; text-align: center">
            <el-steps :active="process" finish-status="success">
              <el-step title="验证手机号">
              </el-step>
              <el-step title="确认密码">
              </el-step>
              <el-step title="登录">
              </el-step>
            </el-steps>
            <div v-if="process===0">
              <div class="login-row">
                <label for="phone-number" class="login-label">手机号</label>
                <el-input
                  placeholder="请输入手机号"
                  v-model="phone_number"
                  clearable
                  class="login-input"
                  id="phone-number">
                </el-input>
                <el-button plain class="login-button">发送短信</el-button>
              </div>
              <div class="login-row">
                <label for="check-number" class="login-label">验证码</label>
                <el-input
                  placeholder="短信验证码"
                  v-model="check_num"
                  clearable
                  class="login-input"
                  id="check-number">
                </el-input>
              </div>
              <el-button @click="setProcess" class="button" type="primary">验证手机号</el-button>
            </div>
            <div v-if="process===1">
              <div class="login-row">
                <label for="sign_up-password" class="login-label">新密码</label>
                <el-input
                  placeholder="新密码"
                  v-model="new_password"
                  clearable
                  class="login-input"
                  id="sign_up-password"
                  type="password">
                </el-input>
              </div>
              <div class="login-row">
                <label for="repeat-password" class="login-label">请重复新密码</label>
                <el-input
                  placeholder="请重复新密码"
                  v-model="new_password"
                  clearable
                  class="login-input"
                  id="repeat-password"
                  type="password">
                </el-input>
              </div>
              <el-button @click="setProcess" class="button" type="primary">确认</el-button>
            </div>
            <div v-if="process===2">
              <div class="login-row">
                <label for="login-name" class="login-label">账号</label>
                <el-input
                  placeholder="请输入你的账号"
                  v-model="phone_number"
                  clearable
                  class="login-input"
                  id="login-name">
                </el-input>
              </div>
              <div class="login-row">
                <label for="login-password" class="login-label">密码</label>
                <el-input
                  placeholder="密码"
                  v-model="password"
                  clearable
                  class="login-input"
                  id="login-password"
                  type="password">
                </el-input>
              </div>
              <el-button @click="setProcess" class="button" type="primary">登录</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        checked: false,
        tab_active: true,
        active_class: '',
        process: 0,
        phone_number: '',
        check_num: '',
        new_password: '',
        repeat_password: ''
      }
    },
    computed: {
      getClassA: function () {
        if (this.tab_active) {
          return '';
        } else {
          return 'tab_active';
        }
      },
      getClassB: function () {
        if (this.tab_active) {
          return 'tab_active';
        } else {
          return '';
        }
      }
    },
    methods: {
      loginSubmit () {
        this.$axios({
          method: 'post',
          url: '/student/login/',
          data: {
            username: this.username,
            password: this.password,
            checked: this.checked
          }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response, error) {
            console.log(response, error);
          });
      },
      setProcess () {
        if (this.process++ > 2) this.process = 0;
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #login-block {
    height: 800px;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: #e8e8e8;
  }

  .card {
    display: table-cell;
    vertical-align: center;
    height: 100%;
    margin: 4%;
    background-color: white;
  }

  .login-row {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;

    margin: 4%;
  }

  .login-label {
    flex: 1 0 15%;
    margin: 1%;
  }

  .login-input {
    flex: 2 3 80%;
  }

  .login-button {
    flex: 2 3 5%;
  }

  .button {
    width: 80%;
  }

  .el-icon-question {
    position: relative;
    left: 50%;
    bottom: 2px;
    color: #66b1ff;
  }

  .el-icon-question:active {
    color: #409eff;
  }

  .login-index {
    display: flex;
    text-align: center;
    color: #409eff;
  }

  .login-index span {
    display: inline-block;
    width: 50%;
    padding: 5% 0;
    margin: 0;
    font-size: large;
  }

  div#sign-in {
    border-right: 2px solid #e6e6e6;
    height: 100%;
    width: 50%;
  }

  div#sign-up {
    height: 100%;
    width: 50%;
  }

  div.tab_active {
    color: #909399;
    background-color: #ebedf1;
    border-bottom: 1px solid #ebf1fe;
  }
</style>
