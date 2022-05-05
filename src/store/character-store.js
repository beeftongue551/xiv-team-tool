import {
  UPDATE_CHARACTER_DETAIL,
  UPDATE_CHARACTERS_DATA, UPDATE_GEAR_SET,
  UPDATE_NAME_TEXT, UPDATE_SERVER_TEXT
} from "@/store/mutation-type"

export default {
  namespaced: true,
  state: {
    nameText: '',
    serverText: '',
    charactersData: {},
    characterDetail: {},
    gearSet: {},
  },
  getters: {
    getNameText(state) {
      return state.nameText
    },
    getServerText(state) {
      return state.serverText
    },
    getCharactersData(state) {
      return state.charactersData
    },
    getCharacterDetail(state) {
      return state.characterDetail
    },
    getGearSet(state) {
      return state.gearSet
    }
  },
  mutations: {
    [UPDATE_CHARACTERS_DATA](state, payload) {
      state.charactersData = payload
    },
    [UPDATE_CHARACTER_DETAIL](state, payload) {
      state.characterDetail = payload
    } ,

    [UPDATE_NAME_TEXT](state, payload) {
      state.nameText = payload
    },
    [UPDATE_SERVER_TEXT](state, payload) {
      state.serverText = payload
    },

    [UPDATE_GEAR_SET](state, payload) {
      state.gearSet = payload
    },

  },
  actions: {
    [UPDATE_CHARACTERS_DATA]: ({commit}, payload) => {
      commit(UPDATE_CHARACTERS_DATA, payload)
    },
    [UPDATE_CHARACTER_DETAIL]: ({commit},payload) => {
      commit(UPDATE_CHARACTER_DETAIL, payload)
    },

    [UPDATE_NAME_TEXT]: ({commit}, payload) => {
      commit(UPDATE_NAME_TEXT, payload)
    },
    [UPDATE_SERVER_TEXT]: ({commit}, payload) => {
      commit(UPDATE_SERVER_TEXT, payload)
    },
    [UPDATE_GEAR_SET]: ({commit}, payload) => {
      commit(UPDATE_GEAR_SET, payload)
    },

  }
}