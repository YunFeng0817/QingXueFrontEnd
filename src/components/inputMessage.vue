<template>
  <div id="block">
    <div id="card">
      <el-form label-position="left" label-width="30%" v-model="form">
        <el-form-item label="名称">
          <el-input placeholder="请填写您的名称" v-model="form.name" style="display: inline-block">
          </el-input>
          <!--<span style="display: inline-block">此名称将向学生展示，请如实填写</span>-->
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
        <el-form-item label="您的简介">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入您的简介"
            v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="请上传您的认证材料">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/api"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10%; position:relative;bottom:15px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">可以上传jpg/png等格式文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-button type="primary" :disabled="checkForm" @click="submit">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';

  export default {
    name: 'input-message',
    data () {
      return {
        form: {
          file: ''
        },
        imageUrl: '',
        textarea: '',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },
    created () {
      axios({
        method: 'get',
        url: '/api/common/stages/'
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
        url: '/api/common/grades/'
      })
        .then(function (response) {
          if (response) {
            this.grades = response.grades;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      axios({
        method: 'get',
        url: '/api/student/detail/'
      })
        .then(function (response) {
          if (response) {
            this.form.name = response.name;
            this.form.stage = response.stage;
            this.form.grade = response.grade;
            this.form.gender = response.gender;
            this.form.birthday = response.birthday;
            this.imageUrl = response.head_photo;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    },
    computed: {
      checkForm: function () {
        return this.form.name === '' || this.form.birthday === '' || this.form.gender === '' || this.form.stage === '' || this.form.grade === '';
      }
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
          let Img = this.$refs.image;// 通过refs获得DOM元素img
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          let fileReader = new FileReader();// 读取客户端上的文件
          fileReader.readAsDataURL(file);
          fileReader.onload = function () { // 读文件成功的回调
            Img.src = fileReader.result;// 读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
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
                this.form.file = new File([ia], file.name, {
                  type: 'image/jpeg',
                  name: file.name
                })
              }.bind(this);
            } else {
              this.form.file = file;
            }
          }.bind(this);
        }
        return isJPG;
      },
      submit () {
        let dataForm = new FormData();
        dataForm.append('head_photo', this.form.file);
        dataForm.append('stage', this.form.stage);
        dataForm.append('grade', this.form.grade);
        dataForm.append('gender', this.form.gender);
        dataForm.append('birthday', this.form.birthday);
        dataForm.append('name', this.form.name);
        axios({
          method: 'put',
          url: '/api/student/detail/',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: dataForm
        })
          .then(function (response) {
            if (response) {
              this.$router.back();
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      }
    }
  }
</script>

<style>
  #block {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    text-align: center;
  }

  #card {
    height: auto;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-content: center;
    color: black;
    font-weight: bold;
  }

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
