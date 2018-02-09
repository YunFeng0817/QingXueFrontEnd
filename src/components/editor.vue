<template>
  <div class="edit-line">
    <div contenteditable="true" class="edit-content" ref="edit" placeholder="来一发评论吧..." @focus="transparent"
         @blur="distransparent"></div>
    <el-button type="primary" plain round size="medium" @click="send">发送</el-button>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    methods: {
      send () {
        let content = this.$refs.edit.innerHTML;
        console.log(content);
      },
      transparent () {
        this.$refs.edit.style = 'background-color:white;';
      },
      distransparent () {
        this.$refs.edit.style = 'background-color:rgba(255, 255, 255, 0.6);';
      }
    }
  }
</script>

<style scoped>
  .edit-line {
    width: 100%;
    height: 35px;
    line-height: 25px;
    display: flex;
    align-items: center;
  }

  .edit-content {
    width: 80%;
    max-height: 45px;
    height: 100%;
    outline: 0;
    padding: 0 4%;
    border: 1px solid #dddddd;
    border-radius: 12px;
    margin: 0 2%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: larger;
    /*保证只能写入文本信息，不能是富文本*/
    -webkit-user-modify: read-write-plaintext-only
  }

  .edit-content:empty::before {
    content: attr(placeholder);
  }
</style>
