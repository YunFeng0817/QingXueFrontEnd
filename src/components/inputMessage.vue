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
          <el-option v-for="item in stages" :key="item.id" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select placeholder="请选择您的年级" v-model="form.grade">
          <el-option v-for="item in grades" :key="item.id" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="您的生日">
        <el-date-picker type="date" default-value="2000-1-1" placeholder="选择日期" v-model="form.birthday"
                        style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择头像">
        <el-upload
          class="avatar-uploader"
          action=""
          v-model="form.file"
          :show-file-list="false"
          :on-change="onChoose"
          :auto-upload="false">
          <img v-show="imageUrl" :src="imageUrl" ref="image" class="avatar">
          <i v-show="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
  import userMessage from '../store/index';
  import axios from '../axios/index';

  export default {
    name: 'input-message',
    data () {
      return {
        stages: [],
        grades: [],
        form: {
          name: '',
          birthday: '',
          gender: '',
          stage: '',
          grade: '',
          file: ''
        },
        imageUrl: ''
      }
    },
    created () {
      axios({
        method: 'get',
        url: '/common/stages/'
      })
        .then(function (response) {
          if (response) {
            this.stages = response.stages;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      axios({
        method: 'get',
        url: '/common/grades/'
      })
        .then(function (response) {
          if (response) {
            this.grades = response.grades;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      onChoose (file) {
        file = file.raw;
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        } else {
          this.imageUrl = ' ';
          let maxlength = 500 * 1024;
          let Img = this.$refs.image;   // 通过refs获得DOM元素img
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          let fileReader = new FileReader(); // 读取客户端上的文件
          fileReader.readAsDataURL(file);
          fileReader.onload = function () {   // 读文件成功的回调
            Img.src = fileReader.result;  // 读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
            if (file.size > maxlength) {
              Img.onload = function () {
                let w = Img.naturalWidth;
                let h = Img.naturalHeight;
                canvas.width = w < h ? w : h;
                canvas.height = w < h ? w : h;
                context.drawImage(Img, 0, 0, w, h);
                let temp = maxlength / file.size + 0.2;
                let data = canvas.toDataURL('image/jpeg', temp); // data url的形式
                data = data.split(',')[1];
                data = window.atob(data);
                let ia = new Uint8Array(data.length);
                for (let i = 0; i < data.length; i++) {
                  ia[i] = data.charCodeAt(i);
                }
                // 将ia[]数据转换为File对象
                this.file = new File([ia], file.name, {
                  type: 'image/jpeg',
                  name: file.name
                })
              }.bind(this);
            } else {
              this.file = file;
            }
          }.bind(this);
        }
        return isJPG;
      },
      submit () {
        axios({
          method: 'put',
          url: '/student/detail/',
          data: {
            name: this.form.name,
            stage: this.form.stage,
            grade: this.form.grade,
            gender: this.form.gender,
            head_photo: this.file
          }
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('user_message', response);
              this.$router.replace({path: 'user'});
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>

<style>
  div.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  div.el-upload input {
    display: none;
  }

  div.el-upload:hover {
    border-color: #409EFF;
  }

  i.avatar-uploader-icon {
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
