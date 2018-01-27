<template>
  <div id="login-block">
    <el-row>
      <el-col :span="22" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <img src="" class="image">
          <div style="padding: 14px; text-align: center">
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
        password: ''
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #login-block {
    height: 100%;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .card {
    display: table-cell;
    vertical-align: center;
    height: 100%;
    margin: 4%;
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

  .button{
    width: 80%;
  }
</style>
