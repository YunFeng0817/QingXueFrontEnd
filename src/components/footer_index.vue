<template>
  <div>
    <router></router>
    <router-link to='/dynamic'>动态</router-link>
    <router-link to='/main'>主页</router-link>
    <router-link to='/user'>用户</router-link>
  </div>
</template>

<script>
  import router from '../router/index'
  export default {
    components:{
      router
    }
  }
</script>

<style scoped>

</style>
