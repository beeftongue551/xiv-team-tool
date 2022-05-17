export default {
  namespaced: true,
  state: {
    member: {
      id: 0,
      role: '',
      job: '',
      teamId: 0
    }
  },
  getters: {
    getMember(state) {
      return state.member
    }
  },
  mutations: {
    updateMember(state, payload) {
      state.member = payload
    }
  },
  actions: {
    updateMember: ({commit}, payload) => {
      commit("updateMember", payload)
    }
  }
}