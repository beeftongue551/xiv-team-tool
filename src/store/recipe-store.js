export default {
    namespaced: true,
    state: {
        recipeId: 0
    },
    getters: {
        getRecipeId(state) {
            return state.recipeId
        }
    },
    mutations: {
        updateRecipeId(state, payload) {
            state.recipeId = payload
        }
    },
    actions: {
        updateRecipeId: ({commit}, payload) => {
            commit("updateRecipeId", payload)
        }
    },
}