<template>
  <RecipeSearch @recipes="getRecipeData" />
  <RecipeCard />
  <RecipeList :recipes="recipeData.recipes" :pagination="recipeData.pagination"/>
</template>

<script>
import {defineComponent, reactive} from "vue"
import RecipeSearch from "@/components/recipe/RecipeSearch";
import RecipeList from "@/components/recipe/RecipeList";
import RecipeCard from "@/components/item/RecipeCard";

export default defineComponent({
  name: "RecipeView",
  components: {RecipeCard, RecipeList, RecipeSearch},
  setup() {

    const recipeData = reactive({
      recipes: {},
      pagination: {}
    })

    const getRecipeData = (...recipes) => {
      recipeData.recipes = recipes[0].Results
      recipeData.pagination = recipes[0].Pagination
    }

    return {
      recipeData,
      getRecipeData
    }
  }
})
</script>

<style scoped>
</style>