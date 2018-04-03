<template>
  <el-carousel :interval="5000" arrow="always" height="200px" @touchstart.native.stopdefault="start"
               @touchmove.native.stopdefault="move" @touchend.native.stopdefault="drop" ref="carousel"
               @change="onchange">
    <el-carousel-item v-for="item in showImages" v-bind:key="item.id">
      <a v-if="item.destination_url" :href="item.destination_url">
        <img :src="item.image"/>
      </a>
      <img v-else :src="item.image"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: 'slider',
    props: [
      'showImages'
    ],
    data () {
      return {
        startX: 0,
        offset: 0,
        target: document.createElement('IMG')
      }
    },
    methods: {
      start (event) {
        if (event.target.tagName === 'IMG') {
          this.startX = event.changedTouches[0].clientX - event.target.offsetLeft;
          this.target = event.target;
          this.offset = event.changedTouches[0].clientX;
        }
      },
      move (event) {
        if (event.target.tagName === 'IMG') {
          let X = event.changedTouches[0].clientX;
          if (this.showImages && this.showImages.length >= 2) {
            this.target.style = 'position:absolute;left:' + (X - this.startX).toString() + 'px';
          }
        }
      },
      drop (event) {
        if (event.target.tagName === 'IMG') {
          if (event.changedTouches[0].clientX < this.offset) {
            this.$refs.carousel.next();
          } else if (event.changedTouches[0].clientX > this.offset) {
            this.$refs.carousel.prev();
          }
        }
      },
      onchange () {
        this.target.style = 'position:default;display:default';
      }
    }
  }
</script>

<style scoped>
  img {
    height: 200px;
    width: 100%;
  }
</style>
