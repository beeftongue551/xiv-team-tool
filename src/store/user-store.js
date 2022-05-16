import {UPDATE_USER_CHARACTER} from "@/store/mutation-type";

export default {
  namespaced: true,
  state: {
    userCharacter: new UserCharacter(0,'','' , '', 0 , [])
  },
  getters: {
    getUserCharacter(state) {
      return state.userCharacter
    }
  },
  mutations: {
    [UPDATE_USER_CHARACTER](state, payload) {
      state.userCharacter = payload
    }
  },
  actions: {
    [UPDATE_USER_CHARACTER]: ({commit}, payload) => {
      commit(UPDATE_USER_CHARACTER, payload)
    }
  },
}