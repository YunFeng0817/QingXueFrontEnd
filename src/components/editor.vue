<template>
  <div>
    <el-rate v-model="value1" style="margin:5% 0">
    </el-rate>
    <div class="edit-line">
      <div contenteditable="true" class="edit-content" placeholder="吐槽一下..." @focus="distransparent"
           @blur="transparent" ref="edit" @keydown.tab.stopdefault="tab"></div>
      <el-button type="primary" plain round size="medium" @click="send" ref="send" style="opacity: 0.5">发送</el-button>
    </div>
    <p v-html="content"></p>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    data () {
      return {
        value1: 5,
        content: ''
      }
    },
    methods: {
      send () {
        let content = this.$refs.edit.innerHTML;
        let result = '';
        for (let part of content.split('\t')) {
          result += part + '&nbsp&nbsp&nbsp&nbsp';
        }
        console.log(result);
        this.content = result;
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
        let line = range.startContainer.textContent.substr(0, range.startOffset);
        let offset = range.startOffset;
        line += '\t' + range.startContainer.textContent.substr(offset);
        range.startContainer.data = line;
        range.setStart(range.startContainer, offset + 1);
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
    width: 30%;
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
