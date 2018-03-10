<template>
  <ul>
    <li style="text-align:center;" :style="width" v-for="item in category_tag" :key="item.id">
      <a @click="categoryLink(item)" class="am-icon-btn" :class="item.iconType"></a>
      <span style="display: block;">
      {{item.message}}
    </span>
    </li>
  </ul>
</template>

<script>
  import axios from '../axios/index';
  import userMessage from '../store/index';

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
    methods: {
      categoryLink (event) {
        if (event.data) {
          axios({
            method: 'post',
            url: event.url,
            data: event.data
          })
            .then(function (response) {
              if (response) {
                for (let course of response.courses) {
                  course.is_course = true;
                }
                userMessage.commit('commitFirst', response);
                this.$router.push({path: 'get', query: {category: event.message}});
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        } else if (event.url) {
          let myWindow = window.open(event.url, 'qq分享');
          myWindow.focus();
        }
        if (event.message === '微信') {
          this.$emit('weixinClick');
        }
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
