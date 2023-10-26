const state = {
  str: 'test state str',
};
const getters = {
  getStr() {return state.str;}, //getters['vuexUse/getStr']
};
const mutations = {
  CHANGE_STR(state, payLoad) {
    state.str = payLoad; // -> dispatch('vuexUse/CHANGE_STR')
  },
};
const actions = {
  // commit('vuexUse/CHANGE_STR_ACTION')
  CHANGE_STR_ACTION({ commit, state, dispatch }, payLoad) {
    // commit 提交一个 mutation
    setTimeout(() => {
      commit('CHANGE_STR', payLoad);
    }, 1000);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
