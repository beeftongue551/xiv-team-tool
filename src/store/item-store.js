import {UPDATE_ITEMS_DATA, UPDATE_SELECTED_DC} from "@/store/mutation-type"

export default {
  namespaced: true,
  state: {
    itemsData:{},
    selectedDC: '',
  },
  getters: {
    getItemsData(state) {
      return state.itemsData
    },
    getSelectedDC(state){
      return state.selectedDC
    },
  },
  mutations: {
    [UPDATE_ITEMS_DATA](state, payload) {
      state.itemsData = payload
    },
    [UPDATE_SELECTED_DC](state, payload) {
      state.selectedDC = payload
    },
  },
  actions: {
    [UPDATE_ITEMS_DATA]: ({commit}, payload) => {
      commit(UPDATE_ITEMS_DATA, payload)
    },
    [UPDATE_SELECTED_DC]: ({commit}, payload) => {
      commit(UPDATE_SELECTED_DC, payload)
    },
  }
}