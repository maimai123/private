import * as api from '@/api/members';

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
    CHANGE_SHOW ({ commit }, { id }) {
      return api.change(id);
    },
    CREATE ({ commit }, data) {
      return api.create(data);
    },
    EDIT ({ commit }, { id, data }) {
      return api.edit(id, data);
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
