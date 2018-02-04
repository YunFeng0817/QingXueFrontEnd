<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header">确认预约</span>
    </div>
    <div class="order-body">
      <p style="margin: 5% 0;">课程名称：</p>
      <hr/>
      <p>开课日期：</p>
      <hr/>
      <p>地点：</p>
    </div>
    <div class="order-body">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left"
               label-width="22%"
               class="demo-ruleForm">
        <el-form-item label="您的手机号" prop="pass">
          <el-input type="number" v-model="ruleForm.pass" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="ruleForm.method" placeholder="请选择支付方式">
            <el-option label="支付宝" value="weixin">
            </el-option>
            <el-option label="微信" value="zhifubao">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="order-word">
      <p>
        预约须知：
      </p>
      <p>
        {{hint}}
      </p>
    </div>
    <div class="footer">
      <span>付款：</span>
      <span class="money">{{money.toString()+'元'}}</span>
      <a @click="submitForm('ruleForm')">确认提交</a>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 110px;"></div>
  </div>
</template>

<script>
  import BackButton from './backButton';
  import axios from '../axios/index';

  export default {
    name: 'order',
    components: {
      BackButton
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (this.ruleForm.pass.length !== 11) {
            callback(new Error('手机号的长度是11位'));
          }
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          method: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
        money: 600,
        hint: '老三等萨登萨登广卅好掠撒框架四大洲兰卡威就干戈安宫个'
      }
    },
    methods: {
      submitForm (formName) {
        if (this.ruleForm.method === '') {
          this.$message.error('请先选择支付方式');
          return false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: '',
              data: {
                password: this.ruleForm.checkPass
              }
            })
              .then(function (response) {
                if (response) {
                  this.$message({
                    message: '预约成功',
                    type: 'success',
                    duration: 1000
                  });
                  setTimeout(function () {
                    this.$router.replace({path: '/main'});
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
      }
    }
  }
</script>

<style scoped>
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

  .footer {
    /*max-height: 40px;*/
    width: 100%;
    position: fixed;
    bottom: 8%;
    align-items: center;
    display: flex;
    justify-content: flex-end;

    background-color: white;
  }

  .footer a {
    /*max-height: 40px;*/
    /*width:100%;*/
    /*height:30px;*/
    text-align: center;
    font-size: medium;
    color: white;
    background-color: #CC0000;
    opacity: 0.9;
    padding: 2% 2%;
    border-left: 0;
    border-right: 0;
  }

  span {
    font-size: larger;
  }

  span.money {
    color: #CC0000;
  }

  div.order-word {
    padding: 5%;
    margin: 5% 0;
    line-height: 2em;
    letter-spacing: 2px;
    font-size: medium;
    border-radius: 10px;
    background-color: white;
  }

  div.order-body {
    padding: 5%;
    margin: 5% 0 5% 0;
    background-color: white;
  }
</style>
