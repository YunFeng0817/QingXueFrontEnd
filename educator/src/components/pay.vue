<template>
  <div class="block">
    <h2>青学教育后台管理系统</h2>
    <div class="card" style="padding:3% 4%;">
      <h2>
        请您认真查看以下条款
      </h2>
      <div class="clause" v-html="hint">
        test
      </div>
      <br/>
      <el-button class="button" type="primary">同意该条款
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pay',
    data () {
      return {
        hint: '1、本订单仅供课程预约<br/>2、预约成功后机构(教师)即做相应学生课程安排(包括安排座次，课前准备)<br/>3、预约有效期7天或截止至开课前第三天(以先到为准)，应在预约有效期内向机构(教师)支付尾款，并遵守机构(教师)关于课程的具体合约<br/>4、该预约不可取消，有效期内未付尾款视为取消该课程<br/>5、机构(教师)不保留相关课程安排'
      }
    }
  }
</script>

<style scoped>
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
