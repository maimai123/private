import * as api from '@/api/demand';

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
          status: [{ id: 1, name: '待审核' }, { id: 2, name: '审核成功' }, { id: 3, name: '审核失败' }],
          type: [{ id: 1, name: '显示' }, { id: 2, name: '隐藏' }]
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
