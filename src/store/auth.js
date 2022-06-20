const Auth = {
  namespaced: true,
  state: {
    user: {},
  },
  // commit
  mutations: {
    login(state, data) {
      state.user = data;
    },
    logout(state) {
      state.user = {};
    },
    updateProfile(state, data) {
      state.user.phone = data.phone;
      state.user.address = data.address;
    }
  },
  // dispatch
  actions: {
    login({ commit }, data) {
      commit('login', data);
    },
    logout({ commit }) {
      commit('logout');
    },
    updateProfile({commit}, data) {
      commit('updateProfile', data);
    }
  },
  getters: {},
};

export default Auth;