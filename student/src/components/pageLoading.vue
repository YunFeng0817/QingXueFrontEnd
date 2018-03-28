<template>
  <div ref="page">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'page-loading',
    mounted () {
      window.addEventListener('scroll', this.scrollHandle);
    },
    data () {
      return {
        active: false  // 此项用来防止下拉到底部后 多次触发事件
      }
    },
    methods: {
      scrollHandle () {
        let node = this.$refs.page;
        let currentOffsetTop = node.offsetTop - window.scrollY;
        let offsetBottom = node.scrollHeight + currentOffsetTop - document.documentElement.offsetHeight;
        if (offsetBottom <= 17 && this.active === false) {
          console.log('new page');
          this.active = true;
        }
        if (offsetBottom > 17) {
          this.active = false;
        }
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollHandle);
    }
  }
</script>

<style scoped>
</style>
