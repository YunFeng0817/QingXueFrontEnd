<template>
  <div class="filter">
    <div class="block">
      <el-cascader
        ref="test"
        separator="|"
        placeholder="     城市"
        :options="addresses"
        v-model="selectAddress"
        v-on:change="getType('area')"
        @change="optionSelect">
      </el-cascader>
    </div>
    <div class=" block
      ">
      <el-cascader
        separator="|"
        placeholder="     阶段"
        :options="stages"
        v-model="selectStage"
        v-on:change="getType('stage')"
        @change="optionSelect">
      </el-cascader>
    </div>
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     科目"
        :options="subjects"
        v-model="selectSubject"
        v-on:change="getType('subject')"
        @change="optionSelect">
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
        type: '',
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
          url: '/api/common/areas/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              this.setFilter(response.areas);
              this.addresses = response.areas;
              userMessage.commit('getAddresses', response.areas);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
        axios({
          url: '/api/common/stages/',
          method: 'get'
        })
          .then(function (response) {
            if (response) {
              this.setFilter(response.stages);
              this.stages = response.stages;
              userMessage.commit('getStages', response.stages);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
        axios({
          method: 'get',
          url: '/api/common/subjects/'
        })
          .then(function (response) {
            if (response) {
              this.setFilter(response.subjects);
              this.subjects = response.subjects;
              userMessage.commit('getSubjects', response.subjects);
            }
          }.bind(this))
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
      // reformat option style for filter
      // use recursive function to implement this request
      setFilter (obj) {
        obj.splice(0, 0, {name: '不限', value: '', children: []});
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
      /**
       * 这个函数用来处理 用户点击筛选框中的筛选项后，向后端发出的请求
       * 地址，阶段，科目的筛选后的动作函数 都复用这个函数
       * @param value 用户筛选到的值，是一个数组
       * @param type 筛选框的类型，有'area','stage','subject'这三种类型，将直接用来当作请求的数据
       */
      optionSelect (value) {
        if (value.length !== 0 && value[0]) {
          let result = value[value.length - 1] ? value[value.length - 1] : value[value.length - 2];
          let content;
          switch (this.type) {
            case 'area':
              content = {
                'area': {
                  'id': result
                }
              };
              break;
            case 'stage':
              content = {
                'stage': {
                  'id': result
                }
              };
              break;
            case 'subject':
              content = {
                'subject': {
                  'id': result
                }
              };
          }
          axios({
            method: 'post',
            url: '/api/course/filtered_courses/',
            data: content
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
      },
      getType (type) {
        this.type = type;
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
