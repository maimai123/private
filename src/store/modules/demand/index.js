import * as api from '@/api/demand';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    count: 0
  }),
  actions: {
    FETCH ({ commit }, params) {
      return new Promise((resolve, reject) => {
        // api.fetch(params).then((res) => {
        //   commit('FETCH', res.data);
        //   resolve(res.data);
        // }).catch((err) => {
        //   reject(err);
        // });
        resolve();
        commit('FETCH', {
          data: [
            {
              name: '麦麦',
              id: 1
            }
          ],
          extra: {
            count: 10
          }
        });
      });
    },
    FIND ({ commit }, id) {
      return api.find(id);
    },
    CREATE ({ commit }, data) {
      return api.create(data);
    },
    EDIT ({ commit }, { id, data }) {
      return api.edit(id, data);
    },
    DELETE ({ commit }, data) {
      return api.del(data);
    },
    AUDIT ({ commit }, { id, data }) {
      return api.audit(id, data);
    }
  },
  mutations: {
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.extra.count;
    }
  }
};
