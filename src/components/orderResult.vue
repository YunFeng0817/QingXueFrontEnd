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
        <span>{{tradeStatus}}</span>
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
        您的备注：
      </p>
      <p v-html="student_notes">
      </p>
    </div>
    <div class="order-body" v-if="edit">
      <edit :order_sn="orderID"
            :comment_to_course_id="comment.id"
            :method="'put'"
            :content="comment.text"
            :stars="comment.stars"
            @stopEdit="stopEdit">
      </edit>
    </div>
    <div class="order-body" v-else-if="(trade_status==='TRADE_SUCCESS'||trade_status==='TRADE_FINISHED')&&!comment">
      <edit :order_sn="orderID"
            :method="'post'"
            @stopEdit="stopEdit">
      </edit>
    </div>
    <div v-else-if="trade_status==='TRADE_SUCCESS'||trade_status==='TRADE_FINISHED'" class="order-body">
      <p>
        您的评价：
        <a class="am-icon-remove" style="float:right;font-size:large;color:#e62739;margin: 0 0 0 4%;"
           @click="deleteComments(comment.id)"></a>
        <a class="am-icon-edit" style="float:right;font-size:large" @click="edit=true"></a>
      </p>
      <div class="comment-line">
        <span style="margin:0 5%;font-size: larger">评分</span>
        <el-rate style="margin:5% 0"
                 v-model="comment.stars"
                 :allow-half="true"
                 disabled
                 show-score
                 text-color="#ff9900"
                 score-template="{value}">
        </el-rate>
      </div>
      <p class="comment" v-if="" v-html="comment.text">
      </p>
    </div>
    <div class="footer" v-if="trade_status==='WAIT_BUYER_PAY'">
      <a @click="pay">继续支付</a>
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
        orderID: userMessage.state.orderResult.order_sn,
        title: userMessage.state.orderResult.course.title,
        startTime: userMessage.state.orderResult.time_span.start_time,
        endTime: userMessage.state.orderResult.time_span.end_time,
        trade_no: userMessage.state.orderResult.trade_no,
        total_amount: userMessage.state.orderResult.total_amount,
        pay_time: userMessage.state.orderResult.pay_time,
        student_notes: userMessage.state.orderResult.student_notes,
        course_id: userMessage.state.orderResult.course.id,
        trade_status: userMessage.state.orderResult.trade_status,
        comment: userMessage.state.orderResult.comment,
        edit: false
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
      },
      stopEdit () {
        this.edit = false;
        this.comment = userMessage.state.orderResult.comment;
      },
      pay () {
        axios({
          method: 'get',
          url: userMessage.state.orderResult.payment_url
        })
          .then(function (response) {
            if (response) {
              console.log('正在支付');
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      // 删除对课程的评论
      deleteComments (commentId) {
        axios({
          url: '/student_operation/comment_to_courses/',
          method: 'delete',
          data: {
            comment_to_course_id: commentId
          }
        })
          .then(function (response) {
            if (response) {
              this.comment = '';
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    computed: {
      tradeStatus: function () {
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

  .comment {
    line-height: 2em;
    text-indent: 20px;
    letter-spacing: 2px;
    font-size: larger;
    border-radius: 5px;
    background-color: #eee;
    /*position: relative;*/
    /*top: 30%;*/
  }

  .comment-line {
    width: 100%;
    height: 100%;
    line-height: 25px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
  }

  hr {
    margin: 12px 0;
  }
</style>
