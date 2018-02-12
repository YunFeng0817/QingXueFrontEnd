<template>
  <div>
    <div class="edit-line">
      <label style="margin:0 5%;font-size: larger">评分</label>
      <el-rate v-model="value1" style="margin:5% 0" show-text :allow-half="true">
      </el-rate>
    </div>
    <div class="edit-line">
      <div contenteditable="true" class="edit-content" placeholder="吐槽一下.." @focus="distransparent"
           @blur="transparent" ref="edit" @keydown.tab.stopdefault="tab"></div>
      <el-button type="primary" plain round size="medium" @click="send" ref="send" style="opacity: 0.5">提交</el-button>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';

  export default {
    name: 'editor',
    props: {
      id: {
        type: String,
        default: '0'
      }
    },
    data () {
      return {
        value1: null
      }
    },
    methods: {
      send () {
        // 发送评论的信息
        axios({
          method: 'post',
          url: '/student_operation/comment_to_courses/',
          data: {
            text: this.$refs.edit.innerHTML,
            stars: this.value1,
            order_sn: this.id
          }
        })
          .then(function (response) {
            if (response) {
              this.$message({
                message: '评论成功',
                type: 'success',
                duration: 1000
              });
            }
          })
      },
      transparent () {
        this.$refs.send.$el.style = 'opacity:0.5;';
      },
      distransparent () {
        this.$refs.send.$el.style = 'opacity:1;';
      },
      tab (event) {
        // 阻止默认切换元素的行为
        if (event && event.preventDefault) {
          event.preventDefault()
        } else {
          window.event.returnValue = false
        }
        let range = event.view.getSelection().getRangeAt(0);
        let offset = range.startOffset;
        let span = document.createElement('span');
        span.innerHTML = '&nbsp&nbsp&nbsp&nbsp';

        let newrange = document.createRange();
        newrange.setStart(range.startContainer, offset);
        newrange.setEnd(range.startContainer, offset);
        newrange.collapse(true);
        newrange.insertNode(span);
        event.view.getSelection().removeAllRanges();
        event.view.getSelection().addRange(range);
        range.setStart(span, 1);
        range.setEnd(span, 1);
      }
    }
  }
</script>

<style scoped>
  .edit-line {
    width: 100%;
    height: 100%;
    line-height: 25px;
    display: flex;
    align-items: center;
  }

  .edit-content {
    transition: width 400ms ease-in;
    width: 80%;
    /*max-height: 45px;*/
    height: 100%;
    outline: 0;
    padding: 0 4%;
    border: 1px solid #dddddd;
    border-radius: 12px;
    margin: 0 2%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: larger;
    /*!*保证只能写入文本信息，不能是富文本*!*/
    /*-webkit-user-modify: read-write-plaintext-only*/
  }

  .edit-content:empty {
    width: 35%;
    color: lightgray;
  }

  .edit-content:empty::before {
    content: attr(placeholder);
  }

  .edit-content:focus {
    background-color: white;
    width: 80%;
  }
</style>
