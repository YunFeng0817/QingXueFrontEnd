<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        msg: '我是src/components里的user.vue，我通过app.vue里的router-view展示'
      }
    }
  }
</script>

<style scoped>

</style>
