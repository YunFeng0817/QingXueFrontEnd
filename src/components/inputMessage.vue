<template>
  <div>
    <el-form label-position="left" label-width="80px" :v-model="form">
      <el-form-item label="昵称">
        <el-input placeholder="请填写您的昵称" :v-model="form.name">
        </el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-col :span="16">
          <el-select placeholder="请选择您的性别" v-model="form.gender">
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
                        style="width: 100%;">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :auto-upload="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
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
        },
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload input {
    display: none;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
