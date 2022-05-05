import { createStore } from 'vuex'
import CharacterStore from "@/store/character-store";
import PaginationStore from "@/store/pagination-store";
import {UPDATE_IS_LOADING} from "@/store/mutation-type";

export default createStore({
  state: {
    isLoading: false
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    [UPDATE_IS_LOADING](state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    [UPDATE_IS_LOADING]: ({commit}, payload) => {
      commit(UPDATE_IS_LOADING, payload)
    },
  },
  modules: {
    character: CharacterStore,
    pagination: PaginationStore
  }
})
