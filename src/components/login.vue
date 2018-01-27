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
            <el-button class="button" type="primary">登录</el-button>
            <p>其他登录方式</p>
            <div>
              <a class="am-icon-btn am-success am-icon-weixin"></a>
              <a class="am-icon-btn am-primary am-icon-qq"></a>
              <a class="am-icon-btn am-warning am-icon-weibo"></a>
            </div>
          </div>
          <div v-if="!tab_active" style="padding: 14px; text-align: center">
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
            <el-button class="button" type="primary">登录</el-button>
            <p>其他登录方式</p>
            <div>
              <a class="am-icon-btn am-success am-icon-weixin"></a>
              <a class="am-icon-btn am-primary am-icon-qq"></a>
              <a class="am-icon-btn am-warning am-icon-weibo"></a>
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
        active_class: ''
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
    flex: 1 1 10%;
    margin: 1%;
  }

  .login-input {
    flex: 2 1 90%;
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
