<template>
  <div class="filter">
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     城市"
        :options="options"
        v-model="stages"
        @change="handleChange">
      </el-cascader>
    </div>
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     阶段"
        :options="options"
        v-model="stages"
        @change="handleChange">
      </el-cascader>
    </div>
    <div class="block">
      <el-cascader
        separator="|"
        placeholder="     科目"
        :options="options"
        v-model="stages"
        @change="handleChange">
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
        options: [{
          value: '小学',
          label: '小学',
          children: [{
            value: '一年级',
            label: '一年级'
          }, {
            value: '二年级',
            label: '二年级'
          }, {
            value: '三年级',
            label: '三年级'
          }, {
            value: '四年级',
            label: '四年级'
          }, {
            value: '五年级',
            label: '五年级'
          }, {
            value: '六年级',
            label: '六年级'
          }]
        }, {
          value: '初中',
          label: '初中',
          children: [{
            value: '一年级',
            label: '一年级'
          }, {
            value: '二年级',
            label: '二年级'
          }, {
            value: '三年级',
            label: '三年级'
          }, {
            value: '四年级',
            label: '四年级'
          }]
        }, {
          value: '高中',
          label: '高中',
          children: [{
            value: '一年级',
            label: '一年级'
          }, {
            value: '二年级',
            label: '二年级'
          }, {
            value: '三年级',
            label: '三年级'
          }, {
            value: '四年级',
            label: '四年级'
          }]
        }, {
          value: '大学',
          label: '大学'
        }],
        stages: [],
        selectedOptions2: []
      }
    },
    created () {
      function setFilter (options) {
        // 这里的四重循环是对筛选项的键值的渐变赋值
        for (let stage of options) {
          if (stage.value !== '大学') {
            for (let grades of stage.children) {
              grades.children = [];
              // entries() 是对键值对的遍历 id是索引  subject是值
              for (let [id, subject] of userMessage.state.subjects.entries()) {
                grades.children.push({});
                grades.children[id].value = subject.name;
                grades.children[id].label = subject.name;
                grades.children[id].children = [];
                for (let [index, degree] of userMessage.state.degrees.entries()) {
                  grades.children[id].children.push({});
                  grades.children[id].children[index].value = degree.name;
                  grades.children[id].children[index].label = degree.name;
                }
              }
            }
          } else {
            stage.children = [];
            for (let [id, subject] of userMessage.state.subjects.entries()) {
              stage.children.push({});
              stage.children[id].value = subject.name;
              stage.children[id].label = subject.name;
              stage.children[id].children = [];
              for (let [index, degree] of userMessage.state.degrees.entries()) {
                stage.children[id].children.push({});
                stage.children[id].children[index].value = degree.name;
                stage.children[id].children[index].label = degree.name;
              }
            }
          }
        }
      }

      if (userMessage.state.subjects.length === 0) {
        axios({
          method: 'get',
          url: '/api/common/subjects/'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('getSubjects', response.subjects);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      if (userMessage.state.degrees.length === 0) {
        axios({
          method: 'get',
          url: '/api/common/degrees/'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('getDegrees', response.degrees);
              setFilter(this.options);
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setFilter(this.options);
      }
    },
    methods: {
      handleChange (value) {
        axios({
          method: 'post',
          url: '/api/course/filtered_list/',
          data: {
            stage: [value[0]],
            grade: [value[1]],
            subject: [value[2]],
            degree: [value[3]]
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
    margin: 2% 1%;
  }
</style>
