<template>
  <div id="login-block">
    <el-row>
      <back-button>
      </back-button>
      <el-col :span="22" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px; text-align: center">
            <div>
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-position="left"
                       label-width="22%"
                       class="demo-ruleForm">
                <el-form-item label="旧密码" prop="password">
                  <el-input type="password" v-model="password" auto-complete="off" placeholder="请输入您的旧密码" clearable>
                  </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入新密码">
                  </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请确认新密码">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :disabled="password===''" @click="submitForm('ruleForm2')">提交</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from '../axios/index';
  import BackButton from './backButton';

  export default {
    name: 'modify-pass',
    components: {
      BackButton
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
        password: '',
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
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              headers: {
                'X-CSRFToken': document.cookie.match(/.*csrftoken=([^;.]*).*$/) === null ? null : document.cookie.match(/.*csrftoken=([^;.]*).*$/)[1]
              },
              method: 'patch',
              url: '/api/student/detail/',
              data: {
                check_method: 'password_check',
                old_password: this.password,
                new_password: this.ruleForm2.checkPass
              }
            })
              .then(function (response) {
                if (response) {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  setTimeout(function () {
                    this.$router.replace({path: '/user'});
                  }.bind(this), 1500);
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

<style scoped>
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
</style>
