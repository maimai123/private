import * as api from '@/api/tags';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    count: 0,
    searchList: {}
  }),
  actions: {
    FETCH_SEARCH ({ commit }) {
      return new Promise((resolve, reject) => {
        // api.fetchSearch().then(({ data }) => {
        //   commit('FETCH_SEARCH', data.data);
        //   resolve(res.data);
        // }).catch((err) => {
        //   reject(err);
        // });
        resolve();
        commit('FETCH_SEARCH', {
          type: [{ id: 1, name: '需求' }, { id: 2, name: '资源' }]
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
    FETCH_SEARCH (state, data) {
      state.searchList = data;
    },
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.extra.count;
    }
  }
};
