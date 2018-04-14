<template>
  <div class="block">
    <div class="card" style="padding:3% 3%;">
      <h2>
        初次注册，请您花费几分钟时间填写以下信息
      </h2>
      <div>
        <el-form label-position="left" label-width="30%" v-model="form">
          <el-form-item label="您的名称">
            <div class="tip-row">
              <el-input placeholder="请填写您的名称" v-model="form.name" style="display: inline-block">
              </el-input>
              <span class="tips">* 此名称将向学生展示，请如实填写</span>
            </div>
          </el-form-item>
          <hr>
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
          <hr>
          <el-form-item label="您的简介">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入您的简介"
              v-model="introduction">
            </el-input>
          </el-form-item>
          <hr>
          <el-form-item label="请上传您的认证材料(可不上传)">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :limit="5"
              :on-change="handleChoose"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">可以上传jpg/png等格式的文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <hr>
          <el-form-item label="您的地址" style="text-align: left;">
            <el-cascader
              separator="|"
              placeholder="地区"
              :options="areas"
              v-model="area">
            </el-cascader>
          </el-form-item>
          <hr>
          <label style="font-size: medium;color: gray;float: left;">
            请在地图上标出您的位置 <span style="color:red;">提示：</span>点击地图右下角的小圆点进行定位,可以移动红点更改位置
          </label>
          <br/>
          <br/>
          <br/>
          <div class="map">
            <baidu-map class="map" ak="Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m" center="harbin"
                       :zoom="15">
              <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                              @locationSuccess="getPositionDetail" @locationError="errorHandle"></bm-geolocation>
              <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"
                         @dragend="getPoint">
                <bm-label content="我的位置" :labelStyle="{color: 'red', fontSize : '24px'}"
                          :offset="{width: -35, height: 30}"/>
              </bm-marker>
            </baidu-map>
          </div>
          <hr>
          <el-form-item label="地址的详细描述">
            <el-input
              type="textarea"
              :rows="1"
              placeholder="详细的地址描述更方便的帮助学生找到地址"
              v-model="positionDescription">
            </el-input>
          </el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';
  import bmGeolocation from 'vue-baidu-map/components/controls/Geolocation';
  import baiduMap from 'vue-baidu-map/components/map/Map.vue';
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
          name: '',
          file: ''
        },
        imageUrl: '',
        introduction: '',
        positionDescription: '',
        fileList: [],
        position: {
          lng: 0,
          lat: 0
        },
        address: [],
        areas: [], // 这个字段保存由后端返回的地域筛选项
        area: []// 这个字段用于保存用户选择的自己的位置
      }
    },
    created () {
      axios({
        url: '/api/common/areas/',
        method: 'get'
      })
        .then(function (response) {
          if (response) {
            this.setFilter(response.areas);
            this.areas = response.areas;
          }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
    },
    methods: {
      // reformat option style for filter
      // use recursive function to implement this request
      setFilter (obj) {
        if (obj) {
          for (let item of obj) {
            item.label = item.name;
            item.value = item.id;
            delete item.name;
            delete item.id;
            if (item.children.length !== 0) {
              this.setFilter(item.children);
            } else {
              delete item.children;
            }
          }
        }
      },
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
        if (!this.form.name) {
          this.$message({
            type: 'error',
            message: '请填写用户名',
            duration: 2000
          });
          return;
        } else if (!this.introduction) {
          this.$message({
            type: 'error',
            message: '请填写您的简介',
            duration: 2000
          });
          return;
        }
        if (this.area.length !== 0) {
          let area = this.area[this.area.length - 1];
          let dataForm = new FormData();
          if (this.address.length !== 0) {
            this.address[0].area_id = area;
            this.address[0].detail = this.positionDescription;
            this.address[0].latitude = this.position.lat;
            this.address[0].longitude = this.position.lng;
            dataForm.append('addresses', JSON.stringify(this.address[0]));
          }
          dataForm.append('head_photo', this.form.file);
          dataForm.append('name', this.form.name);
          dataForm.append('introduction', this.introduction);
          /**
           * 因为FormData对象的append()的第二个参数只能是字符串或者blob对象，
           * 不能是数组对象，所以要要循环添加文件，实现数组的上传
           */
          for (let file of this.fileList) {
            dataForm.append('authentications', file);
          }
          axios({
            method: 'put',
            url: '/api/educator/sign_up/',
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': document.cookie.split(';')[0].split('=')[1]
            },
            data: dataForm
          })
            .then(function (response) {
              if (response) {
                this.$router.push({path: '/educator/pay'});
              }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        } else {
          this.$message({
            message: '请填写您所在的区域',
            type: 'error',
            duration: 1500
          });
        }
      },
      // 一旦用户选择了文件，就会调用这个函数，然后将文件添加进fileList数组
      handleChoose (file) {
        if (file.raw.size > 1024 * 500) {
          this.$message({
            type: 'error',
            message: '文件大小超过了500KB',
            duration: 1500
          });
        } else {
          this.fileList.push(file.raw);
        }
      },
      // 处理用户删除文件的操作
      handleRemove (file, fileList) {
        this.fileList = fileList;
      },
      // 一旦地图进行了定位，就调用此函数
      getPositionDetail (object) {
        this.address.push(object.addressComponent);
        this.position = object.point;
      },
      // 一旦用户移动了地图上的小光标，就调用此函数
      getPoint (object) {
        this.position = object.point;
      },
      // 一旦地图自动获取定位失败，就调用此函数，然后通过浏览器的api手动获得养护的定位
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
    height: 400px;
  }

  hr {
    margin: 7% 0;
    color: #dddddd;
    background-color: #dddddd;
    height: 1px;
    line-height: 1px;
    font-size: 0;
    border: none;
  }
</style>
