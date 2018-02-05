<template>
  <div class="filter">
    <label>选出你关注的内容</label>
    <div class="block">
      <el-cascader
        :options="options"
        v-model="selectedOptions"
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
          value: '',
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
        selectedOptions: [],
        selectedOptions2: []
      }
    },
    created () {
      if (userMessage.state.subjects.length === 0) {
        axios({
          method: 'get',
          url: '/common/subjects/'
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
          url: '/common/degrees/'
        })
          .then(function (response) {
            if (response) {
              userMessage.commit('getDegrees', response.degrees);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      console.log(userMessage.state.subjects, userMessage.state.degrees);
      // 这里的四重循环是对筛选项的键值的渐变赋值
      for (let stage of this.options) {
        console.log('stage');
        console.log(stage);
        if (stage.value !== '大学') {
          for (let grades of stage.children) {
            grades.children = [];
            for (let [id, subject] of userMessage.state.subjects) {
              grades.children[id].value = subject;
              grades.children[id].label = subject;
              for (let [index, degree] of userMessage.state.degrees) {
                grades.children[id].children[index].vaule = degree;
                grades.children[id].children[index].label = degree;
              }
            }
          }
        } else {
          stage.children = [];
          for (let [id, subject] of userMessage.state.subjects) {
            stage.children[id].value = subject;
            stage.children[id].label = subject;
            for (let [index, degree] of userMessage.state.degrees) {
              stage.children[id].children[index].vaule = degree;
              stage.children[id].children[index].label = degree;
            }
          }
        }
      }
    },
    methods: {
      handleChange (value) {
        axios({
          method: 'post',
          url: '/course/filtered_list/',
          data: {
            stage: value[0],
            grade: value[1],
            subject: value[2],
            degree: value[3]
          }
        })
          .then(function (response) {
            if (response) {
              this.$emit('filterOn', response);
            }
          })
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

  .filter label {
    margin: 3%;
    flex: 1 1 40%;
  }

  .filter div {
    flex: 1 1 70%;
  }
</style>
