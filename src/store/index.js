import { createStore } from 'vuex'
import CharacterStore from "@/store/character-store";
import PaginationStore from "@/store/pagination-store";
import {UPDATE_IS_LOADING, UPDATE_OPEN_MODAL} from "@/store/mutation-type";
import ItemStore from "@/store/item-store";
import RecipeStore from "@/store/recipe-store";
import UserStore from "@/store/user-store";
import createPersistedState from "vuex-persistedstate";
import memberStore from "@/store/member-store";

export default createStore({
  state: {
    isLoading: false,
    openModal: false
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading
    },
    getOpenModal(state) {
      return state.openModal
    }
  },
  mutations: {
    [UPDATE_IS_LOADING](state, payload) {
      state.isLoading = payload
    },
    [UPDATE_OPEN_MODAL](state, payload) {
      state.openModal = payload
    }
  },
  actions: {
    [UPDATE_IS_LOADING]: ({commit}, payload) => {
      commit(UPDATE_IS_LOADING, payload)
    },
    [UPDATE_OPEN_MODAL]: ({commit}, payload) => {
      commit(UPDATE_OPEN_MODAL, payload)
    },
  },
  modules: {
    character: CharacterStore,
    item: ItemStore,
    recipe: RecipeStore,
    pagination: PaginationStore,
    user: UserStore,
    member: memberStore
  },
  plugins: [
    createPersistedState({
      key: 'xiv-team-tool',
      paths: ['user'],
      storage: localStorage
    })
  ]
})
