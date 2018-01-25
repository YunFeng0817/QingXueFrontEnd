<template>
  <button @click="back" class="back"><i class="el-icon-back"></i></button>
</template>

<script>
  export default {
    name: 'back-button',
    methods: {
      back () {
        this.$router.back();
      }
    }
  }
</script>

<style scoped type="text/css" rel="stylesheet">
  .back {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 5px;
    background-color: rgba(255, 255, 255, 0.6);
    border: 0;
    border-radius: 50%;
  }

  .back:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .back i {
    color: black;
  }
</style>
