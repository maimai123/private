import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ProgressBar from '@/components/common/ProgressBar'
import grid from '@/components/common/grid'

import 'element-ui/lib/theme-chalk/index.css'
import '@/less/main.less';

import { AUTH_URL } from '@/config';

Vue.use(ElementUI, { size: 'small' });
Vue.component(grid.name, grid)

Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);

router.beforeEach(async (to, from, next) => {
  if (!Object.keys(store.state.user.user).length && !['login', 'forget'].includes(to.name)) await store.dispatch('user/GET_USER');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && Object.keys(store.state.user.user).length === 0) {
    window.location.href = AUTH_URL;
  } else {
    bar.start();
    next();
  }
});

router.afterEach((to, from) => {
  bar.finish();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
