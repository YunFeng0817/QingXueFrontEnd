<template>
  <li style="text-align:center;">
    <a class="am-icon-btn" :class="category_tag.iconType"></a>
    <span style="display: block;">
      {{category_tag.message}}
    </span>
  </li>
</template>

<script>
  export default {
    name: 'icon',
    props: ['category_tag']
  }
</script>

<style scoped type="text/css">
  li{
    width: 25%;
    list-style: none;
  }
</style>
