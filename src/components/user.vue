<template>
  <div>
    <div id="user-header">
      <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                :src="avatar"/>
      <p><span class="user-message">{{userName}}</span>欢迎光临<a>退出登录</a></p>
      <p><span style="padding: 10px;">性别：</span><span class="am-btn icon" :class="getGender"
                                                      style="font-size: large"></span> 年级：<span class="user-message">{{stage}}</span>
      </p>
    </div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          一致性 Consistency<i class="header-icon el-icon-info"></i>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'user',
    components: {},
    data () {
      return {
        avatar: 'http://s.amazeui.org/media/i/demos/bing-4.jpg',
        userName: '青学',
        gender: 'male',
        stage: '大学',
        panelList: [
          {
            label: '我的预约',
            icon: 'am-icon-clock-o'
          }
        ]
      }
    },
    computed: {
      // 把性别转换成对应的图标
      getGender: function () {
        if (this.gender === 'male') {
          return 'am-icon-mars'
        } else {
          return 'am-icon-venus'
        }
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #user-header {
    height: 100%;
    width: 100%;
    background: #8d8c9e; /* Old browsers */
    /*background: -moz-linear-gradient(top,  #8d8c9e 0%, #f2c9c7 100%); !* FF3.6+ *!*/
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #96dbff), color-stop(100%, #d4effd)); /* Chrome,Safari4+ */
    /*background: -webkit-linear-gradient(top,  #4927bc 0%,#b25fd3 100%); !* Chrome10+,Safari5.1+ *!*/
    /*background: -o-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* Opera 11.10+ *!*/
    /*background: -ms-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* IE10+ *!*/
    /*background: linear-gradient(to bottom,  #8d8c9e 0%,#f2c9c7 100%); !* W3C *!*/
    /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8d8c9e', endColorstr='#f2c9c7',GradientType=0 ); !* IE6-9 *!*/
    overflow: hidden
  }

  #avatar {
    float: left;

    width: 100px;
    height: 100px;
  }

  span.user-message {
    font-size: medium;
    padding: 10px;
    font-weight: bold;
    color: black;
  }

  a {
    font-size: larger;
    padding: 20px;
    color: #0e90d2;
  }

  a:active {
    color: #49b5ed;
  }

</style>
