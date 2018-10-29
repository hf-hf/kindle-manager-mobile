import router from './router'
import store from './store'
import {Indicator, Toast} from 'mint-ui';
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  Indicator.open('加载中...')
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      Indicator.close()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Toast({
              message: err || 'Verification failed, please login again',
            });
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      Indicator.close()
    }
  }
})

router.afterEach(() => {
  Indicator.close() // 结束Progress
})
