import * as api from '@/api/tourists';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    count: 0
    // searchList: {}
  }),
  actions: {
    FETCH_SEARCH ({ commit }) {
      return new Promise((resolve, reject) => {
        api.fetchSearch().then((res) => {
          commit('FETCH_SEARCH', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
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
    DELETE ({ commit }, data) {
      return api.del(data);
    }
  },
  mutations: {
    FETCH_SEARCH (state, data) {
      state.searchList = data;
    },
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.extra.count;
    }
  }
};
