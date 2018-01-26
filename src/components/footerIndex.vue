<template>
  <div class="footer-index">
    <router-link to='/dynamic'>
      <span class="am-icon-star icon"></span>
      <br/>
      <span class="am-navbar-label">动态</span>
    </router-link>
    <router-link to='/'>
      <span class="am-icon-home icon"></span>
      <br/>
      <span class="am-navbar-label">主页</span>
    </router-link>
    <router-link to='/user'>
      <span class="am-icon-user icon"></span>
      <br/>
      <span class="am-navbar-label">用户</span>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped rel="stylesheet/css">
  .footer-index {
    display: flex; /* set flex style */
    align-items: center;
    width: 100%;
    height: 8%;
    /*max-height: 65px;*/
    line-height: 100%;

    position: fixed;
    bottom: 0;

    background-color: #66b1ff;
  }

  .footer-index a {
    flex: 1;
    text-align: center;
    /*
     *if it's block ,when click the box,link work  ,
     *but if it's in-line ,don't work when click blank in box
     */
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    color: lightgray;

    line-height: 20%;
  }

  .footer-index a.router-link-active {
    color: white;
  }

  .footer-index a span.icon {
    font-size: 25px;
  }

  .footer-index a span.icon::before {
    padding: 0 0 3% 0;
    font-size: 25px;
  }

  .footer-index a span.am-navbar-label {
    padding: 3% 0 0 0;
  }

</style>
