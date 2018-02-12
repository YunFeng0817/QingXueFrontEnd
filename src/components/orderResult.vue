<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header">订单详情</span>
    </div>
    <div class="order-body">
      <p style="margin: 5% 0;">课程名称：</p>
      <hr/>
      <p>开课日期：</p>
      <hr/>
      <p>地点：</p>
      <hr/>
      <p>支付金额：</p>
    </div>
    <div class="order-body">
      <p>课程准备：</p>
    </div>
    <div class="order-word">
      <p>
        预约须知：
      </p>
      <p>
        {{hint}}
      </p>
    </div>
    <div class="order-body">
      <edit :id="orderID">
      </edit>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 110px;"></div>
  </div>
</template>

<script>
  import BackButton from './backButton';
  import axios from '../axios/index';
  import edit from './editor'

  export default {
    name: 'orderResult',
    components: {
      BackButton,
      edit: edit
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
        orderID: '123',
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

  span {
    font-size: larger;
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
