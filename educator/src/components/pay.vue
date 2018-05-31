<template>
  <div class="block">
    <h2>青学教育后台管理系统</h2>
    <div class="card">
      <h4>
        请您认真查看以下说明
      </h4>
      <div class="clause" v-html="hint">
        test
      </div>
      <br/>
      <el-button class="button" type="primary" @click="getOrder">已阅读该说明
      </el-button>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';

  export default {
    name: 'pay',
    data () {
      return {
        hint: '资质认证：<br/>' +
        '教师或机构用户需提供教育资质证明文件的电子照片或扫描件，及符合相关教育部门要求的证明文件的电子照片或扫描件，可联系资质认证客服（<a href="mailto:auth@qingxue.xyz?Subject=认证问题&body=认证问题%20%3A%0D%0A账号%20%3A%0D%0A其他联系方式%20%3A%0D%0A">auth@qingxue.xyz</a>）提供补充相关证明文件，或资质认证客服进行线下认证。<br/>认证费用:<span style="color:red">￥198 </span>/年'
      }
    },
    methods: {
      getOrder () {
        axios({
          url: '/api/order/registration_orders/',
          method: 'post'
        })
          .then(function (response) {
            if (response.total_amount) {
              // 判断订单的金额如果大于0，正常支付
              // if (response.total_amount > 0) {
              this.$confirm('<p style="max-width: 300px;width:80%;text-align: left;">您如果想要正常的发布课程，需要支付<span style="color:red">' + response.total_amount + ' </span>元 每年,</br/>如果选择取消，您可以正常登录管理后台，但是无法进行任何操作</p>', {
                confirmButtonText: '支付',
                cancelButtonText: '取消',
                center: true, // 文字是否居中
                lockScroll: false, // 在消息提示框显示时，是否允许滚动
                closeOnClickModal: false, // 是否可通过点击遮罩关闭 MessageBox
                closeOnPressEscape: false, // 是否可通过按下 ESC 键关闭 MessageBox
                dangerouslyUseHTMLString: true, // 是否将 message 属性作为 HTML 片段处理
                type: 'success'
              }).then(() => {
                // 用户选择了支付的按钮
                window.location.href = response.payment_url;
              }).catch(() => {
                // 用户选择了取消支付的按钮
                axios({
                  url: '/api/order/registration_orders/?order_sn=' + response.order_sn,
                  method: 'delete'
                })
                  .then(function (response) {
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              });
              // 下面注释的部分是在 支付为0元时给用户提示的处理方式，可能以后会用到
              // }
              // else { // 订单的金额 <=0 ，提示不需要支付
              //   this.$alert('您已获得免单机会，不需要支付入驻费用', {
              //     confirmButtonText: '确定',
              //     callback: action => {
              //       this.$router.replace({path: '/admin/'});
              //     }
              //   });
              // }
            } else { // 用户未登录的情况
              this.$router.push({path: '/educator/login/pay'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .clause {
    margin: 0 auto;
    width: 90%;
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
