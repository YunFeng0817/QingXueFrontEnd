<template>
  <div class="footer-index">
    <router-link to='/dynamic/normal/total'>
      <span class="am-icon-star icon"></span>
      <br/>
      <span class="am-navbar-label">动态</span>
    </router-link>
    <router-link to='/main'>
      <span class="am-icon-home icon"></span>
      <br/>
      <span class="am-navbar-label">主页</span>
    </router-link>
    <router-link to="/user">
      <span class="am-icon-user icon"></span>
      <br/>
      <span class="am-navbar-label">用户</span>
    </router-link>
  </div>
</template>

<script>
  import userMessage from '../store/index';
  import axios from '../axios/index';

  export default {
    name: 'footerIndex',
    created () {
      axios({
        method: 'get',
        url: '/api/student/login/'
      })
        .then(function (response) {
          if (response) {
            userMessage.commit('user_message', response);
            this.avatar = userMessage.state.head_photo;
            this.userName = userMessage.state.name;
            this.gender = userMessage.state.gender;
            this.stage = userMessage.state.stage;
          } else {
            userMessage.commit('delete_message');
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }
  }
</script>

<style scoped rel="stylesheet/css">
  .footer-index {
    display: flex; /* set flex style */
    align-items: center;
    width: 100%;
    height: 8%;
    max-width: 450px;
    /*max-height: 65px;*/
    line-height: 100%;

    position: fixed;
    bottom: 0;

    background-color: #8DE9E8;
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
    color: #dcebef;

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
