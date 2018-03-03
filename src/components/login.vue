<template>
  <div id="login-block">
    <el-row>
      <back-button>
      </back-button>
      <el-col :span="22" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div v-if="!forget_pass" class="login-index">
            <div @click="tab_active=true" id="sign-in" :class="getClassA"><span>登录</span></div>
            <div @click="tab_active=false" id="sign-up" :class="getClassB"><span>注册</span></div>
          </div>
          <div v-if="tab_active" style="padding: 14px; text-align: center">
            <div class="login-row">
              <label for="login-name" class="login-label">账号</label>
              <el-input
                placeholder="请输入您的手机号"
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
              <a @click="forgetPass" class="el-icon-question">忘记密码</a>
            </div>
            <el-button class="button" type="primary" :disabled="check_login" @click="loginSubmit">登录</el-button>
            <p>其他登录方式</p>
            <div>
              <a class="am-icon-btn am-success am-icon-weixin"></a>
              <a class="am-icon-btn am-primary am-icon-qq"></a>
              <a class="am-icon-btn am-warning am-icon-weibo"></a>
            </div>
          </div>
          <div v-if="!tab_active" style="padding: 14px; text-align: center">
            <el-steps :active="process" finish-status="success">
              <el-step v-if="!forget_pass" title="服务条款">
              </el-step>
              <el-step title="验证手机">
              </el-step>
              <el-step title="确认密码">
              </el-step>
              <el-step v-if="!forget_pass" title="完善信息">
              </el-step>
            </el-steps>
            <div v-if="process===0&&!forget_pass">
              <h2>
                请您认真查看以下条款
              </h2>
              <div class="clause" v-html="hint">
                test
              </div>
              <br/>
              <el-button @click="setProcess" class="button" type="primary">同意该条款
              </el-button>
            </div>
            <div v-if="process===1||(forget_pass&&process===0)">
              <div class="login-row">
                <label for="phone-number" class="login-label">手机号</label>
                <el-input
                  placeholder="请输入手机号"
                  v-model="phone_number"
                  clearable
                  class="login-input"
                  id="phone-number">
                </el-input>
                <el-button @click="send_msg" :disabled="check_phone" plain class="login-button">{{time}}
                </el-button>
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
              <el-button @click="msg_confirm" :disabled="check_msg_confirm" class="button" type="primary">验证手机号
              </el-button>
            </div>
            <div v-if="process===2||(forget_pass&&process===1)">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-position="left"
                       label-width="22%"
                       class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="process===3">
              <input-message>
              </input-message>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userMessage from '../store/index';
  import inputMessage from '../components/inputMessage'
  import axios from '../axios/index';
  import InputMessage from './inputMessage';
  import BackButton from './backButton';

  export default {
    name: 'login',
    components: {
      BackButton,
      InputMessage,
      'input-message': inputMessage
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.pass.length < 8) {
            callback(new Error('密码长度不能小于8'));
          }
          let regx = /\D/g;
          if (!regx.test(this.ruleForm2.pass)) {
            callback(Error('密码不能为纯数字'));
          }
          regx = RegExp(this.phone_number);
          if (regx.test(this.ruleForm2.pass)) {
            callback(Error('密码中不能包含手机号'));
          }
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        time: '发送短信',
        send_msg_disabled: false,
        username: '',
        password: '',
        checked: false,
        tab_active: true,
        forget_pass: false,
        active_class: '',
        process: 0,
        phone_number: '',
        check_num: '',
        hint: '1、本订单仅供课程预约<br/>2、预约成功后机构(教师)即做相应学生课程安排(包括安排座次，课前准备)<br/>3、预约有效期7天或截止至开课前第三天(以先到为准)，应在预约有效期内向机构(教师)支付尾款，并遵守机构(教师)关于课程的具体合约<br/>4、该预约不可取消，有效期内未付尾款视为取消该课程<br/>5、机构(教师)不保留相关课程安排',
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
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
      },
      check_login: function () {
        return this.username.length !== 11 || this.password === '';
      },
      check_phone: function () {
        // 用于判断是否11个字符串都是数字
        let regx = /^\d{11,}$/;
        // 以下表达式表示  !(！A&&!B&&C)
        return !(!this.send_msg_disabled && this.phone_number.length === 11 && regx.test(this.phone_number))
      },
      check_msg_confirm: function () {
        let regx1 = /^\d{6,}$/;
        let regx2 = /^\d{11,}$/;
        return !(this.check_num.length === 6 && regx1.test(this.check_num) && this.phone_number.length === 11 && regx2.test(this.phone_number));
      }
    },
    methods: {
      forgetPass () {
        this.process = 0;
        this.forget_pass = true;
        this.tab_active = false;
      },
      loginSubmit () {
        axios({
          method: 'post',
          url: '/api/student/login/',
          data: {
            username: this.username,
            password: this.password,
            checked: this.checked
          }
        })
          .then(function (response) {
            // 如果response 的返回值是空，则表明返回的状态码出错，如果非空，则返回码是200
            if (response) {
              userMessage.commit('user_message', response);
              this.$router.back();
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },
      setProcess () {
        if (this.process++ > 3) this.process = 0;
      },
      send_msg () {
        axios({
          method: 'post',
          url: '/api/student/send_msg/',
          data: {
            is_signing_up: !this.forget_pass,
            phone_number: this.phone_number
          }
        })
          .then(function (response) {
            if (response) {
              let time = 60;
              this.send_msg_disabled = true;
              for (let i = 0; i < 60; i++) {
                window.setTimeout(function () {
                  time--;
                  this.time = '发送短信' + '(' + time.toString() + ')';
                  if (!time) {
                    this.send_msg_disabled = false;
                    this.time = '发送短信';
                  }
                }.bind(this), 1000 * i);
              }
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      msg_confirm () {
        axios({
          method: 'post',
          url: '/api/student/msg_confirm/',
          data: {
            phone_number: this.phone_number,
            msg_code: this.check_num
          }
        })
          .then(function (response) {
            if (response) {
              this.setProcess();
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      submitForm (formName) {
        let test = document.cookie.split(';')[0].split('=')[1];
        let method = this.forget_pass ? 'patch' : 'post';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: method,
              url: '/api/student/detail/',
              headers: {
                'X-CSRFToken': test
              },
              data: {
                check_method: 'msg_code_check',
                password: this.ruleForm2.checkPass
              }
            })
              .then(function (response) {
                if (response) {
                  if (!this.forget_pass) {
                    this.setProcess();
                  } else {
                    this.$router.back();
                  }
                  userMessage.commit('user_message', response);
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              })
          } else {
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
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
    width: 95%;
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
    padding: 4% 2%;
    flex: 2 3 3%;
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

  .clause {
    width: 100%;
    text-align: left;
    line-height: 2em;
    /*text-indent: 20px;*/
    letter-spacing: 2px;
    font-size: larger;
    border-radius: 5px;
    background-color: #eee;
    opacity: 0.7;
  }
</style>
<style>
  /*此处是为了解决“验证手机”的不居中问题*/
  .is-process {
    text-align: center;
  }
</style>
