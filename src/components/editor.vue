<template>
  <div>
    <div class="edit-line">
      <label style="margin:0 5%;font-size: larger">评分</label>
      <el-rate v-model="stars" style="margin:5% 0" show-text :allow-half="true">
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
  import userMessage from '../store/index';

  export default {
    name: 'editor',
    props: {
      order_sn: {
        type: String,
        required: true
      },
      comment_to_course_id: {
        type: String
      },
      method: {
        type: String,
        required: true
      },
      content: {
        type: String,
        default: null
      },
      stars: {
        type: Number,
        default: null
      }
    },
    mounted () {
      this.$refs.edit.innerHTML = this.content;
    },
    methods: {
      send () {
        // 发送评论的信息
        axios({
          method: this.method,
          url: '/student_operation/comment_to_courses/',
          data: {
            text: this.$refs.edit.innerHTML,
            stars: this.stars,
            order_sn: this.order_sn,
            comment_to_course_id: this.comment_to_course_id

          }
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('commitComment', response);
              this.$emit('stopEdit');
              this.$message({
                message: '评论成功',
                type: 'success',
                duration: 1000
              });
            }
          }.bind(this))
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
        // 获取光标的range对象 event.view 是一个window对象
        let range = event.view.getSelection().getRangeAt(0);
        // 光标的偏移位置
        let offset = range.startOffset;
        // 新建一个span元素
        let span = document.createElement('span');
        // 四个&nbsp表示四个空格
        span.innerHTML = '&nbsp&nbsp&nbsp&nbsp';
        // 创建一个新的range对象
        let newrange = document.createRange();
        // 设置新的range的位置，也是插入元素的位置
        newrange.setStart(range.startContainer, offset);
        newrange.setEnd(range.startContainer, offset);
        newrange.collapse(true);
        newrange.insertNode(span);
        // 去掉旧的range对象，用新的range对象替换
        event.view.getSelection().removeAllRanges();
        event.view.getSelection().addRange(range);
        // 将光标的位置向后移动一个偏移量，放到加入的四个空格后面
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
