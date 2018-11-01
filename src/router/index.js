import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'

const Login = () => import ('@/page/member/login')
const NovelDetail = () => import ('@/page/novel/detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { keepAlive: false }
    },
    {
        path: '/novel/detail',
        name: 'novelDetail',
        component: NovelDetail,
        meta: { keepAlive: false }
    }
  ]
})
