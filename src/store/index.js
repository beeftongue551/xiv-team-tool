import { createStore } from 'vuex'
import CharacterStore from "@/store/character-store";
import PaginationStore from "@/store/pagination-store";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    character: CharacterStore,
    pagination: PaginationStore
  }
})
