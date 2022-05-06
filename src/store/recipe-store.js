import {UPDATE_RECIPE_DATA} from "@/store/mutation-type";

export default {
    namespaced: true,
    state: {
        recipeData: {
            itemID: 0,
            name: '',
            job:'',
            itemIngredients: [],
            amountResult: 0
        }
    },
    getters: {
        getRecipeData(state) {
            return state.recipeData
        }
    },
    mutations: {
        [UPDATE_RECIPE_DATA](state, payload) {
            state.recipeData = payload
        }
    },
    actions: {
        [UPDATE_RECIPE_DATA]: ({commit}, payload) => {
            commit(UPDATE_RECIPE_DATA, payload)
        }
    },
}