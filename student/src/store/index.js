import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dynamicPage: 1,
    mainPage: 1,
    has_login: false,
    is_course: true,
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
    courses: [],
    course_orders: [],
    comment_to_educators: [],
    comment_to_courses: [],
    addresses: [],
    main: {},
    subjects: [],
    stages: [],
    searchResult: [],
    firstClass: {},
    courseDetail: {},
    essay: {},
    essays: [],
    institution: {},
    orderResult: {}
  },
  mutations: {
    // 登录后保存用户信息
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
      state.address = message.address;
    },
    // 退出登录后删除用户信息
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
      state.address = [];
    },
    // 保存主页的课程列表，轮播图，头条
    commitList (state, list) {
      state.main.courses = list.courses;
      state.main.banners = list.banners;
      state.main.essays = list.essays;
    },
    // 保存科目筛选项
    getSubjects (state, list) {
      state.subjects = list;
    },
    // 保存地址筛选项
    getAddresses (state, list) {
      state.addresses = list;
    },
    // 保存阶段删选项
    getStages (state, list) {
      state.stages = list;
    },
    // 保存搜索结果
    commitSearch (state, list) {
      state.searchResult = list;
      state.is_course = list.is_course;
    },
    // 保存一级分类的返回结果
    commitFirst (state, list) {
      state.firstClass.courses = list.courses;
      state.firstClass.banners = list.banners;
      state.firstClass.essays = list.essays;
    },
    // 保存具体的课程信息
    commitCourse (state, list) {
      state.courseDetail = list;
    },
    // 保存动态页的动态列表
    commitEssays (state, list) {
      state.essays = list;
    },
    // 保存具体的文章
    commitEssay (state, list) {
      state.essay = list;
    },
    // 保存具体的机构信息
    commitInstitution (state, list) {
      state.institution = list;
    },
    // 保存具体的订单信息
    commitOrderResult (state, list) {
      state.orderResult = list;
    },
    // 局部更新用户评价
    commitComment (state, list) {
      state.orderResult.comment = list
    },
    // 提交动态页面的页数
    commitDynamicPage (state, list) {
      state.dynamicPage = list;
    },
    // 提交主页页面的页数
    commitMainPage (state, list) {
      state.mainPage = list;
    }
  }
})
