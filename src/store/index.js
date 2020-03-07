import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/user'
import usersModule from '@/store/modules/users'
import demandModule from '@/store/modules/demand'
import tagsModule from '@/store/modules/tags'

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
    tags: tagsModule
  }
})
