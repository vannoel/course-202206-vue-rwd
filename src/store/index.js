import { createStore } from 'vuex'
import Auth from '@/store/auth';

export default createStore({
  state: {
    loadingStatus: false,
  },
  getters: {
  },
  // commit
  mutations: {
    updateLoadingStatus(state, status) {
      state.loadingStatus = status;
    },
  },
  // dispatch
  actions: {
  },
  modules: {
    Auth,
  },
})
