import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/assets/definitions/routes'

import store from "@/store";

const routes = [
  {
    path: '/login',
    name: ROUTES.LOGIN,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/',
    name: ROUTES.HOME,
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue'),
    redirect: { name: ROUTES.BILLBOARD },
    children: [
      {
        path: '/billboard',
        name: ROUTES.BILLBOARD,
        component: () => import(/* webpackChunkName: "billboard" */ '../views/home/Billboard.vue'),
        meta: {
          title: '學校公告'
        }
      },
      {
        path: '/course',
        name: ROUTES.COURSE,
        component: () => import(/* webpackChunkName: "course" */ '../views/home/Course.vue'),
        meta: {
          title: '選課資訊'
        }
      },
      {
        path: '/absence',
        name: ROUTES.ABSENCE,
        component: () => import(/* webpackChunkName: "absence" */ '../views/home/absence/Index.vue'),
        redirect: { name: ROUTES.ABSENCE_MANAGEMENT },
        children:[
          {
            path: '/absence/management',
            name: ROUTES.ABSENCE_MANAGEMENT,
            component: () => import(/* webpackChunkName: "absence_management" */ '../views/home/absence/Management.vue'),
            meta: {
              title: '出缺勤紀錄'
            }
          },
          {
            path: '/absence/form/:id',
            name: ROUTES.ABSENCE_FORM,
            component: () => import(/* webpackChunkName: "absence_form" */ '../views/home/absence/Form.vue'),
            meta: {
              title: '請假單'
            }
          },
        ]
      },
      {
        path: '/dormitory',
        name: ROUTES.DORMITORY,
        component: () => import(/* webpackChunkName: "dormitory" */ '../views/home/Dormitory.vue'),
        meta: {
          title: '宿舍資訊'
        }
      },
      {
        path: '/parttime',
        name: ROUTES.PARTTIME,
        component: () => import(/* webpackChunkName: "parttime" */ '../views/home/Parttime.vue'),
        meta: {
          title: '工讀時數紀錄'
        }
      },
      {
        path: '/profile',
        name: ROUTES.PROFILE,
        component: () => import(/* webpackChunkName: "info" */ '../views/home/Profile.vue'),
        meta: {
          title: '個人資料'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  store.commit("updateLoadingStatus", true);
})

router.afterEach((to) => {
  window.scrollTo(0, 0);
  document.title = `${to.meta.title} | 學生系統`;
})

export default router
