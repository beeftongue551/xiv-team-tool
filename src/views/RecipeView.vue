<template>
  <TitleBar main-title="RECIPE" sub-title="レシピ検索" icon="mdi-hammer-screwdriver" />
  <RecipeSearch @update-items="getItemsData" />
  <RecipeCard :recipe-data="recipeData" id="recipe" />
  <ItemList :items-data="itemsData" :search-data="searchData" @update-recipe="getRecipeData" />
</template>

<script>
import {defineComponent, ref} from "vue"
import RecipeSearch from "@/components/recipe/RecipeSearch";
import RecipeCard from "@/components/item/RecipeCard";
import ItemList from "@/components/item/ItemList";
import TitleBar from "@/components/TitleBar";

export default defineComponent({
  name: "RecipeView",
  components: {TitleBar, ItemList, RecipeCard, RecipeSearch},
  setup() {

    const itemsData = ref([])
    const searchData = ref({})
    const recipeData = ref({})

    const getItemsData = (...updateItems) => {
      itemsData.value = updateItems[0]
      searchData.value = updateItems[1]
    }

    const getRecipeData = (...updateRecipe) => {
      recipeData.value = updateRecipe[0]
    }

    return {
      itemsData,
      searchData,
      recipeData,
      getRecipeData,
      getItemsData
    }
  }
})
</script>

<style scoped>
</style>