import * as api from '@/api/user';

export default {
  namespaced: true,
  state: () => ({
    user: {},
    access: {}
  }),
  getters: {},
  actions: {
    GET_USER ({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUser().then((res) => {
          commit('GET_USER', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    GET_ACCESS ({ commit }) {
      return new Promise((resolve, reject) => {
        api.getAccess().then((res) => {
          commit('GET_ACCESS', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    LOGIN ({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.login(data).then((res) => {
          commit('GET_USER', res.data);
          resolve(res.data);
        }).catch((err) => {
          commit('LOGIN_OUT');
          reject(err);
        });
      });
    },
    LOGIN_OUT ({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.logout().then((res) => {
          commit('LOGIN_OUT');
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    }
  },
  mutations: {
    GET_USER (state, data) {
      state.user = data.data;
    },
    GET_ACCESS (state, data) {
      state.access = data.data;
    },
    LOGIN_OUT (state) {
      state.access = {};
    }
  }
};
