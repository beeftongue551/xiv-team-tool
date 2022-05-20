<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Icon</th>
        <th class="text-left">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe of recipesData" :key="recipe.ID">
        <td><XivIcon :icon="recipe.Icon" debug="true"/></td>
        <td @click="openRecipe(recipe.ID)" >{{recipe.Name}}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import XivIcon from "@/components/XivIcon";
import {useStore} from "vuex";
import {getRecipeById} from "@/module/XIVApiModule";

export default defineComponent({
  name: "RecipeList",
  components: {XivIcon},
  props: ['recipes','pagination'],
  setup(props) {
    const store = useStore()

    const recipesData = ref({})
    const page = ref({})

    const userData = ref({})

    onMounted(() => {
      userData.value = store.getters["user/getUserCharacter"]
      recipesData.value = props.recipes
      page.value = props.pagination
    })

    watch(props, () => {
      recipesData.value = props.recipes
      page.value = props.pagination
    })

    /**
     * レシピ情報の検索を行い、レシピ情報をストアに格納する処理
     *
     * @param {number} id
     * @return {Promise<void>}
     */
    const openRecipe = async (id) => {
      const recipeData = await getRecipeById(id)
      store.dispatch('recipe/updateRecipeData', recipeData)
    }

    return {
      recipesData,
      userData,
      page,

      openRecipe
    }
  }
})
</script>

<style scoped>
</style>