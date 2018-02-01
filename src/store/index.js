import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    has_login: true,
    id: 1,
    mobile_num: '',
    name: '',
    stage: '大学',
    grade: '二年级',
    user: 1,
    head_photo: '',
    birthday: '',
    add_time: '',
    following: [],
    favourites: [],
    courses: [],
    course_orders: [],
    comment_to_educators: [],
    comment_to_courses: [],
    address: []
  },
  mutations: {
    user_message (state, message) {
      state.has_login = true;
      state.id = message.id;
      state.mobile_num = message.mobile_num;
      state.name = message.name;
      state.stage = message.stage;
      state.grade = message.grade;
      state.user = message.user;
      state.head_photo = message.head_photo;
      state.birthday = message.birthday;
      state.add_time = message.add_time;
      state.following = message.following;
      state.favourites = message.favourites;
      state.courses = message.courses;
      state.course_orders = message.course_orders;
      state.comment_to_educators = message.comment_to_educators;
      state.comment_to_courses = message.comment_to_courses;
      state.address = message.address;
    },
    delete_message (state) {
      state.has_login = false;
      state.id = 0;
      state.mobile_num = '';
      state.name = '';
      state.stage = 0;
      state.grade = 0;
      state.user = 0;
      state.head_photo = '';
      state.birthday = '';
      state.add_time = '';
      state.following = [];
      state.favourites = [];
      state.courses = [];
      state.course_orders = [];
      state.comment_to_educators = [];
      state.comment_to_courses = [];
      state.address = [];
    }
  }
})
