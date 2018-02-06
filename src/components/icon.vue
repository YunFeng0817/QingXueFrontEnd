<template>
  <ul>
    <li style="text-align:center;" :style="width" v-for="item in category_tag" :key="item.id">
      <a @click="categoryLink" class="am-icon-btn" :class="item.iconType"></a>
      <span style="display: block;">
      {{item.message}}
    </span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      category_tag: {
        type: Array
      },
      row: {
        type: Number
      }
    },
    data () {
      return {
        width: 'width:' + (100 / this.row).toString() + '%;'
      }
    },
    created () {

    },
    methods: {
      categoryLink () {
        this.$router.push({path: 'get', query: {category: this.category_tag.message}});
      }
    }
  }
</script>

<style scoped type="text/css">
  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: center;

    padding: 0;
    margin: 3% 0;
  }

  li {
    width: 20%;
    margin: 2% 0;
    list-style: none;
  }

  li:hover {
    cursor: pointer;
  }

  a:hover {
    animation-name: float;
    animation-delay: 10ms;
    animation-duration: 250ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
</style>
