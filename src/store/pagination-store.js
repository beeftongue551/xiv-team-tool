import {UPDATE_PAGINATION} from "@/store/mutation-type"

export default {
  namespaced: true,
  state: {
    pagination:{}
  },
  getters: {
    getPagination(state) {
      return state.pagination
    }
  },
  mutations: {
    [UPDATE_PAGINATION](state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    [UPDATE_PAGINATION]: ({commit}, payload) => {
      commit(UPDATE_PAGINATION, payload)
    }
  }
}