/* eslint-disable */
function index() {
  return import(/* webpackChunkName: "index" */ 'pages/index.vue')
}
function ErrorNotFound() {
  return import(
    /* webpackChunkName: "ErrorNotFound" */ 'pages/ErrorNotFound.vue'
  )
}
function Login() {
  return import(/* webpackChunkName: "Login" */ 'pages/Login.vue')
}
function Register() {
  return import(/* webpackChunkName: "Register" */ 'pages/Register.vue')
}
function app_index() {
  return import(/* webpackChunkName: "app-index" */ 'pages/app/index.vue')
}
function app_Create_Record() {
  return import(
    /* webpackChunkName: "app-Create-Record" */ 'pages/app/Create-Record.vue'
  )
}
function app_CreateCicle() {
  return import(
    /* webpackChunkName: "app-CreateCicle" */ 'pages/app/CreateCicle.vue'
  )
}
function app_StartScheduling() {
  return import(
    /* webpackChunkName: "app-StartScheduling" */ 'pages/app/StartScheduling.vue'
  )
}
function app_StudyRecords() {
  return import(
    /* webpackChunkName: "app-StudyRecords" */ 'pages/app/StudyRecords.vue'
  )
}
function app_WellcomePage() {
  return import(
    /* webpackChunkName: "app-WellcomePage" */ 'pages/app/WellcomePage.vue'
  )
}
function app_disciplines_index() {
  return import(
    /* webpackChunkName: "app-disciplines-index" */ 'pages/app/disciplines/index.vue'
  )
}

export default [
  {
    name: 'index',
    path: '',
    component: index,
  },
  {
    name: 'ErrorNotFound',
    path: 'ErrorNotFound',
    component: ErrorNotFound,
  },
  {
    name: 'Login',
    path: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    path: 'Register',
    component: Register,
  },
  {
    name: 'app',
    path: 'app',
    component: app_index,
  },
  {
    name: 'app-Create-Record',
    path: 'app/Create-Record',
    component: app_Create_Record,
  },
  {
    name: 'app-CreateCicle',
    path: 'app/CreateCicle',
    component: app_CreateCicle,
  },
  {
    name: 'app-StartScheduling',
    path: 'app/StartScheduling',
    component: app_StartScheduling,
  },
  {
    name: 'app-StudyRecords',
    path: 'app/StudyRecords',
    component: app_StudyRecords,
  },
  {
    name: 'app-WellcomePage',
    path: 'app/WellcomePage',
    component: app_WellcomePage,
  },
  {
    name: 'app-disciplines',
    path: 'app/disciplines',
    component: app_disciplines_index,
  },
]
