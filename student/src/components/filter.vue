<template>
  <div class="filter">
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     城市"
        :options="addresses"
        v-model="selectAddress"
        @change="addressSelect">
      </el-cascader>
    </div>
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     阶段"
        :options="stages"
        v-model="selectStage"
        @change="stagesSelect">
      </el-cascader>
    </div>
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     科目"
        :options="subjects"
        v-model="selectSubject"
        @change="subjectsSelect">
      </el-cascader>
    </div>
  </div>
</template>

<script>
  import axios from '../axios/index';
  import userMessage from '../store/index';

  export default {
    name: 'el-filter',
    data () {
      return {
        addresses: [],  // 存储地址的筛选项
        selectAddress: [], // 存储已选的地址筛选项
        subjects: [],  // 存储科目的筛选项
        selectSubject: [],  // 存储已选的科目筛选项
        stages: [], // 存储阶段的筛选项
        selectStage: [] // 存储已选的阶段筛选项
      }
    },
    created () {
      // 如果没有缓存过筛选信息，就在组件创建时请求筛选信息
      if (userMessage.state.addresses.length === 0) {
        axios({
          url: '/api/common/addresses/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              this.address = response.addresses;
              userMessage.commit('getAddresses', response.addresses);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        axios({
          url: '/api/common/stages/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              this.stages = response.stages;
              userMessage.commit('getStages', response.stages);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        axios({
          method: 'get',
          url: '/api/common/subjects/'
        })
          .then(function (response) {
            if (response) {
              this.subjects = response.subjects;
              userMessage.commit('getSubjects', response.subjects);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      } else {
        this.addresses = userMessage.state.addresses;
        this.stages = userMessage.state.stages;
        this.subjects = userMessage.state.subjects;
      }
    },
    methods: {
      // 处理选择具体的地址筛选项后，发送请求的动作
      addressSelect (value) {
        axios({
          method: 'post',
          url: '/api/course/filtered_courses/',
          data: {
            address: {
              province: value[0],
              city: value[1],
              district: value[2]
            }
          }
        })
          .then(function (response) {
            if (response) {
              this.$emit('filterOn', response.courses);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      // 处理选择具体的阶段筛选项后，发送请求的动作
      stagesSelect (value) {
        axios({
          method: 'post',
          url: '/api/course/filtered_courses/',
          data: {
            grade: {
              stage: value[0],
              grade: value[1]
            }
          }
        })
          .then(function (response) {
            if (response) {
              this.$emit('filterOn', response.courses);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      // 处理选择具体的科目筛选项后，发送请求的动作
      subjectsSelect (value) {
        axios({
          method: 'post',
          url: '/api/course/filtered_courses/',
          data: {
            subject: {
              level1: value[0],
              level2: value[1]
            }
          }
        })
          .then(function (response) {
            if (response) {
              this.$emit('filterOn', response.courses);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  };
</script>

<style scoped type="text/css" rel="stylesheet">
  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .filter div {
    flex: 1 1 70%;
  }

  .block {
    margin: 2% 0;
  }
</style>
