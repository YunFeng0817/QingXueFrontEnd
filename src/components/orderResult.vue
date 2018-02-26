<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header">订单详情</span>
    </div>
    <div class="order-body">
      <p>课程名称：
        <a style="font-size: larger" @click="coursesClick(course_id)">{{title}}</a>
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
      <hr/>
      <p>
        支付宝交易号：
        <span>{{trade_no}}</span>
      </p>
      <hr/>
      <p>
        交易状态：
        <span>{{trade_status}}</span>
      </p>
      <hr/>
      <p>
        支付金额：
        <span>{{total_amount}}元</span>
      </p>
      <hr/>
      <p>
        支付时间
        <span>{{pay_time}}</span>
      </p>
      <hr/>
      <p>
        学生备注：
      </p>
      <p v-html="student_notes">
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
  import edit from './editor';
  import userMessage from '../store/index';

  export default {
    name: 'orderResult',
    components: {
      BackButton,
      edit: edit
    },
    data () {
      return {
        title: userMessage.state.orderResult.course.title,
        startTime: userMessage.state.orderResult.time_span.start_time,
        endTime: userMessage.state.orderResult.time_span.end_time,
        trade_no: userMessage.state.orderResult.trade_no,
        total_amount: userMessage.state.orderResult.total_amount,
        pay_time: userMessage.state.orderResult.pay_time,
        student_notes: userMessage.state.orderResult.student_notes,
        course_id: userMessage.state.orderResult.course.id
      }
    },
    methods: {
      // 处理点击进入课程详情的操作
      coursesClick (id) {
        axios({
          url: '/course/' + id + '/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitCourse', response);
              this.$router.push({path: '/course'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {
      trade_status: function () {
        switch (userMessage.state.orderResult.trade_status) {
          case 'TRADE_SUCCESS':
            return '交易成功';
          case 'TRADE_FINISHED' :
            return '交易完成';
          case 'WAIT_BUYER_PAY':
            return '交易待支付';
          case 'TRADE_CLOSED':
            return '交易关闭';
          default:
            return '交易成功';
        }
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
