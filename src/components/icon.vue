<template>
  <li style="text-align:center;">
    <a @click="categoryLink" class="am-icon-btn" :class="category_tag.iconType"></a>
    <span style="display: block;">
      {{category_tag.message}}
    </span>
  </li>
</template>

<script>
  export default {
    name: 'icon',
    props: ['category_tag'],
    methods: {
      categoryLink () {
        this.$router.push({path: 'get', query: {category: this.category_tag.message}});
      }
    }
  }
</script>

<style scoped type="text/css">
  li {
    width: 20%;
    list-style: none;
  }
</style>
