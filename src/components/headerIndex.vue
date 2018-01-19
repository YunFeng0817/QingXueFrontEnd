<template>
    <div>
      <a>
        <i class="am-header-icon am-icon-map-marker"></i>
      </a>
      <am-topbar-form>
        <am-form-group size="sm">
          <am-input id="input" placement="请输入要查询的内容"></am-input>
        </am-form-group>
      </am-topbar-form>
      <span class="am-input-group-btn">
        <button class="am-btn am-btn-primary" type="button"><span class="am-icon-search"></span></button>
      </span>
    </div>
</template>

<script>
  export default {
    name: 'header-index'
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  div{
    width: 100%;
    height: 100%;
    line-height: 50px;

    display: flex;
    justify-content: center;
    align-content: center;

    background-color: #0e90d2;
  }
  div a{
    flex:10%;

    text-align: center;
    color: white;
    font-size:25px;
  }
  div am-topbar-form{
    flex:80%;
  }

  #input{
    position: relative;
    top:10px;
  }

  div span{
    flex:1 10%;
  }

  div button{
    border: none;
  }
</style>
