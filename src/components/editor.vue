<template>
  <div class="edit-line">
    <div contenteditable="true" class="edit-content" ref="edit"></div>
    <el-button type="primary" plain size="mini" @click="send">发送</el-button>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    methods: {
      send () {
        let content = this.$refs.edit.innerHTML;
        console.log(content);
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
    width: 80%;
    max-height: 40px;
    height: 100%;
    outline: 0;
    padding: 0 4%;
    border: 1px solid #dddddd;
    border-radius: 12px;
    margin: 0 2%;
    overflow: auto;
    background-color: white;
  }
</style>
