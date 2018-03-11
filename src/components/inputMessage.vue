<template>
  <div class="block">
    <div class="card" style="padding:3% 3%;">
      <h2>
        初次注册，请您花费几分钟时间填写以下信息
      </h2>
      <div>
        <el-form label-position="left" label-width="30%" v-model="form">
          <el-form-item label="名称">
            <div class="tip-row">
              <el-input placeholder="请填写您的名称" v-model="form.name" style="display: inline-block">
              </el-input>
              <span class="tips">* 此名称将向学生展示，请如实填写</span>
            </div>
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
              <el-button style="margin-left: 10%; position:relative;bottom:15px;" size="small" type="success"
                         @click="submitUpload">上传到服务器
              </el-button>
              <div slot="tip" class="el-upload__tip">可以上传jpg/png等格式文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="请在地图上标出您的位置">
            <div class="map">
              <baidu-map class="map" ak="Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m" center="harbin"
                         :zoom="15">
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                                @locationSuccess="getPosition" @locationError="errorHandle"></bm-geolocation>
                <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                           @dragend="getPosition">
                  <bm-label content="我的位置" :labelStyle="{color: 'red', fontSize : '24px'}"
                            :offset="{width: -35, height: 30}"/>
                </bm-marker>
              </baidu-map>
            </div>
          </el-form-item>
          <el-button type="primary" :disabled="checkForm" @click="submit">提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';
  import baiduMap from 'vue-baidu-map/components/Map/Map';
  import bmGeolocation from 'vue-baidu-map/components/controls/Geolocation';
  import bmMarker from 'vue-baidu-map/components/overlays/Marker'
  import bmLabel from 'vue-baidu-map/components/overlays/Label'

  export default {
    name: 'input-message',
    components: {
      baiduMap,
      bmGeolocation,
      bmMarker,
      bmLabel
    },
    data () {
      return {
        form: {
          file: ''
        },
        imageUrl: '',
        textarea: '',
        fileList: [],
        position: {
          lng: 0,
          lat: 0
        }
      }
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
        dataForm.append('name', this.form.name);
        dataForm.append('introduction', this.textarea);
        axios({
          method: 'put',
          url: '/api//educator/sign_up/',
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
        console.log(this.fileList);
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getPosition (object) {
        console.log(object);
        this.position = object.point;
      },
      errorHandle () {
        function displayPosition (pos) {
          this.positioni.lng = pos.coords['longitude'];
          this.position.lat = pos.coords['latitude'];
        }

        // 用于判断是否获取位置出错
        function handerError (error) {
          if (error.code === 1 && error.message === 'User denied Geolocation') {
            alert(error.message);
          }
        }

        navigator.geolocation.getCurrentPosition(displayPosition, handerError);
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

  .tips {
    flex: 1 1 95%;
    font-size: x-small;
    color: gray;
  }

  .tip-row {
    width: 95%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;

    margin: 4%;
  }

  label {
    position: relative;
    top: 10px;
  }

  .map {
    width: 100%;
    height: 450px;
  }
</style>
