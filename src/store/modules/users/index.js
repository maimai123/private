import * as api from '@/api/users';

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
    EDIT ({ commit }, { id, data }) {
      return api.edit(id, data);
    }
  },
  mutations: {
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.total || 0;
    }
  }
};
