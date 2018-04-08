<template>
  <div class="block">
    <h2>青学教育后台管理系统</h2>
    <div class="card">
      <h4>
        请您认真查看以下条款
      </h4>
      <div class="clause" v-html="hint">
        test
      </div>
      <br/>
      <el-button class="button" type="primary" @click="getOrder">同意该条款
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
        hint: '1、本订单仅供课程预约<br/>2、预约成功后机构(教师)即做相应学生课程安排(包括安排座次，课前准备)<br/>3、预约有效期7天或截止至开课前第三天(以先到为准)，应在预约有效期内向机构(教师)支付尾款，并遵守机构(教师)关于课程的具体合约<br/>4、该预约不可取消，有效期内未付尾款视为取消该课程<br/>5、机构(教师)不保留相关课程安排'
      }
    },
    methods: {
      getOrder () {
        axios({
          url: '/api/registration_orders/',
          method: 'post'
        })
          .then(function (response) {
            if (response) {
              if (response.total_amount > 0) {
                this.$confirm('<p style="max-width: 300px;width:80%;text-align: left;">您如果想要正常的发布课程，需要支付<span style="color:red">' + response.total_amount + ' </span>元 每年,</br/>如果选择取消，您可以正常登录管理后台，但是无法进行任何操作</p>', '', {
                  confirmButtonText: '支付',
                  cancelButtonText: '取消',
                  center: true, // 文字是否居中
                  lockScroll: false, // 在消息提示框显示时，是否允许滚动
                  closeOnClickModal: false, // 是否可通过点击遮罩关闭 MessageBox
                  closeOnPressEscape: false, // 是否可通过按下 ESC 键关闭 MessageBox
                  dangerouslyUseHTMLString: true, // 是否将 message 属性作为 HTML 片段处理
                  type: 'success'
                }).then(() => {
                  window.location.href(response.payment_url);
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
              }
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
