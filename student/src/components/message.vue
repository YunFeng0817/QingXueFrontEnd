<template>
  <div id="login-block">
    <el-row>
      <back-button>
      </back-button>
      <el-col :span="22" class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px; text-align: center">
            <input-message>
            </input-message>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import inputMessage from './inputMessage'
  import backButton from './backButton'

  export default {
    name: 'message',
    components: {
      'input-message': inputMessage,
      'back-button': backButton
    }
  }
</script>

<style scoped>
  #login-block {
    height: 800px;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: #e8e8e8;
  }

  .card {
    display: table-cell;
    vertical-align: center;
    height: 100%;
    margin: 4%;
    background-color: white;
  }
</style>
