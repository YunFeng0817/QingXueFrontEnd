<template>
  <div>
    <back-button>
    </back-button>
    <div class="order-header">
      <span class="order-header">确认预约</span>
    </div>
  </div>
</template>

<script>
  import BackButton from './backButton';

  export default {
    name: 'order',
    components: {
      BackButton
    }
  }
</script>

<style scoped>
  div.order-header{
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;

    background: linear-gradient(to right, #68eace, #4ca2ef);
  }

  .order-header {
    font-size: larger;
    color: #eee;
  }
</style>
