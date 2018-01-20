<template>
  <div>
    <div id="user-header">
      <am-image id="avatar" width="120" height="120" :circle="true" :responsive="true" :thumbnail="true"
                :src="avatar"/>
      <p><span class="user-message">{{userName}}</span>欢迎光临<a>退出登录</a></p>
      <p><span style="padding: 10px;">性别：</span><span class="am-btn am-icon-venus icon" style="font-size: large"></span> 年级：<span class="user-message">{{stage}}</span> </p>
    </div>
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
        stage: '大学'
      }
    },
    computed: {
      // 把性别转换成对应的图标
      getGender: function () {
        if (this.gender === 'male') {
          return '♂'
        } else {
          return '♀'
        }
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  #user-header{
    height: 100%;
    width: 100%;
    background: #8d8c9e; /* Old browsers */
    /*background: -moz-linear-gradient(top,  #8d8c9e 0%, #f2c9c7 100%); !* FF3.6+ *!*/
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#96dbff), color-stop(100%,#d4effd)); /* Chrome,Safari4+ */
    /*background: -webkit-linear-gradient(top,  #4927bc 0%,#b25fd3 100%); !* Chrome10+,Safari5.1+ *!*/
    /*background: -o-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* Opera 11.10+ *!*/
    /*background: -ms-linear-gradient(top,  #8d8c9e 0%,#f2c9c7 100%); !* IE10+ *!*/
    /*background: linear-gradient(to bottom,  #8d8c9e 0%,#f2c9c7 100%); !* W3C *!*/
    /*filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8d8c9e', endColorstr='#f2c9c7',GradientType=0 ); !* IE6-9 *!*/
    overflow:hidden
  }
  #avatar{
    float:left;

    width: 100px;
    height: 100px;
  }

  span.user-message{
    font-size: medium;
    padding: 10px;
    font-weight: bold;
    color: black;
  }
  a{
    font-size: larger;
    padding: 20px;
    color: #0e90d2;
  }
  a:active{
    color: #49b5ed;
  }

</style>
