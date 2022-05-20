import {UPDATE_USER_CHARACTER} from "@/store/mutation-type";
import {UserCharacter} from "@/class/UserCharacter";

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

      //csvで届くお気に入り情報を配列に格納する処理
      const toString = Object.prototype.toString
      if(toString.call(payload.favoriteItemId) === '[object String]') {
        payload.favoriteItemId = payload.favoriteItemId.split(',')
        if(payload.favoriteItemId[0] === "") {
          payload.favoriteItemId = []
        }
        for(let i = 0; i < payload.favoriteItemId.length; i++) {
          payload.favoriteItemId[i] = Number(payload.favoriteItemId[i])
        }
      }
      state.userCharacter = payload
    }
  },
  actions: {
    [UPDATE_USER_CHARACTER]: ({commit}, payload) => {
      commit(UPDATE_USER_CHARACTER, payload)
    }
  },
}