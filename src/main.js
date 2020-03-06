import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ProgressBar from '@/components/common/ProgressBar'
import grid from '@/components/common/grid'

import 'element-ui/lib/theme-chalk/index.css'
import '@/less/main.less';

// import { AUTH_URL } from '@/config';

Vue.use(ElementUI)
Vue.component(grid.name, grid)

Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);

router.beforeEach((to, from, next) => {
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && Object.keys(store.state.user.user).length === 0) {
  //   window.location.href = AUTH_URL;
  // } else {
  //   bar.start();
  //   next();
  // }
  // const matched = router.getMatchedComponents(to);
  // const prevMatched = router.getMatchedComponents(from);
  // let diffed = false;
  // const activated = matched.filter((c, i) => {
  //   return diffed || (diffed = (prevMatched[i] !== c));
  // });
  // const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
  // if (!asyncDataHooks.length) {
  //   return next();
  // }
  // bar.start();
  // return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to }))).then(() => {
  //   bar.finish();
  //   next();
  // }).catch((err) => {
  //   bar.fail();
  //   if (err.url) {
  //     next({ name: err.url });
  //   } else if (err.response.status === 404) {
  //     next(false);
  //   } else if (err.response.status === 401) {
  //     next(false);
  //   } else if (err.response.status >= 500) {
  //     next(false);
  //   } else {
  //     next();
  //   }
  // });
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
