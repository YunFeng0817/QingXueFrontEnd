<template>
  <div>
    <el-row>
      <el-col class="card" :span="24">
        <el-card :body-style="{ padding: '0px',height:'720px' }">
          <img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" class="image">
          <div style="padding: 0;height:700px;">
            <span>web前端</span>
            <div class="bottom clearfix">
              <el-tabs type="card">
                <el-tab-pane label="课程简介">
                  <p>
                    用户管理用户管理用户管理
                  </p>
                  <p>
                    用户管理用户管理
                  </p>
                </el-tab-pane>
                <el-tab-pane label="课程详情">
                  <p>
                    配置管理配置管理配置
                  </p>
                  <p>
                    管理配置管理配置管理配置管理
                  </p>
                </el-tab-pane>
              </el-tabs>
              <br/><br/>
              <el-button type="text" class="button">课程预定</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'course'
    // props[]
    // data () {
    //   return {
    //     course : ''
    //   }
    // }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    max-width: 390px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  span {
    font-size: 25px;
  }
</style>
