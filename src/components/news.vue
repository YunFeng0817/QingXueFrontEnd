<template>
  <li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">
    <div class="am-u-sm-4 am-list-thumb">
      <a :href="show.link">
        <img :src="show.photoLink" alt="show.name"/>
      </a></div>
    <div class=" am-u-sm-8 am-list-main">
      <h3 class="am-list-item-hd">
        <a :href="show.link">
          {{ show.name }}
        </a>
      </h3>
      <div class="am-list-item-text">
        {{ show.introduction }}
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'news',
    props: ['show']
  }
</script>

<style scoped type="text/css">
  img {
    width: 100%;
    height: 100%;
  }
</style>
