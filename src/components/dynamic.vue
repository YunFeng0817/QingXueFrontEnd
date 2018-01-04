<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
  export default {
    name: 'dynamic',
    data() {
      return {
        msg: '我是src/components里的dynamic.vue，我通过app.vue里的router-view展示'
      }
    }
  }
</script>

<style scoped>

</style>
