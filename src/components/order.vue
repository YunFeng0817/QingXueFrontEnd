<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header">确认预约</span>
    </div>
    <div class="order-body">
      <p>课程名称：
        <span>高三数学</span>
      </p>
      <hr/>
      <p>
        课程数量：
        <span>{{sessions+'节'}}</span>
      </p>
      <hr/>
      <p>
        每课时长：
        <span>{{session_hours+'小时'}}</span>
      </p>
      <hr/>
      <p>
        开课日期：
        <span>{{startTime}}</span>
      </p>
      <hr/>
      <p>
        结课日期：
        <span>{{endTime}}</span>
      </p>
      <hr v-if="note"/>
      <p v-if="note">
        课程备注：
        <span>{{note}}</span>
      </p>
    </div>
    <div class="order-body">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left"
               label-width="22%"
               class="demo-ruleForm">
        <el-form-item label="手机号" prop="pass">
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
      <p v-html="hint">
      </p>
    </div>
    <div class="footer">
      <span>需支付定金</span>
      <span class="money">{{money.toString()+'元'}}</span>
      <a @click="submitForm('ruleForm')">确认提交</a>
    </div>
    <!--下面的这个区块是为了占位-->
    <div style="height: 110px;"></div>
  </div>
</template>

<script>
  import BackButton from './backButton';
  import userMessage from '../store/index';
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
        name: userMessage.state.courseDetail.name,
        money: userMessage.state.courseDetail.total_price * userMessage.state.courseDetail.discount,
        startTime: userMessage.state.courseDetail.time_spans[0].start_time,
        endTime: userMessage.state.courseDetail.time_spans[0].end_time,
        note: userMessage.state.courseDetail.note,
        session_hours: userMessage.state.courseDetail.session_hours,
        sessions: userMessage.state.courseDetail.sessions,
        hint: '本订单仅供课程预约<br/>预约成功后机构(教师)即做相应学生课程安排(包括安排座次，课前准备)<br/>预约有效期7天或截止至开课前第三天(以先到为准)，应在预约有效期内向机构(教师)支付尾款，并遵守机构(教师)关于课程的具体合约<br/>该预约不可取消，有效期内未付尾款视为取消该课程<br/>机构(教师)不保留相关课程安排'
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
    max-height: 40px;
    max-width: 450px;
    width: 100%;
    position: fixed;
    bottom: 8%;
    align-items: center;
    display: flex;
    justify-content: flex-end;

    background-color: white;
  }

  .footer a {
    flex: 0 1 25%;
    max-height: 40px;
    /*width:100%;*/
    /*height:30px;*/
    text-align: center;
    font-size: medium;
    color: white;
    background-color: #e62739;
    opacity: 0.9;
    padding: 2% 2%;
    border-left: 0;
    border-right: 0;
    border-radius: 5px;
  }

  .footer a:active {
    background-color: #F74D61;
  }

  span {
    font-size: larger;
  }

  span.money {
    color: #e62739;
    margin: 0 5% 0 0;
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

  p {
    margin: 0;
  }

  hr {
    margin: 12px 0;
  }
</style>
