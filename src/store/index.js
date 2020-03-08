import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/user'
import usersModule from '@/store/modules/users'
import demandModule from '@/store/modules/demand'
import orderModule from '@/store/modules/order'
import tagsModule from '@/store/modules/tags'
import touristsModule from '@/store/modules/tourists'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule,
    users: usersModule,
    demand: demandModule,
    order: orderModule,
    tags: tagsModule,
    tourists: touristsModule
  }
})
