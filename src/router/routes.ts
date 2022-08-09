import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('pages/index.vue') },
  {
    path: '/app',
    component: () => import('layouts/default.vue'),
    children: [
      { path: '', component: () => import('pages/app/index.vue') },
      {
        path: 'create-cicle',
        name: 'create-cicle',
        component: () => import('pages/app/CreateCicle.vue'),
      },
      {
        path: 'create-record',
        component: () => import('pages/app/CreateRecord.vue'),
      },
      {
        path: 'plans',
        component: () => import('pages/app/UserPlans.vue'),
      },
      {
        path: 'study-records',
        component: () => import('pages/app/StudyRecords.vue'),
      },
      {
        path: 'disciplinas',
        component: () => import('pages/app/disciplines/index.vue'),
      },
      {
        path: 'wellcome',
        component: () => import('pages/app/WellcomePage.vue'),
      },
      {
        path: 'cicles',
        component: () => import('pages/app/UserCicles.vue'),
      },
      {
        path: 'create-cicle',
        component: () => import('pages/app/CreateCicle.vue'),
      },
      {
        path: 'start-scheduling',
        component: () => import('pages/app/StartScheduling.vue'),
      },
      {
        path: 'settings',
        component: () => import('pages/app/UserSettings.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
export default routes;
