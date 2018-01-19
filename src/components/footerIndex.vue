<template>
  <div class="footer-index">
    <router-link to='/dynamic'>动态</router-link>
    <router-link to='/main'>主页</router-link>
    <router-link to='/user'>用户</router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped rel="stylesheet/css">
  .footer-index {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

    position:fixed;
    bottom:0;

    background-color: #0e90d2;
    opacity: 0.7;
  }

  a.router-link-active {
    color: lightgray;
    font-size: 20px;
  }

  .footer-index a {
    flex: 1;
    text-align: center;
    /*
     *if it's block ,when click the box,link work  ,
     *but if it's in-line ,don't work when click blank in box
     */
    display: block;
    text-decoration: none;
  }

  .footer-index a{
    color:white;
  }

  .footer-index a.router-link-active {
    color: lightgray;
  }



</style>
