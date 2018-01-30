<template>
  <el-form label-position="left" label-width="80px" :v-model="form">
    <el-form-item label="昵称">
      <el-input placeholder="请填写您的昵称" :v-model="form.name">
      </el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-col :span="16">
        <el-select placeholder="请选择您的性别" v-model="form.stage">
          <el-option label="男" value="male">
          </el-option>
          <el-option label="女" value="female">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="学习阶段">
      <el-select placeholder="请选择您的学习阶段" v-model="form.stage">
        <el-option v-for="item in stages" :key="item.id" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年级">
      <el-select placeholder="请选择您的年级" v-model="form.stage">
        <el-option v-for="item in stages" :key="item.id" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="您的生日">
      <el-date-picker type="date" default-value="2000-1-1" placeholder="选择日期" v-model="form.birthday"
                      style="width: 100%;"></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'input-message',
    data () {
      return {
        stages: [
          {
            label: '小学',
            value: 1
          }
        ],
        form: {
          name: '',
          birthday: '',
          gender: '',
          stage: '',
          grade: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
