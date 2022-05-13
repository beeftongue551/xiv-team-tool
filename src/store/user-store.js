import {UserCharacter} from "@/class/UserCharacter";
import {UPDATE_USER_CHARACTER} from "@/store/mutation-type";
import createPersistedState from 'vuex-persistedstate'

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
  plugins: [
    createPersistedState({
      key: 'xiv-team-tool',
      storage: localStorage
    })
  ]
}