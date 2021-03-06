import * as api from '@/api/demand';

export default {
  namespaced: true,
  state: () => ({
    list: [],
    count: 0,
    needs: [],
    resource: []
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
    FETCH_TAGS ({ commit }, param) {
      return new Promise((resolve, reject) => {
        api.fetchTags(param).then(({ data }) => {
          commit('FETCH_TAGS', { param, data });
          resolve(data.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    FIND ({ commit }, id) {
      return api.find(id);
    },
    CHANGE_SHOW ({ commit }, { id, is_show }) {
      return api.change(id, is_show);
    },
    CREATE ({ commit }, data) {
      return api.create(data);
    },
    EDIT ({ commit }, { id, data }) {
      return api.edit(id, data);
    },
    DELETE ({ commit }, data) {
      return api.del({ ids: data.join(',') });
    },
    AUDIT ({ commit }, { id, status }) {
      return api.audit(id, status);
    }
  },
  mutations: {
    FETCH_TAGS (state, { param, data }) {
      state[param] = data.data;
    },
    FETCH (state, data) {
      state.list = data.data;
      state.count = data.total;
    }
  }
};
