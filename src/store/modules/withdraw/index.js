import * as api from '@/api/withdraw';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    count: 0
  }),
  actions: {
    FETCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.fetch(params).then((res) => {
          commit('FETCH', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    CHANGE ({ commit }, { id, status, reason }) {
      return api.change({ id, status, reason });
    },
    GET_INTRO ({ commit }) {
      return api.getInstruction();
    },
    SET_INTRO ({ commit }, data) {
      return api.setInstruction(data);
    },
    DELETE ({ commit }, data) {
      return api.del({ ids: data.join(',') });
    }
  },
  mutations: {
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.total;
    }
  }
};
