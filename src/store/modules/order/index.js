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
        api.fetch(params).then((res) => {
          commit('FETCH', res.data);
          resolve(res.data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    FETCH_EQUITY_PRICE ({ commit }) {
      return api.getEquityAndPrice();
    },
    EDIT_EQUITY_PRICE ({ commit }, data) {
      return api.editEquityAndPrice(data);
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
