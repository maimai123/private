import * as api from '@/api/order';

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
            { name: '麦麦', id: 1 },
            { name: '麦麦', id: 2 }
          ],
          extra: {
            count: 10
          }
        });
      });
    },
    DELETE ({ commit }, data) {
      return api.del({ ids: data.join(',') });
    }
  },
  mutations: {
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.extra.count;
    }
  }
};
